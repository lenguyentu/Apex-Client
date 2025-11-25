import KPICard from './components/KPICard'
import ChartCard from './components/ChartCard'
import TopJobs from './components/TopJobs'
import RecentCandidates from './components/RecentCandidates'
import TopPositions from './components/TopPositions'
import { mockDashboardStats, mockTopJobs, mockRecentCandidates, mockTopPositions } from './mockData'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Tổng ứng viên"
          value={`$${(mockDashboardStats.totalCandidates / 1000).toFixed(2)}K`}
          change={`${mockDashboardStats.candidatesChange > 0 ? '+' : ''}${mockDashboardStats.candidatesChange}%`}
          isPositive={mockDashboardStats.candidatesChange > 0}
          period="Tháng này"
          bgColor="bg-white"
        />
        <KPICard
          title="Tổng phỏng vấn"
          value={`${(mockDashboardStats.totalInterviews / 1000).toFixed(2)}K`}
          change={`${mockDashboardStats.interviewsChange > 0 ? '+' : ''}${mockDashboardStats.interviewsChange}%`}
          isPositive={mockDashboardStats.interviewsChange > 0}
          period="Tháng này"
          bgColor="bg-white"
        />
        <KPICard
          title="Tổng Jobs"
          value={`${(mockDashboardStats.totalJobs / 1000).toFixed(2)}K`}
          change={`${mockDashboardStats.jobsChange > 0 ? '+' : ''}${mockDashboardStats.jobsChange}%`}
          isPositive={mockDashboardStats.jobsChange > 0}
          period="Tháng này"
          bgColor="bg-white"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart and Top Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard />
          <TopJobs jobs={mockTopJobs} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <TopPositions positions={mockTopPositions} total="34.48K" />
          <RecentCandidates candidates={mockRecentCandidates} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
