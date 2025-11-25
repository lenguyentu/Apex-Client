import { useState } from 'react'
import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'
import type { ProcessStage, CandidateInStage } from '../../../store/useInterviewProcessStore'
import { mockCandidates } from '../../candidates/mockData'

// Định nghĩa màu sắc và icon cho từng stage type
const getStageStyle = (stageName: string) => {
  const name = stageName.toLowerCase()
  
  if (name.includes('screening') || name.includes('cv') || name.includes('new')) {
    return {
      borderColor: 'border-t-blue-500',
      bgColor: 'bg-blue-50/30',
      headerBg: 'bg-blue-500',
      textColor: 'text-blue-700',
      badgeColor: 'bg-blue-100 text-blue-700'
    }
  }
  if (name.includes('test') || name.includes('technical')) {
    return {
      borderColor: 'border-t-purple-500',
      bgColor: 'bg-purple-50/30',
      headerBg: 'bg-purple-500',
      textColor: 'text-purple-700',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
  }
  if (name.includes('interview') || name.includes('phỏng vấn')) {
    if (name.includes('1') || name.includes('first')) {
      return {
        borderColor: 'border-t-orange-500',
        bgColor: 'bg-orange-50/30',
        headerBg: 'bg-orange-500',
        textColor: 'text-orange-700',
        badgeColor: 'bg-orange-100 text-orange-700'
      }
    }
    return {
      borderColor: 'border-t-amber-500',
      bgColor: 'bg-amber-50/30',
      headerBg: 'bg-amber-500',
      textColor: 'text-amber-700',
      badgeColor: 'bg-amber-100 text-amber-700'
    }
  }
  if (name.includes('final') || name.includes('decision') || name.includes('offer') || name.includes('complete')) {
    return {
      borderColor: 'border-t-green-500',
      bgColor: 'bg-green-50/30',
      headerBg: 'bg-green-500',
      textColor: 'text-green-700',
      badgeColor: 'bg-green-100 text-green-700'
    }
  }
  if (name.includes('reject') || name.includes('từ chối')) {
    return {
      borderColor: 'border-t-red-500',
      bgColor: 'bg-red-50/30',
      headerBg: 'bg-red-500',
      textColor: 'text-red-700',
      badgeColor: 'bg-red-100 text-red-700'
    }
  }
  
  // Default
  return {
    borderColor: 'border-t-gray-400',
    bgColor: 'bg-gray-50/30',
    headerBg: 'bg-gray-500',
    textColor: 'text-gray-700',
    badgeColor: 'bg-gray-100 text-gray-700'
  }
}

interface KanbanBoardProps {
  processId: string
  stages: ProcessStage[]
}

const KanbanBoard = ({ processId, stages }: KanbanBoardProps) => {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null)

  const addCandidateToStage = useInterviewProcessStore((state) => state.addCandidateToStage)
  const moveCandidate = useInterviewProcessStore((state) => state.moveCandidate)
  const removeCandidateFromStage = useInterviewProcessStore((state) => state.removeCandidateFromStage)
  const updateCandidateNote = useInterviewProcessStore((state) => state.updateCandidateNote)

  // Lấy danh sách ứng viên đã có trong các stages
  const getCandidatesInStages = (): string[] => {
    return stages.flatMap(stage => stage.candidates.map(c => c.id))
  }

  // Xử lý thêm ứng viên
  const handleAddCandidate = (stageId: string, candidateId: string) => {
    const candidate = mockCandidates.find(c => c.id === candidateId)
    if (!candidate) return

    const candidateInStage: CandidateInStage = {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.applied_position,
      cv_link: candidate.cv_link,
      location: candidate.location,
      address: candidate.address,
      note: ''
    }

    addCandidateToStage(processId, stageId, candidateInStage)
  }

  // --- Xử lý Drag & Drop ---
  const handleDragStart = (e: React.DragEvent, candidate: CandidateInStage, stageId: string) => {
    setDraggingId(candidate.id)
    e.dataTransfer.setData('candidateId', candidate.id)
    e.dataTransfer.setData('fromStageId', stageId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    if (dragOverStageId !== stageId) {
      setDragOverStageId(stageId)
    }
  }

  const handleDragLeave = () => {
    setDragOverStageId(null)
  }

  const handleDrop = (e: React.DragEvent, toStageId: string) => {
    e.preventDefault()
    setDraggingId(null)
    setDragOverStageId(null)
    
    const candidateId = e.dataTransfer.getData('candidateId')
    const fromStageId = e.dataTransfer.getData('fromStageId')

    if (fromStageId && fromStageId !== toStageId) {
      moveCandidate(processId, fromStageId, toStageId, candidateId)
    }
  }

  const candidatesInStages = getCandidatesInStages()
  const availableCandidates = mockCandidates.filter(c => !candidatesInStages.includes(c.id))

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar Filter */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
           <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Board View</span>
           <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">
             {stages.reduce((sum, stage) => sum + stage.candidates.length, 0)} Candidates
           </span>
        </div>
        
      </div>

      {/* Main Board Area */}
      <div className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[500px]">
        {[...stages].sort((a, b) => a.order - b.order).map((stage) => {
          const stageStyle = getStageStyle(stage.name)
          const isOver = dragOverStageId === stage.id

          return (
            <div
              key={stage.id}
              className={`
                shrink-0 w-80 flex flex-col rounded-xl 
                border-t-4 ${stageStyle.borderColor}
                ${stageStyle.bgColor}
                transition-all duration-200
                ${isOver ? 'ring-2 ring-blue-400 ring-inset shadow-lg' : 'shadow-sm'}
              `}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Column Header */}
              <div className={`p-4 ${stageStyle.headerBg} rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">{stage.name}</h4>
                    <span className={`${stageStyle.badgeColor} px-2 py-0.5 rounded-full text-xs font-bold`}>
                      {stage.candidates.length}
                    </span>
                  </div>
                  <button className="p-1.5 hover:bg-white/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Drop Zone Area */}
              <div className="flex-1 px-3 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                <div className="space-y-3 min-h-[100px]">
                  {stage.candidates.map((candidate) => {
                    const isDragging = draggingId === candidate.id;
                    return (
                      <div
                        key={candidate.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, candidate, stage.id)}
                        className={`
                          group relative bg-white p-4 rounded-lg border border-gray-200 shadow-sm 
                          cursor-grab active:cursor-grabbing
                          hover:shadow-md hover:border-gray-300 transition-all duration-200
                          ${isDragging ? 'opacity-50 scale-95 rotate-1' : ''}
                        `}
                      >
                        {/* Status Badge */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`h-1.5 w-12 rounded-full ${stageStyle.borderColor.replace('border-t-', 'bg-')}`}></span>
                            <span className={`text-[10px] ${stageStyle.textColor} uppercase font-bold tracking-wider`}>New</span>
                        </div>

                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <h5 className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors truncate">
                              {candidate.name}
                            </h5>
                          </div>
                          <button
                            onClick={() => removeCandidateFromStage(processId, stage.id, candidate.id)}
                            className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-3 font-medium line-clamp-2">
                          {candidate.position || 'Chưa có vị trí'}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                           <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="truncate max-w-[120px]">{candidate.location || candidate.address || 'Chưa có địa chỉ'}</span>
                           </div>
                           <a
                             href={candidate.cv_link}
                             target="_blank"
                             rel="noopener noreferrer"
                             className={`text-xs ${stageStyle.textColor} hover:underline font-semibold px-2 py-1 rounded-md ${stageStyle.badgeColor} transition-colors`}
                             onClick={(e) => e.stopPropagation()}
                           >
                             CV
                           </a>
                        </div>

                        <div className="mt-3">
                          <textarea
                            value={candidate.note ?? ''}
                            onChange={(e) => updateCandidateNote(processId, stage.id, candidate.id, e.target.value)}
                            rows={2}
                            placeholder="Thêm ghi chú đánh giá..."
                            className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-colors"
                          />
                        </div>
                      </div>
                    )
                  })}
                  
                  {/* Dropdown chọn ứng viên luôn hiển thị ở dưới cùng */}
                  {availableCandidates.length > 0 && (
                    <div className="mt-2 p-3 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAddCandidate(stage.id, e.target.value)
                            e.target.value = ''
                          }
                        }}
                        className="w-full text-sm border-none focus:ring-0 bg-transparent text-gray-600 font-medium cursor-pointer outline-none"
                      >
                        <option value="">+ Chọn ứng viên...</option>
                        {availableCandidates.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} {c.applied_position ? `- ${c.applied_position}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KanbanBoard
