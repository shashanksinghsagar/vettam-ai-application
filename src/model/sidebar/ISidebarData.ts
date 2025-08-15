import { ISidebarType } from './ISidebarType';
import { IFeatures } from './IFeatures';
import { ITools } from './ITools';

export interface ISidebarData {
  sidebar_type: ISidebarType[];
  sidebar_items_features: IFeatures[];
  sidebar_items_tools: ITools[];
}