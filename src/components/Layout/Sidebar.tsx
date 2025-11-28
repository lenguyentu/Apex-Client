import { NavLink } from 'react-router-dom'
import { useSidebarStore } from '../../store/useSidebarStore'

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore()

  return (
    <aside className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {isCollapsed ? (
            <img src="/logo1.png" alt="APEX" className="w-10 h-10 object-contain" />
          ) : (
            <img src="/logo2.png" alt="APEX" className="h-8" />
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Thu nhỏ sidebar"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-6 overflow-y-auto">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
              isActive
                ? 'bg-black text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          title={isCollapsed ? 'Dashboard' : ''}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
              isActive
                ? 'bg-black text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          title={isCollapsed ? 'Quản lý Jobs' : ''}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {!isCollapsed && <span>Quản lý Jobs</span>}
        </NavLink>

        <NavLink
          to="/interview-process"
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
              isActive
                ? 'bg-black text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          title={isCollapsed ? 'Quy trình phỏng vấn' : ''}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          {!isCollapsed && <span>Quy trình phỏng vấn</span>}
        </NavLink>

        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
              isActive
                ? 'bg-black text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          title={isCollapsed ? 'Ứng viên' : ''}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {!isCollapsed && <span>Ứng viên</span>}
        </NavLink>

        <NavLink
          to="/evaluations"
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
              isActive
                ? 'bg-black text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          title={isCollapsed ? 'Đánh giá ứng viên' : ''}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {!isCollapsed && <span>Đánh giá ứng viên</span>}
        </NavLink>

        {/* Toggle button khi collapsed - thay thế vị trí Cài đặt */}
        {isCollapsed && (
          <div className="mt-6 pt-6 border-t border-gray-200 px-2">
            <button
              onClick={toggleSidebar}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              title="Mở rộng sidebar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button 
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors`}
          title={isCollapsed ? 'Đăng xuất' : ''}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
