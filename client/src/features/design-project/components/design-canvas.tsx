import {
  ArrowPathIcon,
  TrashIcon,
  PhotoIcon,
  Square2StackIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import { Textbox } from 'fabric'; // browser
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { useContext, useEffect, useRef } from 'react';

import { DesignCanvasContainer } from '@/features/design-project/styles/index.styled.ts';
import { SocketContext, SocketContextType } from '@/lib/socket-context.tsx';
import { DesignSocket } from '@/socket/design-socket.ts';

export const DesignCanvas = () => {
  const { editor, onReady } = useFabricJSEditor();
  const designSocket = useRef<DesignSocket | null>(null);
  const { socket } = useContext(SocketContext) as SocketContextType;

  useEffect(() => {
    if (socket) {
      designSocket.current = new DesignSocket(socket);
    }
  }, [socket]);

  const addShape = (shape: string) => {
    if (!editor) return;
    switch (shape) {
      case 'circle':
        editor.addCircle();
        break;
      case 'rectangle':
        editor.addRectangle();
        break;
      case 'line':
        editor.addLine();
        break;
      case 'text':
        editor.canvas.add(
          new Textbox('Type here', {
            left: 100,
            top: 100,
            width: 200,
            fontSize: 20,
          }),
        );
        break;
      default:
        break;
    }
  };

  const clearCanvas = () => editor?.canvas.clear();

  const downloadCanvas = () => {
    if (!editor) return;

    const dataURL = editor.canvas.toDataURL({
      format: 'png',
      multiplier: 2,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    link.click();
  };

  return (
    <DesignCanvasContainer>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Design
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
        Use the tools below to create your design.
      </p>

      <div className="mb-6 flex gap-4">
        {/* Add Shape Buttons */}
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

        {/* Download Canvas */}
        <button onClick={downloadCanvas} className="icon-button">
          <ArrowPathIcon className="size-6 text-green-500" />
        </button>
      </div>

      <FabricJSCanvas className="sample-canvas size-full" onReady={onReady} />
    </DesignCanvasContainer>
  );
};
