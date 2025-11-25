import { create } from 'zustand'

export interface ProcessStage {
  id: string
  name: string
  order: number
  description: string
  candidates: CandidateInStage[]
}

export interface CandidateInStage {
  id: string
  name: string
  email: string
  phone: string
  position: string | null
  cv_link: string
  location: string | null
  address: string | null
  note?: string
}

export interface InterviewProcess {
  id: string
  name: string
  description: string
  stages: ProcessStage[]
  activeJobs: number
  createdAt: string
}

interface InterviewProcessState {
  processes: InterviewProcess[]
  selectedProcess: InterviewProcess | null
  createProcess: (name: string, description: string) => void
  selectProcess: (processId: string | '') => void
  addStage: (processId: string, stageName: string, description: string) => void
  deleteStage: (processId: string, stageId: string) => void
  updateStageOrder: (processId: string, stages: ProcessStage[]) => void
  addCandidateToStage: (processId: string, stageId: string, candidate: CandidateInStage) => void
  moveCandidate: (processId: string, fromStageId: string, toStageId: string, candidateId: string) => void
  removeCandidateFromStage: (processId: string, stageId: string, candidateId: string) => void
  updateCandidateNote: (processId: string, stageId: string, candidateId: string, note: string) => void
}

export const useInterviewProcessStore = create<InterviewProcessState>((set) => ({
  processes: [
    {
      id: '1',
      name: 'Quy trình Frontend Developer',
      description: 'Quy trình tuyển dụng cho vị trí Frontend Developer',
      activeJobs: 3,
      createdAt: '2024-01-10',
      stages: [
        {
          id: 'stage-1',
          name: 'Screening CV',
          order: 1,
          description: 'Sàng lọc hồ sơ ứng viên',
          candidates: []
        },
        {
          id: 'stage-2',
          name: 'Technical Test',
          order: 2,
          description: 'Bài test kỹ thuật',
          candidates: []
        },
        {
          id: 'stage-3',
          name: 'Interview 1',
          order: 3,
          description: 'Vòng phỏng vấn đầu tiên',
          candidates: []
        },
        {
          id: 'stage-4',
          name: 'Final Decision',
          order: 4,
          description: 'Quyết định cuối cùng',
          candidates: []
        }
      ]
    },
    {
      id: '2',
      name: 'Quy trình Backend Developer',
      description: 'Quy trình tuyển dụng cho vị trí Backend Developer',
      activeJobs: 2,
      createdAt: '2024-01-15',
      stages: [
        {
          id: 'stage-5',
          name: 'Screening CV',
          order: 1,
          description: 'Sàng lọc hồ sơ ứng viên',
          candidates: []
        },
        {
          id: 'stage-6',
          name: 'Technical Test',
          order: 2,
          description: 'Bài test kỹ thuật',
          candidates: []
        },
        {
          id: 'stage-7',
          name: 'Interview 1',
          order: 3,
          description: 'Vòng phỏng vấn đầu tiên',
          candidates: []
        },
        {
          id: 'stage-8',
          name: 'Interview 2',
          order: 4,
          description: 'Vòng phỏng vấn thứ hai',
          candidates: []
        },
        {
          id: 'stage-9',
          name: 'Final Decision',
          order: 5,
          description: 'Quyết định cuối cùng',
          candidates: []
        }
      ]
    }
  ],
  selectedProcess: null,

  createProcess: (name, description) => set((state) => {
    const newProcess: InterviewProcess = {
      id: Date.now().toString(),
      name,
      description,
      activeJobs: 0,
      createdAt: new Date().toISOString().split('T')[0],
      stages: []
    }
    return {
      processes: [...state.processes, newProcess],
      selectedProcess: newProcess
    }
  }),

  selectProcess: (processId) => set((state) => ({
    selectedProcess: processId === '' ? null : (state.processes.find(p => p.id === processId) || null)
  })),

  addStage: (processId, stageName, description) => set((state) => {
    const process = state.processes.find(p => p.id === processId)
    if (!process) return state

    const newStage: ProcessStage = {
      id: `stage-${Date.now()}`,
      name: stageName,
      order: process.stages.length + 1,
      description,
      candidates: []
    }

    return {
      processes: state.processes.map(p =>
        p.id === processId
          ? { ...p, stages: [...p.stages, newStage] }
          : p
      ),
      selectedProcess: state.selectedProcess?.id === processId
        ? { ...state.selectedProcess, stages: [...state.selectedProcess.stages, newStage] }
        : state.selectedProcess
    }
  }),

  deleteStage: (processId, stageId) => set((state) => {
    const process = state.processes.find(p => p.id === processId)
    if (!process) return state

    return {
      processes: state.processes.map(p =>
        p.id === processId
          ? { ...p, stages: p.stages.filter(s => s.id !== stageId).map((s, idx) => ({ ...s, order: idx + 1 })) }
          : p
      ),
      selectedProcess: state.selectedProcess?.id === processId
        ? {
            ...state.selectedProcess,
            stages: state.selectedProcess.stages.filter(s => s.id !== stageId).map((s, idx) => ({ ...s, order: idx + 1 }))
          }
        : state.selectedProcess
    }
  }),

  updateStageOrder: (processId, stages) => set((state) => ({
    processes: state.processes.map(p =>
      p.id === processId ? { ...p, stages } : p
    ),
    selectedProcess: state.selectedProcess?.id === processId
      ? { ...state.selectedProcess, stages }
      : state.selectedProcess
  })),

  addCandidateToStage: (processId, stageId, candidate) => set((state) => ({
    processes: state.processes.map(p =>
      p.id === processId
        ? {
            ...p,
            stages: p.stages.map(s =>
              s.id === stageId
                ? { ...s, candidates: [...s.candidates, candidate] }
                : s
            )
          }
        : p
    ),
    selectedProcess: state.selectedProcess?.id === processId
      ? {
          ...state.selectedProcess,
          stages: state.selectedProcess.stages.map(s =>
            s.id === stageId
              ? { ...s, candidates: [...s.candidates, candidate] }
              : s
          )
        }
      : state.selectedProcess
  })),

  moveCandidate: (processId, fromStageId, toStageId, candidateId) => set((state) => {
    const process = state.processes.find(p => p.id === processId)
    if (!process) return state

    const fromStage = process.stages.find(s => s.id === fromStageId)
    const candidate = fromStage?.candidates.find(c => c.id === candidateId)
    if (!candidate) return state

    return {
      processes: state.processes.map(p =>
        p.id === processId
          ? {
              ...p,
              stages: p.stages.map(s => {
                if (s.id === fromStageId) {
                  return { ...s, candidates: s.candidates.filter(c => c.id !== candidateId) }
                }
                if (s.id === toStageId) {
                  return { ...s, candidates: [...s.candidates, candidate] }
                }
                return s
              })
            }
          : p
      ),
      selectedProcess: state.selectedProcess?.id === processId
        ? {
            ...state.selectedProcess,
            stages: state.selectedProcess.stages.map(s => {
              if (s.id === fromStageId) {
                return { ...s, candidates: s.candidates.filter(c => c.id !== candidateId) }
              }
              if (s.id === toStageId) {
                return { ...s, candidates: [...s.candidates, candidate] }
              }
              return s
            })
          }
        : state.selectedProcess
    }
  }),

  removeCandidateFromStage: (processId, stageId, candidateId) => set((state) => ({
    processes: state.processes.map(p =>
      p.id === processId
        ? {
            ...p,
            stages: p.stages.map(s =>
              s.id === stageId
                ? { ...s, candidates: s.candidates.filter(c => c.id !== candidateId) }
                : s
            )
          }
        : p
    ),
    selectedProcess: state.selectedProcess?.id === processId
      ? {
          ...state.selectedProcess,
          stages: state.selectedProcess.stages.map(s =>
            s.id === stageId
              ? { ...s, candidates: s.candidates.filter(c => c.id !== candidateId) }
              : s
          )
        }
      : state.selectedProcess
  })),

  updateCandidateNote: (processId, stageId, candidateId, note) => set((state) => ({
    processes: state.processes.map(p =>
      p.id === processId
        ? {
            ...p,
            stages: p.stages.map(s =>
              s.id === stageId
                ? {
                    ...s,
                    candidates: s.candidates.map(c =>
                      c.id === candidateId ? { ...c, note } : c
                    )
                  }
                : s
            )
          }
        : p
    ),
    selectedProcess: state.selectedProcess?.id === processId
      ? {
          ...state.selectedProcess,
          stages: state.selectedProcess.stages.map(s =>
            s.id === stageId
              ? {
                  ...s,
                  candidates: s.candidates.map(c =>
                    c.id === candidateId ? { ...c, note } : c
                  )
                }
              : s
          )
        }
      : state.selectedProcess
  }))
}))

