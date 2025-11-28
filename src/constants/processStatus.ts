// Process Status Constants - Dành cho Client (APEX)
// Client nhận CV từ Admin/Headhunter và quản lý quá trình tuyển dụng

export const PROCESS_STATUS_OPTIONS = [
  'CV_SUBMITTED_TO_CLIENT',      // Admin/Headhunter đã gửi CV cho Client (Bắt đầu)
  'INTERVIEW_SCHEDULED_1ST',      // Client lên lịch phỏng vấn vòng 1
  'INTERVIEW_COMPLETED_1ST',      // Hoàn thành phỏng vấn vòng 1
  'INTERVIEW_SCHEDULED_2ND',      // Lên lịch phỏng vấn vòng 2 (nếu cần)
  'INTERVIEW_COMPLETED_2ND',      // Hoàn thành phỏng vấn vòng 2
  'INTERVIEW_SCHEDULED_FINAL',    // Lên lịch phỏng vấn cuối cùng
  'INTERVIEW_COMPLETED_FINAL',    // Hoàn thành phỏng vấn cuối
  'TEST_ASSIGNED',                // Giao bài test cho ứng viên
  'TEST_COMPLETED',               // Ứng viên hoàn thành test
  'REFERENCE_CHECK_IN_PROGRESS', // Đang kiểm tra thông tin tham chiếu
  'REFERENCE_CHECK_COMPLETED',   // Hoàn thành kiểm tra tham chiếu
  'OFFER_EXTENDED',               // Client đưa offer cho ứng viên
  'OFFER_ACCEPTED_BY_CANDIDATE', // Ứng viên chấp nhận offer
  'OFFER_DECLINED_BY_CANDIDATE', // Ứng viên từ chối offer
  'PLACEMENT_CONFIRMED',          // Xác nhận placement
  'ONBOARDING',                   // Ứng viên đang onboarding
  'GUARANTEE_PERIOD',             // Thời gian bảo hành
  'REJECTED_BY_CLIENT',           // Client từ chối ứng viên
  'PROCESS_ON_HOLD',              // Tạm dừng process
  'PROCESS_CANCELLED'             // Hủy process
] as const

export type ProcessStatus = typeof PROCESS_STATUS_OPTIONS[number]

// Default status khi Client nhận CV từ Admin
export const CV_SUBMITTED_TO_CLIENT: ProcessStatus = 'CV_SUBMITTED_TO_CLIENT'

// Mapping status với màu sắc - Tông màu trung tính, chuyên nghiệp
export const getStatusColor = (status: ProcessStatus): string => {
  switch (status) {
    case 'CV_SUBMITTED_TO_CLIENT':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'INTERVIEW_SCHEDULED_1ST':
    case 'INTERVIEW_SCHEDULED_2ND':
    case 'INTERVIEW_SCHEDULED_FINAL':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'INTERVIEW_COMPLETED_1ST':
    case 'INTERVIEW_COMPLETED_2ND':
    case 'INTERVIEW_COMPLETED_FINAL':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'TEST_ASSIGNED':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'TEST_COMPLETED':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'REFERENCE_CHECK_IN_PROGRESS':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'REFERENCE_CHECK_COMPLETED':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'OFFER_EXTENDED':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'OFFER_ACCEPTED_BY_CANDIDATE':
    case 'PLACEMENT_CONFIRMED':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'OFFER_DECLINED_BY_CANDIDATE':
    case 'REJECTED_BY_CLIENT':
    case 'PROCESS_CANCELLED':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'PROCESS_ON_HOLD':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'ONBOARDING':
    case 'GUARANTEE_PERIOD':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// Format status text cho display (tiếng Việt)
export const formatStatusText = (status: ProcessStatus): string => {
  const statusMap: Record<ProcessStatus, string> = {
    'CV_SUBMITTED_TO_CLIENT': 'Đã nhận CV từ Admin',
    'INTERVIEW_SCHEDULED_1ST': 'Đã lên lịch PV vòng 1',
    'INTERVIEW_COMPLETED_1ST': 'Hoàn thành PV vòng 1',
    'INTERVIEW_SCHEDULED_2ND': 'Đã lên lịch PV vòng 2',
    'INTERVIEW_COMPLETED_2ND': 'Hoàn thành PV vòng 2',
    'INTERVIEW_SCHEDULED_FINAL': 'Đã lên lịch PV cuối',
    'INTERVIEW_COMPLETED_FINAL': 'Hoàn thành PV cuối',
    'TEST_ASSIGNED': 'Đã giao bài test',
    'TEST_COMPLETED': 'Hoàn thành test',
    'REFERENCE_CHECK_IN_PROGRESS': 'Đang kiểm tra tham chiếu',
    'REFERENCE_CHECK_COMPLETED': 'Hoàn thành kiểm tra tham chiếu',
    'OFFER_EXTENDED': 'Đã đưa offer',
    'OFFER_ACCEPTED_BY_CANDIDATE': 'Ứng viên chấp nhận offer',
    'OFFER_DECLINED_BY_CANDIDATE': 'Ứng viên từ chối offer',
    'PLACEMENT_CONFIRMED': 'Xác nhận placement',
    'ONBOARDING': 'Đang onboarding',
    'GUARANTEE_PERIOD': 'Thời gian bảo hành',
    'REJECTED_BY_CLIENT': 'Fail bởi Client',
    'PROCESS_ON_HOLD': 'Tạm dừng',
    'PROCESS_CANCELLED': 'Đã hủy'
  }
  return statusMap[status] || status.replace(/_/g, ' ')
}

// Luồng đề xuất cho Client (theo thứ tự logic)
export const CLIENT_STATUS_FLOW: ProcessStatus[] = [
  'CV_SUBMITTED_TO_CLIENT',      // 1. Bắt đầu: Nhận CV từ Admin
  'INTERVIEW_SCHEDULED_1ST',     // 2. Lên lịch PV vòng 1
  'INTERVIEW_COMPLETED_1ST',     // 3. Hoàn thành PV vòng 1
  'INTERVIEW_SCHEDULED_2ND',     // 4. (Tùy chọn) Lên lịch PV vòng 2
  'INTERVIEW_COMPLETED_2ND',     // 5. (Tùy chọn) Hoàn thành PV vòng 2
  'INTERVIEW_SCHEDULED_FINAL',   // 6. Lên lịch PV cuối
  'INTERVIEW_COMPLETED_FINAL',   // 7. Hoàn thành PV cuối
  'TEST_ASSIGNED',                // 8. Giao bài test
  'TEST_COMPLETED',               // 9. Hoàn thành test
  'REFERENCE_CHECK_IN_PROGRESS', // 10. Kiểm tra tham chiếu
  'REFERENCE_CHECK_COMPLETED',   // 11. Hoàn thành kiểm tra
  'OFFER_EXTENDED',               // 12. Đưa offer
  'OFFER_ACCEPTED_BY_CANDIDATE',  // 13. Ứng viên nhận offer
  'PLACEMENT_CONFIRMED',          // 14. Xác nhận placement
  'ONBOARDING',                   // 15. Onboarding
  'GUARANTEE_PERIOD'              // 16. Thời gian bảo hành
]

// Status có thể reject
export const REJECT_STATUSES: ProcessStatus[] = [
  'REJECTED_BY_CLIENT',
  'OFFER_DECLINED_BY_CANDIDATE',
  'PROCESS_CANCELLED'
]

// Status có thể hold
export const HOLD_STATUSES: ProcessStatus[] = [
  'PROCESS_ON_HOLD'
]

// Map status -> order index trong flow (dùng để so sánh tiến trình)
export const STATUS_ORDER_MAP = CLIENT_STATUS_FLOW.reduce(
  (map, status, index) => {
    map[status] = index
    return map
  },
  {} as Record<ProcessStatus, number>
)

const FAIL_OR_SPECIAL_STATUSES: ProcessStatus[] = [
  ...REJECT_STATUSES,
  ...HOLD_STATUSES,
  'PROCESS_CANCELLED'
]

export const canTransitionStatus = (current: ProcessStatus, target: ProcessStatus): boolean => {
  if (current === target) return true
  if (FAIL_OR_SPECIAL_STATUSES.includes(target)) return true

  const currentOrder = STATUS_ORDER_MAP[current]
  const targetOrder = STATUS_ORDER_MAP[target]

  if (currentOrder === undefined || targetOrder === undefined) {
    // Nếu 1 trong 2 status không thuộc flow chính, cho phép chuyển
    return true
  }

  // Chỉ cho phép tiến tới cùng hoặc về phía trước
  return targetOrder >= currentOrder
}

// Mapping status với stage name (tự động tạo stages dựa trên status)
export const STATUS_TO_STAGE_MAP: Record<ProcessStatus, string> = {
  'CV_SUBMITTED_TO_CLIENT': 'Đã nhận CV',
  'INTERVIEW_SCHEDULED_1ST': 'Lên lịch PV vòng 1',
  'INTERVIEW_COMPLETED_1ST': 'Hoàn thành PV vòng 1',
  'INTERVIEW_SCHEDULED_2ND': 'Lên lịch PV vòng 2',
  'INTERVIEW_COMPLETED_2ND': 'Hoàn thành PV vòng 2',
  'INTERVIEW_SCHEDULED_FINAL': 'Lên lịch PV cuối',
  'INTERVIEW_COMPLETED_FINAL': 'Hoàn thành PV cuối',
  'TEST_ASSIGNED': 'Giao bài test',
  'TEST_COMPLETED': 'Hoàn thành test',
  'REFERENCE_CHECK_IN_PROGRESS': 'Kiểm tra tham chiếu',
  'REFERENCE_CHECK_COMPLETED': 'Hoàn thành kiểm tra tham chiếu',
  'OFFER_EXTENDED': 'Đưa offer',
  'OFFER_ACCEPTED_BY_CANDIDATE': 'Ứng viên nhận offer',
  'OFFER_DECLINED_BY_CANDIDATE': 'Ứng viên từ chối offer',
  'PLACEMENT_CONFIRMED': 'Xác nhận placement',
  'ONBOARDING': 'Onboarding',
  'GUARANTEE_PERIOD': 'Thời gian bảo hành',
  'REJECTED_BY_CLIENT': 'Đã từ chối',
  'PROCESS_ON_HOLD': 'Tạm dừng',
  'PROCESS_CANCELLED': 'Đã hủy'
}

// Tạo default stages từ CLIENT_STATUS_FLOW
export const getDefaultStagesFromStatusFlow = () => {
  return CLIENT_STATUS_FLOW.map((status, index) => ({
    id: `stage-${status}`,
    name: STATUS_TO_STAGE_MAP[status],
    order: index + 1,
    description: formatStatusText(status)
  }))
}

