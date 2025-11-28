import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useFullscreenStore } from '../../store/useFullscreenStore'
import { useSidebarStore } from '../../store/useSidebarStore'

const Layout = () => {
  const isFullscreen = useFullscreenStore((state) => state.isFullscreen)
  const isCollapsed = useSidebarStore((state) => state.isCollapsed)

  return (
    <div className="min-h-screen bg-gray-50">
      {!isFullscreen && <Header />}
      {!isFullscreen && <Sidebar />}
      <main className={isFullscreen ? "fixed inset-0 p-0 overflow-auto bg-white" : `${isCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-2 transition-all duration-300`}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
