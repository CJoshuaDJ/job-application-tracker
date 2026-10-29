import { ExternalLink, MapPin, Pencil, Trash2 } from 'lucide-react'
import type { Application } from '../types'
import { STATUS_LABELS } from '../types'

type ApplicationCardProps = {
  application: Application
  onEdit: (application: Application) => void
  onDelete: (id: string) => void
}

const statusStyles: Record<Application['status'], string> = {
  wishlist: 'bg-slate-400/15 text-slate-300',
  applied: 'bg-sky-400/15 text-sky-300',
  interviewing: 'bg-amber-400/15 text-amber-300',
  offer: 'bg-emerald-400/15 text-emerald-300',
  rejected: 'bg-rose-400/15 text-rose-300',
}

export function ApplicationCard({
  application,
  onEdit,
  onDelete,
}: ApplicationCardProps) {
  return (
    <article className="rounded-2xl border border-edge bg-surface-900/80 p-4 transition-colors hover:border-edge-strong hover:bg-surface-850 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold text-ink-100">
              {application.role}
            </h3>
            <span
              className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${statusStyles[application.status]}`}
            >
              {STATUS_LABELS[application.status]}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-ink-300">
            {application.company}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-400">
            {application.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden />
                {application.location}
              </span>
            ) : null}
            {application.appliedDate ? (
              <span>Applied {application.appliedDate}</span>
            ) : null}
            {application.salary ? <span>{application.salary}</span> : null}
          </div>

          {application.notes ? (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-300">
              {application.notes}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-edge px-3 py-2 text-xs font-semibold text-ink-200 hover:border-accent-500/40 hover:text-accent-400"
            >
              Job link
              <ExternalLink size={12} aria-hidden />
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => onEdit(application)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-edge px-3 py-2 text-xs font-semibold text-ink-200 hover:bg-surface-800"
          >
            <Pencil size={12} aria-hidden />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(application.id)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/20 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-400/10"
          >
            <Trash2 size={12} aria-hidden />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
