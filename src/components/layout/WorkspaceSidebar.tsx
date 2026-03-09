const DUMMY_WORKSPACES = [
  { id: '1', name: 'Clack', initial: 'C' },
  { id: '2', name: 'Design', initial: 'D' },
]

export default function WorkspaceSidebar() {
  return (
    <aside className="flex flex-col items-center gap-2 w-[68px] bg-[#3f0e40] py-3 shrink-0">
      {DUMMY_WORKSPACES.map((ws) => (
        <button
          key={ws.id}
          className="w-10 h-10 rounded-lg bg-white/20 text-white font-bold text-sm hover:bg-white/30 transition-colors"
        >
          {ws.initial}
        </button>
      ))}
      <button className="w-10 h-10 rounded-lg border-2 border-dashed border-white/40 text-white/60 text-xl hover:border-white/70 hover:text-white/80 transition-colors mt-1">
        +
      </button>
    </aside>
  )
}
