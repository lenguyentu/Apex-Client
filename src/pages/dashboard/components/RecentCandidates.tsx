interface RecentCandidate {
  id: number
  name: string
  purchases: number
  total: string
  avatar: string
}

interface RecentCandidatesProps {
  candidates: RecentCandidate[]
}

const RecentCandidates = ({ candidates }: RecentCandidatesProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ứng viên gần đây</h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Xem tất cả</a>
      </div>
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                {candidate.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{candidate.name}</p>
                <p className="text-xs text-gray-500">{candidate.purchases} Ứng tuyển</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900">{candidate.total}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentCandidates
