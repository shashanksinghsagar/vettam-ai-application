import './EditorComponent.css'

import StarterKit from '@tiptap/starter-kit'
import { TextStyle} from '@tiptap/extension-text-style'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import React, { useState, useRef, useEffect } from 'react'
import PageMenuBar from '../MenuBar/PageMenuBar';
import TextMenuBar from '../MenuBar/TextMenuBar'
import Thumbnail from '../Thumbnail/Thumbnail';
import {AnyExtension } from '@tiptap/core';
import FontSize from '../../CustomExtension/FontFamilyExtension';
import FontFamily from '../../CustomExtension/FontFamilyExtension';
import CustomHeading from '../../CustomExtension/HeadingExtension';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';

import './EditorComponent.css';

const STORAGE_KEY = "multi-page-editor-";
const PAGE_HEIGHT = 720;

const EditorComponent: React.FC = () => {
  const [isTextOrPage, setIsTextOrPage] = useState("Text");
  const [pages, setPages] = useState<number[]>([1]);
  const [isCreatingPage, setIsCreatingPage] = useState<boolean>(false);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef(pages);
  const isCreatingPageRef = useRef(false);
  //const pageHeight: number = 720;
  
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit, TextStyle as AnyExtension,
      FontSize,
      FontFamily,
      CustomHeading,
      Color.configure({ types: ['textStyle'] }),
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
    ],
    content: `
      <h2>Hi there,</h2>
    `,
    onUpdate: ({ editor }) => {
      checkPageOverflow(editor);
      savePagesToStorage(editor);
    },
  })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Record<number, string>;
      const restoredPages = Object.keys(parsed).map(Number).sort((a, b) => a - b);
      setPages(restoredPages.length > 0 ? restoredPages : [1]);
      setTimeout(() => {
        Object.entries(parsed).forEach(([pageNum, html]) => {
          const pageEl = editorWrapperRef.current?.querySelector(
            `.a4-page-${pageNum} .ProseMirror`
          );
          if (pageEl) pageEl.innerHTML = html;
        });
      }, 50);
    }
  }, []);

  const savePagesToStorage = (editor: any) => {
    const pageElements = editorWrapperRef.current?.querySelectorAll(".a4-page") || [];
    const pageData: Record<number, string> = {};
    pageElements.forEach((pageEl, index) => {
      const html = pageEl.querySelector(".ProseMirror")?.innerHTML || "";
      pageData[index + 1] = html;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
  };

  const checkPageOverflow = (editor: any) => {
    const currentPageIndex = pagesRef.current.length - 1;
    const currentPage = editorWrapperRef.current?.querySelectorAll(".a4-page")[currentPageIndex];
    if (!currentPage) return;

    const contentEl = currentPage.querySelector(".ProseMirror") as HTMLElement;
    if (contentEl && contentEl.scrollHeight > PAGE_HEIGHT - 50 && !isCreatingPageRef.current) {
      isCreatingPageRef.current = true;
      setPages((prev) => [...prev, prev.length + 1]);

      setTimeout(() => {
        isCreatingPageRef.current = false;
        const lastPos = editor.state.doc.content.size;
        editor.commands.focus();
        editor.commands.setTextSelection(lastPos);
      }, 100);
    }
  };



  useEffect(() => {
  if (!editor || !editorWrapperRef.current || isCreatingPage) return;

  const checkPageOverflow = (): void => {
    // Only check the last (current) page
    const currentPageIndex = pages.length - 1;
    const currentPage = editorWrapperRef.current?.querySelectorAll('.a4-page')[currentPageIndex];
    
    if (!currentPage) return;
    
    const editorContent = currentPage.querySelector('.ProseMirror') as HTMLElement;
    
    if (editorContent && editorContent.scrollHeight > PAGE_HEIGHT - 50) { // 50px threshold
      setIsCreatingPage(true);
      
      // Create new page
      setPages((prev: number[]) => [...prev, prev.length + 1]);
      
      // Reset the flag after page creation
      setTimeout(() => {
        setIsCreatingPage(false);
        // Focus on the new page
        const newPageIndex = pages.length; // This will be the new page index
        const newPage = editorWrapperRef.current?.querySelectorAll('.a4-page')[newPageIndex];
        const newPageContent = newPage?.querySelector('.ProseMirror') as HTMLElement;
        
        if (newPageContent) {
          editor?.commands.focus();
          // Move cursor to the new page
          const lastPos = editor.state.doc.content.size;
          editor?.commands.setTextSelection(lastPos);
        }
      }, 100);
    }
  };

  // Debounced update handler to prevent excessive checks
  let timeoutId: NodeJS.Timeout;
  const handleUpdate = (): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => checkPageOverflow(), 150);
  };

  // Listen to editor updates
  editor.on('update', handleUpdate);
  
  // Cleanup function
  return () => {
    editor.off('update', handleUpdate);
    clearTimeout(timeoutId);
  };
  }, [editor, pages, isCreatingPage, PAGE_HEIGHT]);

  if (!editor) {
    return null;
  }

  function handleTextButton() {
    setIsTextOrPage("Text");
  }

  function handlePageButton() {
    setIsTextOrPage("Page");
  }

  return (
    <div className="editor-component">
      <div className='editor-extension'>
        <button className="text-extension" onClick={handleTextButton}>
          Text
        </button>
        <button className="page-extension" onClick={handlePageButton}>Page</button>
      </div>
      {isTextOrPage === "Text" ? (
        <TextMenuBar editor={editor} />
      ) : (
        <PageMenuBar editor={editor} />
      )}

      <div className='editor-wrapper-t'>
        {/* <div className='editor-wrapper'>
          <div className="a4-page">
            <EditorContent editor={editor} className='editor-content'/>
          </div>
        </div> */}
        <div className='editor-wrapper' ref={editorWrapperRef}>
          {pages.map((pageNum: number, index: number) => (
            <div key={pageNum} className={`a4-page a4-page-${pageNum}`}
             style={{
              minHeight: `${PAGE_HEIGHT}px`,
              maxHeight: `${PAGE_HEIGHT}px`,
              overflow: 'hidden',
              marginBottom: index < pages.length - 1 ? '20px' : '0',
              pageBreakAfter: 'always'
            }}>
              <EditorContent editor={editor} />
            </div>
          ))}
        </div>
        <div className='thumbnail-index-search-container'>
        <Thumbnail/>
      </div>
      </div>
    </div>
  )
}

export default EditorComponent