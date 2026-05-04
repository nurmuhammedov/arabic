import { TypeAny } from '@topcoder/types'
import { z } from 'zod'

const customErrorMap: TypeAny = (issue: TypeAny, ctx: TypeAny) => {
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
