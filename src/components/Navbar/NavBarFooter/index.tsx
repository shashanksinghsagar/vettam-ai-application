import Notification from './Notification/Notification';
import Chat from './Chat/Chat';

import './index.css';

const NavBarFooter = () => {
  return (
    <div>
      <Notification/>
      <div className="notification-divider"></div>
      <Chat/>
    </div>
  )
}

export default NavBarFooter;