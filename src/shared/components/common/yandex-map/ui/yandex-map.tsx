import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { TypeAny } from '@topcoder/types'
import React, { useCallback, useEffect, useRef } from 'react'

import { MAP_DEFAULTS } from '../model/yandex-map-config'
import type { Coordinate, YandexMapProps } from '../model/yandex-map-types'

const YandexMap: React.FC<YandexMapProps> = ({
  onMapClick,
  coords = [],
  zoom = MAP_DEFAULTS.zoom,
  width = MAP_DEFAULTS.width,
  height = MAP_DEFAULTS.height,
  center = MAP_DEFAULTS.center,
}) => {
  const mapRef = useRef<TypeAny>(null)

  const handleMapClick = useCallback(
    (e: { get: (key: string) => Coordinate }) => {
      const clickedCoords = e.get('coords')

      let currentZoom = zoom
      if (mapRef.current) {
        currentZoom = mapRef.current.getZoom()
      }

      onMapClick?.([clickedCoords], currentZoom)
    },
    [onMapClick, zoom]
  )

  const handleApiLoad = (ymaps: TypeAny) => {
    ymaps.borders.load('001', { lang: 'uz', quality: 1 }).then((geojson: TypeAny) => {
      const regions = geojson.features.filter(
        (feature: { properties: { iso3166: string } }) => feature.properties.iso3166 === 'UZ'
      )

      if (regions.length > 0) {
        const collection = new ymaps.GeoObjectCollection(null, {
          strokeColor: '#3b82f6',
          strokeWidth: 2,
          fillColor: 'rgba(59,130,246,0.02)',
          interactivityModel: 'default#transparent',
        })
        collection.add(new ymaps.GeoObject(regions[0]))
        if (mapRef.current) {
          mapRef.current.geoObjects.add(collection)
        }
      }
    })
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current
        .setCenter(center, zoom, {
          duration: 300,
        })
        .catch(() => {})
    }
  }, [center, zoom])

  return (
    <YMaps query={{ load: 'package.full', lang: 'ru_RU' }}>
      <Map
        width={width}
        height={height}
        onClick={handleMapClick}
        defaultState={{
          center,
          zoom,
          controls: ['zoomControl', 'typeSelector'],
          type: 'yandex#map',
        }}
        instanceRef={(ref) => (mapRef.current = ref)}
        onLoad={handleApiLoad}
      >
        {coords.map((coordinate, index) => (
          <Placemark key={index} geometry={coordinate} options={{ preset: 'islands#blueDotIcon' }} />
        ))}
      </Map>
    </YMaps>
  )
}

export default React.memo(YandexMap)
