import React from 'react';
import { Button, Input, MessageList } from 'react-chat-elements';

import {
  ChatFooter,
  ChatHeader,
  ChatWindowContainer,
} from '@/features/ask-questions';

export const ChatWindow = () => {
  const messageListReferance = React.createRef();
  const inputReferance = React.createRef();
  const [inputValue, setInputValue] = React.useState('');

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <ChatWindowContainer>
      <ChatHeader>Chat Window</ChatHeader>

      <MessageList
        referance={messageListReferance}
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={[
          {
            position: 'right',
            type: 'text',
            notch: true,
            forwarded: true,
            replyButton: true,
            removeButton: true,
            titleColor: 'red',
            status: 'read',
            retracted: true,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            id: 1,
            title: 'Title',
            focus: true,
          },
          {
            position: 'left',
            type: 'text',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            id: 1,
            title: 'Title',
            focus: true,
            forwarded: true,
            replyButton: true,
            removeButton: true,
            titleColor: 'red',
            status: 'read',
            retracted: true,
            notch: true,
          },
        ]}
      ></MessageList>
      <ChatFooter>
        <Input
          referance={inputReferance}
          placeholder="Type here..."
          multiline={true}
          value={inputValue}
          maxHeight={100}
          onChange={onChangeInput}
          rightButtons={
            <Button color="white" backgroundColor="black" text="Send" />
          }
        />
      </ChatFooter>
    </ChatWindowContainer>
  );
};
