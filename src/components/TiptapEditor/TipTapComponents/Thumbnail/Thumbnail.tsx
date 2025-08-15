import React from 'react';
import CaretLeftIcon from '../../../../assets/Icons/CaretLeftIcon.png';
import PdfImage from '../../../../assets/Icons/pdf-image.png';
import QueryImage from '../../../../assets/Icons/query-chat.png';

import './Thumbnail.css'

const Thumbnail = () => {

  const btn = ['Thumbnail', 'Index', 'Search']

  const [activeBtn, setActiveBtn] = React.useState<string>(btn[0]);

  return (
    <div className='thumbnail-container'>
      <div className='all-buttons'>
        {btn.map((b) => (
          <button
            className={`btns ${activeBtn === b ? 'active' : ''}`}
            key={b}
            onClick={() => setActiveBtn(b)}
          >
            {b}
          </button>
        ))}

        <button className='caret-button'>
          <img src={CaretLeftIcon} alt='CaretIcon' className='caret-left-icon'/>
        </button>
      </div>
      <div className='divider'></div>
      <div className='pdf-image-container'>
        <img src={PdfImage} alt="Pdf" className='pdf-image' />
        <img src={PdfImage} alt="Pdf" className='pdf-image' />
        <img src={PdfImage} alt="Pdf" className='pdf-image' />
      </div>
      <div className='chat-box'>
        <img src={QueryImage} alt='Query' className='query-box-image'/>
      </div>
    </div>
  )
}

export default Thumbnail;