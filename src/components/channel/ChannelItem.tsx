import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteChannel } from '@/features/channel/hooks'
import type { Channel } from '@/features/channel/types'

interface Props {
  channel: Channel
}

export default function ChannelItem({ channel }: Props) {
  const { channelId } = useParams()
  const navigate = useNavigate()
  const deleteChannel = useDeleteChannel()

  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY })
  }

  function handleDelete() {
    deleteChannel.mutate(channel.id, {
      onSuccess: () => {
        if (channelId === channel.id) navigate('/')
        setMenu(null)
      },
    })
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(null)
      }
    }
    if (menu) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menu])

  return (
    <>
      <button
        onClick={() => navigate(`/channel/${channel.id}`)}
        onContextMenu={handleContextMenu}
        className={`flex items-center w-full px-4 py-1 text-sm rounded mx-1 transition-colors ${
          channelId === channel.id
            ? 'bg-white/20 text-white'
            : 'hover:bg-white/10'
        }`}
      >
        <span className="text-[#ababad] mr-1.5">#</span>
        {channel.name}
      </button>

      {menu && (
        <div
          ref={menuRef}
          style={{ top: menu.y, left: menu.x }}
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[140px]"
        >
          <button
            onClick={handleDelete}
            disabled={deleteChannel.isPending}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleteChannel.isPending ? '삭제 중...' : '채널 삭제'}
          </button>
        </div>
      )}
    </>
  )
}
