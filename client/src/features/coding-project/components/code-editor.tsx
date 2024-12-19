import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
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
  language: string;
};

const languageExtensions: Record<string, any> = {
  javascript,
  python,
  rust,
  html,
  sql,
  java,
  cpp,
  php,
  json,
  xml,
  css,
};

export const CodeEditor = ({
  channelId,
  groupId,
  language,
}: CodeEditorProps) => {
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
  const languageExtension = languageExtensions[language] || javascript; // Default to JavaScript

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
            extensions={[languageExtension()]}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};
