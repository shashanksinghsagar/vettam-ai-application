import type { Editor } from "@tiptap/react";
import PageOption from '../../../../assets/Icons/Page-option.png';

const PageMenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
        return <div>Loading editor...</div>;
    }  
  
  return (
      <div>
        <img src={PageOption} alt="PageOptionImage" className="page-option-image"/>
      </div>
    )
}

export default PageMenuBar;
