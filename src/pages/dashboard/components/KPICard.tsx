interface KPICardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  period: string
  bgColor: string
}

const KPICard = ({ title, value, change, isPositive, period, bgColor }: KPICardProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-sm`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-xs text-gray-500">{period}</span>
        </div>
        {/* Simple chart placeholder */}
        <div className="w-16 h-8 flex items-end gap-0.5">
          {[20, 35, 25, 40, 30, 45, 35].map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-gray-400 rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default KPICard

