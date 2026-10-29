import { useEffect, useId, useState, type ReactNode } from 'react'
import type { Application, ApplicationInput } from '../types'
import { STATUS_LABELS, STATUSES } from '../types'
import { ModalShell } from './ModalShell'

type ApplicationFormProps = {
  initial?: Application | null
  onSubmit: (input: ApplicationInput) => void
  onCancel: () => void
}

const emptyForm: ApplicationInput = {
  company: '',
  role: '',
  location: '',
  status: 'wishlist',
  appliedDate: new Date().toISOString().slice(0, 10),
  jobUrl: '',
  salary: '',
  notes: '',
}

export function ApplicationForm({
  initial,
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  const formId = useId()
  const [form, setForm] = useState<ApplicationInput>(emptyForm)

  useEffect(() => {
    if (initial) {
      setForm({
        company: initial.company,
        role: initial.role,
        location: initial.location,
        status: initial.status,
        appliedDate: initial.appliedDate,
        jobUrl: initial.jobUrl,
        salary: initial.salary,
        notes: initial.notes,
      })
    } else {
      setForm({
        ...emptyForm,
        appliedDate: new Date().toISOString().slice(0, 10),
      })
    }
  }, [initial])

  const updateField = <K extends keyof ApplicationInput>(
    key: K,
    value: ApplicationInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = () => {
    if (!form.company.trim() || !form.role.trim()) return
    onSubmit({
      ...form,
      company: form.company.trim(),
      role: form.role.trim(),
      location: form.location.trim(),
      jobUrl: form.jobUrl.trim(),
      salary: form.salary.trim(),
      notes: form.notes.trim(),
    })
  }

  return (
    <ModalShell
      title={initial ? 'Edit application' : 'New application'}
      description="Keep roles, status, and notes in one place."
      titleId={`${formId}-title`}
      onClose={onCancel}
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-edge px-5 py-2.5 text-sm font-semibold text-ink-200 hover:bg-surface-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-400"
          >
            {initial ? 'Save changes' : 'Add application'}
          </button>
        </div>
      }
    >
      <form
        className="grid gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
      >
        <SectionLabel>Role details</SectionLabel>
        <div className="grid gap-4 rounded-2xl border border-edge bg-surface-950/50 p-4">
          <Field label="Company" htmlFor={`${formId}-company`} required>
            <input
              id={`${formId}-company`}
              required
              value={form.company}
              onChange={(event) => updateField('company', event.target.value)}
              className="field-input"
              placeholder="Company name"
              autoFocus
            />
          </Field>

          <Field label="Role" htmlFor={`${formId}-role`} required>
            <input
              id={`${formId}-role`}
              required
              value={form.role}
              onChange={(event) => updateField('role', event.target.value)}
              className="field-input"
              placeholder="e.g. Junior Software Engineer"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Location" htmlFor={`${formId}-location`}>
              <input
                id={`${formId}-location`}
                value={form.location}
                onChange={(event) => updateField('location', event.target.value)}
                className="field-input"
                placeholder="Remote / City"
              />
            </Field>
            <Field label="Salary" htmlFor={`${formId}-salary`}>
              <input
                id={`${formId}-salary`}
                value={form.salary}
                onChange={(event) => updateField('salary', event.target.value)}
                className="field-input"
                placeholder="Optional"
              />
            </Field>
          </div>
        </div>

        <SectionLabel>Progress</SectionLabel>
        <div className="grid gap-4 rounded-2xl border border-edge bg-surface-950/50 p-4">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-ink-400 uppercase">
              Status
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((status) => {
                const active = form.status === status
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateField('status', status)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-accent-500 text-on-accent'
                        : 'border border-edge bg-surface-850 text-ink-300 hover:text-ink-100'
                    }`}
                  >
                    {STATUS_LABELS[status]}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Applied date" htmlFor={`${formId}-date`}>
              <input
                id={`${formId}-date`}
                type="date"
                value={form.appliedDate}
                onChange={(event) =>
                  updateField('appliedDate', event.target.value)
                }
                className="field-input"
              />
            </Field>
            <Field label="Job URL" htmlFor={`${formId}-url`}>
              <input
                id={`${formId}-url`}
                type="url"
                value={form.jobUrl}
                onChange={(event) => updateField('jobUrl', event.target.value)}
                className="field-input"
                placeholder="https://"
              />
            </Field>
          </div>
        </div>

        <SectionLabel>Notes</SectionLabel>
        <div className="rounded-2xl border border-edge bg-surface-950/50 p-4">
          <Field label="Notes" htmlFor={`${formId}-notes`}>
            <textarea
              id={`${formId}-notes`}
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              className="field-input min-h-28 resize-y"
              placeholder="Recruiter name, interview notes, next steps..."
            />
          </Field>
        </div>
      </form>

      <style>{`
        .field-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(255 255 255 / 0.08);
          background: #1a1d24;
          padding: 0.75rem 0.9rem;
          color: #f5f6f8;
          font-size: 0.875rem;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .field-input:focus {
          outline: none;
          border-color: rgb(245 158 11 / 0.45);
          box-shadow: 0 0 0 3px rgb(245 158 11 / 0.12);
        }
      `}</style>
    </ModalShell>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-ink-400 uppercase">
      {children}
    </p>
  )
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink-400 uppercase">
        {label}
        {required ? <span className="text-accent-400"> *</span> : null}
      </span>
      {children}
    </label>
  )
}
