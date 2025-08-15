import PageHeader from "./PageHeader/PageHeader"
import EditorComponent from "./TipTapComponents/EditorComponent/EditorComponent"

import './index.css';


export const TiptapEditor = () => {
  return (
    <div className="tiptap-editor-contaioner">
        <PageHeader/>
        <EditorComponent/>
    </div>
  )
}