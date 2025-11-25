interface PageHeaderProps {
  onCreateClick?: () => void
}

const PageHeader = ({ onCreateClick }: PageHeaderProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Button clicked in PageHeader', onCreateClick)
    if (onCreateClick && typeof onCreateClick === 'function') {
      onCreateClick()
    } else {
      console.error('onCreateClick is not a function:', onCreateClick)
    }
  }

  return (
    <div className="flex items-center justify-between relative z-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quy trình phỏng vấn</h1>
        <p className="text-gray-600">Tạo và quản lý quy trình phỏng vấn cho các vị trí</p>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors cursor-pointer relative z-10"
        style={{ pointerEvents: 'auto' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Tạo quy trình mới</span>
      </button>
    </div>
  )
}

export default PageHeader
