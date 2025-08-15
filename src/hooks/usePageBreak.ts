import { useEffect } from 'react';
import { Editor } from '@tiptap/react';

export const usePageBreak = (
  editor: Editor | null,
  onPageChange: (pageCount: number) => void,
  pageHeight: number = 842 // A4 height minus padding (1056 - 214)
) => {
  useEffect(() => {
    if (!editor) return;

    let lastPageCount = 1;

    const checkAndBreakPages = () => {
      const editorEl = document.querySelector('.ProseMirror') as HTMLElement;
      if (!editorEl) return;

      // Calculate how many pages we need
      const contentHeight = editorEl.scrollHeight;
      const newPageCount = Math.ceil(contentHeight / pageHeight);
      
      if (newPageCount > lastPageCount) {
        lastPageCount = newPageCount;
        
        // Insert page break markers in the content
        insertPageBreaks(editor, newPageCount, pageHeight);
        
        onPageChange(newPageCount);
      }
    };

    const insertPageBreaks = (editor: Editor, pageCount: number, pageHeight: number) => {
      const content = editor.getHTML();
      
      // Don't add breaks if they already exist
      if (content.includes('page-break-marker')) return;
      
      // Add CSS to force page breaks
      const style = document.createElement('style');
      style.textContent = `
        .page-break-marker {
          page-break-before: always;
          break-before: page;
          height: 0;
          margin: 0;
          padding: 0;
          border: none;
          display: block;
        }
      `;
      
      if (!document.querySelector('style[data-page-breaks]')) {
        style.setAttribute('data-page-breaks', 'true');
        document.head.appendChild(style);
      }
    };

    // Listen to editor updates with debouncing
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkAndBreakPages, 100);
    };

    editor.on('update', debouncedCheck);
    editor.on('create', debouncedCheck);
    
    return () => {
      editor.off('update', debouncedCheck);
      editor.off('create', debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, [editor, onPageChange, pageHeight]);
};