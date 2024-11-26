import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import React, { useContext, useEffect, useRef } from 'react';

import { useGetCode } from '@/features/coding-project';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';
import { SocketContext, SocketContextType } from '@/lib/socket-context.tsx';
import { CodingProjectSocket } from '@/socket/coding-project-socket.ts';

type CodeEditorProps = {
  channelId: string;
  groupId: string;
};
export const CodeEditor = ({ channelId, groupId }: CodeEditorProps) => {
  const { socket } = useContext(SocketContext) as SocketContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const codeSocket = useRef<CodingProjectSocket | null>(null);
  const [value, setValue] = React.useState<string>('');

  const { isLoading, error, code } = useGetCode({
    userId: user?._id as string,
    channelId,
    groupId,
  });

  useEffect(() => {
    if (!isLoading && !error && code) {
      console.log('Code', code);
      setValue(code as string);
    }
  }, [isLoading, error, code]);

  useEffect(() => {
    if (socket) {
      codeSocket.current?.joinCodingProject(groupId, channelId);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      codeSocket.current = new CodingProjectSocket(socket);
    }
  }, [socket]);

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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};
