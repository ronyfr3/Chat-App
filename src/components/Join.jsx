import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='justify-center flex items-center h-screen '>
      <div className='border-[#FF5733] border-2 rounded-lg w-[300px] h-[300px] items-center flex justify-center flex-col relative'>
        <h1 className='absolute top-0 bg-[#FF5733] w-full rounded-t text-center font-[500] text-[18px] py-[0.5rem] text-white'>
          Enter Room
        </h1>

        <input
          placeholder='Name'
          className='placeholder-[#FF5733] border-2 rounded px-2 py-2 mb-3 border-[#FF5733] w-[80%]'
          type='text'
          name='name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder='Room Code'
          className='placeholder-[#FF5733] border-2 rounded px-2 py-2 border-[#FF5733] w-[80%]'
          type='number'
          name='room'
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />
        <Link
          to={!name ? '/' : !room ? '/' : `/chat?name=${name}&room=${room}`}
        >
          <button
            className='bg-[#FF5733] w-[35%] mt-5 w-[100px] h-[35px] rounded text-white'
            type='submit'
          >
            Go
          </button>
        </Link>

        <span className='absolute bottom-5 text-sm text-[#858586]'>
          To join, share this room code with a{' '}
          <span className='text-[#FF5733] font-[600]'>buddy</span>.
        </span>
      </div>
    </div>
  );
}
