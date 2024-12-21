import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState, useRef, useContext } from 'react';

import { Stroke, useGetDrawing } from '@/features/live-drawing';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';
import { SocketContext, SocketContextType } from '@/lib/socket-context.tsx';
import { ChannelSocket } from '@/socket/channel-socket.ts';
import { LiveDrawingSocket } from '@/socket/live-drawing-socket.ts';

type DrawingBoardProps = {
  groupId: string;
  channelId: string;
};
export const DrawingBoard = ({ groupId, channelId }: DrawingBoardProps) => {
  const { socket } = useContext(SocketContext) as SocketContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const liveDrawingSocket = useRef<LiveDrawingSocket | null>(null);
  const channelSocket = useRef<ChannelSocket | null>(null);
  const { isLoading, error, drawing } = useGetDrawing(
    user?._id as string,
    channelId,
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Array<Stroke>>([]);
  const queryClient = useQueryClient();

  //First set up the socket connections
  useEffect(() => {
    if (socket) {
      liveDrawingSocket.current = new LiveDrawingSocket(socket);
      channelSocket.current = new ChannelSocket(socket);
    }
  }, [socket]);

  //Join the channel socket when the channelsocket variable is set
  useEffect(() => {
    if (channelSocket) {
      channelSocket.current?.joinChannel(
        groupId,
        channelId,
        user?._id as string,
      );
    }
    //then join the live drawing socket
    if (liveDrawingSocket.current) {
      liveDrawingSocket.current.liveDrawingListener(async () => {
        await queryClient.invalidateQueries({ queryKey: ['drawing'] });
      });
    }

    return () => {
      if (channelSocket) {
        channelSocket.current?.leaveChannel(
          groupId,
          channelId,
          user?._id as string,
        );
      }

      if (liveDrawingSocket.current) {
        liveDrawingSocket.current.liveDrawingRemoveListener();
      }
    };
  }, [channelSocket, liveDrawingSocket]);

  //Set up the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const context = canvas.getContext('2d');
      if (context) {
        contextRef.current = context;
        if (drawing) {
          drawing.strokes.forEach((stroke) => drawStroke(stroke, context));
        }
      }
    }
  }, [isLoading, error, drawing]);

  const drawStroke = (stroke: Stroke, ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.beginPath();
    stroke.points.forEach(({ x, y }, index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  const handleMouseDown = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    setStrokes([
      { color: 'black', width: 2, points: [{ x: offsetX, y: offsetY }] },
    ]);
  };

  const handleMouseMove = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    setStrokes((prev) => {
      const updatedStroke = { ...prev[prev.length - 1] };
      updatedStroke.points.push({ x: offsetX, y: offsetY });
      return [...prev.slice(0, -1), updatedStroke];
    });
    if (contextRef.current) {
      strokes.forEach((stroke) => drawStroke(stroke, contextRef.current!));
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const stroke = strokes[strokes.length - 1];
    if (liveDrawingSocket.current) {
      liveDrawingSocket.current.liveDrawingEmitter({
        input: {
          groupId,
          channelId,
          userId: user?._id as string,
          stroke,
        },
      });
    }
  };

  return isLoading ? (
    <div className="flex flex-col items-center justify-center">
      <span className="loading loading-bars loading-md"></span>
    </div>
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <div>
      <div className="border-b-2 border-gray-300 text-center text-2xl font-bold">
        <span>Click and drag to draw</span>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black', width: '100%', height: '500px' }}
      />
    </div>
  );
};
