import { Circle, Rect, Textbox, Triangle } from 'fabric';
import { FabricJSEditor } from 'fabricjs-react';
import { useContext, useEffect, useRef } from 'react';

import { SocketContext, SocketContextType } from '@/lib/socket-context.tsx';
import { DesignSocket } from '@/socket/design-socket.ts';

type DesignAlongProps = {
  groupId: string;
  channelId: string;
  userId: string;
  value: any;
};
export const useDesignSocket = () => {
  const { socket } = useContext(SocketContext) as SocketContextType;
  const designSocket = useRef<DesignSocket | null>(null);

  function addObj(editor: FabricJSEditor) {
    designSocket.current?.designAddListener((data: DesignAlongProps) => {
      const { value } = data;
      console.log('Received design-added event:', value);
      let object: any;
      if (value.type === 'Rectangle') {
        object = new Rect(value);
      } else if (value.type === 'Circle') {
        object = new Circle(value);
      } else if (value.type === 'Triangle') {
        object = new Triangle(value);
      } else if (value.type === 'Text') {
        object = new Textbox(value.text, value);
      }
      if (object) {
        editor.canvas.add(object);
        editor.canvas.renderAll();
      }
    });
  }

  function modifyObj(editor: FabricJSEditor) {
    designSocket.current?.designUpdateListener((data: DesignAlongProps) => {
      const { value } = data;
      console.log('Received design-modified event:', value);
      editor.canvas.getObjects().forEach((object) => {
        const objectId = (object as any).id; // Access id property
        console.log('Comparing:', objectId, value.id);
        if ((object as any).id === value.id) {
          console.log('Received design-modified event:', value);
          object.set(value);
          object.setCoords();
        }
      });
      editor.canvas.renderAll();
    });
  }

  useEffect(() => {
    if (socket) {
      designSocket.current = new DesignSocket(socket);
    }
    return () => {
      if (designSocket.current) {
        designSocket.current.designRemoveListener();
      }
    };
  }, [socket]);

  return {
    addObj,
    modifyObj,
    designSocket,
  };
};
