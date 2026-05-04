import { Award, BadgeCheck, Car, Database, FileText, MapPin, ShieldCheck, TestTube2, Users, Wrench } from 'lucide-react'

export const installerMenu = [
  {
    title: 'gas_balloon_installation',
    items: [
      {
        title: 'applications',
        url: '/installer/installation/applications',
        icon: <FileText />,
      },
      {
        title: 'installation_process',
        url: '/installer/installation/process',
        icon: <Wrench />,
      },
      {
        title: 'quality_control',
        url: '/installer/installation/quality-control',
        icon: <ShieldCheck />,
      },
      {
        title: 'testing_registry',
        url: '/installer/installation/testing',
        icon: <TestTube2 />,
      },
    ],
  },
  {
    title: 'registries',
    items: [
      {
        title: 'balloons',
        url: '/installer/registries/balloons',
        icon: <Database />,
      },
      {
        title: 'certificates',
        url: '/installer/registries/certificates',
        icon: <Award />,
      },
      {
        title: 'branches:branches',
        url: '/installer/branches',
        icon: <MapPin />,
      },
    ],
  },
  {
    title: 'integration',
    items: [
      {
        title: 'license_registry',
        url: '/installer/integration/licenses',
        icon: <BadgeCheck />,
      },
      {
        title: 'traffic_police_registry',
        url: '/installer/integration/traffic-police',
        icon: <Car />,
      },
    ],
  },
  {
    title: 'organizational',
    items: [
      {
        title: 'employees',
        url: '/installer/employees',
        icon: <Users />,
      },
      {
        title: 'permits',
        url: '/installer/permits',
        icon: <FileText />,
      },
    ],
  },
]
