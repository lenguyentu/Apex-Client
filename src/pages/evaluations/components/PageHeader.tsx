const PageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Đánh giá ứng viên</h1>
        <p className="text-gray-600">Xem và quản lý đánh giá ứng viên</p>
      </div>
      <div className="flex items-center gap-3">
        <select className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
          <option>Tất cả vị trí</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>UI/UX Designer</option>
        </select>
      </div>
    </div>
  )
}

export default PageHeader

