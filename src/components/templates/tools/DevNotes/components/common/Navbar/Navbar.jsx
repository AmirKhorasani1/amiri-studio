

const Navbar = () => {
  return (
    <div className="md:hidden fixed top-0 right-0 left-0 h-21 bg-gradient-to-b from-neutral-100 dark:from-black via-neutral-100/90 dark:via-black/90 to-transparent w-full">
      <h1 className="font-medium text-center pt-7 text-lg">یادداشت ها</h1>
    
      <button
        className="fixed left-4 top-5 z-40 text-white bg-white dark:bg-neutral-800 p-2 rounded-full md:hidden shadow-[0px_0px_20px_#dcdcdc] dark:shadow-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default Navbar