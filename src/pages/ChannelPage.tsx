const DUMMY_MESSAGES = [
  { id: '1', user: 'Alice', avatar: 'A', time: '오전 10:00', content: '안녕하세요!' },
  { id: '2', user: 'Bob', avatar: 'B', time: '오전 10:01', content: '오늘 회의 몇 시예요?' },
  { id: '3', user: 'Alice', avatar: 'A', time: '오전 10:02', content: '2시에 시작해요!' },
]

export default function ChannelPage() {
  return (
    <div className="flex flex-col flex-1 min-w-0 bg-white">

      {/* 헤더 */}
      <header className="flex items-center px-4 h-[49px] border-b border-gray-200 shrink-0">
        <span className="font-bold text-gray-900"># general</span>
        <span className="ml-2 text-sm text-gray-400">팀 전체 공지 채널</span>
      </header>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {DUMMY_MESSAGES.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {msg.avatar}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-sm text-gray-900">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-800">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 */}
      <div className="px-4 pb-4 shrink-0">
        <div className="border border-gray-300 rounded-lg px-4 py-3 hover:border-gray-400 transition-colors">
          <input
            type="text"
            className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            placeholder="#general에 메시지 보내기"
          />
        </div>
      </div>

    </div>
  )
}
