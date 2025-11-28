import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useInterviewProcessStore } from '../../store/useInterviewProcessStore'
import { useSidebarStore } from '../../store/useSidebarStore'

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const location = useLocation()
  const selectedProcess = useInterviewProcessStore((state) => state.selectedProcess)
  const selectProcess = useInterviewProcessStore((state) => state.selectProcess)
  const isCollapsed = useSidebarStore((state) => state.isCollapsed)

  // Map route paths to page titles
  const getPageTitle = () => {
    if (selectedProcess) {
      return {
        title: selectedProcess.name,
        description: selectedProcess.description || 'Quản lý quy trình tuyển dụng và theo dõi ứng viên.',
        showBadge: true
      }
    }

    const pathToTitle: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'Dashboard',
        description: 'Tổng quan về hoạt động tuyển dụng của công ty'
      },
      '/jobs': {
        title: 'Quản lý Jobs',
        description: 'Quản lý và theo dõi các vị trí tuyển dụng'
      },
      '/interview-process': {
        title: 'Quy trình phỏng vấn',
        description: 'Tạo và quản lý quy trình phỏng vấn cho các vị trí'
      },
      '/candidates': {
        title: 'Ứng viên',
        description: 'Quản lý thông tin và hồ sơ ứng viên'
      },
      '/evaluations': {
        title: 'Đánh giá ứng viên',
        description: 'Xem và quản lý đánh giá ứng viên'
      },
      '/settings': {
        title: 'Cài đặt',
        description: 'Cấu hình hệ thống và tài khoản'
      }
    }

    return pathToTitle[location.pathname] || {
      title: 'APEX',
      description: 'Hệ thống quản lý tuyển dụng'
    }
  }

  const pageInfo = getPageTitle()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.user-dropdown')) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showDropdown])

  return (
    <header className={`bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 fixed top-0 ${isCollapsed ? 'left-20' : 'left-64'} right-0 z-50 transition-all duration-300`}>
      {/* Page Title */}
      <div className="flex items-center gap-6">
        {selectedProcess && (
          <button
            onClick={() => selectProcess('')}
            className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-800"
            title="Quay lại danh sách"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">{pageInfo.title}</h2>
          {selectedProcess && (
            <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Active
            </span>
          )}
        </div>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        {/* Search icon */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          aria-label="Tìm kiếm"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notifications icon */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
          aria-label="Thông báo"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User avatar with dropdown */}
        <div className="relative user-dropdown">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img src="/logo2.png" alt="Company Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900">Lê Nguyên Tú</p>
              <p className="text-xs text-gray-500">APEX Corporation</p>
            </div>
            <svg className="w-4 h-4 text-gray-600 transition-transform duration-200" style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Lê Nguyên Tú</p>
                <p className="text-xs text-gray-500 mt-0.5">HR Manager</p>
              </div>
              <a href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Hồ sơ cá nhân
              </a>
              <a href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Cài đặt
              </a>
              <hr className="my-1 border-gray-100" />
              <a href="#" className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                Đăng xuất
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
