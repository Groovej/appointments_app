import { format, compareAsc, add } from 'date-fns'

export const validateEmail = (email) => /^[^@\s]+@[^@\s]+$/.test(String(email).toLowerCase())

const DATE_FORMAT = "yyyy-MM-dd HH:mm z"
export const parseDuration = (from, duration) => {
  const endTime = add(new Date(from), { minutes: duration })

  return `from ${format(new Date(from), DATE_FORMAT)} till ${format(new Date(endTime), DATE_FORMAT)}`
}
