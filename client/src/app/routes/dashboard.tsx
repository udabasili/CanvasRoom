import { useContext } from 'react';

import { MainLayout } from '@/components/layout';
import { Navigation } from '@/components/navigation';
import {
  ChannelContainer,
  ChatContainer,
  DashboardContainer,
  HamburgerMenu,
  CloseButton,
} from '@/features/dashboard';
import { GroupSidebar } from '@/features/group';
import { ThemeContext } from '@/lib/side-drawer-context.tsx';

export const Dashboard = () => {
  const theme = useContext(ThemeContext);

  return (
    <MainLayout title="Dashboard">
      <DashboardContainer>
        <GroupSidebar />
        <ChannelContainer isVisible={theme?.isOpen}>
          <CloseButton onClick={theme?.close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              width="36px"
              height="36px"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </CloseButton>
        </ChannelContainer>
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
