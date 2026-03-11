import type { CompatibilityRating } from '../../types';

const styles: Record<CompatibilityRating, { bg: string; text: string; label: string }> = {
  excellent: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Excellent' },
  good: { bg: 'bg-green-100', text: 'text-green-800', label: 'Good' },
  neutral: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Neutral' },
  poor: { bg: 'bg-red-100', text: 'text-red-800', label: 'Poor' },
};

export function CompatibilityScore({ rating }: { rating: CompatibilityRating }) {
  const s = styles[rating];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}
