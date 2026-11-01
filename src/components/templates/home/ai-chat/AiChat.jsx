import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'

const AiChat = () => {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e?.preventDefault()
    const text = value.trim()
    if (!text) return

    console.log('send:', text)

    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="w-full container flex items-center justify-center mt-50 mb-80">
      <form
        onSubmit={handleSubmit}
        className="relative w-2/3 h-40 rounded-4xl bg-neutral-200/65 dark:bg-neutral-800/80"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="هر سوالی داری بپرس..."
          className="w-full h-full resize-none bg-transparent outline-none rounded-4xl px-6 pt-5 pb-14 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
        />

        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="ارسال"
          className="absolute bottom-4 right-4 cursor-pointer flex items-center justify-center gap-1 w-fit px-4.5 h-10 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 transition disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
        >
          <span>ارسال</span>
          <FiSend size={16} />
        </button>
      </form>
    </div>
  )
}

export default AiChat