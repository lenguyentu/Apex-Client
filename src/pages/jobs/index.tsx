import PageHeader from './components/PageHeader'
import JobsTable from './components/JobsTable'
import { mockJobs } from './mockData'

const Jobs = () => {
  return (
    <div className="space-y-6">
      <PageHeader />
      <JobsTable jobs={mockJobs} />
    </div>
  )
}

export default Jobs
