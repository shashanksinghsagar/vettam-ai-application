import clockCounterIcon from '../../../../assets/Icons/Clockcounter.png';

import './ChatHistoryLabel.css'

const ChatHistoryLabel = () => {
  return (
    <div className="chat-history-label">
      <img src={clockCounterIcon} alt="ClockCounter"  className='clock-counter-icon'/>
      <div className="chat-history-label-text">Chat History</div>
    </div>
  )
}

export default ChatHistoryLabel;