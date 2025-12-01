import { useState } from 'react'
import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'
import StageManager from './StageManager'
import KanbanBoard from './KanbanBoard'
import ListView from './ListView'

type ViewMode = 'board' | 'list'

const ProcessDetail = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('board')
  const selectedProcess = useInterviewProcessStore((state) => state.selectedProcess)
  const selectProcess = useInterviewProcessStore((state) => state.selectProcess)

  if (!selectedProcess) return null

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] animate-in slide-in-from-right-4 duration-300">
      {/* CONTENT AREA */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full overflow-hidden">
          {/* Render view based on mode */}
          {viewMode === 'board' ? (
            <KanbanBoard processId={selectedProcess.id} stages={selectedProcess.stages} viewMode={viewMode} setViewMode={setViewMode} />
          ) : (
            <ListView processId={selectedProcess.id} stages={selectedProcess.stages} viewMode={viewMode} setViewMode={setViewMode} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProcessDetail