import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PhoneIcon from '@material-ui/icons/Phone';
import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { BsTelephoneForwardFill } from 'react-icons/bs';

const socket = io.connect('https://fr3-chat-app.herokuapp.com');
function Video() {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState(); //just provide {id:"" and active:true/false}
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //this useEffect set myvide=stream and set setMe=socket.id which from backend
  useEffect(() => {
    //allow pop up when first render for video audio
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log('stream', stream);
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    //takes id from backend
    socket.on('me', (id) => {
      console.log('id', id);
      setMe(id);
    });

    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, [me]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <div className='flex flex-col items-center w-screen h-screen overflow-hidden'>
        <div className='flex w-screen relative'>
          <div
            className={`w-full ${
              callAccepted &&
              !callEnded &&
              'w-[150px] h-[150px] absolute right-1 top-1 md:right-0 lg:right-0 lg:top-0 md:top-0 md:w-[50%] lg:w-[50%] md:relative lg:relative '
            }`}
          >
            {stream && (
              <video
                playsInline
                ref={myVideo}
                autoPlay
                className={`${
                  callAccepted &&
                  !callEnded &&
                  'rounded-2xl lg:rounded-[0] md:rounded-[0]'
                }`}
              />
            )}
          </div>
          {callAccepted && !callEnded ? (
            <div className='w-full md:w-[50%] lg:w-[50%]'>
              <video playsInline ref={userVideo} autoPlay />{' '}
            </div>
          ) : null}
        </div>

        <div className='flex items-center justify-center mt-4'>
          <div className={`flex ${callAccepted && !callEnded && 'hidden'}`}>
            <CopyToClipboard text={me}>
              <button className='bg-[#FF5733] px-2 py-1 rounded text-white font-[400]'>
                Copy ID
              </button>
            </CopyToClipboard>
            <input
              type='text'
              placeholder='paste the code'
              className='outline-none border-2 pl-1 ml-1 border-[#FF5733] rounded'
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-center'>
            {callAccepted && !callEnded ? (
              <button
                onClick={leaveCall}
                className='bg-[#FF5733] text-white font-[400] py-1 px-3 rounded-sm shadow mt-1'
              >
                End Call
              </button>
            ) : (
              <div className='border-2 border-[#008000] text-[#008000]  ml-2 py-1.5 cursor-pointer px-3 rounded'>
                <BsTelephoneForwardFill onClick={() => callUser(idToCall)} />
              </div>
            )}
          </div>
        </div>
        {receivingCall && !callAccepted ? (
          <div className='flex flex-col items-center mt-6'>
            <h1 className='animate-bounce text-lg text-[#808080]'>
              You have a call...
            </h1>
            <div className='flex items-center justify-center mt-1'>
              <button
                className='border-[#008000] border-2 text-[#008000] font-[400] mr-1 py-1 px-3 rounded-sm shadow mt-1'
                onClick={answerCall}
              >
                Answer
              </button>
              <button
                className='border-[#FF0000] border-2 text-[#FF0000] font-[400] ml-1 py-1 px-3 rounded-sm shadow mt-1'
                onClick={leaveCall}
              >
                Reject
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Video;
