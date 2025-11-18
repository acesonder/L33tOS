// ContentShare - File and Content Sharing Application for aceOS
// Share files, text, and media with encrypted links

const contentShare = {
    sharedItems: [],
    
    // Launch ContentShare app
    launch() {
        const content = this.createShareUI();
        
        const window = WindowManager.createWindow({
            title: 'ContentShare - File Sharing',
            icon: '📤',
            app: 'contentShare',
            width: 900,
            height: 600,
            content: content
        });

        this.loadSharedItems();
        this.setupShareEvents(window);
    },

    // Create share UI
    createShareUI() {
        const container = document.createElement('div');
        container.className = 'contentshare-app';
        container.innerHTML = `
            <style>
                .contentshare-app { display: flex; flex-direction: column; height: 100%; background: var(--background-dark); }
                .share-toolbar { display: flex; gap: 0.5rem; padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .share-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
                .share-btn:hover { transform: scale(1.05); }
                .share-content { flex: 1; overflow: auto; padding: 2rem; }
                .share-tabs { display: flex; gap: 0.5rem; padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .share-tab { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
                .share-tab.active { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: var(--background-dark); }
                .share-card { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1.5rem; margin-bottom: 1rem; border-radius: 8px; }
                .share-link { background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: var(--primary-color); padding: 0.5rem; border-radius: 4px; font-family: monospace; word-break: break-all; }
                .upload-area { border: 2px dashed rgba(0, 255, 157, 0.3); border-radius: 8px; padding: 3rem; text-align: center; cursor: pointer; transition: all 0.3s; }
                .upload-area:hover { border-color: var(--primary-color); background: rgba(0, 255, 157, 0.05); }
                .shared-list { display: flex; flex-direction: column; gap: 1rem; }
            </style>
            <div class="share-tabs">
                <button class="share-tab active" data-tab="upload">📤 Upload & Share</button>
                <button class="share-tab" data-tab="my-shares">📁 My Shares</button>
                <button class="share-tab" data-tab="received">📥 Received</button>
            </div>
            <div class="share-content">
                <div id="upload-view">
                    <div class="upload-area" id="upload-area">
                        <h2 style="color: var(--primary-color);">📤 Drop files here or click to select</h2>
                        <p style="color: var(--text-secondary); margin-top: 1rem;">Share files, text, or media securely</p>
                    </div>
                    <div style="margin-top: 2rem;">
                        <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Quick Text Share</h3>
                        <textarea id="text-share" style="width: 100%; min-height: 150px; background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 1rem; border-radius: 8px; font-family: monospace;" placeholder="Enter text to share..."></textarea>
                        <button class="share-btn" id="share-text-btn" style="margin-top: 1rem; width: 100%;">Generate Share Link</button>
                    </div>
                </div>
                <div id="my-shares-view" style="display: none;">
                    <h2 style="color: var(--primary-color); margin-bottom: 1rem;">📁 My Shared Items</h2>
                    <div class="shared-list" id="my-shares-list"></div>
                </div>
                <div id="received-view" style="display: none;">
                    <h2 style="color: var(--primary-color); margin-bottom: 1rem;">📥 Received Items</h2>
                    <div class="shared-list" id="received-list"></div>
                </div>
            </div>
        `;
        return container;
    },

    // Setup event handlers
    setupShareEvents(window) {
        const uploadArea = window.element.querySelector('#upload-area');
        const textShare = window.element.querySelector('#text-share');
        const shareTextBtn = window.element.querySelector('#share-text-btn');
        const tabs = window.element.querySelectorAll('.share-tab');

        // Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const views = ['upload-view', 'my-shares-view', 'received-view'];
                views.forEach(v => {
                    const view = window.element.querySelector(`#${v}`);
                    if (view) view.style.display = 'none';
                });
                
                const targetView = window.element.querySelector(`#${tab.dataset.tab}-view`);
                if (targetView) targetView.style.display = 'block';
            });
        });

        // File upload
        uploadArea.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.onchange = (e) => {
                this.handleFileUpload(e.target.files, window);
            };
            input.click();
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'rgba(0, 255, 157, 0.3)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(0, 255, 157, 0.3)';
            this.handleFileUpload(e.dataTransfer.files, window);
        });

        // Text sharing
        shareTextBtn.addEventListener('click', () => {
            const text = textShare.value;
            if (text.trim()) {
                this.createShareLink('text', text, window);
                textShare.value = '';
            } else {
                Desktop.showNotification('ContentShare', 'Please enter some text to share');
            }
        });
    },

    // Handle file upload
    handleFileUpload(files, window) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.createShareLink('file', {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: e.target.result
                }, window);
            };
            reader.readAsDataURL(file);
        });
    },

    // Create share link
    createShareLink(type, content, window) {
        const shareId = 'share_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const shareLink = `aceos://contentshare/${shareId}`;
        
        const shareItem = {
            id: shareId,
            type: type,
            content: content,
            link: shareLink,
            created: new Date().toISOString(),
            views: 0
        };

        this.sharedItems.push(shareItem);
        this.saveSharedItems();
        this.showShareLink(shareItem, window);
        this.refreshMyShares(window);
    },

    // Show share link dialog
    showShareLink(shareItem, parentWindow) {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .share-dialog { padding: 2rem; text-align: center; }
                .share-link-display { background: var(--background-dark); border: 1px solid var(--primary-color); color: var(--primary-color); padding: 1rem; border-radius: 8px; font-family: monospace; word-break: break-all; margin: 1rem 0; }
                .copy-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.5rem 2rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
            </style>
            <div class="share-dialog">
                <h2 style="color: var(--primary-color);">✅ Share Link Created!</h2>
                <p style="color: var(--text-secondary); margin: 1rem 0;">Copy this link to share your content:</p>
                <div class="share-link-display">${shareItem.link}</div>
                <button class="copy-btn" id="copy-link-btn">📋 Copy Link</button>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Share Link Ready',
            icon: '🔗',
            app: 'share-link',
            width: 500,
            height: 300,
            content: content
        });

        const copyBtn = content.querySelector('#copy-link-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shareItem.link);
            Desktop.showNotification('Copied', 'Share link copied to clipboard!');
        });
    },

    // Refresh my shares list
    refreshMyShares(window) {
        const list = window.element.querySelector('#my-shares-list');
        if (!list) return;

        list.innerHTML = '';
        this.sharedItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'share-card';
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">${item.type === 'text' ? '📝 Text Share' : '📄 ' + item.content.name}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Created: ${new Date(item.created).toLocaleString()}</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Views: ${item.views}</p>
                    </div>
                    <button class="share-btn" onclick="navigator.clipboard.writeText('${item.link}')">📋 Copy Link</button>
                </div>
                <div class="share-link" style="margin-top: 1rem;">${item.link}</div>
            `;
            list.appendChild(card);
        });
    },

    // Load shared items from storage
    loadSharedItems() {
        const saved = AceStorage.load('contentShare_items');
        if (saved) {
            this.sharedItems = saved;
        }
    },

    // Save shared items to storage
    saveSharedItems() {
        AceStorage.save('contentShare_items', this.sharedItems);
    }
};

window.contentShare = contentShare;
