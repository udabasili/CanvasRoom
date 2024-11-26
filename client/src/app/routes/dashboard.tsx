import React, { useContext, useEffect, useState } from 'react';

import { MainLayout } from '@/components/layout';
import { Navigation } from '@/components/navigation';
import { Channel, Channels, ChannelType } from '@/features/channel';
import { CodeEditor } from '@/features/coding-project';
import {
  ChatContainer,
  DashboardContainer,
  HamburgerMenu,
} from '@/features/dashboard';
import { GroupSidebar } from '@/features/group';
import { ThemeContext } from '@/lib/side-drawer-context.tsx';

// Assuming ChannelType is a union of channel names

type ChannelComponentProps = {
  [key in ChannelType]: React.FC;
};

// Map channel types to components
const COMPONENT_MAP: ChannelComponentProps = {
  ask_questions: CodeEditor,
  share_resources: CodeEditor,
  project_ideas: CodeEditor,
  coding_project: CodeEditor,
  design_project: CodeEditor,
  faq: CodeEditor,
  external_resources: CodeEditor,
};

export const Dashboard = () => {
  const theme = useContext(ThemeContext);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [selectedChannelType, setSelectedChannelType] =
    useState<ChannelType | null>(null);

  // Select the correct component based on the selectedChannelType
  const Component = selectedChannelType
    ? COMPONENT_MAP[selectedChannelType]
    : null;

  // Update the selected channel type when `channel` changes
  useEffect(() => {
    if (channel) {
      setSelectedChannelType(channel.type);
    }
  }, [channel]);

  return (
    <MainLayout title="Dashboard">
      <DashboardContainer>
        <GroupSidebar setChannels={setChannels} />
        <Channels
          channels={channels}
          setChannel={setChannel}
          selectedChanel={channel}
        />
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
          {Component ? (
            <Component />
          ) : (
            <div>Select a channel to display content</div>
          )}
        </ChatContainer>
      </DashboardContainer>
    </MainLayout>
  );
};
