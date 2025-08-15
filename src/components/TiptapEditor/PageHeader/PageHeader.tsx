import logo from '../../../assets/Icons/info.png';
import savedLogo from '../../../assets/Icons/saved.png';
import {ReactComponent as ChatTextLogo} from '../../../assets/Icons/svg/ChatText.svg';
import {ReactComponent as NotePencilLogo} from '../../../assets/Icons/svg/NotePencil.svg';

import './PageHeader.css';

const PageHeader = () => {
  return (
    <div className='page-header-container'>
      <div className='page-header-text'>
        <div className='header-text'>Olga Tellis v. Bombay Municipal Corporation (1985).docx</div>
        <img className='logo' src={logo} alt='Information'/>
        <img className='saved-logo' src={savedLogo} alt='Saved'/>
        <div className='saved-text'>Saved</div>        
      </div>
      <div className='header-button'>
        <button className='chat-text-button'>
          <ChatTextLogo className='chat-text-logo' />
        </button>
        <button className='note-pencil-button'>
          <NotePencilLogo className='note-pencil-logo' />
        </button>
      </div>

    </div>
  );
}

export default PageHeader;