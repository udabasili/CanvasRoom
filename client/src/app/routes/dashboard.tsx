import React, { useContext, useEffect, useRef, useState } from 'react';

import { MainLayout } from '@/components/layout';
import { Navigation } from '@/components/navigation';
import { Channel, Channels, ChannelType } from '@/features/channel';
import { ChatWindow } from '@/features/chat';
import { CodeEditor } from '@/features/coding-project';
import {
  ChatContainer,
  DashboardContainer,
  HamburgerMenu,
} from '@/features/dashboard';
import { Group, GroupSidebar } from '@/features/group';
import { Questionnaire } from '@/features/questionnaire';
import { User } from '@/features/user';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';
import { SideSectionContext } from '@/lib/side-drawer-context.tsx';
import { SocketContext } from '@/lib/socket-context.tsx';
import { GroupSocket } from '@/socket/group-socket.ts';

type Props = {
  channelId: string;
  groupId: string;
  language: string;
};

type ChannelComponentProps = {
  [key in ChannelType]: React.FC<Props> | null;
};

// Map channel types to components
const COMPONENT_MAP: ChannelComponentProps = {
  questionnaire: Questionnaire,
  group_chat: ChatWindow,
  coding_project: CodeEditor,
  live_drawings: null,
};

export const Dashboard = () => {
  const socket = useContext(SocketContext)?.socket;
  const groupSocket = useRef<GroupSocket | null>(null);
  const sideSectionContext = useContext(SideSectionContext);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { user } = useContext(AuthContext) as AuthContextType;
  const sideSection = useContext(SideSectionContext);
  const [selectedChannelType, setSelectedChannelType] =
    useState<ChannelType | null>(null);

  // Select the correct component based on the selectedChannelType
  const Component = selectedChannelType
    ? COMPONENT_MAP[selectedChannelType]
    : null;

  useEffect(() => {
    if (channel) {
      setSelectedChannelType(channel.type);
      sideSection?.close();
    } else {
      setSelectedChannelType(null);
    }
  }, [channel]);

  useEffect(() => {
    setChannels([]);
    setChannel(null);

    if (selectedGroup) {
      // join group channel
      if (socket) {
        groupSocket.current = new GroupSocket(socket);
        groupSocket.current.joinGroup(selectedGroup._id, user?._id as string);
        sideSectionContext?.open();
      }
      setChannels(selectedGroup.channels);
    }
    return () => {
      if (selectedGroup) {
        groupSocket.current?.leaveGroup(selectedGroup._id, user?._id as string);
      }
    };
  }, [selectedGroup]);

  return (
    <MainLayout title="Dashboard">
      <DashboardContainer>
        <GroupSidebar
          setSelectedGroup={setSelectedGroup}
          selectedGroup={selectedGroup}
          user={user as User}
        />
        <Channels
          channels={channels}
          setChannel={setChannel}
          selectedChanel={channel}
          groupName={selectedGroup?.name as string}
        />
        <ChatContainer>
          <Navigation>
            <HamburgerMenu onClick={sideSectionContext?.open}>
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
            <Component
              channelId={channel?._id as string}
              groupId={selectedGroup?._id as string}
              language={selectedGroup?.language as string}
            />
          ) : (
            <div className="mt-10 text-center text-black">
              Select a group icon the left and then a channel to get started
            </div>
          )}
        </ChatContainer>
      </DashboardContainer>
    </MainLayout>
  );
};
