const ProcessStages = () => {
  const stages = ['Screening CV', 'Technical Test', 'Interview 1', 'Interview 2', 'Final Decision']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Ví dụ: Quy trình Frontend Developer</h2>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold text-sm">
              {index + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{stage}</h4>
              <p className="text-sm text-gray-600">Giai đoạn {index + 1} của quy trình</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Cấu hình</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProcessStages

