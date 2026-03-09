import { useState } from 'react'
import { useCreateChannel } from '@/features/channel/hooks'

interface Props {
  onClose: () => void
  onCreated: (channelId: string) => void
}

export default function CreateChannelModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const createChannel = useCreateChannel()

  function handleCreate() {
    if (!name.trim()) return
    createChannel.mutate(
      { name: name.trim(), description: description.trim() || undefined },
      { onSuccess: (channel) => onCreated(channel.id) }
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-4">채널 만들기</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">채널 이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: general"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-purple-500"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">설명 (선택)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="이 채널은 무엇을 위한 곳인가요?"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-5 outline-none focus:border-purple-500"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            취소
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || createChannel.isPending}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {createChannel.isPending ? '생성 중...' : '만들기'}
          </button>
        </div>
      </div>
    </div>
  )
}
