import type { Candidate } from '../mockData'

interface CandidatesTableProps {
  candidates: Candidate[]
}

const CandidatesTable = ({ candidates }: CandidatesTableProps) => {
  const getStatusColor = (phase: string | null) => {
    if (!phase) return 'bg-gray-100 text-gray-700'
    
    switch (phase) {
      case 'New_Lead':
        return 'bg-blue-100 text-blue-700'
      case 'Đang phỏng vấn':
        return 'bg-yellow-100 text-yellow-700'
      case 'Đã phỏng vấn':
        return 'bg-purple-100 text-purple-700'
      case 'Đã đánh giá':
        return 'bg-green-100 text-green-700'
      case 'Đã từ chối':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (phase: string | null) => {
    if (!phase) return 'Chưa phân loại'
    
    switch (phase) {
      case 'New_Lead':
        return 'Mới ứng tuyển'
      default:
        return phase
    }
  }

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/)
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ứng viên</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vị trí ứng tuyển</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Số điện thoại</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Địa chỉ</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{candidate.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {candidate.applied_position || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidate.phase)}`}>
                    {getStatusText(candidate.phase)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{candidate.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{candidate.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {candidate.location || candidate.address || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <a
                      href={candidate.cv_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Xem CV
                    </a>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Đánh giá</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CandidatesTable
