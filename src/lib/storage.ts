import type { Application } from '../types'

const STORAGE_KEY = 'jobtrack-applications-v1'

export function loadApplications(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as Application[]) : []
  } catch {
    return []
  }
}

export function saveApplications(applications: Application[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
}

export function createId() {
  return crypto.randomUUID()
}
