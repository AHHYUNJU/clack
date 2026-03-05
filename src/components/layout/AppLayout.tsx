import { Outlet } from 'react-router-dom';
import WorkspaceSidebar from './WorkspaceSidebar';
import ChannelSidebar from './ChannelSidebar';

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceSidebar />
      <ChannelSidebar />
      <main className="flex flex-1 min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
