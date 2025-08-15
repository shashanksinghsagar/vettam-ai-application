import { IFeatures } from '../../../model/sidebar/IFeatures';  
import { ITools } from '../../../model/sidebar/ITools';
import {ReactComponent as WorkspaceIcon} from '../../../assets/Icons/svg/Workspace.svg';
import {ReactComponent as ResearchIcon} from '../../../assets/Icons/svg/Research.svg';
import {ReactComponent as TranslateIcon} from '../../../assets/Icons/svg/Translate.svg';
import {ReactComponent as WriteIcon} from '../../../assets/Icons/svg/Write.svg';
import {ReactComponent as EditorIcon} from '../../../assets/Icons/svg/Editor.svg';
import {ReactComponent as BookmarksIcon} from '../../../assets/Icons/svg/BookMarks.svg';

import './SidebarButton.css';

interface SidebarButtonProps {
  items: (IFeatures | ITools)[]
}

const SidebarButton = ({ items }: SidebarButtonProps) => {
    const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    Workspace: WorkspaceIcon,
    Research: ResearchIcon,
    Translate: TranslateIcon,
    Write: WriteIcon,
    Editor: EditorIcon,
    Bookmarks: BookmarksIcon,
  };

    return (
      <div className="sidebar-button-container">
      {items.map((item) => {
        const IconComponent = icons[item.label];
        return (
          <button key={item.id} className="sidebar-buttons">
            <IconComponent className="sidebar-icon" />
            {item.label}
          </button>
        );
      })}
    </div>
    );
};

export default SidebarButton