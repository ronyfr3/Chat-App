import React from 'react';
import moment from 'moment';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='bg-[#D2EFB9] rounded-md my-3 p-2 shadow-sm'>
      <p className='font-[500] text-[12px] capitalize text-[#3A96F7]'>
        {trimmedName} •{' '}
        <span className='font-[400] text-[11px] text-[#808080] lowercase'>
          {moment().format('h:mm a')}
        </span>
      </p>
      <p className='pt-1 text-[15px] text-[#373737] break-all'>
        {ReactEmoji.emojify(text)}
      </p>
    </div>
  ) : (
    <div className='bg-[#C2E0FF] rounded-md my-3 p-2 shadow-sm'>
      <p className='font-[500] text-[12px] capitalize text-[#FF5733]'>
        {user} •{' '}
        <span className='font-[400] text-[11px] text-[#808080]'>
          {moment().format('h:mm a')}
        </span>
      </p>
      <p className='pt-1 text-[15px] text-[#373737] break-all'>
        {ReactEmoji.emojify(text)}
      </p>
    </div>
  );
};

export default Message;
