import { createContext, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import config from '@/config';

export type SocketContextType = {
  socket: Socket | null;
};
export const SocketContext = createContext<SocketContextType | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useRef<Socket | null>(null);
  socket.current = io(config.apiUrl);
  socket.current?.connect();

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
