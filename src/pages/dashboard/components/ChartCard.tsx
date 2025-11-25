const ChartCard = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const firstHalfData = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160]
  const topGrossData = [30, 40, 50, 60, 70, 180, 170, 160, 150, 140, 130, 120]

  const maxValue = 200
  const chartHeight = 200

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Tuyển dụng theo tháng</h3>
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
          {[200, 150, 100, 50, 0].map((val) => (
            <span key={val}>{val}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-gray-200" />
            ))}
          </div>

          {/* Chart lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* First Half line */}
            <polyline
              points={firstHalfData.map((val, i) => `${(i / 11) * 100},${100 - (val / maxValue) * 100}`).join(' ')}
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
            {/* Top Gross line */}
            <polyline
              points={topGrossData.map((val, i) => `${(i / 11) * 100},${100 - (val / maxValue) * 100}`).join(' ')}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
            />
          </svg>

          {/* June highlight */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-400">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              $307.48K
              <div className="text-center text-xs mt-1">JUNE 2024</div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
            {months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-gray-400"></div>
          <span className="text-sm text-gray-600">Nửa đầu năm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-green-500"></div>
          <span className="text-sm text-gray-600">Tuyển dụng thành công</span>
        </div>
      </div>
    </div>
  )
}

export default ChartCard

