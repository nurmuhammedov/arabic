import { BookOpen, ShieldCheck, Users } from 'lucide-react'

import type { IMenuSection } from '../sidebar'

export const adminMenu: IMenuSection[] = [
  {
    title: 'main',
    items: [
      {
        title: 'users',
        url: '/superadmin/users',
        icon: <Users className="size-4" />,
      },
    ],
  },
  {
    title: 'dictionary_section',
    items: [
      {
        title: 'dictionary',
        url: '/superadmin/dictionary',
        icon: <BookOpen className="size-4" />,
      },
      {
        title: 'gloss_review',
        url: '/superadmin/dictionary/review',
        icon: <ShieldCheck className="size-4" />,
      },
    ],
  },
]
