import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@topcoder/components'
import { USER_ROLE_LABELS } from '@topcoder/constants'
import { useActions, useIsMobile, useTypedSelector } from '@topcoder/hooks'
import { cn, truncateString } from '@topcoder/lib'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function UserDropdown() {
  const { user, isLoggingOut } = useTypedSelector((state) => state.auth)
  const { logout } = useActions()
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  if (!user) return null

  const userRoleLabel = user.roles?.map((role) => USER_ROLE_LABELS[role]).join(', ') || ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'group flex cursor-pointer items-center gap-3 transition-opacity',
            isLoggingOut && 'pointer-events-none opacity-50'
          )}
        >
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="bg-neutral-150 text-neutral-900">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          {!isMobile && (
            <div className="flex select-none flex-col items-start text-left">
              <span className="line-clamp-2 text-sm font-medium leading-tight text-foreground">
                {truncateString(user.name)}
              </span>
              {userRoleLabel && <span className="font-base text-xs text-muted-foreground">{userRoleLabel}</span>}
            </div>
          )}
          <ChevronDown className="h-4 !min-h-4 w-4 !min-w-4 text-muted-foreground opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-40 max-w-80" align="end" forceMount>
        {isMobile && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex select-none flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                {userRoleLabel && <p className="text-xs leading-none text-muted-foreground">{userRoleLabel}</p>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
