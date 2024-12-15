import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import React, { useContext, useEffect, useRef } from 'react';

import { useGetCode } from '@/features/coding-project';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';
import { SocketContext, SocketContextType } from '@/lib/socket-context.tsx';
import { ChannelSocket } from '@/socket/channel-socket.ts';
import { CodingProjectSocket } from '@/socket/coding-project-socket.ts';

type CodeEditorProps = {
  channelId: string;
  groupId: string;
};
export const CodeEditor = ({ channelId, groupId }: CodeEditorProps) => {
  const { socket } = useContext(SocketContext) as SocketContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const codeSocket = useRef<CodingProjectSocket | null>(null);
  const channelSocket = useRef<ChannelSocket | null>(null);
  const [value, setValue] = React.useState<string>('');
  const { isLoading, error, code } = useGetCode({
    userId: user?._id as string,
    channelId,
    groupId,
  });

  useEffect(() => {
    if (!isLoading && !error && code) {
      setValue(code as string);
    }
  }, [isLoading, error, code]);

  useEffect(() => {
    if (socket) {
      codeSocket.current = new CodingProjectSocket(socket);
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
    if (codeSocket.current) {
      codeSocket.current.codeAlongListener((data) => {
        console.log('Code Along', data);
        setValue(data);
      });
    }
  }, [codeSocket]);

  const onChange = React.useCallback((val: React.SetStateAction<string>) => {
    if (codeSocket.current) {
      codeSocket.current.codeAlongEmitter(
        groupId,
        channelId,
        user?._id as string,
        val,
      );
    }
  }, []);

  return (
    <div className="size-full">
      {isLoading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        <div className="size-full">
          <CodeMirror
            value={value}
            width={'100%'}
            height={'100%'}
            className="size-full"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};
