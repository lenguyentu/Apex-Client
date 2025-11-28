import { useState } from 'react'
import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'
import type { ProcessStage } from '../../../store/useInterviewProcessStore'

interface StageManagerProps {
  processId: string
  stages: ProcessStage[]
}

const StageManager = ({ processId, stages }: StageManagerProps) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newStageName, setNewStageName] = useState('')
  const [draggedStageId, setDraggedStageId] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const addStage = useInterviewProcessStore((state) => state.addStage)
  const deleteStage = useInterviewProcessStore((state) => state.deleteStage)
  const updateStageOrder = useInterviewProcessStore((state) => state.updateStageOrder)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStageName.trim()) return
    addStage(processId, newStageName, '')
    setNewStageName('')
    setIsAdding(false)
  }

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, stageId: string) => {
    setDraggedStageId(stageId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', stageId)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const draggedId = e.dataTransfer.getData('text/plain')
    
    if (!draggedId || draggedId === stages[dropIndex]?.id) {
      setDraggedStageId(null)
      setDragOverIndex(null)
      return
    }

    const draggedIndex = stages.findIndex(s => s.id === draggedId)
    if (draggedIndex === -1) {
      setDraggedStageId(null)
      setDragOverIndex(null)
      return
    }

    // Tạo mảng mới với thứ tự đã thay đổi
    const newStages = [...stages]
    const [draggedStage] = newStages.splice(draggedIndex, 1)
    newStages.splice(dropIndex, 0, draggedStage)

    // Cập nhật order cho tất cả stages
    const reorderedStages = newStages.map((stage, index) => ({
      ...stage,
      order: index + 1
    }))

    updateStageOrder(processId, reorderedStages)
    setDraggedStageId(null)
    setDragOverIndex(null)
  }

  const sortedStages = [...stages].sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title={isCollapsed ? "Mở rộng" : "Thu gọn"}
          >
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform ${isCollapsed ? '' : 'rotate-90'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wide">Pipeline Stages</h3>
          <span className="text-xs text-gray-500">({stages.length})</span>
        </div>
        {!isCollapsed && (
          <button 
            onClick={() => setIsAdding(true)}
            className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs font-medium transition-colors"
          >
            + Add
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-1.5 max-h-96 overflow-y-auto">
        {sortedStages.map((stage, index) => {
          const isDragging = draggedStageId === stage.id
          const isDragOver = dragOverIndex === index

          return (
            <div
              key={stage.id}
              draggable
              onDragStart={(e) => handleDragStart(e, stage.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded group transition-all
                ${isDragging ? 'opacity-50 bg-gray-100' : 'hover:bg-gray-50'}
                ${isDragOver ? 'ring-1 ring-blue-400 ring-inset bg-blue-50' : ''}
                cursor-move
              `}
            >
              {/* Drag handle icon */}
              <div className="text-gray-300 cursor-grab active:cursor-grabbing">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </div>
              
              {/* Order Badge - nhỏ hơn */}
              <div className="w-5 h-5 bg-gray-900 text-white rounded flex items-center justify-center text-[10px] font-bold shrink-0">
                {stage.order}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-700 text-xs leading-tight">{stage.name}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded font-medium">
                  {stage.candidates.length}
                </span>
                <button 
                  onClick={() => deleteStage(processId, stage.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                  title="Xóa stage"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}

          {/* Form thêm nhanh */}
          {isAdding && (
            <form onSubmit={handleAdd} className="mt-1.5 p-2 bg-blue-50 rounded border border-blue-100">
               <div className="flex gap-1.5">
                  <input 
                    autoFocus
                    placeholder="Tên stage..."
                    value={newStageName}
                    onChange={(e) => setNewStageName(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700">Lưu</button>
                  <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 bg-white text-gray-600 text-xs font-medium rounded hover:bg-gray-50">Hủy</button>
               </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default StageManager
