import { useContext, useState } from 'react';

import { MainLayout } from '@/components/layout';
import { Navigation } from '@/components/navigation';
import { Channel, Channels } from '@/features/channel';
import {
  ChatContainer,
  DashboardContainer,
  HamburgerMenu,
} from '@/features/dashboard';
import { GroupSidebar } from '@/features/group';
import { ThemeContext } from '@/lib/side-drawer-context.tsx';

export const Dashboard = () => {
  const theme = useContext(ThemeContext);
  const [channels, setChannels] = useState<Channel[]>([]);

  return (
    <MainLayout title="Dashboard">
      <DashboardContainer>
        <GroupSidebar setChannels={setChannels} />
        <Channels channels={channels} />
        <ChatContainer>
          <Navigation>
            <HamburgerMenu onClick={theme?.open}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="32px"
                height="32px"
              >
                <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              </svg>
            </HamburgerMenu>
          </Navigation>
        </ChatContainer>
      </DashboardContainer>
    </MainLayout>
  );
};
