import { Map, MapPin, Users } from 'lucide-react'

import { IMenuSection } from '../sidebar'

export const adminMenu: IMenuSection[] = [
  {
    title: 'main',
    items: [
      {
        title: 'users',
        url: '/superadmin/users',
        icon: <Users className="size-4" />,
      },
      {
        title: 'regions',
        url: '/superadmin/regions',
        icon: <Map className="size-4" />,
      },
      {
        title: 'districts',
        url: '/superadmin/districts',
        icon: <MapPin className="size-4" />,
      },
    ],
  },
]
