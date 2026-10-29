import { STATUS_LABELS, type ApplicationStatus } from '../types'

type Stats = {
  total: number
  wishlist: number
  applied: number
  interviewing: number
  offer: number
  rejected: number
}

type StatsBarProps = {
  stats: Stats
}

const cards: Array<{ key: keyof Stats; label: string }> = [
  { key: 'total', label: 'Total' },
  ...(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((status) => ({
    key: status as keyof Stats,
    label: STATUS_LABELS[status],
  })),
]

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <li
          key={card.key}
          className="rounded-2xl border border-edge bg-surface-900/80 px-4 py-4"
        >
          <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-400 uppercase">
            {card.label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-100">
            {stats[card.key]}
          </p>
        </li>
      ))}
    </ul>
  )
}
