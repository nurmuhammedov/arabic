import { BookOpen, GraduationCap, Layers, Link2, Network, Shapes, Sigma } from 'lucide-react'

import type { IMenuSection } from '../sidebar'

export const studentMenu: IMenuSection[] = [
  {
    title: 'main',
    items: [
      { title: 'study', url: '/student/study', icon: <GraduationCap className="size-4" /> },
      { title: 'decks', url: '/student/decks', icon: <Layers className="size-4" /> },
      { title: 'dictionary', url: '/student/dictionary', icon: <BookOpen className="size-4" /> },
    ],
  },
  {
    title: 'grammar',
    items: [
      {
        title: 'sarf',
        url: '/student/sarf/forms',
        icon: <Sigma className="size-4" />,
        items: [
          { title: 'verb_forms', url: '/student/sarf/forms' },
          { title: 'root_classes', url: '/student/sarf/classes' },
          { title: 'derive', url: '/student/sarf/derive' },
        ],
      },
      {
        title: 'patterns',
        url: '/student/patterns',
        icon: <Shapes className="size-4" />,
        items: [
          { title: 'pattern_families', url: '/student/patterns' },
          { title: 'pattern_drill', url: '/student/patterns/drill' },
        ],
      },
      { title: 'huruf', url: '/student/huruf', icon: <Link2 className="size-4" /> },
      {
        title: 'nahw',
        url: '/student/nahw',
        icon: <Network className="size-4" />,
        items: [
          { title: 'nahw_topics', url: '/student/nahw' },
          { title: 'irab', url: '/student/nahw/irab' },
        ],
      },
    ],
  },
]
