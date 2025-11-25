import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'

const ProcessCards = () => {
  const processes = useInterviewProcessStore((state) => state.processes)
  const selectProcess = useInterviewProcessStore((state) => state.selectProcess)

  if (processes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No processes found</h3>
        <p className="text-gray-500 mt-1 max-w-sm mx-auto">Get started by creating a new interview process for your recruitment pipeline.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {processes.map((process) => {
        // Giả lập tính toán tiến độ
        const progress = Math.floor(Math.random() * 60) + 20; 
        
        return (
        <div
          key={process.id}
          onClick={() => selectProcess(process.id)}
          className="group bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
        >
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wide rounded">Recruitment</span>
                  {process.activeJobs > 2 && <span className="px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wide rounded">Hot</span>}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{process.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{process.description || 'No description provided.'}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </div>
          </div>

          {/* Progress Bar giả lập */}
          <div className="mb-5">
             <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500 font-medium">Success Rate</span>
                <span className="text-gray-900 font-bold">{progress}%</span>
             </div>
             <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-gray-900 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
             </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
             <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <span className="font-medium">{process.stages.length} stages</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="font-medium">{process.activeJobs} active</span>
                </div>
             </div>
             <span className="text-xs text-gray-400">{process.createdAt}</span>
          </div>
        </div>
      )})}
    </div>
  )
}

export default ProcessCards