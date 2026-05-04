import { Award, Car, Database, FileText, Siren, Users } from 'lucide-react'

export const chairmanMenu = [
  {
    title: 'reports',
    items: [
      {
        title: 'users',
        url: '/chairman/reports/users',
        icon: <Users />,
      },
    ],
  },
  {
    title: 'registries',
    items: [
      {
        title: 'all_documents',
        url: '/chairman/registries/documents',
        icon: <FileText />,
      },
      {
        title: 'transports',
        url: '/chairman/registries/transports',
        icon: <Car />,
      },
      {
        title: 'balloons',
        url: '/chairman/registries/balloons',
        icon: <Database />,
      },
      {
        title: 'licenses',
        url: '/chairman/registries/licenses',
        icon: <Award />,
      },
      {
        title: 'traffic_police',
        url: '/chairman/registries/traffic-police',
        icon: <Siren />,
      },
    ],
  },
]
