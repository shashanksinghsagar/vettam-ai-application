
import chatImage from '../../../../assets/Icons/chatImage.png';
import settingButtonImage from '../../../../assets/Icons/settingButton.png';
import questionMarkImage from '../../../../assets/Icons/questionMarkButton.png';
import React from 'react';

import './Chat.css';

const Chat = () => {
  const name = 'Michael Smith';
  return (
    <div className='chat-container'>
      <div className='chat-left'>
        <div className='online-icon'>
          <img src={chatImage} alt="chatImage" className="chat-image" />
          <span className="chat-badge"></span>
        </div>
          <div className='chat-name'>{name}</div>
      </div>
      <div className='chat-right'>
        <button className='setting-button'>
          <img src={settingButtonImage} alt="settingButton" className="setting-button-image"/>
          </button>
        <button className='question-mark-button'>
          <img src={questionMarkImage} alt="questionMarkButton" className="question-mark-image"/>
          </button>
      </div>
    </div>
  )
}

export default Chat;
