// makeTrap - WYSIWYG Editor for aceOS
// Create encrypted web pages and export as HTML/CSS/JS

const makeTrap = {
    currentContent: '',
    savedPages: [],

    // Launch makeTrap editor
    launch() {
        const content = this.createEditorUI();
        
        const window = WindowManager.createWindow({
            title: 'makeTrap Editor',
            icon: '✏️',
            app: 'makeTrap',
            width: 1100,
            height: 800,
            content: content
        });

        this.loadSavedPages();
        this.setupEditorEvents(window);
    },

    // Create editor UI
    createEditorUI() {
        const container = document.createElement('div');
        container.className = 'maketrap-editor';
        container.innerHTML = `
            <style>
                .maketrap-editor { display: flex; flex-direction: column; height: 100%; }
                .editor-toolbar { display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); flex-wrap: wrap; }
                .editor-btn { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem; }
                .editor-btn:hover { background: var(--background-dark); border-color: var(--primary-color); }
                .editor-content { display: flex; flex: 1; overflow: hidden; }
                .editor-panel { flex: 1; display: flex; flex-direction: column; border-right: 1px solid rgba(0, 255, 157, 0.2); }
                .editor-panel:last-child { border-right: none; }
                .panel-header { background: var(--background-medium); padding: 0.5rem 1rem; border-bottom: 1px solid rgba(0, 255, 157, 0.2); font-weight: bold; color: var(--primary-color); }
                .panel-content { flex: 1; overflow: auto; }
                .editor-textarea { width: 100%; height: 100%; background: var(--background-dark); color: white; border: none; padding: 1rem; font-family: 'Courier New', monospace; font-size: 0.9rem; resize: none; }
                .preview-frame { width: 100%; height: 100%; background: white; border: none; }
                .saved-pages { padding: 1rem; }
                .saved-page { background: var(--background-light); padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px; border: 1px solid rgba(0, 255, 157, 0.2); cursor: pointer; }
                .saved-page:hover { border-color: var(--primary-color); }
                .saved-page h4 { margin: 0 0 0.25rem 0; color: var(--primary-color); }
                .saved-page p { margin: 0; font-size: 0.85rem; color: var(--text-secondary); }
            </style>
            <div class="editor-toolbar">
                <button class="editor-btn" id="new-page-btn">📄 New Page</button>
                <button class="editor-btn" id="save-btn">💾 Save</button>
                <button class="editor-btn" id="export-btn">📤 Export HTML</button>
                <button class="editor-btn" id="load-template-btn">📋 Load Template</button>
                <div style="flex: 1;"></div>
                <button class="editor-btn" id="bold-btn"><b>B</b></button>
                <button class="editor-btn" id="italic-btn"><i>I</i></button>
                <button class="editor-btn" id="heading-btn">H1</button>
                <button class="editor-btn" id="link-btn">🔗</button>
                <button class="editor-btn" id="image-btn">🖼️</button>
            </div>
            <div class="editor-content">
                <div class="editor-panel">
                    <div class="panel-header">HTML Editor</div>
                    <div class="panel-content">
                        <textarea class="editor-textarea" id="html-editor" placeholder="Enter HTML content here..."></textarea>
                    </div>
                </div>
                <div class="editor-panel">
                    <div class="panel-header">CSS Editor</div>
                    <div class="panel-content">
                        <textarea class="editor-textarea" id="css-editor" placeholder="Enter CSS styles here..."></textarea>
                    </div>
                </div>
                <div class="editor-panel">
                    <div class="panel-header">Preview</div>
                    <div class="panel-content">
                        <iframe class="preview-frame" id="preview-frame"></iframe>
                    </div>
                </div>
            </div>
        `;

        return container;
    },

    // Setup editor event handlers
    setupEditorEvents(window) {
        const htmlEditor = window.element.querySelector('#html-editor');
        const cssEditor = window.element.querySelector('#css-editor');
        const previewFrame = window.element.querySelector('#preview-frame');

        // Real-time preview
        const updatePreview = () => {
            const html = htmlEditor.value;
            const css = cssEditor.value;
            
            const fullHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>${html}</body>
                </html>
            `;
            
            const blob = new Blob([fullHtml], { type: 'text/html' });
            previewFrame.src = URL.createObjectURL(blob);
        };

        htmlEditor.addEventListener('input', updatePreview);
        cssEditor.addEventListener('input', updatePreview);

        // Toolbar buttons
        const newPageBtn = window.element.querySelector('#new-page-btn');
        const saveBtn = window.element.querySelector('#save-btn');
        const exportBtn = window.element.querySelector('#export-btn');
        const loadTemplateBtn = window.element.querySelector('#load-template-btn');
        const boldBtn = window.element.querySelector('#bold-btn');
        const italicBtn = window.element.querySelector('#italic-btn');
        const headingBtn = window.element.querySelector('#heading-btn');
        const linkBtn = window.element.querySelector('#link-btn');
        const imageBtn = window.element.querySelector('#image-btn');

        newPageBtn.addEventListener('click', () => this.newPage(window));
        saveBtn.addEventListener('click', () => this.savePage(window));
        exportBtn.addEventListener('click', () => this.exportPage(window));
        loadTemplateBtn.addEventListener('click', () => this.loadTemplate(window));

        boldBtn.addEventListener('click', () => this.insertText(htmlEditor, '<b>', '</b>'));
        italicBtn.addEventListener('click', () => this.insertText(htmlEditor, '<i>', '</i>'));
        headingBtn.addEventListener('click', () => this.insertText(htmlEditor, '<h1>', '</h1>'));
        linkBtn.addEventListener('click', () => {
            const url = prompt('Enter URL:');
            if (url) this.insertText(htmlEditor, `<a href="${url}">`, '</a>');
        });
        imageBtn.addEventListener('click', () => {
            const url = prompt('Enter image URL:');
            if (url) this.insertText(htmlEditor, `<img src="${url}" alt="image">`, '');
        });

        // Load default template
        this.loadDefaultTemplate(window);
    },

    // Insert text helper
    insertText(textarea, before, after) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        
        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
        textarea.value = newText;
        textarea.focus();
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = end + before.length;
        
        // Trigger preview update
        textarea.dispatchEvent(new Event('input'));
    },

    // New page
    newPage(window) {
        const htmlEditor = window.element.querySelector('#html-editor');
        const cssEditor = window.element.querySelector('#css-editor');
        
        htmlEditor.value = '';
        cssEditor.value = '';
        this.loadDefaultTemplate(window);
    },

    // Save page
    savePage(window) {
        const htmlEditor = window.element.querySelector('#html-editor');
        const cssEditor = window.element.querySelector('#css-editor');
        
        const title = prompt('Page title:', 'Untitled Page');
        if (!title) return;

        const page = {
            id: Date.now(),
            title: title,
            html: htmlEditor.value,
            css: cssEditor.value,
            encrypted: true,
            createdAt: new Date().toISOString()
        };

        this.savedPages.push(page);
        this.savePagesToStorage();
        Desktop.showNotification('Page Saved', `"${title}" has been saved securely`);
    },

    // Export page as HTML
    exportPage(window) {
        const htmlEditor = window.element.querySelector('#html-editor');
        const cssEditor = window.element.querySelector('#css-editor');

        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page from makeTrap</title>
    <style>
${cssEditor.value}
    </style>
</head>
<body>
${htmlEditor.value}
</body>
</html>`;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'page.html';
        a.click();
        URL.revokeObjectURL(url);

        Desktop.showNotification('Page Exported', 'Your page has been exported as HTML');
    },

    // Load template
    loadTemplate(window) {
        const templates = {
            'Landing Page': {
                html: `<div class="hero">
    <h1>Welcome to My Site</h1>
    <p>This is a secure page created with makeTrap</p>
    <button>Get Started</button>
</div>
<div class="features">
    <div class="feature">
        <h3>Feature 1</h3>
        <p>Description here</p>
    </div>
    <div class="feature">
        <h3>Feature 2</h3>
        <p>Description here</p>
    </div>
    <div class="feature">
        <h3>Feature 3</h3>
        <p>Description here</p>
    </div>
</div>`,
                css: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.hero {
    text-align: center;
    padding: 100px 20px;
    color: white;
}
.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.hero button {
    background: white;
    color: #667eea;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 2rem;
}
.features {
    display: flex;
    gap: 2rem;
    padding: 3rem 2rem;
    background: white;
}
.feature {
    flex: 1;
    text-align: center;
    padding: 2rem;
}
.feature h3 {
    color: #667eea;
    margin-bottom: 1rem;
}`
            },
            'Blog Post': {
                html: `<article>
    <header>
        <h1>Blog Post Title</h1>
        <p class="meta">By Author Name | Date</p>
    </header>
    <img src="https://via.placeholder.com/800x400" alt="Featured image">
    <div class="content">
        <p>Your blog content goes here. This is a secure and private blog post created with makeTrap.</p>
        <p>Add more paragraphs, images, and formatting as needed.</p>
    </div>
</article>`,
                css: `body {
    font-family: Georgia, serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: #f5f5f5;
}
article {
    background: white;
    padding: 3rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
h1 {
    color: #333;
    margin-bottom: 0.5rem;
}
.meta {
    color: #666;
    font-style: italic;
    margin-bottom: 2rem;
}
img {
    width: 100%;
    height: auto;
    margin: 2rem 0;
}
.content p {
    margin-bottom: 1rem;
}`
            }
        };

        const templateName = prompt('Choose template:\n1. Landing Page\n2. Blog Post', '1');
        const templateKey = templateName === '2' ? 'Blog Post' : 'Landing Page';
        const template = templates[templateKey];

        if (template) {
            const htmlEditor = window.element.querySelector('#html-editor');
            const cssEditor = window.element.querySelector('#css-editor');
            
            htmlEditor.value = template.html;
            cssEditor.value = template.css;
            htmlEditor.dispatchEvent(new Event('input'));
        }
    },

    // Load default template
    loadDefaultTemplate(window) {
        const htmlEditor = window.element.querySelector('#html-editor');
        const cssEditor = window.element.querySelector('#css-editor');

        htmlEditor.value = `<div class="container">
    <h1>Welcome to makeTrap</h1>
    <p>Start creating your secure web page here.</p>
</div>`;

        cssEditor.value = `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 2rem;
    background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
    color: white;
}
.container {
    max-width: 800px;
    margin: 0 auto;
}
h1 {
    color: #00ff9d;
}`;

        htmlEditor.dispatchEvent(new Event('input'));
    },

    // Storage methods
    loadSavedPages() {
        this.savedPages = AceStorage.load('makeTrap_content') || [];
    },

    savePagesToStorage() {
        AceStorage.save('makeTrap_content', this.savedPages);
    }
};

// Export for use in other modules
window.makeTrap = makeTrap;
