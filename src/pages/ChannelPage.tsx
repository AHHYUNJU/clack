import { useParams } from 'react-router-dom'
import { useChannels } from '@/features/channel/hooks'

export default function ChannelPage() {
  const { channelId } = useParams()
  const { data: channels = [] } = useChannels()
  const channel = channels.find((ch) => ch.id === channelId)

  if (!channelId) {
    return (
      <div className="flex flex-col flex-1 min-w-0 bg-white items-center justify-center">
        <p className="text-gray-400 text-sm">채널을 선택해주세요</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-white">

      {/* 헤더 */}
      <header className="flex items-center px-4 h-[49px] border-b border-gray-200 shrink-0">
        <span className="font-bold text-gray-900"># {channel?.name ?? '...'}</span>
        {channel?.description && (
          <span className="ml-2 text-sm text-gray-400">{channel.description}</span>
        )}
      </header>

      {/* 메시지 목록 (다음 단계) */}
      <div className="flex-1 overflow-y-auto px-4 py-4" />

      {/* 메시지 입력 (다음 단계) */}
      <div className="px-4 pb-4 shrink-0">
        <div className="border border-gray-300 rounded-lg px-4 py-3 hover:border-gray-400 transition-colors">
          <input
            type="text"
            className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            placeholder={channel ? `#${channel.name}에 메시지 보내기` : ''}
          />
        </div>
      </div>

    </div>
  )
}
