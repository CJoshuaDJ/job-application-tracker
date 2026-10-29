import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ApplicationCard } from './components/ApplicationCard'
import { ApplicationForm } from './components/ApplicationForm'
import { ConfirmDialog } from './components/ConfirmDialog'
import { FilterBar } from './components/FilterBar'
import { StatsBar } from './components/StatsBar'
import { useApplications } from './hooks/useApplications'
import type { Application, ApplicationInput } from './types'

function App() {
  const {
    filtered,
    stats,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    addApplication,
    updateApplication,
    deleteApplication,
  } = useApplications()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Application | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (application: Application) => {
    setEditing(application)
    setFormOpen(true)
  }

  const handleSubmit = (input: ApplicationInput) => {
    if (editing) {
      updateApplication(editing.id, input)
    } else {
      addApplication(input)
    }
    setFormOpen(false)
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    setPendingDeleteId(id)
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-edge bg-surface-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-ink-100 sm:text-2xl">
              JobTrack
            </h1>
            <p className="text-xs text-ink-400 sm:text-sm">
              Organize applications, interviews, and next steps
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-400"
          >
            <Plus size={16} aria-hidden />
            <span className="hidden sm:inline">New application</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <StatsBar stats={stats} />
        </section>

        <section className="mb-6">
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-ink-400 uppercase">
              Applications
            </h2>
            <p className="text-sm text-ink-400">
              {filtered.length} shown
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-edge bg-surface-900/80 px-6 py-20 text-center">
              <p className="font-display text-2xl font-bold text-ink-100">
                No applications yet
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-400">
                Start tracking roles you’re interested in. Everything is saved
                locally in your browser.
              </p>
              <button
                type="button"
                onClick={openCreate}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-400"
              >
                <Plus size={16} aria-hidden />
                Add application
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {filtered.map((application) => (
                <li key={application.id}>
                  <ApplicationCard
                    application={application}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {formOpen ? (
        <ApplicationForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false)
            setEditing(null)
          }}
        />
      ) : null}

      {pendingDeleteId ? (
        <ConfirmDialog
          title="Delete application?"
          message="This will permanently remove the application from your tracker. This action cannot be undone."
          confirmLabel="Delete"
          tone="danger"
          onCancel={() => setPendingDeleteId(null)}
          onConfirm={() => {
            deleteApplication(pendingDeleteId)
            setPendingDeleteId(null)
          }}
        />
      ) : null}
    </div>
  )
}

export default App
