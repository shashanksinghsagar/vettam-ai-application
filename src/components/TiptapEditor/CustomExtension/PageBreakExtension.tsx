import { useEffect } from 'react';
import { Editor } from '@tiptap/react';

export const usePageDetection = (
  editor: Editor | null,
  pageHeight: number = 1056,
  onPageChange?: (pageNumber: number) => void
): void => {
  useEffect(() => {
    if (!editor) return;

    let lastPageCount = 1;

    const checkPages = (): void => {
      const editorEl = document.querySelector('.ProseMirror') as HTMLElement;
      if (!editorEl) return;

      const currentPages = Math.ceil(editorEl.scrollHeight / pageHeight);
      
      if (currentPages > lastPageCount) {
        lastPageCount = currentPages;
        onPageChange?.(currentPages);
      }
    };

    // Listen to editor updates
    const handleUpdate = (): void => {
      // Use requestAnimationFrame to avoid blocking
      requestAnimationFrame(checkPages);
    };

    editor.on('update', handleUpdate);
    editor.on('create', checkPages); // Initial check

    return () => {
      editor.off('update', handleUpdate);
      editor.off('create', checkPages);
    };
  }, [editor, pageHeight, onPageChange]);
};