import { Outlet, ScrollRestoration } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar/Sidebar'

const DevNotesLayout = () => {
  return (
    <>
      <Sidebar />
      <main className="ltr:pl-70 rtl:pl-70">
        <Outlet />
        <ScrollRestoration />
      </main>
    </>
  )
}

export default DevNotesLayout