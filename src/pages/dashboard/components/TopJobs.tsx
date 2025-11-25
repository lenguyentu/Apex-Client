interface TopJob {
  id: number
  name: string
  category: string
  stock: string
  sales: string
  image: string
}

interface TopJobsProps {
  jobs: TopJob[]
}

const TopJobs = ({ jobs }: TopJobsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Jobs đang tuyển</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">S/NO</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Tên vị trí</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Danh mục</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Ứng viên</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-gray-600">0{index + 1}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-lg">
                      {job.image}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{job.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{job.category}</td>
                <td className="py-4 px-4">
                  <span className={`text-sm ${job.stock === 'Hết hạn' ? 'text-red-600' : 'text-gray-900'}`}>
                    {job.stock}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-gray-900">{job.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopJobs
