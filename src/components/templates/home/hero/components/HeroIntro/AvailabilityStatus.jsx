import { motion } from 'framer-motion'
import { useCurrentTime } from '@hooks/useCurrentTime'

const AvailabilityStatus = ({ label, timezone, language }) => {
  const time = useCurrentTime(language)

  return (
    <div className="flex h-9 items-center gap-2.5 rounded-full border-primary bg-neutral-200/60 px-3.5 backdrop-blur-md dark:bg-neutral-900/60">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <motion.span
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.35, 0, 0.35],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute inset-0 rounded-full bg-white"
        />

        <span className="relative h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
      </span>

      <span className="text-[12px] font-medium text-neutral-600 dark:text-neutral-200">
        {label}
      </span>

      <span className="mx-0.5 h-3 w-px bg-neutral-700" />

      <div
        dir="ltr"
        className="flex items-center gap-1 text-xs tabular-nums text-neutral-500"
      >
        {time || '--:--'}
        <span className="text-xs text-neutral-500">{timezone}</span>
      </div>
    </div>
  )
}

export default AvailabilityStatus