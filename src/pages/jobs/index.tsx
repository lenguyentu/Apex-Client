import JobsTable from './components/JobsTable'
import { mockJobs } from './mockData'

const Jobs = () => {
  return (
    <div className="space-y-6">
      <JobsTable jobs={mockJobs} />
    </div>
  )
}

export default Jobs
