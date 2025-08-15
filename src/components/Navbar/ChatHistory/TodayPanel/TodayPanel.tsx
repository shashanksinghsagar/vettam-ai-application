import React from 'react';
import TodayChat from './TodayChat';

import './TodayPanel.css';
import { useMessageStore } from '../../../../store/useMessageStore';
import CaretIcon from '../../../../assets/Icons/CaretLeft.png';

const TodayPanel = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const messageData = useMessageStore((state) => state.config?.data.today_messages)

  function handleDotButtonClick() {
    setIsOpen(!isOpen);
  }

   return (
    <div>
      <div className='today-header'>
        <span className='today-header-text'>Today</span>
        <button className="dropdown-btn" onClick={handleDotButtonClick}>
          {isOpen ? (
            <img src={CaretIcon} alt="Toggle" className='caret-icon-open' />
          ) : (
            <img src={CaretIcon} alt="Toggle" className='caret-icon-close' />
          )}
          
        </button>
      </div>
      {isOpen && messageData?.map((msg) => (
        <TodayChat key={msg.id} message = {msg}/>
      ))}
      <div className="view-more">View more</div>
    </div>
   );
}

export default TodayPanel;