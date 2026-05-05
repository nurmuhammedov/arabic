import { BookOpen } from 'lucide-react'

import { IMenuSection } from '../sidebar'

export const studentMenu: IMenuSection[] = [
  {
    title: 'main',
    items: [
      {
        title: 'vocabulary',
        url: '/student/vocabulary',
        icon: <BookOpen className="size-4" />,
      },
    ],
  },
]
