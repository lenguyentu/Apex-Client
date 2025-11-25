import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'
import StageManager from './StageManager'
import KanbanBoard from './KanbanBoard'

const ProcessDetail = () => {
  const selectedProcess = useInterviewProcessStore((state) => state.selectedProcess)
  const selectProcess = useInterviewProcessStore((state) => state.selectProcess)

  if (!selectedProcess) return null

  return (
    <div className="flex flex-col h-full space-y-4 animate-in slide-in-from-right-4 duration-300">
      
      {/* HEADER MỚI: Back button bên trái + Thông tin quy trình */}
      <div className="flex items-center gap-4 pb-2 border-b border-gray-200 sticky top-0 bg-gray-50/95 backdrop-blur z-20 pt-2">
        
        {/* Nút Back được style lại giống nút điều hướng */}
        <button
          onClick={() => selectProcess('')}
          className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 transition-all text-gray-500 hover:text-gray-800"
          title="Quay lại danh sách"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedProcess.name}</h2>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                Active
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5 truncate max-w-2xl">
            {selectedProcess.description || 'Quản lý quy trình tuyển dụng và theo dõi ứng viên.'}
          </p>
        </div>

        {/* Có thể thêm các nút Settings phụ ở góc phải nếu cần */}
        <button className="p-2 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="space-y-6 pb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <StageManager processId={selectedProcess.id} stages={selectedProcess.stages} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 min-h-[500px]">
          <KanbanBoard processId={selectedProcess.id} stages={selectedProcess.stages} />
        </div>
      </div>
    </div>
  )
}

export default ProcessDetail