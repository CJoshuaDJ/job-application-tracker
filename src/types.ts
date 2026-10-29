export const STATUSES = [
  'wishlist',
  'applied',
  'interviewing',
  'offer',
  'rejected',
] as const

export type ApplicationStatus = (typeof STATUSES)[number]

export type Application = {
  id: string
  company: string
  role: string
  location: string
  status: ApplicationStatus
  appliedDate: string
  jobUrl: string
  salary: string
  notes: string
  createdAt: string
  updatedAt: string
}

export type ApplicationInput = Omit<
  Application,
  'id' | 'createdAt' | 'updatedAt'
>

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
}
