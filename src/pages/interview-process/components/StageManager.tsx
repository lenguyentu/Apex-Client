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
      <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Pipeline Stages</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Stage
        </button>
      </div>

      <div className="p-2">
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
                flex items-center gap-3 p-3 rounded-lg group transition-all
                ${isDragging ? 'opacity-50 bg-gray-100' : 'hover:bg-gray-50'}
                ${isDragOver ? 'ring-2 ring-blue-400 ring-inset bg-blue-50' : ''}
                cursor-move
              `}
            >
              {/* Drag handle icon */}
              <div className="text-gray-300 cursor-grab active:cursor-grabbing">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </div>
              
              {/* Order Badge */}
              <div className="w-6 h-6 bg-gray-900 text-white rounded-md flex items-center justify-center text-xs font-bold shrink-0">
                {stage.order}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-700 text-sm">{stage.name}</p>
                <p className="text-xs text-gray-500 truncate">{stage.description || 'No description'}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                  {stage.candidates.length} candidates
                </span>
                <button 
                  onClick={() => deleteStage(processId, stage.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}

        {/* Form thêm nhanh */}
        {isAdding && (
          <form onSubmit={handleAdd} className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100 animate-in slide-in-from-top-2">
             <div className="flex gap-2">
                <input 
                  autoFocus
                  placeholder="Enter stage name..."
                  value={newStageName}
                  onChange={(e) => setNewStageName(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700">Save</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-md hover:bg-gray-50">Cancel</button>
             </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default StageManager
