import { useEffect, useState } from 'react'

const TIME_ZONE = 'Asia/Tehran'

export const useCurrentTime = (language) => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const locale = language === 'fa' ? 'fa-IR' : 'en-GB'

      setTime(
        new Intl.DateTimeFormat(locale, {
          timeZone: TIME_ZONE,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }

    updateTime()

    const intervalId = setInterval(updateTime, 60_000)

    return () => clearInterval(intervalId)
  }, [language])

  return time
}