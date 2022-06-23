export const isEmail = (email?: string) => {
  const isEmpty = isNotEmpty(email)
  if (isEmpty) return isEmpty

  const res = email!.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

  return res ? '' : 'email is not correct'
}

export const isNotEmpty = (value?: string) => {
  return value ? '' : 'is required'
}
