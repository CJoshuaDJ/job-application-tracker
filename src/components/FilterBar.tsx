import { Search } from 'lucide-react'
import type { StatusFilter } from '../hooks/useApplications'
import { STATUS_LABELS, STATUSES } from '../types'

type FilterBarProps = {
  query: string
  onQueryChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusChange: (value: StatusFilter) => void
}

export function FilterBar({
  query,
  onQueryChange,
  statusFilter,
  onStatusChange,
}: FilterBarProps) {
  const filters: Array<{ value: StatusFilter; label: string }> = [
    { value: 'all', label: 'All' },
    ...STATUSES.map((status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })),
  ]

  return (
    <div className="space-y-4 rounded-2xl border border-edge bg-surface-900/70 p-4 sm:p-5">
      <div className="relative w-full">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search company, role, or location"
          className="w-full rounded-xl border border-edge bg-surface-850 py-3 pr-4 pl-10 text-sm text-ink-100 placeholder:text-ink-400 focus:border-accent-500/40"
          aria-label="Search applications"
        />
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Filter by status"
      >
        {filters.map((filter) => {
          const active = statusFilter === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onStatusChange(filter.value)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-accent-500 text-on-accent'
                  : 'border border-edge bg-surface-850 text-ink-300 hover:text-ink-100'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
