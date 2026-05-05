import {
  Activity,
  Award,
  Blocks,
  Car,
  Database,
  Factory,
  FileText,
  Globe,
  Info,
  Map,
  MapPin,
  Siren,
  Smartphone,
  Tags,
  Users,
} from 'lucide-react'

export const superadminMenu = [
  {
    title: 'main',
    items: [
      {
        title: 'users',
        url: '/superadmin/users',
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: 'app_versions',
        url: '/superadmin/app-versions',
        icon: <Smartphone className="h-4 w-4" />,
      },
      {
        title: 'app_info',
        url: '/superadmin/dashboard/app-info',
        icon: <Info className="h-4 w-4" />,
      },
      {
        title: 'history',
        url: '/superadmin/dashboard/history',
        icon: <Activity className="h-4 w-4" />,
      },
    ],
  },
  {
    title: 'data',
    items: [
      {
        title: 'countries',
        url: '/superadmin/data/countries',
        icon: <Globe className="h-4 w-4" />,
      },
      {
        title: 'factories',
        url: '/superadmin/data/factories',
        icon: <Factory className="h-4 w-4" />,
      },
      {
        title: 'regions',
        url: '/superadmin/data/regions',
        icon: <MapPin className="h-4 w-4" />,
      },
      {
        title: 'districts',
        url: '/superadmin/data/districts',
        icon: <Map className="h-4 w-4" />,
      },
      {
        title: 'balloon_types',
        url: '/superadmin/data/balloon-types',
        icon: <Blocks className="h-4 w-4" />,
      },
      {
        title: 'balloon_shapes',
        url: '/superadmin/data/balloon-shapes',
        icon: <Tags className="h-4 w-4" />,
      },
      {
        title: 'balloon_capacities',
        url: '/superadmin/data/balloon-capacities',
        icon: <Blocks className="h-4 w-4" />,
      },
      {
        title: 'balloon_weights',
        url: '/superadmin/data/balloon-weights',
        icon: <Blocks className="h-4 w-4" />,
      },
      {
        title: 'working_pressures',
        url: '/superadmin/data/working-pressures',
        icon: <Blocks className="h-4 w-4" />,
      },
      {
        title: 'test_pressures',
        url: '/superadmin/data/test-pressures',
        icon: <Blocks className="h-4 w-4" />,
      },
    ],
  },
  {
    title: 'registries',
    items: [
      {
        title: 'all_documents',
        url: '/superadmin/registries/documents',
        icon: <FileText />,
      },
      {
        title: 'transports',
        url: '/superadmin/registries/transports',
        icon: <Car />,
      },
      {
        title: 'balloons',
        url: '/superadmin/registries/balloons',
        icon: <Database />,
      },
      {
        title: 'licenses',
        url: '/superadmin/registries/licenses',
        icon: <Award />,
      },
      {
        title: 'traffic_police',
        url: '/superadmin/registries/traffic-police',
        icon: <Siren />,
      },
    ],
  },
]
