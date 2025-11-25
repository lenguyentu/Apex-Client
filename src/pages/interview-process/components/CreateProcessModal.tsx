import { useState } from 'react'
import { useInterviewProcessStore } from '../../../store/useInterviewProcessStore'

interface CreateProcessModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateProcessModal = ({ isOpen, onClose }: CreateProcessModalProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const createProcess = useInterviewProcessStore((state) => state.createProcess)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    createProcess(name, description)
    setName('')
    setDescription('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tạo quy trình phỏng vấn mới</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên quy trình *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Ví dụ: Quy trình Frontend Developer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                rows={3}
                placeholder="Mô tả về quy trình phỏng vấn..."
              />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                Tạo quy trình
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProcessModal

