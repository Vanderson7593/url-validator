import { ISubscription } from "../../../../types/subcription"
import { formatDate } from "../../../../utils/date"
import { formatMoney } from "../../../../utils/money"
import { capitalizeFirstLetter } from "../../../../utils/strings"

export const dataModifier = (subs: ReadonlyArray<ISubscription>): Record<string, any>[] => {
  return subs.map((sub) => ({
    ...sub,
    subscriber: sub.user.name,
    cpf: sub.user.cpf,
    created_at: formatDate(sub.created_at),
    category: capitalizeFirstLetter(sub.user.category),
    email: sub.user.email,
    uf: sub.user.uf,
    total: formatMoney(sub.total)
  }))
}