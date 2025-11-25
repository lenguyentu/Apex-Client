export interface DashboardStats {
  totalJobs: number
  totalCandidates: number
  totalInterviews: number
  totalHired: number
  jobsChange: number
  candidatesChange: number
  interviewsChange: number
  hiredChange: number
}

export interface TopJob {
  id: number
  name: string
  category: string
  stock: string
  sales: string
  image: string
}

export interface RecentCandidate {
  id: number
  name: string
  purchases: number
  total: string
  avatar: string
}

export interface TopPosition {
  code: string
  country: string
  count: string
  flag: string
}

export const mockDashboardStats: DashboardStats = {
  totalJobs: 307480,
  totalCandidates: 30580,
  totalInterviews: 2480,
  totalHired: 360,
  jobsChange: 30,
  candidatesChange: -15,
  interviewsChange: 23,
  hiredChange: 15
}

export const mockTopJobs: TopJob[] = [
  { id: 1, name: 'Frontend Developer', category: 'IT', stock: 'Đang tuyển', sales: '1.43k', image: '💻' },
  { id: 2, name: 'Backend Developer', category: 'IT', stock: 'Hết hạn', sales: '2.68k', image: '🖥️' },
  { id: 3, name: 'UI/UX Designer', category: 'Design', stock: 'Đang tuyển', sales: '1.43k', image: '🎨' },
  { id: 4, name: 'Product Manager', category: 'Management', stock: 'Đang tuyển', sales: '0.98k', image: '👔' }
]

export const mockRecentCandidates: RecentCandidate[] = [
  { id: 1, name: 'Nguyễn Văn A', purchases: 26, total: '$4.19K', avatar: '👨‍💻' },
  { id: 2, name: 'Trần Thị B', purchases: 21, total: '$3.56K', avatar: '👩‍💼' },
  { id: 3, name: 'Lê Văn C', purchases: 17, total: '$3.12K', avatar: '👨‍🎨' },
  { id: 4, name: 'Phạm Thị D', purchases: 15, total: '$2.14K', avatar: '👩‍💻' },
  { id: 5, name: 'Hoàng Văn E', purchases: 12, total: '$1.89K', avatar: '👨‍💼' }
]

export const mockTopPositions: TopPosition[] = [
  { code: 'VN', country: 'Việt Nam', count: '7.12K', flag: '🇻🇳' },
  { code: 'SG', country: 'Singapore', count: '4.15K', flag: '🇸🇬' },
  { code: 'TH', country: 'Thái Lan', count: '6.45K', flag: '🇹🇭' },
  { code: 'MY', country: 'Malaysia', count: '3.85K', flag: '🇲🇾' },
  { code: 'ID', country: 'Indonesia', count: '6.98K', flag: '🇮🇩' }
]

