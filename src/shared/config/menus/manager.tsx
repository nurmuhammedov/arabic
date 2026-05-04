import { Building2, MapPin, ShieldCheck } from 'lucide-react'

export const managerMenu = [
  {
    title: 'manager',
    items: [
      {
        title: 'organizations',
        url: '/manager/organizations',
        icon: <Building2 />,
      },
      {
        title: 'branches:branches',
        url: '/manager/branches',
        icon: <MapPin />,
      },
      {
        title: 'permits',
        url: '/manager/permits',
        icon: <ShieldCheck />,
      },
    ],
  },
]
