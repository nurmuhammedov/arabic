import oneIdImg from '@topcoder/assets/images/oneId.png'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@topcoder/config'
import { useActions } from '@topcoder/hooks'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export function OneIdLogin() {
  const { t } = useTranslation('auth')
  const { oneIDLogin } = useActions()

  const [{ code }, setParams] = useQueryStates({
    code: parseAsString,
    state: parseAsString,
  })

  useEffect(() => {
    if (code) {
      void setParams(null)
      oneIDLogin({ code })
    }
  }, [code, oneIDLogin, setParams])

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="mb-10 text-center text-2xl font-medium">{t('system_login')}</h3>
      <a
        className="flex w-full max-w-60 items-center justify-center rounded-xl border border-neutral-250 bg-slate-200 py-2 transition-all hover:bg-slate-300 active:scale-95"
        href={`https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}`}
      >
        <div className="relative h-20 w-48">
          <LazyLoadImage
            alt={t('one_id_alt')}
            src={oneIdImg}
            effect="blur"
            placeholderSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaUlEQVR4AayOSy8DURiG35meVqu3IHVLNQ0NgkRiISlLFlhZYmVHxMqOH8AfkEgXViKxYMOCxEIssGEljUvrEk3rmkqj7YTOzDETmclMTsIIX86b7/aeJx+PP8b/AQZbjnoHIoezVqR6tcP1C6gkxsCJ81ZE5VKMAQByvTb8MVOqe/ULvvvUN1yNsekGDI3UMjYGEOnwwOsncLp4hCIuVAYcGJ0Koa3Lj/GZMIKNLhjDBAjUleEuUUR7tw/BpnIQBw+7g0P8JIfj/Sz2tp7g9thgDBNAXVBQvL2K8FUQUFmdfKkm6ASxM3aYJs/37wg3u3F9VsBVvKAAKCSJorXTC/W6aH8VBMFAVdgmgNIjcZqHUJCQy5Zwe1nEy8MH1pfTuDnPY20phVSyqNp0MQB9Yyh2Nx6xupjC5koGlBoWSmkA8Bmlt/Q4jk9rRh3A2cgEKJmzJJ5MMoDti+jBTrJnwYpULwPQBr/NnwAAAP//zt9RzQAAAAZJREFUAwBK2aYhdKfWuQAAAABJRU5ErkJggg=="
            wrapperClassName="size-full"
            className="size-full object-contain"
            width="100%"
            height="100%"
          />
        </div>
      </a>
    </div>
  )
}
