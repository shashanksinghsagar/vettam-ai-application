import { useEditorState, type Editor } from "@tiptap/react";

import './MenuBar.css';

const TextMenuBar = ({ editor }: { editor: Editor}) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive('italic'),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isUnderline: ctx.editor.isActive('underline'),
      canUnderline: ctx.editor.can().chain().toggleUnderline().run(),
      isStrike: ctx.editor.isActive('strike'),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),
      isLink: ctx.editor.isActive('link'),
      canLink: ctx.editor.can().chain().toggleLink().run(),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isSuperScript: ctx.editor.isActive('superScript'),
      canSuperScript: ctx.editor.can().chain().toggleSuperscript().run(),
      isSubScript: ctx.editor.isActive('subScript'),
      canSubScript: ctx.editor.can().chain().toggleSubscript().run(),
    }),
  })

  if (!editor) return null;

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      editor.chain().focus().setFontSize(value).run();
    } else {
      editor.chain().focus().unsetFontSize().run();
    }
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      editor.chain().focus().setFontFamily(value).run();
    } else {
      editor.chain().focus().unsetFontFamily().run();
    }
  }

  const handleHeadingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const level = Number(event.target.value)

    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().setHeading({ level: level as any }).run();
    }
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <select onChange={handleFontFamilyChange} defaultValue="Arial" className="custom-font-family">
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
        </select>

        <select onChange={handleFontSizeChange} defaultValue="12px"  className="custom-font-size">
          <option value="8px">8px</option>
          <option value="12px">12px</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
        </select>

         <select
            onChange={handleHeadingChange}
            defaultValue="0"
            className="custom-heading-selector"
          >
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">H4</option>
            <option value="5">H5</option>
            <option value="6">H6</option>
          </select>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          className={editorState.isUnderline ? 'is-active' : ''}
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        >
          S
        </button>
        <button
          onClick={() => editor.chain().focus().toggleLink().run()}
          disabled={!editorState.canLink}
          className={editorState.isLink ? 'is-active' : ''}
        >
          Link
        </button>

        <select
          onChange={(e) => {
            const value = e.target.value
            if (value) {
              editor.chain().focus().setColor(value).run()
            }
          }}
          defaultValue="red"
          className="custom-color-selector"
        >
          <option value="red" style={{ color: 'red' }}>R</option>
          <option value="orange" style={{ color: 'orange' }}>O</option>
        </select>

        <button
          onClick={() => editor.chain().focus().toggleHighlight({ color: 'yellow' }).run()}
          title="Highlight Yellow"
          style={{
            backgroundColor: 'yellow',
            border: '1px solid #ccc',
            width: '24px',
            height: '24px',
            cursor: 'pointer'
          }}
        />
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          OL
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          BL
        </button>
        <span>aaa</span>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          disabled={!editorState.canSuperScript}
          className={editorState.isSuperScript ? 'is-active' : ''}
        >
          X²
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive('subscript') ? 'is-active' : ''}
        >
          X₂
        </button>
      </div>
    </div>
  );
};

export default TextMenuBar;
