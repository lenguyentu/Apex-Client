import { PROCESS_STATUS_OPTIONS, getStatusColor, formatStatusText, canTransitionStatus, type ProcessStatus } from '../../../constants/processStatus'

interface ProcessStatusSelectProps {
  candidateId: string
  currentStatus: ProcessStatus
  onStatusChange: (newStatus: ProcessStatus) => void
  disabled?: boolean
}

const ProcessStatusSelect: React.FC<ProcessStatusSelectProps> = ({
  candidateId: _candidateId,
  currentStatus,
  onStatusChange,
  disabled = false
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as ProcessStatus
    onStatusChange(newStatus)
  }

  const statusColor = getStatusColor(currentStatus)

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={disabled}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all
          ${statusColor}
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          cursor-pointer shadow-sm hover:shadow-md
          ${disabled ? '' : 'hover:border-blue-300'}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {PROCESS_STATUS_OPTIONS.map((status) => {
          const isAllowed = canTransitionStatus(currentStatus, status)
          return (
            <option key={status} value={status} disabled={!isAllowed} className="text-sm py-2">
              {formatStatusText(status)} {!isAllowed ? ' (không thể quay lại)' : ''}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default ProcessStatusSelect

