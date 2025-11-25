const PageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Jobs</h1>
        <p className="text-gray-600">Quản lý các tin tuyển dụng đã đăng</p>
      </div>
      <button className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Đăng tin mới</span>
      </button>
    </div>
  )
}

export default PageHeader

