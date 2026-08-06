import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

// توابع کمکی
const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const toFaDigits = (str) => str.replace(/[0-9]/g, (d) => faDigits[d])
const pad = (n) => String(n).padStart(2, '0')

const FlipDigit = ({ value, reduceMotion, index }) => {
  // ارقام زوج بالاتر و ارقام فرد پایین‌تر قرار می‌گیرند
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full h-full overflow-hidden border-r-6 border-black last:border-none flex justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={
            reduceMotion
              ? { x: '-50%', y: '-50%', scaleX: 0.85, opacity: 0 }
              : { 
                  x: '-50%', 
                  y: isEven ? '-100%' : '0%', // نقطه شروع انیمیشن
                  scaleX: 0.85, 
                  opacity: 0, 
                  filter: 'blur(10px)' 
                }
          }
          animate={{
            x: '-50%', // تراز دقیق افقی در مرکز ستون
            y: isEven ? '-58%' : '-42%', // تراز دقیق عمودی + اعمال زیگزاگ
            scaleX: 0.85, // فشردگی افقی مشابه عکس
            opacity: 1,
            filter: 'blur(0px)'
          }}
          exit={
            reduceMotion
              ? { opacity: 0, x: '-50%', y: '-50%', scaleX: 0.85 }
              : { 
                  x: '-50%', 
                  y: isEven ? '0%' : '-100%', // نقطه خروج انیمیشن
                  scaleX: 0.85, 
                  opacity: 0, 
                  filter: 'blur(10px)' 
                }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 text-white font-bold leading-none select-none"
          style={{
            // سایز اصلاح شد: 23vw باعث می‌شود 4 ستون کاملا در عرض 100vw صفحه جا شوند بدون سرریز
            fontSize: 'clamp(80px, 34vw, 700px)', 
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const ClockPage = () => {
  const { lang } = useLanguage()
  const isFa = lang === 'fa'
  const reduceMotion = useReducedMotion()

  const [now, setNow] = useState(new Date())
  
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = pad(now.getHours())
  const mm = pad(now.getMinutes())

  const displayHH = isFa ? toFaDigits(hh) : hh
  const displayMM = isFa ? toFaDigits(mm) : mm

  const timeDigits = `${displayHH}${displayMM}`.split('')

  const dateStr = useMemo(() => {
    const formatter = isFa
      ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    return formatter.format(now)
  }, [isFa, now])

  return (
    <div
      dir={isFa ? 'rtl' : 'ltr'}
      className="relative max-w-2xl mx-auto h-screen w-full bg-black overflow-hidden flex items-center pt-20"
    >
      {/* شبکه اصلی ساعت */}
      <div
        dir="ltr"
        role="timer"
        aria-label={`${hh}:${mm}`}
        className="grid grid-cols-4 w-full h-full flex-grow items-center"
      >
        {timeDigits.map((digit, index) => (
          <FlipDigit 
            key={`${index}-${digit}`} 
            value={digit} 
            reduceMotion={reduceMotion} 
            index={index} 
          />
        ))}
      </div>
    </div>
  )
}

export default ClockPage