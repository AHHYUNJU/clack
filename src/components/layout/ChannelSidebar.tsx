const DUMMY_CHANNELS = [
  { id: '1', name: 'general' },
  { id: '2', name: 'random' },
  { id: '3', name: 'design' },
  { id: '4', name: 'engineering' },
]

const DUMMY_DMS = [
  { id: '1', name: 'Alice', online: true },
  { id: '2', name: 'Bob', online: false },
  { id: '3', name: 'Charlie', online: true },
]

export default function ChannelSidebar() {
  return (
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
            <button className="text-[#ababad] hover:text-white text-lg leading-none">+</button>
          </div>
          {DUMMY_CHANNELS.map((ch) => (
            <button
              key={ch.id}
              className="flex items-center w-full px-4 py-1 text-sm hover:bg-white/10 rounded mx-1 transition-colors"
            >
              <span className="text-[#ababad] mr-1.5">#</span>
              {ch.name}
            </button>
          ))}
        </div>

        {/* DM 목록 */}
        <div>
          <div className="flex items-center justify-between px-4 py-1">
            <span className="text-xs font-semibold text-[#ababad] uppercase tracking-wide">Direct Messages</span>
            <button className="text-[#ababad] hover:text-white text-lg leading-none">+</button>
          </div>
          {DUMMY_DMS.map((dm) => (
            <button
              key={dm.id}
              className="flex items-center w-full px-4 py-1 text-sm hover:bg-white/10 rounded mx-1 transition-colors gap-2"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${dm.online ? 'bg-green-400' : 'bg-transparent border border-[#ababad]'}`} />
              {dm.name}
            </button>
          ))}
        </div>

      </div>
    </aside>
  )
}
