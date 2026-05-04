export type Coordinate = [number, number]

export interface YandexMapProps {
  zoom?: number
  width?: string
  height?: string
  coords?: Coordinate[]
  center?: [number, number]
  onMapClick?: (coords: Coordinate[], currentMapZoom: number) => void
}
