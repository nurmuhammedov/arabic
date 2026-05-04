import 'react-lazy-load-image-component/src/effects/blur.css'

import logoImg from '@topcoder/assets/images/logo.png'
import { ContentLoader } from '@topcoder/components/common'
import { Mail, Phone, Send } from 'lucide-react'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  const { t } = useTranslation('auth')

  return (
    <div className="flex h-screen w-full">
      <div className="scrollbar-hidden hidden h-full w-1/2 flex-col items-center justify-between overflow-y-auto bg-teal px-4 pb-2 pt-4 lg:flex">
        <div className="flex flex-grow flex-col items-center justify-center space-y-10">
          <h4 className="max-w-xl text-center text-xl font-semibold text-teal-foreground">{t('committee_name')}</h4>

          <div className="relative size-60">
            <LazyLoadImage
              alt={t('logo_alt')}
              src={logoImg}
              effect="blur"
              placeholderSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADm0lEQVR4AVySX2xTdRTHv/d3b9vbbe2t0Ja2K5QWNufogI0VhShsZRgVow+whmiiYAyLskSNJryoUR+UF+I/EsEAMRgjMmUY51wWGDJksMHc5oZsc27MWbquXdf/t71/er0swgPfc87bOZ98z8khuE8/HtpU/cVbNUfe3usdP/BipfDh/jX5g801Nzs+a/j8j7PPV93XjnuAntON+pPv1B49fy1y/dLoXFMwliyLxnOaRDqrnfg3UnH859HmtnPDAz99tP6TG6cbtXdBi4CpC3vYkaGp9t6J8L4iViK7NhZh3xY9Xt2mQWO1Bq/4jdizzYLYQpxu7Zt/bezvmz/chSwCeq+PH+oajNS5rCY8V2/FUpbDTFiPM5cFtPcDU0Et9KIWux9zwPFAMVqvpJ5W2NgHd1yQy6d2eDuvJJqsHI1KC4XBngTOj8UwNJ+ErUYDR20O3dMxtA9HcaN/Ho+4NDDogJNnw2+Ez+3wkGgo9XKZlae3V7OwGBUYzAQiC9AmAR6GgpnXwWgHtOY8LE4NWEaG31uCJTr1NrcWXiLTIcE/MCXDZSBYyDEYVDJwlmqx/xkP/HVOPN6wAs3ProTBaMTvMo880cKluu0bz6NnRPCTdEZaucqhQz4tgckLsEkssrPF+KZDwfvHRBw8zuPrUyEoMQpcmoKSzUPMCbByFOaiaReRcwmkUjwksQApDxRCQCrHIchtgcPAwkAruDRRjNmwBDlEIKo9NKPAZFCg11Egepa+lRYU0DQBA2A6lsfY7TkkI0nMOv1IrQ2gavPDyNMMQrwCqqBAy7GYiQI6vWGa1NUWdWVFIE5rIWULKDFR0PA8+q52o7+zGyOdFzEevA2GLkGRESjSyphcYKBjKWxYZ+8iHq/r2NYNnHxxjIfRzKCqVA9ZDYcUQzT4JyIzwyiZ+wd8Jo3yZTRsq1n80hdHqc0seNz0CbLE1zriqzQfjcQF9MeB5XYKDes0MHIGsAVZPW4GqWwGj3pFlK8i+PY3AYTIqH7I8nF5w5lJoq4Nn939ZmC7+9ehySS+GxCwegWDF/wEy9RfKHMS7K7TgdNrcOKCiHg2B5/X2SZZTe9C1SKAqv8q9yBneeoJn+3LgkIVDnek8P1VAWVuTrWqR9u1DFp6EwDFyBsrSj/dXGHfGQi0CFBF1FrM5YEWfteB3qadW821gXr3kQqX6S+zSScuNbGCy2YcrV/rPPzkJvv6ve/1vL7m/+E7g/8BAAD//zNgkpMAAAAGSURBVAMA2MNzw8AUaz4AAAAASUVORK5CYII="
              wrapperClassName="size-full"
              className="size-full object-contain"
              width="100%"
              height="100%"
            />
          </div>

          <div className="text-center text-teal-foreground">
            <p className="my-2 text-2xl font-bold tracking-wide">{t('system_name')}</p>
            <h6 className="text-xl opacity-80">{t('system_type')}</h6>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-row items-center justify-center gap-6 text-teal-foreground/80">
          <a
            href="https://t.me/ekotizim_cirns"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all hover:text-teal-foreground hover:opacity-100"
          >
            <Send className="size-4" />
            <span className="text-sm font-medium">{t('telegram')}</span>
          </a>
          <a
            href="tel:+998712030239"
            className="flex items-center gap-2 transition-all hover:text-teal-foreground hover:opacity-100"
          >
            <Phone className="size-4" />
            <span className="whitespace-nowrap text-sm font-medium">+998 (71) 203-02-39</span>
          </a>
          <a
            href="mailto:info@cirns.uz"
            className="flex items-center gap-2 transition-all hover:text-teal-foreground hover:opacity-100"
          >
            <Mail className="size-4" />
            <span className="text-sm font-medium">info@cirns.uz</span>
          </a>
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-background px-4 pb-2 pt-4 lg:w-1/2">
        <Suspense fallback={<ContentLoader opacity={30} />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
