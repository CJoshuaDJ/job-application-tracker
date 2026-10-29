import { useEffect, useMemo, useState } from 'react'
import { createId, loadApplications, saveApplications } from '../lib/storage'
import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
} from '../types'

export type StatusFilter = ApplicationStatus | 'all'

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>(() =>
    loadApplications(),
  )
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  useEffect(() => {
    saveApplications(applications)
  }, [applications])

  const addApplication = (input: ApplicationInput) => {
    const now = new Date().toISOString()
    const next: Application = {
      ...input,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    setApplications((current) => [next, ...current])
  }

  const updateApplication = (id: string, input: ApplicationInput) => {
    setApplications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, ...input, updatedAt: new Date().toISOString() }
          : item,
      ),
    )
  }

  const deleteApplication = (id: string) => {
    setApplications((current) => current.filter((item) => item.id !== id))
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return applications.filter((item) => {
      const matchesStatus =
        statusFilter === 'all' ? true : item.status === statusFilter
      const matchesQuery =
        normalized.length === 0 ||
        item.company.toLowerCase().includes(normalized) ||
        item.role.toLowerCase().includes(normalized) ||
        item.location.toLowerCase().includes(normalized)
      return matchesStatus && matchesQuery
    })
  }, [applications, query, statusFilter])

  const stats = useMemo(() => {
    return applications.reduce(
      (acc, item) => {
        acc.total += 1
        acc[item.status] += 1
        return acc
      },
      {
        total: 0,
        wishlist: 0,
        applied: 0,
        interviewing: 0,
        offer: 0,
        rejected: 0,
      },
    )
  }, [applications])

  return {
    applications,
    filtered,
    stats,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    addApplication,
    updateApplication,
    deleteApplication,
  }
}
