import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChannels } from '@/features/channel/hooks'
import CreateChannelModal from '@/components/channel/CreateChannelModal'
import ChannelItem from '@/components/channel/ChannelItem'

export default function ChannelSidebar() {
  const navigate = useNavigate()
  const { data: channels = [] } = useChannels()
  const [showModal, setShowModal] = useState(false)

  function handleCreated(id: string) {
    setShowModal(false)
    navigate(`/channel/${id}`)
  }

  return (
    <>
      <aside className="flex flex-col w-[240px] bg-[#19171d] text-[#d1d2d3] shrink-0">

        {/* 워크스페이스 이름 */}
        <div className="flex items-center px-4 h-[49px] border-b border-white/10 shrink-0">
          <span className="font-bold text-white text-sm">Clack</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2">

          {/* 채널 목록 */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-4 py-1">
              <span className="text-xs font-semibold text-[#ababad] uppercase tracking-wide">Channels</span>
              <button
                onClick={() => setShowModal(true)}
                className="text-[#ababad] hover:text-white text-lg leading-none"
              >
                +
              </button>
            </div>
            {channels.map((ch) => (
              <ChannelItem key={ch.id} channel={ch} />
            ))}
          </div>

        </div>
      </aside>

      {showModal && (
        <CreateChannelModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  )
}
