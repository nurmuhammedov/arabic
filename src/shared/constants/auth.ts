export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

export const USER_ROLE_LABELS: Record<string, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.STUDENT]: 'Student',
}
