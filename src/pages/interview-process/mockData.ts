export interface InterviewProcess {
  id: number
  name: string
  stages: number
  activeJobs: number
  createdAt: string
  description?: string
}

export interface ProcessStage {
  id: number
  name: string
  order: number
  description: string
}

export const mockProcesses: InterviewProcess[] = [
  {
    id: 1,
    name: 'Quy trình Frontend Developer',
    stages: 4,
    activeJobs: 3,
    createdAt: '2024-01-10',
    description: 'Quy trình tuyển dụng cho vị trí Frontend Developer'
  },
  {
    id: 2,
    name: 'Quy trình Backend Developer',
    stages: 5,
    activeJobs: 2,
    createdAt: '2024-01-15',
    description: 'Quy trình tuyển dụng cho vị trí Backend Developer'
  },
  {
    id: 3,
    name: 'Quy trình UI/UX Designer',
    stages: 3,
    activeJobs: 1,
    createdAt: '2024-01-20',
    description: 'Quy trình tuyển dụng cho vị trí UI/UX Designer'
  },
  {
    id: 4,
    name: 'Quy trình Product Manager',
    stages: 6,
    activeJobs: 2,
    createdAt: '2024-01-12',
    description: 'Quy trình tuyển dụng cho vị trí Product Manager'
  }
]

export const mockStages: ProcessStage[] = [
  { id: 1, name: 'Screening CV', order: 1, description: 'Sàng lọc hồ sơ ứng viên' },
  { id: 2, name: 'Technical Test', order: 2, description: 'Bài test kỹ thuật' },
  { id: 3, name: 'Interview 1', order: 3, description: 'Vòng phỏng vấn đầu tiên' },
  { id: 4, name: 'Interview 2', order: 4, description: 'Vòng phỏng vấn thứ hai' },
  { id: 5, name: 'Final Decision', order: 5, description: 'Quyết định cuối cùng' }
]

