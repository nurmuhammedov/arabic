import { Button } from '@topcoder/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@topcoder/components/ui/dialog'
import { Input } from '@topcoder/components/ui/input'
import { Label } from '@topcoder/components/ui/label'
import { cn } from '@topcoder/lib/utils'
import { MapPinned } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { Coordinate } from '../model/yandex-map-types'
import YandexMap from './yandex-map'

const UZBEKISTAN_CENTER: [number, number] = [41.3775, 64.5853]
const DEFAULT_COUNTRY_ZOOM = 6
const SELECTED_POINT_ZOOM = 17
const REGION_ZOOM = 12

export interface YandexMapModalProps {
  label?: string
  initialCoords?: number[] | null
  disabled?: boolean
  onConfirm: (coords: string) => void
}

const YandexMapModal: React.FC<YandexMapModalProps> = ({ label, onConfirm, initialCoords, disabled }) => {
  const { t } = useTranslation(['labels', 'errors', 'common', 'form'])
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)

  const [mapCenter, setMapCenter] = useState<[number, number]>(UZBEKISTAN_CENTER)
  const [mapZoom, setMapZoom] = useState(DEFAULT_COUNTRY_ZOOM)
  const [mapCoords, setMapCoords] = useState<Coordinate[]>([])

  const coordinateSchema = useMemo(
    () =>
      z.object({
        lat: z.coerce
          .number({ message: 'must_be_number' })
          .min(37, 'outside_uzbekistan')
          .max(46, 'outside_uzbekistan')
          .transform((val) => (val ? val : 0)),
        lng: z.coerce
          .number({ message: 'must_be_number' })
          .min(56, 'outside_uzbekistan')
          .max(73, 'outside_uzbekistan')
          .transform((val) => (val ? val : 0)),
      }),
    []
  )

  const validateInput = useCallback(
    (value: string): { isValid: boolean; lat?: number; lng?: number; error?: string } => {
      if (!value.includes(',')) {
        return { isValid: false, error: t('errors:invalid_coords_format') }
      }

      const parts = value.split(',')
      if (parts.length !== 2) {
        return { isValid: false, error: t('errors:invalid_format') }
      }

      const latStr = parts[0].trim()
      const lngStr = parts[1].trim()

      const result = coordinateSchema.safeParse({ lat: latStr, lng: lngStr })

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors
        const errorKey = fieldErrors.lat?.[0] || fieldErrors.lng?.[0] || 'invalid_format'
        return { isValid: false, error: t(`errors:${errorKey}`) }
      }

      return { isValid: true, lat: result.data.lat, lng: result.data.lng }
    },
    [t, coordinateSchema]
  )

  const resetState = useCallback(() => {
    if (initialCoords && initialCoords.length === 2) {
      const [initLat, initLng] = initialCoords
      setInputValue(`${initLat}, ${initLng}`)
      setMapCenter([initLat, initLng])
      setMapCoords([[initLat, initLng]])
      setMapZoom(SELECTED_POINT_ZOOM)
      setIsValid(true)
      setError(null)
    } else {
      setInputValue('')
      setMapCenter(UZBEKISTAN_CENTER)
      setMapCoords([])
      setMapZoom(DEFAULT_COUNTRY_ZOOM)
      setIsValid(false)
      setError(null)
    }
  }, [initialCoords])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      resetState()
    }
  }

  const handleCheckLocation = useCallback(() => {
    const validation = validateInput(inputValue)

    if (!validation.isValid) {
      setError(validation.error || t('errors:invalid_format'))
      setIsValid(false)
    } else {
      setError(null)
      setIsValid(true)
      if (validation.lat !== undefined && validation.lng !== undefined) {
        setMapCenter([validation.lat, validation.lng])
        setMapCoords([[validation.lat, validation.lng]])
        setMapZoom(SELECTED_POINT_ZOOM)
      }
    }
  }, [inputValue, t, validateInput])

  const handleMapClick = useCallback(
    (coords: Coordinate[], currentMapZoom: number) => {
      if (coords.length > 0) {
        const [newLat, newLng] = coords[0]
        const formattedInput = `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`

        setInputValue(formattedInput)
        setMapCoords([[newLat, newLng]])
        setMapCenter([newLat, newLng])

        if (currentMapZoom < REGION_ZOOM) {
          setMapZoom(REGION_ZOOM)
        } else {
          setMapZoom(currentMapZoom)
        }

        const result = coordinateSchema.safeParse({ lat: newLat, lng: newLng })

        if (result.success) {
          setError(null)
          setIsValid(true)
        } else {
          const fieldErrors = result.error.flatten().fieldErrors
          const errorKey = fieldErrors.lat?.[0] || fieldErrors.lng?.[0] || 'invalid_format'
          setError(t(`errors:${errorKey}`))
          setIsValid(false)
        }
      }
    },
    [t, coordinateSchema]
  )

  const handleConfirm = useCallback(() => {
    const validation = validateInput(inputValue)
    if (validation.isValid && validation.lat !== undefined && validation.lng !== undefined) {
      onConfirm(`${validation.lat}, ${validation.lng}`)
      setOpen(false)
    } else {
      handleCheckLocation()
    }
  }, [inputValue, onConfirm, handleCheckLocation, validateInput])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'shadow-xs flex h-9 w-full justify-between rounded-md border border-input bg-white px-3 py-1 text-sm font-normal transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            {
              'text-muted-foreground': !initialCoords,
            }
          )}
        >
          <span className="truncate">
            {initialCoords ? initialCoords.join(', ') : label || t('labels:location_on_map')}
          </span>
          <MapPinned className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[95vh] w-full max-w-[95vw] flex-col p-6 sm:max-w-[95vw]">
        <DialogHeader className="mb-4 shrink-0">
          <DialogTitle>{t('labels:select_location')}</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-2">
          <div className="grid shrink-0 grid-cols-1 items-start gap-4 md:grid-cols-[1fr_auto]">
            <div className="grid gap-2">
              <Label htmlFor="coords">{t('labels:coordinates')}</Label>
              <Input
                id="coords"
                placeholder={t('form:enter')}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setIsValid(false)
                  if (error) setError(null)
                }}
                className={cn(error ? 'border-red-500' : '')}
              />
              {error && <span className="text-xs text-red-500">{error}</span>}
            </div>

            <div className="pt-8 md:pt-6">
              <Button type="button" onClick={handleCheckLocation} variant="default">
                {t('errors:set_location')}
              </Button>
            </div>
          </div>

          <div
            className={cn(
              'relative h-[60vh] w-full shrink overflow-hidden rounded-md border md:h-[70vh]',
              "[&_[class*='copyright']]:hidden"
            )}
          >
            <YandexMap
              width="100%"
              height="100%"
              onMapClick={handleMapClick}
              center={mapCenter}
              zoom={mapZoom}
              coords={mapCoords}
            />
          </div>
        </div>

        <DialogFooter className="mt-4 shrink-0">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              {t('common:cancel')}
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm} type="button" disabled={!isValid}>
            {t('common:save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(YandexMapModal)
