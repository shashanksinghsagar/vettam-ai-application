

import './Notification.css';
import notifyImage from '../../../../assets/Icons/image.png';
import bellIcon from '../../../../assets/Icons/bellIcon_all_white.png';

const Notification = () => {
  const arr = ['image1', 'image2', 'image3']
  return (
    <div className='notification'>
    <div className='notification-container'>
      <div className='notification-images'>
        {arr.map((img) => (
        <img src={notifyImage} alt={img} className='notification-image' key={img}/>
      ))}
      </div>
      <div className='notification-icon'>
        <img src={bellIcon} alt="Notifications" className="icon" />
        <span className="badge">12</span>
      </div>
    </div>
    </div>
  )
}

export default Notification;