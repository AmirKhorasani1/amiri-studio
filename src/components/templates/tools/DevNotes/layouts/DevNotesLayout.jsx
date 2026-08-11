import { Outlet, ScrollRestoration } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar/Sidebar'
import Navbar from '../components/common/Navbar/Navbar'

const DevNotesLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="md:ltr:pl-70 md:rtl:pr-70">
        <Outlet />
        <ScrollRestoration />
      </main>
    </>
  )
}

export default DevNotesLayout