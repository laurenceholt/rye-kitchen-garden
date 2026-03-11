import type { Confidence } from '../../types';

const styles: Record<Confidence | 'user', { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'High' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Medium' },
  low: { bg: 'bg-red-100', text: 'text-red-800', label: 'Low' },
  user: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Edited' },
};

export function ConfidenceBadge({ confidence, isEdited }: { confidence: Confidence; isEdited?: boolean }) {
  const key = isEdited ? 'user' : confidence;
  const s = styles[key];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}
