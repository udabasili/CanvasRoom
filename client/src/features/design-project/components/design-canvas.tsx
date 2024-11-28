import {
  ArrowPathIcon,
  TrashIcon,
  PhotoIcon,
  Square2StackIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import { Textbox, Circle, Rect, Line } from 'fabric'; // browser
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { useContext, useEffect, useRef } from 'react';
import { v1 as uuid } from 'uuid';

import { useDesignSocket } from '@/features/coding-project/hook/use-design-socket.ts';
import { DesignCanvasContainer } from '@/features/design-project/styles/index.styled.ts';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';
import { SocketContext, SocketContextType } from '@/lib/socket-context.tsx';
import { ChannelSocket } from '@/socket/channel-socket.ts';

type DesignCanvasProps = {
  channelId: string;
  groupId: string;
};

export const DesignCanvas = ({ channelId, groupId }: DesignCanvasProps) => {
  const { editor, onReady } = useFabricJSEditor();
  const { socket } = useContext(SocketContext) as SocketContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const { addObj, modifyObj, designSocket } = useDesignSocket();
  const channelSocket = useRef<ChannelSocket | null>(null);

  useEffect(() => {
    if (socket) {
      channelSocket.current = new ChannelSocket(socket);
    }
  }, [socket]);

  useEffect(() => {
    if (channelSocket.current) {
      channelSocket.current.joinChannel(
        groupId,
        channelId,
        user?._id as string,
      );
    }
    return () => {
      if (channelSocket.current) {
        channelSocket.current.leaveChannel(
          groupId,
          channelId,
          user?._id as string,
        );
      }
    };
  }, [channelSocket.current]);

  useEffect(() => {
    if (editor) {
      editor.canvas.on('object:modified', function (options) {
        console.log(options);
        if (options.target) {
          const modifiedObj = {
            ...options.target.toObject(),
            id: (options.target as any).id, // Include id here
          };
          designSocket.current?.designUpdatedEmitter(
            groupId,
            channelId,
            user?._id as string,
            modifiedObj,
          );
        }
      });

      editor.canvas.on('object:moving', function (options) {
        console.log(options);
        if (options.target) {
          const modifiedObj = {
            obj: options.target,
            id: (options.target as any).id,
          };
          designSocket.current?.designUpdatedEmitter(
            groupId,
            channelId,
            user?._id as string,
            modifiedObj,
          );
        }
      });

      modifyObj(editor);
      addObj(editor);
    }
  }, [editor?.canvas]);

  const addShape = (shape: string) => {
    if (!editor) return;
    let object: any;
    switch (shape) {
      case 'circle':
        object = new Circle({
          radius: 50,
          fill: 'red',
          left: 100,
          top: 100,
          id: uuid(),
        });
        break;
      case 'rectangle':
        object = new Rect({
          width: 100,
          height: 100,
          fill: 'blue',
          left: 100,
          id: uuid(),
        });
        break;
      case 'line': {
        const line = {
          x1: 100,
          y1: 100,
          x2: 100,
          y2: 200,
          stroke: 'black',
          strokeWidth: 2,
        };
        object = new Line([line.x1, line.y1, line.x2, line.y2], {
          stroke: line.stroke,
          strokeWidth: line.strokeWidth,
          id: uuid(),
        });

        break;
      }
      case 'text':
        object = new Textbox('Hello World', {
          left: 100,
          top: 100,
          fill: 'black',
          id: uuid(),
        });
        break;
      default:
        break;
    }
    if (object) {
      object.id = uuid();
      editor.canvas.add(object);
      editor.canvas.renderAll();
      designSocket.current?.designAddedEmitter(
        groupId,
        channelId,
        user?._id as string,
        { ...object.toObject(), id: object.id },
      );
    }
  };

  const clearCanvas = () => editor?.canvas.clear();

  return (
    <DesignCanvasContainer>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Design
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
        Use the tools below to create your design.
      </p>

      <div className="mb-6 flex gap-4">
        <button onClick={() => addShape('circle')} className="icon-button">
          <PencilSquareIcon className="size-6 text-secondary" />
        </button>
        <button onClick={() => addShape('rectangle')} className="icon-button">
          <Square2StackIcon className="size-6 text-primary" />
        </button>
        <button onClick={() => addShape('line')} className="icon-button">
          <ArrowPathIcon className="size-6 text-accent" />
        </button>
        <button onClick={() => addShape('text')} className="icon-button">
          <PhotoIcon className="size-6 text-blue-500" />
        </button>

        {/* Undo, Redo, Clear */}

        <button onClick={clearCanvas} className="icon-button">
          <TrashIcon className="size-6 text-red-500" />
        </button>
      </div>

      <FabricJSCanvas className="sample-canvas size-full" onReady={onReady} />
    </DesignCanvasContainer>
  );
};
