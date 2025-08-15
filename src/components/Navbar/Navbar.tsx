import ChatButton from './ChatButton/ChatButton'
import Card from './Card/Card';
import { useSidebarStore } from '../../store/useSidebarStore';
import ChatHistory from './ChatHistory';
import NavBarFooter from './NavBarFooter/index';

import vettamLogo from '../../assets/Icons/vettam_icon.png';
import headerButtonIcon from '../../assets/Icons/header_icon.png';
import './Navbar.css';
import React from 'react';

const Navbar = () => {
  const sidebarType = useSidebarStore((state) => state.config?.data.sidebar_type);
  const [isOpen, setIsOpen] = React.useState(true);

  function handleHeaderButtonClick() {
    setIsOpen(!isOpen);
  }

  return ( 
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className='navbar-header'>
        {isOpen && (
        <div className='navbar-left'>
        <img src={vettamLogo} alt='Vettam' className='navbar-logo' />
        <div className='navbar-title'>Vettam.AI</div>
      </div>
     )}

     <button className='navbar-header-button' onClick={handleHeaderButtonClick}>
      <img src={headerButtonIcon} alt='Toggle' className='navbar-logo' />
     </button>
    </div>
      {isOpen && (
        <>
          <ChatButton />
          {sidebarType?.map((type) => (
          <Card key={type.id} sidebarType={type} />
          ))}
          <ChatHistory />
          <div className='navbar-footer'>
            <NavBarFooter/>
          </div>
        </>
      )}
    </div>
  );
};
export default Navbar;