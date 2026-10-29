import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

type ModalShellProps = {
  title: string
  description?: string
  titleId: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  size?: 'md' | 'lg'
}

export function ModalShell({
  title,
  description,
  titleId,
  onClose,
  children,
  footer,
  size = 'lg',
}: ModalShellProps) {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-surface-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-edge bg-surface-900 shadow-[0_30px_80px_-20px_rgb(0_0_0_/_0.75)] sm:rounded-3xl ${
          size === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-md'
        }`}
      >
        <div className="h-1 w-full bg-linear-to-r from-accent-500 via-accent-400 to-accent-600" />

        <div className="flex items-start justify-between gap-4 border-b border-edge px-5 py-4 sm:px-6">
          <div>
            <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-accent-400 uppercase">
              JobTrack
            </p>
            <h2
              id={titleId}
              className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-100"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-ink-400">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-edge p-2 text-ink-300 transition-colors hover:bg-surface-800 hover:text-ink-100"
            aria-label="Close"
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

        {footer ? (
          <div className="border-t border-edge bg-surface-950/40 px-5 py-4 sm:px-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
