import type { Job } from '../mockData'

interface JobsTableProps {
  jobs: Job[]
}

const JobsTable = ({ jobs }: JobsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang tuyển':
        return 'bg-green-100 text-green-700'
      case 'Đã đóng':
        return 'bg-gray-100 text-gray-700'
      case 'Tạm dừng':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vị trí</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Công ty</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ứng viên</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Lượt xem</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ngày đăng</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img src="/logo2.png" alt={job.company} className="w-6 h-6 object-contain" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.company}</div>
                      <div className="text-xs text-gray-500">{job.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.applicants}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.views}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.postedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Xem</button>
                    <button className="text-gray-600 hover:text-gray-700 font-medium">Sửa</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Xóa</button>
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

export default JobsTable
