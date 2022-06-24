type validationError = {
  msg: string
  param: string
  location: string
}

export const parseBackendError = (error: any) => {
  const parseError: any = {}
  switch (error.response?.status) {
    case 400:
      if (Array.isArray(error.response?.data?.errors))
        error.response?.data?.errors.forEach((err: validationError) => {
          parseError[err.param] = err.msg
        })
      break

    case 401:
      parseError.message = error.response?.data?.message
      break
    default:
      parseError.message = error.message
      break
  }
  return parseError
}
