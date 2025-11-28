import { useEffect, useMemo, useState } from 'react'
import ProcessStatusSelect from './ProcessStatusSelect'
import type { CandidateInStage } from '../../../store/useInterviewProcessStore'
import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'
import type { ProcessStatus } from '../../../constants/processStatus'
import { formatStatusText, REJECT_STATUSES } from '../../../constants/processStatus'

interface CandidateEvaluationModalProps {
  isOpen: boolean
  processId: string
  stageId: string
  stageName: string
  candidate: CandidateInStage | null
  initialMode?: 'fail'
  initialStatus?: ProcessStatus
  onClose: () => void
}

const CandidateEvaluationModal = ({
  isOpen,
  processId,
  stageId,
  stageName,
  candidate,
  initialMode,
  initialStatus,
  onClose
}: CandidateEvaluationModalProps) => {
  const updateCandidateStatus = useInterviewProcessStore((state) => state.updateCandidateStatus)
  const updateCandidateNote = useInterviewProcessStore((state) => state.updateCandidateNote)
  const saveCandidateEvaluation = useInterviewProcessStore((state) => state.saveCandidateEvaluation)
  const markCandidateAsFailed = useInterviewProcessStore((state) => state.markCandidateAsFailed)
  const unmarkCandidateAsFailed = useInterviewProcessStore((state) => state.unmarkCandidateAsFailed)

  const [status, setStatus] = useState<ProcessStatus>('CV_SUBMITTED_TO_CLIENT')
  const [note, setNote] = useState('')
  const [failReason, setFailReason] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen && candidate) {
      // Ưu tiên initialStatus từ props (khi mở từ việc thay đổi status)
      // Nếu không có, dùng initialMode hoặc status hiện tại của candidate
      const statusToSet = initialStatus 
        ? initialStatus 
        : (initialMode === 'fail' ? 'REJECTED_BY_CLIENT' : (candidate.process_status || 'CV_SUBMITTED_TO_CLIENT'))
      setStatus(statusToSet)
      setNote(candidate.note ?? '')
      setFailReason(candidate.reject_reason ?? '')
      setError(null)
    }
  }, [isOpen, candidate, initialMode, initialStatus])

  const isFailStatus = useMemo(() => REJECT_STATUSES.includes(status), [status])

  if (!isOpen || !candidate) return null

  const handleStatusChange = (newStatus: ProcessStatus) => {
    setStatus(newStatus)
    if (!REJECT_STATUSES.includes(newStatus)) {
      setError(null)
    }
  }

  const handleSave = () => {
    if (!candidate) return

    const trimmedReason = failReason.trim()
    const trimmedNote = note.trim()

    if (isFailStatus && !trimmedReason) {
      setError('Vui lòng nhập lý do khi đánh fail.')
      return
    }

    setIsSaving(true)

    try {
      if (isFailStatus) {
        markCandidateAsFailed(processId, stageId, candidate.id, trimmedReason)
      } else {
        if (candidate.is_failed) {
          unmarkCandidateAsFailed(processId, stageId, candidate.id)
        }
        if (status !== (candidate.process_status || 'CV_SUBMITTED_TO_CLIENT')) {
          updateCandidateStatus(processId, stageId, candidate.id, status)
        }
      }

      if ((candidate.note ?? '') !== trimmedNote) {
        updateCandidateNote(processId, stageId, candidate.id, trimmedNote)
      }

      if (trimmedNote && (candidate.note ?? '') !== trimmedNote) {
        saveCandidateEvaluation(processId, stageId, candidate.id, trimmedNote)
      }

      setError(null)
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Đánh giá ứng viên</p>
            <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-500">{candidate.email} · {candidate.phone}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Đóng modal đánh giá"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-xl space-y-2">
              <p className="text-xs uppercase text-gray-400">Vòng hiện tại</p>
              <p className="text-sm font-semibold text-gray-900">{stageName}</p>
              <p className="text-xs text-gray-500">{candidate.position || 'Chưa có vị trí'}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl space-y-2">
              <p className="text-xs uppercase text-gray-400">Trạng thái hiện tại</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatStatusText(candidate.process_status || 'CV_SUBMITTED_TO_CLIENT')}
              </p>
              {candidate.is_failed && candidate.reject_reason && (
                <p className="text-xs text-red-600">Lý do fail: {candidate.reject_reason}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Trạng thái mới
            </label>
            <ProcessStatusSelect
              candidateId={candidate.id}
              currentStatus={status}
              onStatusChange={handleStatusChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Nhận xét / đánh giá <span className="text-gray-400 font-normal">(tùy chọn)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Nhập nhận xét, đánh giá chi tiết cho ứng viên (không bắt buộc)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {isFailStatus && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-red-600">
                Lý do fail (bắt buộc)
              </label>
              <textarea
                value={failReason}
                onChange={(e) => {
                  setFailReason(e.target.value)
                  if (e.target.value.trim()) setError(null)
                }}
                rows={3}
                placeholder="Ví dụ: Không đạt yêu cầu kỹ thuật, không phù hợp văn hóa..."
                className="w-full px-3 py-2 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-red-50"
              />
            </div>
          )}

          {error && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-gray-500">
            Bạn có thể cập nhật trạng thái và thêm đánh giá (tùy chọn). Thao tác này sẽ lưu lịch sử vào timeline của ứng viên.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors text-sm font-semibold"
              disabled={isSaving}
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || (isFailStatus && !failReason.trim())}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isFailStatus ? 'Lưu & đánh fail' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateEvaluationModal

