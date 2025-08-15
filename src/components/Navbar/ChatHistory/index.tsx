import ChatHistoryLabel from './ChatHistoryLabel/ChatHistoryLabel';
import TodayPanel  from './TodayPanel/TodayPanel';

const ChatHistory = () => {
  return (
    <div className='chat-history'>
      <ChatHistoryLabel/>
      <TodayPanel />
    </div>
  )
}

export default ChatHistory;