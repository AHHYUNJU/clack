import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useChannels } from '@/features/channel/hooks'
import { useMessages, useSendMessage, useDeleteMessage } from '@/features/message/hooks'

export default function ChannelPage() {
  const { channelId } = useParams()
  const { data: channels = [] } = useChannels()
  const channel = channels.find((ch) => ch.id === channelId)

  const { data: messages = [] } = useMessages(channelId ?? '')
  const sendMessage = useSendMessage(channelId ?? '')
  const deleteMessage = useDeleteMessage(channelId ?? '')

  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const content = input.trim()
    if (!content || !channelId) return
    setInput('')
    sendMessage.mutate(content, {
      onError: () => setInput(content),
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSend()
    }
  }

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

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {msg.user_id.slice(0, 1).toUpperCase() || '?'}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-sm text-gray-900">{msg.user_id.slice(0, 8) || '전송 중'}</span>
                <span className="text-xs text-gray-400">
                  {new Date(msg.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </span>
                {!msg.id.startsWith('optimistic-') && (
                  <button
                    onClick={() => deleteMessage.mutate(msg.id)}
                    className="ml-auto opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-red-500 transition-opacity"
                    aria-label="메시지 삭제"
                  >
                    삭제
                  </button>
                )}
              </div>
              <p className={`text-sm text-gray-800 ${msg.id.startsWith('optimistic-') ? 'opacity-50' : ''}`}>
                {msg.content}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 메시지 입력 */}
      <div className="px-4 pb-4 shrink-0">
        <div className="border border-gray-300 rounded-lg px-4 py-3 hover:border-gray-400 transition-colors">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400 resize-none"
            placeholder={channel ? `#${channel.name}에 메시지 보내기` : ''}
          />
        </div>
      </div>

    </div>
  )
}
