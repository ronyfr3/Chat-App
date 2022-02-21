const Input = ({ setMessage, sendMessage, message }) => (
  <form className='w-full border-t-2 border-t-[#D55F78] relative shadow-md'>
    <input
      className='w-full pl-5 py-3 h-full placeholder-[#D55F78] text-sm'
      type='text'
      placeholder='Type a message...'
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === 'Enter' ? sendMessage(event) : null
      }
    />
    <button
      className='bg-[#D55F78] shadow-md w-[100px] h-full absolute right-0 font-[500] text-white'
      onClick={(e) => sendMessage(e)}
    >
      Send
    </button>
  </form>
);

export default Input;
