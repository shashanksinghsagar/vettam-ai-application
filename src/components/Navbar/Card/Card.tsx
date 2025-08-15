import { ISidebarType } from '../../../model/sidebar/ISidebarType';
import { useSidebarStore } from '../../../store/useSidebarStore';
import SidebarButton from '../SidebarButton/SidebarButton';


import './Card.css';

interface CardProps {
  sidebarType?: ISidebarType;
}

const Card = ({sidebarType} : CardProps) => {
  const data = useSidebarStore((state) => state.config?.data);
  const featureData = data?.sidebar_items_features;
  const toolsData = data?.sidebar_items_tools;

  return (
    <div key={sidebarType?.id} className="card">
      <div className="card-item">
        <div className='card-item-label'>{sidebarType?.label}</div>
      </div>
      {sidebarType?.label === 'Features' && (
        <SidebarButton items ={featureData ?? []} />
      )}

      {sidebarType?.label === 'Tools' && (
        <SidebarButton items ={toolsData ?? []} />
      )}
      {/* <SidebarButton/> */}
    </div>
  )
}

export default Card;