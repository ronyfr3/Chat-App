import { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { FcCallback } from 'react-icons/fc';
import Peer from 'simple-peer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';

const ENDPOINT = 'https://fr3-chat-app.herokuapp.com';
let socket;

const Chat = ({ location }) => {
  //for Message
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  //make a call
  const [call, setCall] = useState(false);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center min-h-screen w-screen lg:w-[570px]'>
        <InfoBar name={name} room={room} />
        <main
          className='flex-auto w-[96%] shadow-lg p-2'
          style={{ flex: '1 1 auto' }}
        >
          <Messages messages={messages} name={name} />
        </main>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
