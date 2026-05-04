import { reducer as authReducer } from './auth/auth.slice'
import { reducer as demoReducer } from './demo/demo.slice'

export const rootReducer = {
  auth: authReducer,
  demo: demoReducer,
}
