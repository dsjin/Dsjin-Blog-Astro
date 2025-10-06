export const formatDatetime = (datetime?: Date) => {
  if (!datetime) {
    return ''
  }
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
  return formatter.format(datetime)
}

export default {
  formatDatetime
}
