import { formatDate } from "../../utils/date"
import { IUrl } from "../../types/url"

export const dataModifier = (subs: Array<IUrl | any>): Record<string, any>[] => {
  return subs.map(({ id, label, url, is_processed, processed_at, status, updated_at, created_at, html }) => ({
    id,
    label,
    url,
    status: status === null && is_processed ? 404 : status,
    is_processed,
    processed_at: formatDate(processed_at),
    created_at: formatDate(created_at),
    updated_at: formatDate(updated_at),
    actions: html,
  }))
}