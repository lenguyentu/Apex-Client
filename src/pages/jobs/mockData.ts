export interface Job {
  id: number
  title: string
  status: 'Đang tuyển' | 'Đã đóng' | 'Tạm dừng'
  applicants: number
  views: number
  postedDate: string
  category: string
  company: string
  location: string
}

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    status: 'Đang tuyển',
    applicants: 24,
    views: 156,
    postedDate: '2024-01-15',
    category: 'IT',
    company: 'APEX Corporation',
    location: 'Hà Nội'
  },
  {
    id: 2,
    title: 'Backend Developer',
    status: 'Đang tuyển',
    applicants: 18,
    views: 203,
    postedDate: '2024-01-20',
    category: 'IT',
    company: 'APEX Corporation',
    location: 'Hồ Chí Minh'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    status: 'Đã đóng',
    applicants: 32,
    views: 289,
    postedDate: '2024-01-10',
    category: 'Design',
    company: 'APEX Corporation',
    location: 'Hà Nội'
  },
  {
    id: 4,
    title: 'Product Manager',
    status: 'Đang tuyển',
    applicants: 15,
    views: 178,
    postedDate: '2024-01-25',
    category: 'Management',
    company: 'APEX Corporation',
    location: 'Hồ Chí Minh'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    status: 'Đang tuyển',
    applicants: 12,
    views: 145,
    postedDate: '2024-01-22',
    category: 'IT',
    company: 'APEX Corporation',
    location: 'Đà Nẵng'
  },
  {
    id: 6,
    title: 'Data Analyst',
    status: 'Tạm dừng',
    applicants: 8,
    views: 98,
    postedDate: '2024-01-18',
    category: 'Data',
    company: 'APEX Corporation',
    location: 'Hà Nội'
  }
]

