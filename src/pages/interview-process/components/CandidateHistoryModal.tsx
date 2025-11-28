import type { CandidateInStage, CandidateHistoryEntry } from '../../../store/useInterviewProcessStore'
import { formatStatusText, getStatusColor } from '../../../constants/processStatus'

interface CandidateHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  candidate: CandidateInStage
}

const CandidateHistoryModal = ({ isOpen, onClose, candidate }: CandidateHistoryModalProps) => {
  if (!isOpen || !candidate) return null

  const entries = [...(candidate.history ?? [])].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const renderBadge = (type: CandidateHistoryEntry['type']) => {
    switch (type) {
      case 'STATUS':
        return 'bg-blue-100 text-blue-700'
      case 'FAIL':
        return 'bg-red-100 text-red-700'
      case 'NOTE':
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Process History</p>
            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close history modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-3 overflow-y-auto max-h-[65vh]">
          {entries.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-10">
              Chưa có lịch sử đánh giá nào cho ứng viên này.
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="p-4 border border-gray-100 rounded-xl shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{new Date(entry.timestamp).toLocaleString('vi-VN')}</span>
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${renderBadge(entry.type)}`}>
                    {entry.type === 'STATUS' && 'Cập nhật vòng'}
                    {entry.type === 'NOTE' && 'Đánh giá'}
                    {entry.type === 'FAIL' && 'Đánh fail'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  Vòng: {entry.stageName}
                </div>
                {entry.type === 'STATUS' && entry.status && (
                  <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(entry.status)}`}>
                    {formatStatusText(entry.status)}
                  </div>
                )}
                {entry.note && (
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{entry.note}</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default CandidateHistoryModal

