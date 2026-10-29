import { useId } from 'react'
import { ModalShell } from './ModalShell'

type ConfirmDialogProps = {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'default'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId()

  return (
    <ModalShell
      title={title}
      titleId={titleId}
      onClose={onCancel}
      size="md"
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-edge px-4 py-2.5 text-sm font-semibold text-ink-200 hover:bg-surface-800"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              tone === 'danger'
                ? 'bg-rose-500 text-white hover:bg-rose-400'
                : 'bg-accent-500 text-on-accent hover:bg-accent-400'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      }
    >
      <p className="text-sm leading-relaxed text-ink-300 sm:text-base">
        {message}
      </p>
    </ModalShell>
  )
}
