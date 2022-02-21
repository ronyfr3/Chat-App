import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import React from 'react';
import moment from 'moment';

const InfoBar = ({ name, room }) => (
  <div className='w-full bg-white shadow-lg px-2 py-1'>
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        <BsFillPersonFill className='text-[30px] text-[#D55F78]' />
        <div className='pl-1 leading-[10px]'>
          <p className='text-sm font-[500] text-[#D55F78] capitalize'>{name}</p>
          <p className='text-[11px] text-[#B3B3BB]'>
            Active {moment().format('h:mm a')}
          </p>
        </div>
      </div>
      <div>
        <Link
          to={`/video?name=${name}&room=${room}`}
          className=' flex flex-col items-center cursor-pointer'
        >
          <img src='/video.png' alt='Exit' width={28} height={28} />
          <p className='text-[11px] text-[#B3B3BB] capitalize'>go for video</p>
        </Link>
      </div>
      <Link to='/'>
        <ImExit className='text-[#D55F78] text-xl' />
      </Link>
    </div>
  </div>
);

export default InfoBar;
