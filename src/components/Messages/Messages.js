import React, { useEffect, useRef } from 'react';
import Message from './Message/Message';

const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
          <div ref={messagesEndRef} />
        </div>
      ))}
    </>
  );
};

export default Messages;
