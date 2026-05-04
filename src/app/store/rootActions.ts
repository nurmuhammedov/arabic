import * as authActions from './auth/auth.action'
import { addDemo, clearDemos, deleteDemo, updateDemo } from './demo/demo.slice'

export const allActions = {
  ...authActions,
  addDemo,
  deleteDemo,
  updateDemo,
  clearDemos,
}

export * from '@topcoder/store/auth/auth.action'
export { addDemo, clearDemos, deleteDemo, updateDemo }
