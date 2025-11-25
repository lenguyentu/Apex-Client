interface Evaluation {
  id: number
  candidate: string
  position: string
  overallScore: number
  skills: number
  experience: number
  interview: number
  evaluatedBy: string
  date: string
  avatar: string
}

interface EvaluationCardProps {
  evaluation: Evaluation
}

const EvaluationCard = ({ evaluation }: EvaluationCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
            {evaluation.avatar}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{evaluation.candidate}</h3>
            <p className="text-sm text-gray-600">{evaluation.position}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
            {evaluation.overallScore}
          </div>
          <div className="text-xs text-gray-500">Tổng điểm</div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Kỹ năng</div>
          <div className="text-lg font-semibold text-gray-900">{evaluation.skills}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Kinh nghiệm</div>
          <div className="text-lg font-semibold text-gray-900">{evaluation.experience}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Phỏng vấn</div>
          <div className="text-lg font-semibold text-gray-900">{evaluation.interview}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Tổng điểm</div>
          <div className={`text-lg font-semibold ${getScoreColor(evaluation.overallScore)}`}>{evaluation.overallScore}</div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Đánh giá bởi <span className="font-semibold text-gray-900">{evaluation.evaluatedBy}</span> vào {evaluation.date}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Xem chi tiết</button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">Sửa</button>
        </div>
      </div>
    </div>
  )
}

export default EvaluationCard
