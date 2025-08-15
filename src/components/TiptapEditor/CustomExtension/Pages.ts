// extensions/Pages.ts
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

// Page format definitions
export const PAGE_FORMATS = {
  A4: {
    name: 'A4',
    width: 794,  // 21.0cm at 96dpi
    height: 1123, // 29.7cm at 96dpi
    margins: {
      top: 95,    // 2.5cm at 96dpi
      right: 76,  // 2.0cm at 96dpi  
      bottom: 95, // 2.5cm at 96dpi
      left: 76,   // 2.0cm at 96dpi
    }
  }
} as const;

export type PageFormat = keyof typeof PAGE_FORMATS;

interface HeaderFooterConfig {
  left?: string;
  center?: string;
  right?: string;
}

interface PagesOptions {
  pageFormat: typeof PAGE_FORMATS[PageFormat];
  onPageFormatChange?: (format: string) => void;
  header?: HeaderFooterConfig;
  footer?: HeaderFooterConfig;
  pageBreakBackground?: string;
  showPageNumbers?: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pages: {
      setPageFormat: (format: PageFormat) => ReturnType;
      insertPageBreak: () => ReturnType;
    };
  }
}

 const updatePageStyles = (format: typeof PAGE_FORMATS[PageFormat]) => {
    const root = document.documentElement;
    root.style.setProperty('--page-width', `${format.width}px`);
    root.style.setProperty('--page-height', `${format.height}px`);
    root.style.setProperty('--page-margin-top', `${format.margins.top}px`);
    root.style.setProperty('--page-margin-right', `${format.margins.right}px`);
    root.style.setProperty('--page-margin-bottom', `${format.margins.bottom}px`);
    root.style.setProperty('--page-margin-left', `${format.margins.left}px`);
  }

  const addPageStyles = (pageBreakBackground: string = '') => {
    const styleId = 'pages-extension-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .pages-container {
        background: #f5f5f5;
        min-height: 100vh;
        padding: 20px 0;
      }
      
      .page {
        margin: 0 auto 20px auto;
        page-break-after: always;
      }
      
      .page-break {
        page-break-before: always;
        break-before: page;
        height: 1px;
        background: ${pageBreakBackground};
        margin: 10px 0;
        position: relative;
      }
      
      .page-break::before {
        content: 'Page Break';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 0 10px;
        font-size: 10px;
        color: #666;
      }
      
      .ProseMirror {
        outline: none;
        font-family: 'Times New Roman', serif;
        font-size: 12pt;
        line-height: 1.6;
        min-height: 100%;
      }
      
      .ProseMirror p {
        margin: 0 0 1em 0;
      }
      
      .ProseMirror h1, .ProseMirror h2, .ProseMirror h3 {
        margin: 1.5em 0 0.5em 0;
      }
      
      @media print {
        .pages-container {
          background: white !important;
          padding: 0 !important;
        }
        
        .page {
          box-shadow: none !important;
          margin: 0 !important;
          page-break-after: always;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  const updatePageContainer = (pageCount: number, footer: any, header: any) => {
    const editorContainer = document.querySelector('.pages-container');
    if (!editorContainer) return;

    // Clear existing pages
    editorContainer.innerHTML = '';

    // Create pages
    for (let i = 1; i <= pageCount; i++) {
      const pageElement = createPageElement(i, pageCount, footer, header);
      editorContainer.appendChild(pageElement);
    }

    // Move editor content to first page
    const firstPage = editorContainer.querySelector('.page-content');
    const editorContent = document.querySelector('.ProseMirror');
    if (firstPage && editorContent && !firstPage.contains(editorContent)) {
      firstPage.appendChild(editorContent);
    }
  }

  const removePageStyles = () => {
    const style = document.getElementById('pages-extension-styles');
    if (style) {
      style.remove();
    }
  }

export const Pages = Extension.create<PagesOptions>({
  name: 'pages',

  addOptions(): PagesOptions {
    return {
      pageFormat: PAGE_FORMATS.A4,
      onPageFormatChange: undefined,
      header: undefined,
      footer: undefined,
      pageBreakBackground: '#f7f7f7',
      showPageNumbers: true,
    };
  },

  addStorage() {
    return {
      currentPages: 1,
      pageFormat: this.options.pageFormat,
    };
  },

  addCommands() {
    return {
      setPageFormat: (format: PageFormat) => ({ editor }) => {
        const newFormat = PAGE_FORMATS[format];
        this.storage.pageFormat = newFormat;
        this.options.onPageFormatChange?.(format);
        
        // Update CSS variables for new format
        updatePageStyles(newFormat);
        
        return true;
      },

      insertPageBreak: () => ({ commands }) => {
        return commands.insertContent('<div class="page-break"></div>');
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => this.editor.commands.insertPageBreak(),
    };
  },

 

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pages'),
        
        view: (view) => {
          // Initialize page styles
          updatePageStyles(this.options.pageFormat);
          
          // Add custom CSS
          addPageStyles();
          
          let currentPageCount = 1;
          
          const updatePageCount = () => {
            const contentHeight = view.dom.scrollHeight;
            const pageHeight = this.storage.pageFormat.height - 
                             this.storage.pageFormat.margins.top - 
                             this.storage.pageFormat.margins.bottom;
            
            const newPageCount = Math.ceil(contentHeight / pageHeight);
            
            if (newPageCount !== currentPageCount) {
              currentPageCount = newPageCount;
              this.storage.currentPages = newPageCount;
              
              // Trigger page update
              updatePageContainer(newPageCount, this.options.footer ? this.options.footer : '', this.options.header);
            }
          };

          // Debounced update function
          let timeoutId: NodeJS.Timeout;
          const debouncedUpdate = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updatePageCount, 100);
          };

          return {
            update: debouncedUpdate,
            destroy: () => {
              clearTimeout(timeoutId);
              removePageStyles();
            }
          };
        },
      }),
    ];
  },

  onCreate() {
    // Create pages container if it doesn't exist
    const editorElement = this.editor.view.dom.parentElement;
    if (!editorElement?.querySelector('.pages-container')) {
      const container = document.createElement('div');
      container.className = 'pages-container';
      
      // Wrap the editor
      editorElement?.appendChild(container);
      
      // Initial page setup
      setTimeout(() => updatePageContainer(1, this.options.footer,this.options.header), 100);
    }
  },

  onDestroy() {
    removePageStyles();
  },
});

// Helper function for header/footer configuration
export const threeColumnHeaderFooter = (config: HeaderFooterConfig): HeaderFooterConfig => {
  return {
    left: config.left || '',
    center: config.center || '',  
    right: config.right || '',
  };
};

const createPageElement = (pageNumber: number, totalPages: number,  footers: any, headers: any) => {
    const format = PAGE_FORMATS.A4;
    const page = document.createElement('div');
    page.className = 'page';
    page.style.cssText = `
      width: ${format.width}px;
      height: ${format.height}px;
      margin: 20px auto;
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    `;

    // Add header
    if (headers) {
      const header = createHeaderFooter('header', headers, pageNumber, totalPages);
      page.appendChild(header);
    }

    // Add content area
    const content = document.createElement('div');
    content.className = 'page-content';
    content.style.cssText = `
      padding: ${format.margins.top}px ${format.margins.right}px ${format.margins.bottom}px ${format.margins.left}px;
      height: ${format.height - format.margins.top - format.margins.bottom}px;
      overflow: hidden;
      position: relative;
    `;

    // For pages after the first, add content offset
    if (pageNumber > 1) {
      const contentHeight = format.height - format.margins.top - format.margins.bottom;
      content.style.position = 'relative';
      content.innerHTML = `
        <div style="
          position: absolute;
          top: ${-(contentHeight * (pageNumber - 1))}px;
          left: 0;
          right: 0;
          pointer-events: ${pageNumber === 1 ? 'auto' : 'none'};
        " class="page-content-offset">
        </div>
      `;
    }

    page.appendChild(content);

    // Add footer
    if (footers) {
      const footer = createHeaderFooter('footer', footers, pageNumber, totalPages);
      page.appendChild(footer);
    }

    return page;
  }

  const createHeaderFooter = (type: 'header' | 'footer', config: HeaderFooterConfig, pageNumber: number, totalPages: number) => {
    const format = PAGE_FORMATS.A4;
    const element = document.createElement('div');
    element.className = `page-${type}`;
    
    const topPosition = type === 'header' ? '10px' : `${format.height - 30}px`;
    
    element.style.cssText = `
      position: absolute;
      top: ${topPosition};
      left: ${format.margins.left}px;
      right: ${format.margins.right}px;
      height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #666;
      pointer-events: none;
    `;

    const processText = (text: string) => {
      return text
        .replace('{page}', pageNumber.toString())
        .replace('{total}', totalPages.toString());
    };

    element.innerHTML = `
      <div class="${type}-left">${processText(config.left || '')}</div>
      <div class="${type}-center">${processText(config.center || '')}</div>
      <div class="${type}-right">${processText(config.right || '')}</div>
    `;

    return element;
  }