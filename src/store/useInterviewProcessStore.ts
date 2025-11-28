import { create } from 'zustand'
import type { ProcessStatus } from '../constants/processStatus'
import { STATUS_TO_STAGE_MAP, CLIENT_STATUS_FLOW } from '../constants/processStatus'
import { mockCandidates } from '../pages/candidates/mockData'

export interface ProcessStage {
  id: string
  name: string
  order: number
  description: string
  candidates: CandidateInStage[]
  note?: string // Note cho stage/vòng này
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
  process_status?: ProcessStatus // Status của process cho candidate này (Client quản lý)
  is_failed?: boolean // Đánh dấu candidate đã bị fail
  reject_reason?: string // Lý do fail
  history?: CandidateHistoryEntry[]
}

export interface CandidateHistoryEntry {
  id: string
  type: 'STATUS' | 'NOTE' | 'FAIL'
  timestamp: string
  status?: ProcessStatus
  stageId: string
  stageName: string
  note?: string
}

const createHistoryEntry = (
  type: CandidateHistoryEntry['type'],
  stageId: string,
  stageName: string,
  options: { status?: ProcessStatus; note?: string } = {}
): CandidateHistoryEntry => ({
  id: `history-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  type,
  timestamp: new Date().toISOString(),
  stageId,
  stageName,
  status: options.status,
  note: options.note
})

const appendHistory = (candidate: CandidateInStage, entry: CandidateHistoryEntry): CandidateInStage => ({
  ...candidate,
  history: [...(candidate.history ?? []), entry]
})

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
  updateStageNote: (processId: string, stageId: string, note: string) => void
  addCandidateToStage: (processId: string, stageId: string, candidate: CandidateInStage) => void
  moveCandidate: (processId: string, fromStageId: string, toStageId: string, candidateId: string) => void
  removeCandidateFromStage: (processId: string, stageId: string, candidateId: string) => void
  updateCandidateNote: (processId: string, stageId: string, candidateId: string, note: string) => void
  updateCandidateStatus: (processId: string, stageId: string, candidateId: string, status: ProcessStatus) => void
  markCandidateAsFailed: (processId: string, stageId: string, candidateId: string, reason: string) => void
  unmarkCandidateAsFailed: (processId: string, stageId: string, candidateId: string) => void
  saveCandidateEvaluation: (processId: string, stageId: string, candidateId: string, note: string) => void
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
    },
    {
      id: 'mock-process-full',
      name: 'Quy trình Tuyển dụng PCCC (Mock Data Đầy Đủ)',
      description: 'Quy trình tuyển dụng với mock data đầy đủ để test - 10 candidates trong "Đã nhận CV"',
      activeJobs: 10,
      createdAt: '2025-11-13',
      stages: [
        {
          id: 'stage-cv-submitted',
          name: 'Đã nhận CV',
          order: 1,
          description: 'CV đã được Admin gửi cho Client',
          candidates: mockCandidates.slice(0, 10).map((candidate, index) => ({
            id: candidate.id,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            position: candidate.applied_position,
            cv_link: candidate.cv_link,
            location: candidate.location,
            address: candidate.address,
            note: `CV ${index + 1}: CV tốt, cần xem xét kỹ hơn`,
            process_status: 'CV_SUBMITTED_TO_CLIENT' as ProcessStatus,
            is_failed: false
          }))
        },
        {
          id: 'stage-interview-1st',
          name: 'Lên lịch PV vòng 1',
          order: 2,
          description: 'Đã lên lịch phỏng vấn vòng 1',
          candidates: []
        },
        {
          id: 'stage-interview-1st-completed',
          name: 'Hoàn thành PV vòng 1',
          order: 3,
          description: 'Đã hoàn thành phỏng vấn vòng 1',
          candidates: []
        },
        {
          id: 'stage-interview-2nd',
          name: 'Lên lịch PV vòng 2',
          order: 4,
          description: 'Đã lên lịch phỏng vấn vòng 2',
          candidates: []
        },
        {
          id: 'stage-interview-2nd-completed',
          name: 'Hoàn thành PV vòng 2',
          order: 5,
          description: 'Đã hoàn thành phỏng vấn vòng 2',
          candidates: []
        },
        {
          id: 'stage-final',
          name: 'Lên lịch PV cuối',
          order: 6,
          description: 'Đã lên lịch phỏng vấn cuối cùng',
          candidates: []
        },
        {
          id: 'stage-final-completed',
          name: 'Hoàn thành PV cuối',
          order: 7,
          description: 'Đã hoàn thành phỏng vấn cuối',
          candidates: []
        },
        {
          id: 'stage-test',
          name: 'Giao bài test',
          order: 8,
          description: 'Đã giao bài test cho ứng viên',
          candidates: []
        },
        {
          id: 'stage-test-completed',
          name: 'Hoàn thành test',
          order: 9,
          description: 'Ứng viên đã hoàn thành test',
          candidates: []
        },
        {
          id: 'stage-offer',
          name: 'Đưa offer',
          order: 10,
          description: 'Đã đưa offer cho ứng viên',
          candidates: []
        },
        {
          id: 'stage-offer-accepted',
          name: 'Nhận offer',
          order: 11,
          description: 'Ứng viên đã chấp nhận offer',
          candidates: []
        },
        {
          id: 'stage-placement',
          name: 'Xác nhận placement',
          order: 12,
          description: 'Đã xác nhận placement',
          candidates: []
        },
        {
          id: 'stage-onboarding',
          name: 'Onboarding',
          order: 13,
          description: 'Ứng viên đang onboarding',
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

  updateStageNote: (processId, stageId, note) => set((state) => ({
    processes: state.processes.map(p =>
      p.id === processId
        ? {
            ...p,
            stages: p.stages.map(s =>
              s.id === stageId ? { ...s, note } : s
            )
          }
        : p
    ),
    selectedProcess: state.selectedProcess?.id === processId
      ? {
          ...state.selectedProcess,
          stages: state.selectedProcess.stages.map(s =>
            s.id === stageId ? { ...s, note } : s
          )
        }
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
  })),

  updateCandidateStatus: (processId, stageId, candidateId, status) => set((state) => {
    const process = state.processes.find(p => p.id === processId)
    if (!process) return state

    const fromStage = process.stages.find(s => s.id === stageId)
    const candidate = fromStage?.candidates.find(c => c.id === candidateId)
    if (!candidate) return state

    const statusTargetName = STATUS_TO_STAGE_MAP[status] || status

    const statusKeywords: Record<ProcessStatus, string[]> = {
      'CV_SUBMITTED_TO_CLIENT': ['nhận cv', 'cv'],
      'INTERVIEW_SCHEDULED_1ST': ['lên lịch', 'pv vòng 1', 'interview 1'],
      'INTERVIEW_COMPLETED_1ST': ['hoàn thành', 'pv vòng 1', 'interview 1'],
      'INTERVIEW_SCHEDULED_2ND': ['lên lịch', 'pv vòng 2', 'interview 2'],
      'INTERVIEW_COMPLETED_2ND': ['hoàn thành', 'pv vòng 2', 'interview 2'],
      'INTERVIEW_SCHEDULED_FINAL': ['lên lịch', 'pv cuối', 'final'],
      'INTERVIEW_COMPLETED_FINAL': ['hoàn thành', 'pv cuối', 'final'],
      'TEST_ASSIGNED': ['giao', 'test'],
      'TEST_COMPLETED': ['hoàn thành', 'test'],
      'REFERENCE_CHECK_IN_PROGRESS': ['kiểm tra', 'tham chiếu'],
      'REFERENCE_CHECK_COMPLETED': ['hoàn thành', 'tham chiếu'],
      'OFFER_EXTENDED': ['đưa', 'offer'],
      'OFFER_ACCEPTED_BY_CANDIDATE': ['nhận offer', 'accepted'],
      'OFFER_DECLINED_BY_CANDIDATE': ['từ chối offer', 'declined'],
      'PLACEMENT_CONFIRMED': ['xác nhận', 'placement'],
      'ONBOARDING': ['onboarding'],
      'GUARANTEE_PERIOD': ['bảo hành', 'guarantee'],
      'REJECTED_BY_CLIENT': ['từ chối', 'reject'],
      'PROCESS_ON_HOLD': ['tạm dừng', 'hold'],
      'PROCESS_CANCELLED': ['hủy', 'cancelled']
    }

    const findTargetStage = (stages: ProcessStage[]) => {
      let stage = stages.find(s => s.name === statusTargetName)
      if (stage) return stage
      const keywords = statusKeywords[status] || []
      stage = stages.find(s => {
        const stageNameLower = s.name.toLowerCase()
        return keywords.some(keyword => stageNameLower.includes(keyword.toLowerCase()))
      })
      return stage
    }

    let targetStage = findTargetStage(process.stages)
    let stageToInsert: ProcessStage | null = null

    if (!targetStage) {
      const statusIndex = CLIENT_STATUS_FLOW.indexOf(status)
      const order = statusIndex >= 0 ? statusIndex + 1 : process.stages.length + 1
      stageToInsert = {
        id: `stage-${status}-${Date.now()}`,
        name: statusTargetName,
        order,
        description: `Stage cho ${statusTargetName}`,
        candidates: [],
        note: undefined
      }
      targetStage = stageToInsert
    }

    if (!targetStage) return state

    const historyEntry = createHistoryEntry('STATUS', targetStage.id, targetStage.name, {
      status,
      note: candidate.note
    })
    const updatedCandidate = appendHistory(
      { ...candidate, process_status: status },
      historyEntry
    )

    const moveCandidate = (stages: ProcessStage[]): ProcessStage[] => {
      let workingStages = stages
      if (stageToInsert && !workingStages.some(s => s.id === stageToInsert!.id)) {
        workingStages = [...workingStages, stageToInsert]
      }
      workingStages = [...workingStages].sort((a, b) => a.order - b.order)

      return workingStages.map(s => {
        if (s.id === stageId) {
          return { ...s, candidates: s.candidates.filter(c => c.id !== candidateId) }
        }
        if (s.id === targetStage!.id) {
          const exists = s.candidates.some(c => c.id === candidateId)
          if (!exists) {
            return { ...s, candidates: [...s.candidates, updatedCandidate] }
          }
          return {
            ...s,
            candidates: s.candidates.map(c => (c.id === candidateId ? updatedCandidate : c))
          }
        }
        return s
      })
    }

    return {
      processes: state.processes.map(p =>
        p.id === processId ? { ...p, stages: moveCandidate(p.stages) } : p
      ),
      selectedProcess: state.selectedProcess?.id === processId
        ? {
            ...state.selectedProcess,
            stages: moveCandidate(state.selectedProcess.stages)
          }
        : state.selectedProcess
    }
  }),

  markCandidateAsFailed: (processId, stageId, candidateId, reason) => set((state) => {
    const sortCandidates = (candidates: CandidateInStage[]) => {
      return [...candidates].sort((a, b) => {
        const aFailed = a.is_failed === true
        const bFailed = b.is_failed === true
        if (aFailed && !bFailed) return 1
        if (!aFailed && bFailed) return -1
        return 0
      })
    }

    const applyFailState = (stages: ProcessStage[]) =>
      stages.map(s =>
        s.id === stageId
          ? {
              ...s,
              candidates: sortCandidates(
                s.candidates.map(c => {
                  if (c.id !== candidateId) return c
                  const entry = createHistoryEntry('FAIL', stageId, s.name, { note: reason })
                  return appendHistory(
                    {
                      ...c,
                      is_failed: true,
                      reject_reason: reason,
                      process_status: 'REJECTED_BY_CLIENT'
                    },
                    entry
                  )
                })
              )
            }
          : s
      )

    return {
      processes: state.processes.map(p =>
        p.id === processId ? { ...p, stages: applyFailState(p.stages) } : p
      ),
      selectedProcess: state.selectedProcess?.id === processId
        ? { ...state.selectedProcess, stages: applyFailState(state.selectedProcess.stages) }
        : state.selectedProcess
    }
  }),

  unmarkCandidateAsFailed: (processId, stageId, candidateId) => set((state) => {
    // Helper function để sắp xếp: failed ở cuối
    const sortCandidates = (candidates: CandidateInStage[]) => {
      return [...candidates].sort((a, b) => {
        const aFailed = a.is_failed === true
        const bFailed = b.is_failed === true
        if (aFailed && !bFailed) return 1
        if (!aFailed && bFailed) return -1
        return 0
      })
    }

    const resetFailState = (stages: ProcessStage[]) =>
      stages.map(s =>
        s.id === stageId
          ? {
              ...s,
              candidates: sortCandidates(
                s.candidates.map(c =>
                  c.id === candidateId ? { ...c, is_failed: false, reject_reason: undefined } : c
                )
              )
            }
          : s
      )

    return {
      processes: state.processes.map(p =>
        p.id === processId ? { ...p, stages: resetFailState(p.stages) } : p
      ),
      selectedProcess: state.selectedProcess?.id === processId
        ? { ...state.selectedProcess, stages: resetFailState(state.selectedProcess.stages) }
        : state.selectedProcess
    }
  }),

  saveCandidateEvaluation: (processId, stageId, candidateId, note) => set((state) => {
    const trimmedNote = note?.trim()
    if (!trimmedNote) return state

    const addEvaluation = (stages: ProcessStage[]) =>
      stages.map(s =>
        s.id === stageId
          ? {
              ...s,
              candidates: s.candidates.map(c => {
                if (c.id !== candidateId) return c
                const entry = createHistoryEntry('NOTE', stageId, s.name, { note: trimmedNote })
                return appendHistory(c, entry)
              })
            }
          : s
      )

    return {
      processes: state.processes.map(p =>
        p.id === processId ? { ...p, stages: addEvaluation(p.stages) } : p
      ),
      selectedProcess: state.selectedProcess?.id === processId
        ? { ...state.selectedProcess, stages: addEvaluation(state.selectedProcess.stages) }
        : state.selectedProcess
    }
  })
}))

