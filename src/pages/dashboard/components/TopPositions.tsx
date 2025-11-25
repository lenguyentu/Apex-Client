interface TopPosition {
  code: string
  country: string
  count: string
  flag: string
}

interface TopPositionsProps {
  positions: TopPosition[]
  total: string
}

const TopPositions = ({ positions, total }: TopPositionsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Top vị trí theo ứng viên</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">{total}</p>
          <p className="text-xs text-gray-500">Từ tuần trước</p>
        </div>
      </div>
      <div className="space-y-3">
        {positions.map((pos, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{pos.flag}</span>
              <div>
                <span className="text-xs font-semibold text-gray-600 mr-1">{pos.code}</span>
                <span className="text-sm font-medium text-gray-900">{pos.country}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{pos.count}</span>
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopPositions
