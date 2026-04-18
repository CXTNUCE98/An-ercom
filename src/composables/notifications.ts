export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationItem {
  id: number
  type: NotificationType
  message: string
  timeoutMs: number
}

export function useNotifications() {
  const items = useState<NotificationItem[]>('notifications', () => [])
  const seed = useState<number>('notifications-seed', () => 1)

  const remove = (id: number) => {
    const idx = items.value.findIndex(n => n.id === id)
    if (idx >= 0) items.value.splice(idx, 1)
  }

  const notify = (type: NotificationType, message: string, timeoutMs = 3500) => {
    const id = ++seed.value
    const item: NotificationItem = { id, type, message, timeoutMs }
    items.value.push(item)
    if (timeoutMs > 0) {
      setTimeout(() => remove(id), timeoutMs)
    }
  }

  return { items, notify, remove }
}


