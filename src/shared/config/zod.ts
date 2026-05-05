import { z } from 'zod'

const customErrorMap: any = (issue: any, ctx: any) => {
  if (issue?.message && issue?.message !== ctx?.defaultError) {
    return { message: issue.message }
  }

  if (
    issue.code === 'invalid_type' &&
    (issue?.received === 'undefined' || issue?.received === 'null' || issue?.received === '')
  ) {
    return { message: 'required_field' }
  }

  return { message: 'invalid_value' }
}

z.setErrorMap(customErrorMap)
