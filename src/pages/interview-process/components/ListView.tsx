import React, { useState, useMemo, useEffect } from 'react'
import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'
import type { ProcessStage, CandidateInStage } from '../../../store/useInterviewProcessStore'
import ProcessStatusSelect from './ProcessStatusSelect'
import type { ProcessStatus } from '../../../constants/processStatus'
import { formatStatusText, REJECT_STATUSES } from '../../../constants/processStatus'
import { useFullscreenStore } from '../../../store/useFullscreenStore'
import CandidateHistoryModal from './CandidateHistoryModal'
import CandidateEvaluationModal from './CandidateEvaluationModal'

type ViewMode = 'board' | 'list'

// Định nghĩa màu sắc và icon cho từng stage type - Màu sắc đa dạng như ClickUp
const getStageStyle = (stageName: string) => {
  const name = stageName.toLowerCase()
  
  // Màu sắc đa dạng, dễ nhìn như ClickUp
  if (name.includes('screening') || name.includes('cv') || name.includes('nhận cv') || name.includes('backlog')) {
    return {
      borderColor: 'border-t-gray-300',
      bgColor: 'bg-gray-50/20',
      headerBg: 'bg-gray-200',
      textColor: 'text-gray-800',
      badgeColor: 'bg-white/30 text-gray-800'
    }
  }
  if (name.includes('test') || name.includes('technical') || name.includes('testing')) {
    return {
      borderColor: 'border-t-amber-400',
      bgColor: 'bg-amber-50/20',
      headerBg: 'bg-amber-500',
      textColor: 'text-amber-900',
      badgeColor: 'bg-white/30 text-amber-900'
    }
  }
  if (name.includes('interview') || name.includes('phỏng vấn') || name.includes('pv') || name.includes('vòng 1')) {
    return {
      borderColor: 'border-t-purple-400',
      bgColor: 'bg-purple-50/20',
      headerBg: 'bg-purple-500',
      textColor: 'text-purple-900',
      badgeColor: 'bg-white/30 text-purple-900'
    }
  }
  if (name.includes('vòng 2') || name.includes('second')) {
    return {
      borderColor: 'border-t-fuchsia-400',
      bgColor: 'bg-fuchsia-50/20',
      headerBg: 'bg-fuchsia-500',
      textColor: 'text-fuchsia-900',
      badgeColor: 'bg-white/30 text-fuchsia-900'
    }
  }
  if (name.includes('review') || name.includes('xem xét')) {
    return {
      borderColor: 'border-t-pink-400',
      bgColor: 'bg-pink-50/20',
      headerBg: 'bg-pink-500',
      textColor: 'text-pink-900',
      badgeColor: 'bg-white/30 text-pink-900'
    }
  }
  if (name.includes('offer') || name.includes('đưa offer') || name.includes('nhận offer')) {
    return {
      borderColor: 'border-t-blue-400',
      bgColor: 'bg-blue-50/20',
      headerBg: 'bg-blue-500',
      textColor: 'text-blue-900',
      badgeColor: 'bg-white/30 text-blue-900'
    }
  }
  if (name.includes('placement') || name.includes('onboarding') || name.includes('shipped') || name.includes('complete')) {
    return {
      borderColor: 'border-t-teal-400',
      bgColor: 'bg-teal-50/20',
      headerBg: 'bg-teal-500',
      textColor: 'text-teal-900',
      badgeColor: 'bg-white/30 text-teal-900'
    }
  }
  if (name.includes('bảo hành') || name.includes('guarantee')) {
    return {
      borderColor: 'border-t-green-400',
      bgColor: 'bg-green-50/20',
      headerBg: 'bg-green-500',
      textColor: 'text-green-900',
      badgeColor: 'bg-white/30 text-green-900'
    }
  }
  if (name.includes('reject') || name.includes('từ chối') || name.includes('cancelled') || name.includes('hủy')) {
    return {
      borderColor: 'border-t-red-400',
      bgColor: 'bg-red-50/20',
      headerBg: 'bg-red-500',
      textColor: 'text-red-900',
      badgeColor: 'bg-white/30 text-red-900'
    }
  }
  
  // Default - màu xanh lá cho các stage khác
  return {
    borderColor: 'border-t-emerald-400',
    bgColor: 'bg-emerald-50/20',
    headerBg: 'bg-emerald-500',
    textColor: 'text-emerald-900',
    badgeColor: 'bg-white/30 text-emerald-900'
  }
}

interface ListViewProps {
  processId: string
  stages: ProcessStage[]
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ListView = ({ processId, stages, viewMode, setViewMode }: ListViewProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [collapsedStages, setCollapsedStages] = useState<Set<string>>(new Set())
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

  const unmarkCandidateAsFailed = useInterviewProcessStore((state) => state.unmarkCandidateAsFailed)

  const { isFullscreen, zoomLevel, toggleFullscreen, setZoomLevel } = useFullscreenStore()

  // Filter stages: chỉ hiển thị những stage có candidates
  const visibleStages = useMemo(() => {
    return stages
      .filter(stage => stage.candidates.length > 0)
      .sort((a, b) => a.order - b.order)
  }, [stages])

  // Filter candidates trong mỗi stage theo search query
  const getFilteredCandidatesForStage = (stage: ProcessStage) => {
    if (!searchQuery.trim()) return stage.candidates
    
    const query = searchQuery.toLowerCase()
    return stage.candidates.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.position?.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      stage.name.toLowerCase().includes(query)
    )
  }

  // Tổng số candidates sau khi filter
  const totalFilteredCandidates = useMemo(() => {
    return visibleStages.reduce((sum, stage) => sum + getFilteredCandidatesForStage(stage).length, 0)
  }, [visibleStages, searchQuery])

  // Toggle collapse/expand stage
  const toggleStageCollapse = (stageId: string) => {
    setCollapsedStages(prev => {
      const next = new Set(prev)
      if (next.has(stageId)) {
        next.delete(stageId)
      } else {
        next.add(stageId)
      }
      return next
    })
  }

  // Toggle expand row
  const toggleExpandRow = (candidateId: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(candidateId)) {
        next.delete(candidateId)
      } else {
        next.add(candidateId)
      }
      return next
    })
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

  const historyModalCandidate = historyCandidateId
    ? (() => {
        for (const stage of stages) {
          const found = stage.candidates.find(c => c.id === historyCandidateId)
          if (found) return found
        }
        return null
      })()
    : null

  const handleStatusUpdate = (stageId: string, stageName: string, candidate: CandidateInStage, newStatus: ProcessStatus) => {
    const currentStatus = candidate.process_status || 'CV_SUBMITTED_TO_CLIENT'
    
    // Chỉ mở modal khi status thực sự thay đổi
    if (newStatus !== currentStatus) {
      // Mở modal đánh giá với stage hiện tại và status mới
      openEvaluationModal(
        stageId, 
        stageName, 
        candidate, 
        REJECT_STATUSES.includes(newStatus) ? 'fail' : undefined,
        newStatus
      )
    }
  }

  // Keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isFullscreen) return

    if (e.key === 'Escape') {
      e.preventDefault()
      toggleFullscreen()
      return
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
      e.preventDefault()
      setZoomLevel(Math.max(50, zoomLevel - 10))
    } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
      e.preventDefault()
      setZoomLevel(100)
    } else if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
      e.preventDefault()
      setZoomLevel(Math.min(150, zoomLevel + 10))
    }
  }

  // useEffect cho keyboard shortcuts
  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown as any)
      return () => {
        document.removeEventListener('keydown', handleKeyDown as any)
      }
    }
  }, [isFullscreen, zoomLevel, toggleFullscreen, setZoomLevel])

  return (
    <div 
      className="h-full flex flex-col bg-white"
      style={isFullscreen ? {
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: 'top left',
        width: `${100 / (zoomLevel / 100)}%`,
        height: `${100 / (zoomLevel / 100)}%`
      } : {}}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 px-4 pt-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900">List View</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200">
            {totalFilteredCandidates} Candidates
          </span>
          {visibleStages.length < stages.length && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200">
              {stages.length - visibleStages.length} stages ẩn
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm ứng viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-72 shadow-sm"
            />
            <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
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
      </div>

      {/* Zoom indicator */}
      {isFullscreen && zoomLevel !== 100 && (
        <div className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-black/80 text-white text-xs rounded-lg flex items-center gap-2">
          <span>Zoom: {zoomLevel}%</span>
          <span className="text-gray-400">(Ctrl + - / +)</span>
        </div>
      )}

      {/* List View với sections theo Stage */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        {visibleStages.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">Chưa có ứng viên nào trong quy trình</p>
              <p className="text-gray-400 text-xs">Thêm ứng viên vào các stage để bắt đầu</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleStages.map((stage) => {
              const filteredCandidates = getFilteredCandidatesForStage(stage)
              const isCollapsed = collapsedStages.has(stage.id)

              if (filteredCandidates.length === 0 && searchQuery) return null

              const stageStyle = getStageStyle(stage.name)
              
              return (
                <div key={stage.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Stage Header - Nhỏ gọn như ClickUp */}
                  <div className={`${stageStyle.headerBg} border-b ${stageStyle.borderColor} border-b-2 px-4 py-2.5 flex items-center justify-between`}>
                    <div className="flex items-center gap-2.5 flex-1">
                      <button
                        onClick={() => toggleStageCollapse(stage.id)}
                        className={`p-1 rounded transition-colors ${stageStyle.headerBg.includes('gray') ? 'hover:bg-gray-300' : 'hover:bg-white/20'}`}
                      >
                        <svg 
                          className={`w-3.5 h-3.5 transition-transform ${isCollapsed ? '' : 'rotate-90'} ${stageStyle.headerBg.includes('gray') ? 'text-gray-700' : 'text-white'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <h3 className={`text-xs font-semibold uppercase tracking-wide ${stageStyle.headerBg.includes('gray') ? 'text-gray-800' : 'text-white'}`}>
                        {stage.name}
                      </h3>
                      <span className={`px-1.5 py-0.5 rounded ${stageStyle.headerBg.includes('gray') ? 'bg-white text-gray-800' : 'bg-white/30 text-white'} text-[10px] font-medium`}>
                        {searchQuery ? `${filteredCandidates.length}/${stage.candidates.length}` : stage.candidates.length}
                      </span>
                    </div>
                  </div>

                  {/* Stage Content - Table */}
                  {!isCollapsed && (
                    <div className="overflow-x-auto">
                      <table className="w-full table-fixed">
                        <colgroup>
                          <col className="w-[280px]" />
                          <col className="w-[220px]" />
                          <col className="w-[180px]" />
                          <col className="w-[100px]" />
                          <col className="w-[240px]" />
                          <col className="w-[120px]" />
                        </colgroup>
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Name</th>
                            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Position</th>
                            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Location</th>
                            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">CV</th>
                            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredCandidates.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-3 py-6 text-center text-gray-400">
                                <p className="text-xs">Không tìm thấy ứng viên nào trong stage này</p>
                              </td>
                            </tr>
                          ) : (
                            filteredCandidates.map((candidate) => {
                              const isExpanded = expandedRows.has(candidate.id)

                              return (
                                <React.Fragment key={candidate.id}>
                                  <tr
                                    className={`
                                      hover:bg-gray-50 transition-colors border-b border-gray-100
                                      ${candidate.is_failed ? 'opacity-70 bg-red-50/30' : ''}
                                    `}
                                  >
                                    {/* Name - To hơn */}
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1.5">
                                            <span className={`text-base font-semibold text-gray-900 ${candidate.is_failed ? 'line-through text-red-600' : ''}`}>
                                              {candidate.name}
                                            </span>
                                            {candidate.is_failed && (
                                              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-medium rounded">Failed</span>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-500 truncate mt-0.5">{candidate.email}</p>
                                        </div>
                                      </div>
                                    </td>

                                    {/* Position - To hơn */}
                                    <td className="px-4 py-3">
                                      <span className="text-sm font-medium text-gray-700 line-clamp-2">{candidate.position || 'N/A'}</span>
                                    </td>

                                    {/* Location */}
                                    <td className="px-3 py-3">
                                      <span className="text-xs text-gray-500 truncate max-w-[150px] block">
                                        {candidate.location || candidate.address || 'N/A'}
                                      </span>
                                    </td>

                                    {/* CV */}
                                    <td className="px-3 py-3">
                                      <a
                                        href={candidate.cv_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Xem CV
                                      </a>
                                    </td>

                                    {/* Status - Giữ nguyên kích thước */}
                                    <td className="px-4 py-3">
                                      <ProcessStatusSelect
                                        candidateId={candidate.id}
                                        currentStatus={candidate.process_status || 'CV_SUBMITTED_TO_CLIENT'}
                                        onStatusChange={(newStatus) => handleStatusUpdate(stage.id, stage.name, candidate, newStatus)}
                                      />
                                    </td>

                                    {/* Actions */}
                                    <td className="px-3 py-3">
                                      <div className="flex items-center gap-1.5">
                                        <button
                                          onClick={() => toggleExpandRow(candidate.id)}
                                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                          title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
                                        >
                                          <svg
                                            className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                        </button>
                                        <button
                                          onClick={() => setHistoryCandidateId(candidate.id)}
                                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                          title="Xem lịch sử"
                                        >
                                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 1m6-1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        </button>
                                        {candidate.is_failed && (
                                          <button
                                            onClick={() => unmarkCandidateAsFailed(processId, stage.id, candidate.id)}
                                            className="p-1.5 hover:bg-green-50 rounded transition-colors"
                                            title="Khôi phục"
                                          >
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>

                                  {/* Expanded row - thông tin thêm */}
                                  {isExpanded && (
                                    <tr className="bg-gray-50/30">
                                      <td colSpan={6} className="px-3 py-2.5">
                                        <div className="space-y-2">
                                          {candidate.is_failed && candidate.reject_reason && (
                                            <div className="p-2 bg-red-50 border border-red-200 rounded">
                                              <p className="text-[10px] font-medium text-red-700 mb-0.5">Lý do fail:</p>
                                              <p className="text-xs text-red-600">{candidate.reject_reason}</p>
                                            </div>
                                          )}
                                          {candidate.note && (
                                            <div className="p-2 border border-gray-200 rounded bg-white">
                                              <p className="text-[10px] font-semibold text-gray-600 mb-1">Ghi chú:</p>
                                              <p className="text-xs text-gray-800 whitespace-pre-line">{candidate.note}</p>
                                            </div>
                                          )}
                                          <div className="flex items-center justify-between text-[10px] text-gray-500">
                                            <span>Stage: {stage.name}</span>
                                            <span>Status: {formatStatusText(candidate.process_status || 'CV_SUBMITTED_TO_CLIENT')}</span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              )
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Evaluation Modal */}
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

      {/* History Modal */}
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

export default ListView

