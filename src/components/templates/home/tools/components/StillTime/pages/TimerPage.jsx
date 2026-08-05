import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const INITIAL_SECONDS = 20 * 60
const PRESETS = [25 * 60, 18 * 60, 60 * 60, 20 * 60, 15 * 60, 7.5 * 60 * 60]
const WHEEL_OFFSETS = [-2, -1, 0, 1, 2]

const WHEEL_ROW_STYLES = {
  '-2': 'scale-[0.58] text-white/[0.08]',
  '-1': 'scale-[0.75] text-white/[0.2]',
  0: 'scale-100 text-white',
  1: 'scale-[0.75] text-white/[0.2]',
  2: 'scale-[0.58] text-white/[0.08]',
}

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}

function cycle(value, minimum, maximum) {
  const range = maximum - minimum + 1
  return ((value - minimum) % range + range) % range + minimum
}

function splitSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return { hours, minutes, seconds }
}

function toSeconds({ hours, minutes, seconds }) {
  return hours * 3600 + minutes * 60 + seconds
}

function formatUnit(value) {
  return String(value).padStart(2, '0')
}

function formatTime(totalSeconds) {
  const { hours, minutes, seconds } = splitSeconds(totalSeconds)
  return [hours, minutes, seconds].map(formatUnit).join(':')
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.51.86l10.29-6.86a1 1 0 0 0 0-1.66L9.51 4.34A1 1 0 0 0 8 5.14Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h1A1.5 1.5 0 0 1 11 5.5v13A1.5 1.5 0 0 1 9.5 20h-1A1.5 1.5 0 0 1 7 18.5v-13Zm6 0A1.5 1.5 0 0 1 14.5 4h1A1.5 1.5 0 0 1 17 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-13Z" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2]">
      <path d="M4 12a8 8 0 1 0 2.34-5.66L4 8.67M4 4v4.67h4.67" />
    </svg>
  )
}

function TimeWheel({ label, value, maximum, disabled, onChange }) {
  const reduceMotion = useReducedMotion()

  const adjust = (amount) => {
    if (!disabled) onChange(amount)
  }

  const handleWheel = (event) => {
    if (disabled || event.deltaY === 0) return

    event.preventDefault()
    adjust(event.deltaY < 0 ? 1 : -1)
  }

  const handleKeyDown = (event) => {
    if (disabled) return

    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault()
      adjust(1)
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault()
      adjust(-1)
    }
  }

  return (
    <motion.div
      role="spinbutton"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={maximum}
      aria-valuenow={value}
      aria-disabled={disabled}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      whileHover={disabled || reduceMotion ? undefined : { scale: 1.025 }}
      className={[
        'relative flex w-40 select-none flex-col items-center justify-center',
        'outline-none focus-visible:ring-2 focus-visible:ring-blue-500/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black',
        disabled ? 'cursor-default' : 'cursor-ns-resize',
      ].join(' ')}
    >
      {WHEEL_OFFSETS.map((offset) => {
        const displayedValue = cycle(value + offset, 0, maximum)
        const isCurrent = offset === 0

        return (
          <motion.div
            key={String(offset) + '-' + String(displayedValue)}
            layout
            transition={{
              type: reduceMotion ? 'tween' : 'spring',
              stiffness: 340,
              damping: 30,
            }}
            className={[
              'flex h-[4rem] items-center justify-center font-light leading-none transition-colors',
              isCurrent
                ? 'z-10 text-9xl tracking-[-0.09em]'
                : 'text-6xl tracking-[-0.08em]',
              WHEEL_ROW_STYLES[offset],
            ].join(' ')}
          >
            {isCurrent ? (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={displayedValue}
                  initial={reduceMotion ? false : { y: 42, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={reduceMotion ? undefined : { y: -42, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  {formatUnit(displayedValue)}
                </motion.span>
              </AnimatePresence>
            ) : (
              formatUnit(displayedValue)
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function TimeSeparator() {
  return (
    <span
      aria-hidden="true"
      className="z-20 -mt-2 text-9xl font-light text-white"
    >
      :
    </span>
  )
}

function PresetButton({ seconds, isSelected, disabled, onSelect }) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(seconds)}
      whileHover={disabled ? undefined : { borderColor: 'rgba(255,255,255,0.28)' }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={[
        'border px-2 py-4 text-center font-semibold transition-colors rounded-full',
        isSelected
          ? 'border-white/[0.14] bg-white/[0.14] text-white'
          : 'border-white/[0.17] bg-transparent text-white/[0.62] hover:text-white',
        disabled ? 'cursor-not-allowed opacity-45' : '',
      ].join(' ')}
    >
      {formatTime(seconds)}
    </motion.button>
  )
}

function getPrimaryButtonCopy(status) {
  if (status === 'running') return { label: 'Pause', icon: <PauseIcon /> }
  if (status === 'paused') return { label: 'Resume', icon: <PlayIcon /> }
  if (status === 'completed') return { label: 'Start Again', icon: <PlayIcon /> }
  return { label: 'Start', icon: <PlayIcon /> }
}

export default function TimerPage() {
  const [selectedSeconds, setSelectedSeconds] = useState(INITIAL_SECONDS)
  const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_SECONDS)
  const [status, setStatus] = useState('idle')
  const reduceMotion = useReducedMotion()

  const time = useMemo(() => splitSeconds(remainingSeconds), [remainingSeconds])
  const isRunning = status === 'running'
  const canEditTime = status === 'idle'
  const primaryButton = getPrimaryButtonCopy(status)

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(intervalId)
          setStatus('completed')
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  const changeUnit = (unit, amount) => {
    if (!canEditTime) return

    const limits = { hours: 23, minutes: 59, seconds: 59 }
    const nextTime = {
      ...time,
      [unit]: cycle(time[unit] + amount, 0, limits[unit]),
    }
    const nextSeconds = toSeconds(nextTime)

    setSelectedSeconds(nextSeconds)
    setRemainingSeconds(nextSeconds)
  }

  const selectPreset = (seconds) => {
    if (!canEditTime) return

    setSelectedSeconds(seconds)
    setRemainingSeconds(seconds)
  }

  const handlePrimaryAction = () => {
    if (status === 'running') {
      setStatus('paused')
      return
    }

    if (status === 'completed') {
      setRemainingSeconds(selectedSeconds)
    }

    setStatus('running')
  }

  const resetTimer = () => {
    setRemainingSeconds(selectedSeconds)
    setStatus('idle')
  }

  return (
    <main className="h-screen overflow-x-hidden bg-black text-white">
      <section className="relative mx-auto flex h-screen w-full max-w-5xl flex-col px-5 pb-12 pt-12 sm:px-10 sm:pb-16 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        />

        <div className="relative z-10 flex flex-1 flex-col">
          <div
            className="relative mx-auto flex w-full max-w-4xl items-center justify-center gap-3.5"
            aria-label={'Timer set to ' + formatTime(remainingSeconds)}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black via-black/55 to-transparent sm:h-32" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black via-black/55 to-transparent sm:h-32" />

            <TimeWheel
              label="Hours"
              value={time.hours}
              maximum={23}
              disabled={!canEditTime}
              onChange={(amount) => changeUnit('hours', amount)}
            />
            <TimeSeparator />
            <TimeWheel
              label="Minutes"
              value={time.minutes}
              maximum={59}
              disabled={!canEditTime}
              onChange={(amount) => changeUnit('minutes', amount)}
            />
            <TimeSeparator />
            <TimeWheel
              label="Seconds"
              value={time.seconds}
              maximum={59}
              disabled={!canEditTime}
              onChange={(amount) => changeUnit('seconds', amount)}
            />
          </div>

          <div className="mx-auto grid w-full max-w-xl grid-cols-3 gap-3">
            {PRESETS.map((seconds) => (
              <PresetButton
                key={seconds}
                seconds={seconds}
                isSelected={selectedSeconds === seconds}
                disabled={!canEditTime}
                onSelect={selectPreset}
              />
            ))}
          </div>

          <div className="mt-auto flex items-center justify-center gap-4">
            <motion.button
              type="button"
              disabled={selectedSeconds === 0}
              onClick={handlePrimaryAction}
              layout
              whileHover={{ scale: 1.035, backgroundColor: 'rgb(55,55,58)' }}
              whileTap={{ scale: 0.96 }}
              animate={
                status === 'completed' && !reduceMotion
                  ? { boxShadow: ['0 0 0 rgba(59,130,246,0)', '0 0 44px rgba(59,130,246,0.28)', '0 0 0 rgba(59,130,246,0)'] }
                  : { boxShadow: '0 0 0 rgba(59,130,246,0)' }
              }
              transition={
                status === 'completed'
                  ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                  : { type: 'spring', stiffness: 360, damping: 24 }
              }
              className="inline-flex min-w-56 items-center justify-center gap-3 rounded-full bg-[#2d2d30] px-10 py-5 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-72 sm:px-14 sm:py-6 sm:text-lg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={primaryButton.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.16 }}
                  className="inline-flex items-center gap-3"
                >
                  <span className="text-blue-500">{primaryButton.icon}</span>
                  {primaryButton.label}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <AnimatePresence initial={false}>
              {(status === 'running' || status === 'paused') && (
                <motion.button
                  type="button"
                  onClick={resetTimer}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-w-56 items-center justify-center gap-3 rounded-full bg-neutral-950 border-primary px-10 py-5 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-72 sm:px-14 sm:py-6 sm:text-lg"
                >
                  <ResetIcon />
                  Reset
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  )
}
