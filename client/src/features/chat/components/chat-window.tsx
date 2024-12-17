import { useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef } from 'react';
import { Button, Input } from 'react-chat-elements';

import {
  ChatBody,
  ChatFooter,
  ChatHeader,
  ChatWindowContainer,
} from '@/features/ask-questions';
import { useGetChannelChat } from '@/features/chat/api/get-chat.ts';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';
import { SocketContext, SocketContextType } from '@/lib/socket-context.tsx';
import { ChannelSocket } from '@/socket/channel-socket.ts';
import { ChatSocket } from '@/socket/chat-socket.ts';

type ChatWindowProps = {
  channelId: string;
  groupId: string;
};
export const ChatWindow = ({ channelId, groupId }: ChatWindowProps) => {
  const queryClient = useQueryClient();
  const messageListReference = React.createRef();
  const [inputValue, setInputValue] = React.useState('');
  const { socket } = useContext(SocketContext) as SocketContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const chatSocket = useRef<ChatSocket | null>(null);
  const channelSocket = useRef<ChannelSocket | null>(null);
  const { isLoading, chatMessages } = useGetChannelChat({
    userId: user?._id as string,
    channelId,
    groupId,
  });

  useEffect(() => {
    if (socket) {
      chatSocket.current = new ChatSocket(socket);
      channelSocket.current = new ChannelSocket(socket);
    }
  }, [socket]);

  useEffect(() => {
    if (channelSocket) {
      channelSocket.current?.joinChannel(
        groupId,
        channelId,
        user?._id as string,
      );
    }

    return () => {
      if (channelSocket) {
        channelSocket.current?.leaveChannel(
          groupId,
          channelId,
          user?._id as string,
        );
      }
    };
  }, [channelSocket]);

  useEffect(() => {
    if (chatSocket.current) {
      chatSocket.current.channelChatListener(() => {
        //mutate chatMessages
        queryClient.invalidateQueries({ queryKey: ['channel-chat'] });
      });
    }
  }, [chatSocket]);

  const handleMessageSend = () => {
    setInputValue('');
    chatSocket.current?.channelChatEmitter({
      sender: user?._id as string,
      channelId,
      groupId,
      message: inputValue,
    });
  };

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <ChatWindowContainer>
      <ChatHeader>Chat Window</ChatHeader>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ChatBody
          referance={messageListReference}
          className="message-list"
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={chatMessages}
        />
      )}
      <ChatFooter>
        <Input
          placeholder="Type here..."
          value={inputValue}
          maxHeight={100}
          onChange={onChangeInput}
          rightButtons={
            <Button
              color="white"
              backgroundColor="black"
              text="Send"
              onClick={handleMessageSend}
            />
          }
        />
      </ChatFooter>
    </ChatWindowContainer>
  );
};
