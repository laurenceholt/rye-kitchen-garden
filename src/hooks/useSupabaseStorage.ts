import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Drop-in replacement for useLocalStorage that also persists to Supabase.
 *
 * - Initializes synchronously from localStorage (instant startup)
 * - Fetches from Supabase in background and overrides if data exists
 * - Writes to both localStorage (sync) and Supabase (debounced async)
 * - Auto-seeds Supabase from localStorage on first use
 * - Falls back to localStorage-only if Supabase is unreachable
 */
export function useSupabaseStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // 1. Initialize from localStorage (instant, synchronous — same as useLocalStorage)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const hasFetchedRef = useRef(false);
  const latestValueRef = useRef(storedValue);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // 2. On mount, fetch from Supabase and override local state if data exists
  useEffect(() => {
    if (!supabase || hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    (async () => {
      try {
        const { data, error } = await supabase
          .from('app_state')
          .select('value')
          .eq('key', key)
          .single();

        if (error) {
          // Row doesn't exist — seed Supabase from localStorage
          if (error.code === 'PGRST116') {
            await supabase.from('app_state').upsert({
              key,
              value: latestValueRef.current as unknown as Record<string, unknown>,
              updated_at: new Date().toISOString(),
            });
            return;
          }
          console.warn(`Supabase fetch failed for "${key}":`, error.message);
          return;
        }

        if (data?.value != null) {
          const remoteValue = data.value as T;
          setStoredValue(remoteValue);
          latestValueRef.current = remoteValue;
          // Sync localStorage with the Supabase truth
          try {
            window.localStorage.setItem(key, JSON.stringify(remoteValue));
          } catch { /* ignore */ }
        }
      } catch (err) {
        console.warn(`Supabase unreachable for "${key}":`, err);
        // localStorage value is already loaded — graceful degradation
      }
    })();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  // 3. Debounced save to Supabase
  const saveToSupabase = useCallback(
    (value: T) => {
      const client = supabase;
      if (!client) return;

      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      saveTimerRef.current = setTimeout(async () => {
        try {
          await client.from('app_state').upsert({
            key,
            value: value as unknown as Record<string, unknown>,
            updated_at: new Date().toISOString(),
          });
        } catch (err) {
          console.warn(`Supabase save failed for "${key}":`, err);
          // Data is safe in localStorage — will sync next time
        }
      }, 500);
    },
    [key]
  );

  // 4. setValue: write to React state + localStorage + Supabase
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue(prev => {
        const newValue = value instanceof Function ? value(prev) : value;
        latestValueRef.current = newValue;

        // Synchronous localStorage write
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch { /* storage full or unavailable */ }

        // Async Supabase write (debounced)
        saveToSupabase(newValue);

        return newValue;
      });
    },
    [key, saveToSupabase]
  );

  return [storedValue, setValue];
}
