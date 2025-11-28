import { useState, useEffect, useRef } from 'react'
import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'
import type { ProcessStage, CandidateInStage } from '../../../store/useInterviewProcessStore'
import ProcessStatusSelect from './ProcessStatusSelect'
import type { ProcessStatus } from '../../../constants/processStatus'
import { REJECT_STATUSES } from '../../../constants/processStatus'
import { useFullscreenStore } from '../../../store/useFullscreenStore'
import CandidateHistoryModal from './CandidateHistoryModal'
import CandidateEvaluationModal from './CandidateEvaluationModal'

// Định nghĩa màu sắc - Tất cả đều màu nhẹ, đồng nhất
const getStageStyle = () => {
  return {
    borderColor: 'border-b-gray-200',
    bgColor: 'bg-gray-50/20',
    headerBg: 'bg-gray-100',
    textColor: 'text-gray-700',
    badgeColor: 'bg-white text-gray-700'
  }
}

type ViewMode = 'board' | 'list'

interface KanbanBoardProps {
  processId: string
  stages: ProcessStage[]
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const KanbanBoard = ({ processId, stages, viewMode, setViewMode }: KanbanBoardProps) => {
  const [compactMode, setCompactMode] = useState<Record<string, boolean>>({})
  const [expandedCandidates, setExpandedCandidates] = useState<Record<string, boolean>>({})
  const [evaluationModal, setEvaluationModal] = useState<{
    isOpen: boolean
    candidate: CandidateInStage | null
    stageId: string
    stageName: string
    newStatus?: ProcessStatus
    mode?: 'fail'
  }>({
    isOpen: false,
    candidate: null,
    stageId: '',
    stageName: ''
  })
  const [historyCandidateId, setHistoryCandidateId] = useState<string | null>(null)
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const boardRef = useRef<HTMLDivElement>(null)

  const unmarkCandidateAsFailed = useInterviewProcessStore((state) => state.unmarkCandidateAsFailed)

  // Fullscreen store
  const { isFullscreen, zoomLevel, toggleFullscreen, setZoomLevel } = useFullscreenStore()

  // Filter stages: chỉ hiển thị những stage có candidates
  const visibleStages = stages.filter(stage => stage.candidates.length > 0)

  // Filter candidates trong mỗi stage theo search query và sắp xếp: failed ở cuối
  const getFilteredCandidates = (_stageId: string, candidates: CandidateInStage[]) => {
    // Sắp xếp: failed candidates ở cuối (đảm bảo is_failed được check đúng)
    // Tạo bản sao mới để đảm bảo React nhận biết thay đổi
    const sorted = [...candidates].sort((a, b) => {
      const aFailed = Boolean(a.is_failed)
      const bFailed = Boolean(b.is_failed)
      
      if (aFailed && !bFailed) return 1  // a failed, b không → a xuống cuối
      if (!aFailed && bFailed) return -1 // a không, b failed → a lên trước
      return 0 // Cùng trạng thái, giữ nguyên thứ tự
    })
    
    return sorted
  }

  const openEvaluationModal = (stageId: string, stageName: string, candidate: CandidateInStage, mode?: 'fail', newStatus?: ProcessStatus) => {
    setEvaluationModal({
      isOpen: true,
      stageId,
      stageName,
      candidate,
      mode,
      newStatus
    })
  }

  const closeEvaluationModal = () => {
    setEvaluationModal({
      isOpen: false,
      stageId: '',
      stageName: '',
      candidate: null,
      newStatus: undefined
    })
  }

  // Toggle compact mode cho stage
  const toggleCompactMode = (stageId: string) => {
    setCompactMode(prev => ({ ...prev, [stageId]: !prev[stageId] }))
  }

  // Toggle expand candidate để xem chi tiết
  const toggleExpandCandidate = (candidateId: string) => {
    setExpandedCandidates(prev => ({ ...prev, [candidateId]: !prev[candidateId] }))
  }

  // Handle keyboard shortcuts (Ctrl + - để zoom out)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return

      // ESC để thoát fullscreen
      if (e.key === 'Escape') {
        e.preventDefault()
        toggleFullscreen()
        return
      }

      // Ctrl + - (hoặc Ctrl + _) để zoom out
      if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
        e.preventDefault()
        setZoomLevel(zoomLevel - 10) // Zoom out 10%, tối thiểu 50%
      }
      // Ctrl + 0 để reset zoom
      else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault()
        setZoomLevel(100)
      }
      // Ctrl + + để zoom in
      else if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault()
        setZoomLevel(zoomLevel + 10) // Zoom in 10%, tối đa 150%
      }
    }

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isFullscreen, zoomLevel, toggleFullscreen, setZoomLevel])

  const handleStatusUpdate = (stage: ProcessStage, candidate: CandidateInStage, newStatus: ProcessStatus) => {
    const currentStatus = candidate.process_status || 'CV_SUBMITTED_TO_CLIENT'
    
    // Chỉ mở modal khi status thực sự thay đổi
    if (newStatus !== currentStatus) {
      // Mở modal đánh giá với stage hiện tại và status mới
      openEvaluationModal(
        stage.id, 
        stage.name, 
        candidate, 
        REJECT_STATUSES.includes(newStatus) ? 'fail' : undefined,
        newStatus
      )
    }
  }


  const historyModalCandidate = historyCandidateId
    ? (() => {
        for (const stageItem of stages) {
          const found = stageItem.candidates.find(c => c.id === historyCandidateId)
          if (found) {
            return found
          }
        }
        return null
      })()
    : null

  return (
    <div 
      className="h-full flex flex-col bg-white"
      style={isFullscreen ? {
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: 'top left',
        width: `${100 / (zoomLevel / 100)}%`,
        height: `${100 / (zoomLevel / 100)}%`
      } : { height: '100%', maxHeight: '100%' }}
    >
      {/* Toolbar Filter */}
      <div className="flex items-center justify-between mb-6 px-6 pt-6">
        <div className="flex items-center gap-3">
           <span className="text-sm font-bold text-gray-900">Board View</span>
           <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200">
             {visibleStages.reduce((sum, stage) => sum + stage.candidates.length, 0)} Candidates
           </span>
           {visibleStages.length < stages.length && (
             <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200">
               {stages.length - visibleStages.length} stages ẩn
             </span>
           )}
        </div>
        
        {/* View Toggle */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setViewMode('board')}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${viewMode === 'board' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <span>Board</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${viewMode === 'list' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>List</span>
            </div>
          </button>
        </div>
      </div>

      {/* Zoom indicator (chỉ hiển thị khi fullscreen) */}
      {isFullscreen && zoomLevel !== 100 && (
        <div className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-black/80 text-white text-xs rounded-lg flex items-center gap-2">
          <span>Zoom: {zoomLevel}%</span>
          <span className="text-gray-400">(Ctrl + - / +)</span>
        </div>
      )}

      {/* Main Board Area */}
      <div 
        ref={boardRef}
        className="flex gap-6 overflow-x-hidden pb-6 px-6 flex-1 min-h-0 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => {
          if (boardRef.current && e.button === 0) {
            setIsDragging(true)
            setStartX(e.pageX - boardRef.current.offsetLeft)
            setScrollLeft(boardRef.current.scrollLeft)
          }
        }}
        onMouseLeave={() => setIsDragging(false)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (!isDragging || !boardRef.current) return
          e.preventDefault()
          const x = e.pageX - boardRef.current.offsetLeft
          const walk = (x - startX) * 2 // Scroll speed multiplier
          boardRef.current.scrollLeft = scrollLeft - walk
        }}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {visibleStages.length === 0 ? (
          <div className="w-full flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">Chưa có ứng viên nào trong quy trình</p>
              <p className="text-gray-400 text-xs">Thêm ứng viên vào các stage để bắt đầu</p>
            </div>
          </div>
        ) : (
          visibleStages.sort((a, b) => a.order - b.order).map((stage) => {
          const stageStyle = getStageStyle()
          // Key bao gồm số lượng failed để force re-render khi có thay đổi
          const failedCount = stage.candidates.filter(c => c.is_failed === true).length

          return (
            <div
              key={`${stage.id}-${failedCount}`}
              className={`
                shrink-0 flex flex-col rounded-lg 
                bg-white
                transition-all duration-300
                shadow-sm hover:shadow-md
                border border-gray-100
                h-fit
              `}
              style={{ width: 'min(280px, calc((100vw - 400px) / 5))', maxHeight: 'calc(100vh - 200px)' }}
            >
              {/* Column Header - Màu nhẹ, đồng nhất */}
              <div className={`px-3 py-2.5 ${stageStyle.headerBg} rounded-t-lg flex items-center justify-between border-b ${stageStyle.borderColor}`}>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                    {stage.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-white text-gray-700 text-[11px] font-bold">
                    {stage.candidates.length}
                  </span>
                </div>
                <button
                  onClick={() => toggleCompactMode(stage.id)}
                  className="p-1 rounded transition-colors hover:bg-gray-200"
                  title={compactMode[stage.id] ? "Chế độ chi tiết" : "Chế độ compact"}
                >
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={compactMode[stage.id] ? "M4 6h16M4 12h16M4 18h16" : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"} />
                  </svg>
                </button>
              </div>

              {/* Drop Zone Area */}
              <div className="px-2 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className={`${compactMode[stage.id] ? 'space-y-2' : 'space-y-3'}`}>
                  {getFilteredCandidates(stage.id, stage.candidates).map((candidate, index) => {
                    const isExpanded = expandedCandidates[candidate.id]
                    const isCompact = compactMode[stage.id]
                    // Key bao gồm is_failed để force re-render khi status thay đổi
                    return (
                      <div
                        key={`${candidate.id}-${candidate.is_failed ? 'failed' : 'active'}-${index}`}
                        className={`
                          group relative rounded-lg border 
                          transition-all duration-300
                          ${candidate.is_failed 
                            ? 'bg-red-50/20 border-red-100 opacity-70' 
                            : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5'
                          }
                          ${candidate.is_failed ? 'p-2' : isCompact ? 'p-2.5' : 'p-4'}
                          shadow-sm
                        `}
                      >
                        {candidate.is_failed ? (
                          /* Failed Mode - Card nhỏ gọn, màu đỏ nhẹ, hiển thị lý do fail */
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                              <svg className="w-2.5 h-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-[9px] font-medium text-red-700 truncate line-through">{candidate.name}</h5>
                              <p className="text-[8px] text-red-500 truncate leading-tight">{candidate.reject_reason || 'Đã bị từ chối'}</p>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setHistoryCandidateId(candidate.id)
                                }}
                                className="p-0.5 hover:bg-red-50 rounded transition-colors"
                                title="Xem lịch sử đánh giá"
                              >
                                <svg className="w-2.5 h-2.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 1m6-1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  unmarkCandidateAsFailed(processId, stage.id, candidate.id)
                                }}
                                className="p-0.5 hover:bg-red-50 rounded transition-colors"
                                title="Khôi phục"
                              >
                                <svg className="w-2.5 h-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : isCompact ? (
                          /* Compact Mode - Đơn giản */
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-gray-900 truncate mb-0.5">{candidate.name}</h5>
                              <p className="text-[10px] text-gray-600 truncate">{candidate.position || 'Chưa có vị trí'}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleExpandCandidate(candidate.id)
                              }}
                              className="p-1 hover:bg-gray-100 rounded transition-all shrink-0"
                              title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
                            >
                              <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          /* Full Mode - Đơn giản, sạch sẽ */
                          <div className="relative">
                            {/* Title với nút Fail và Lịch sử */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors flex-1">
                                {candidate.name}
                              </h5>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openEvaluationModal(stage.id, stage.name, candidate, 'fail')
                                  }}
                                  className="px-2 py-1 text-[10px] rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-100 font-medium"
                                  title="Đánh fail"
                                >
                                  Fail
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setHistoryCandidateId(candidate.id)
                                  }}
                                  className="px-2 py-1 text-[10px] rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all border border-gray-200 font-medium"
                                  title="Xem lịch sử"
                                >
                                  Lịch sử
                                </button>
                              </div>
                            </div>

                            {/* Position */}
                            <p className="text-xs text-gray-600 mb-3">{candidate.position || 'Chưa có vị trí'}</p>

                            {/* Status Select */}
                            <div className="mb-3">
                              <ProcessStatusSelect
                                candidateId={candidate.id}
                                currentStatus={candidate.process_status || 'CV_SUBMITTED_TO_CLIENT'}
                                onStatusChange={(newStatus) => handleStatusUpdate(stage, candidate, newStatus)}
                              />
                            </div>

                            {/* Footer - Location & CV */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="truncate max-w-[120px]">{candidate.location || candidate.address || 'N/A'}</span>
                              </div>
                              <a
                                href={candidate.cv_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline font-medium transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                CV
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Expanded view trong compact mode */}
                        {isCompact && isExpanded && !candidate.is_failed && (
                          <div className="mt-3 pt-3 border-t border-gray-100 space-y-3 bg-gray-50/30 -mx-2.5 px-2.5 pb-2.5 rounded-b-lg">
                            <div>
                              <ProcessStatusSelect
                                candidateId={candidate.id}
                                currentStatus={candidate.process_status || 'CV_SUBMITTED_TO_CLIENT'}
                                onStatusChange={(newStatus) => handleStatusUpdate(stage, candidate, newStatus)}
                              />
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{candidate.location || candidate.address || 'N/A'}</span>
                              </div>
                              <a 
                                href={candidate.cv_link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline font-medium transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                CV
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  
                  {/* Dropdown chọn ứng viên luôn hiển thị ở dưới cùng */}
                  {/* {availableCandidates.length > 0 && (
                    <div className="mt-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:shadow-sm transition-all">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAddCandidate(stage.id, e.target.value)
                            e.target.value = ''
                          }
                        }}
                        className="w-full text-sm border-none focus:ring-0 bg-transparent text-gray-700 font-semibold cursor-pointer outline-none"
                      >
                        <option value="">+ Chọn ứng viên...</option>
                        {availableCandidates.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} {c.applied_position ? `- ${c.applied_position}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          )
        }))}
      </div>

      <CandidateEvaluationModal
        isOpen={evaluationModal.isOpen}
        processId={processId}
        stageId={evaluationModal.stageId}
        stageName={evaluationModal.stageName}
        candidate={evaluationModal.candidate}
        initialMode={evaluationModal.mode}
        initialStatus={evaluationModal.newStatus}
        onClose={closeEvaluationModal}
      />

      {historyModalCandidate && historyCandidateId && (
        <CandidateHistoryModal
          isOpen={Boolean(historyCandidateId)}
          onClose={() => setHistoryCandidateId(null)}
          candidate={historyModalCandidate}
        />
      )}
    </div>
  )
}

export default KanbanBoard
