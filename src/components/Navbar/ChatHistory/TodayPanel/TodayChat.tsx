
import {IMessage} from '../../../../model/message/IMessage';

import './TodayPanel.css';

interface TodayChatProps {
  message: IMessage;
}

const TodayChat = ({ message }: TodayChatProps) => {
  return (
    <div className='today-chat-container'>
      <div className='today-chat-row'>
        <span className='today-chat-text'>
        {message.message}
      </span>
      <button className='dot-button'>⋯</button>
      </div>
    </div>
  );
}

export default TodayChat;