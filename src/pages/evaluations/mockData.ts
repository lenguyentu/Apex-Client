export interface Evaluation {
  id: number
  candidate: string
  position: string
  overallScore: number
  skills: number
  experience: number
  interview: number
  communication: number
  evaluatedBy: string
  date: string
  notes?: string
  avatar: string
}

export const mockEvaluations: Evaluation[] = [
  {
    id: 1,
    candidate: 'Nguyễn Văn A',
    position: 'Frontend Developer',
    overallScore: 88,
    skills: 90,
    experience: 85,
    interview: 90,
    communication: 87,
    evaluatedBy: 'Lê Nguyên Tú',
    date: '2024-01-25',
    notes: 'Ứng viên có kỹ năng tốt, phù hợp với vị trí',
    avatar: '👨‍💻'
  },
  {
    id: 2,
    candidate: 'Trần Thị B',
    position: 'Backend Developer',
    overallScore: 85,
    skills: 88,
    experience: 82,
    interview: 85,
    communication: 85,
    evaluatedBy: 'Lê Nguyên Tú',
    date: '2024-01-24',
    notes: 'Kinh nghiệm tốt, cần cải thiện kỹ năng giao tiếp',
    avatar: '👩‍💼'
  },
  {
    id: 3,
    candidate: 'Phạm Thị D',
    position: 'Frontend Developer',
    overallScore: 92,
    skills: 95,
    experience: 90,
    interview: 90,
    communication: 93,
    evaluatedBy: 'Lê Nguyên Tú',
    date: '2024-01-23',
    notes: 'Ứng viên xuất sắc, đề xuất tuyển dụng ngay',
    avatar: '👩‍💻'
  },
  {
    id: 4,
    candidate: 'Lê Văn C',
    position: 'UI/UX Designer',
    overallScore: 78,
    skills: 80,
    experience: 75,
    interview: 80,
    communication: 77,
    evaluatedBy: 'Lê Nguyên Tú',
    date: '2024-01-22',
    notes: 'Có tiềm năng nhưng cần đào tạo thêm',
    avatar: '👨‍🎨'
  },
  {
    id: 5,
    candidate: 'Hoàng Văn E',
    position: 'Product Manager',
    overallScore: 90,
    skills: 88,
    experience: 92,
    interview: 90,
    communication: 90,
    evaluatedBy: 'Lê Nguyên Tú',
    date: '2024-01-21',
    notes: 'Kinh nghiệm dày dặn, phù hợp với vị trí',
    avatar: '👨‍💼'
  }
]

