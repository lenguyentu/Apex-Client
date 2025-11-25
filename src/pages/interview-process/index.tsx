import { useState, useCallback } from 'react'
import { useInterviewProcessStore } from '../../store/useInterviewProcessStore'
import PageHeader from './components/PageHeader'
import ProcessCards from './components/ProcessCards'
import ProcessDetail from './components/ProcessDetail'
import CreateProcessModal from './components/CreateProcessModal'

const InterviewProcess = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const selectedProcess = useInterviewProcessStore((state) => state.selectedProcess)

  const handleCreateClick = useCallback(() => {
    setShowCreateModal(true)
  }, [])

  // Logic: Nếu đang xem chi tiết -> Render mỗi trang chi tiết
  if (selectedProcess) {
    return <ProcessDetail />
  }

  // Logic: Nếu ở Dashboard -> Render Header + Danh sách
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader onCreateClick={handleCreateClick} />
      <CreateProcessModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      <ProcessCards />
    </div>
  )
}

export default InterviewProcess