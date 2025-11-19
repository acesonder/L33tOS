// webTrap - Secure Browser for aceOS
// Access encrypted content exclusive to aceOS

const webTrap = {
    bookmarks: [],
    history: [],
    currentUrl: '',
    tabs: [],

    // Launch webTrap browser
    launch() {
        const content = this.createBrowserUI();
        
        const window = WindowManager.createWindow({
            title: 'webTrap Browser',
            icon: '🌐',
            app: 'webTrap',
            width: 1000,
            height: 700,
            content: content
        });

        this.loadBookmarks();
        this.setupBrowserEvents(window);
        this.navigateTo('aceos://welcome');
    },

    // Create browser UI
    createBrowserUI() {
        const container = document.createElement('div');
        container.className = 'webtrap-browser';
        container.innerHTML = `
            <style>
                .webtrap-browser { display: flex; flex-direction: column; height: 100%; }
                .browser-toolbar { display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .browser-btn { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; transition: all 0.3s; }
                .browser-btn:hover { background: var(--background-dark); border-color: var(--primary-color); }
                .browser-url-bar { flex: 1; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; font-family: monospace; }
                .browser-content { flex: 1; overflow: auto; padding: 2rem; background: var(--background-dark); }
                .browser-tabs { display: flex; gap: 0.25rem; padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .browser-tab { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px 4px 0 0; cursor: pointer; }
                .browser-tab.active { background: var(--background-dark); border-bottom-color: transparent; }
                .bookmarks-bar { display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.1); flex-wrap: wrap; }
                .bookmark { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
                .bookmark:hover { background: var(--background-dark); border-color: var(--primary-color); }
            </style>
            <div class="browser-tabs">
                <div class="browser-tab active" data-tab="main">Welcome</div>
                <button class="browser-btn" id="new-tab-btn">+ New Tab</button>
            </div>
            <div class="browser-toolbar">
                <button class="browser-btn" id="back-btn">←</button>
                <button class="browser-btn" id="forward-btn">→</button>
                <button class="browser-btn" id="refresh-btn">↻</button>
                <input type="text" class="browser-url-bar" id="url-bar" placeholder="Enter aceOS URL (aceos://...)" value="aceos://welcome">
                <button class="browser-btn" id="go-btn">Go</button>
                <button class="browser-btn" id="bookmark-btn">⭐ Bookmark</button>
            </div>
            <div class="bookmarks-bar" id="bookmarks-bar"></div>
            <div class="browser-content" id="browser-content"></div>
        `;

        return container;
    },

    // Setup browser event handlers
    setupBrowserEvents(window) {
        const content = window.element.querySelector('#browser-content');
        const urlBar = window.element.querySelector('#url-bar');
        const goBtn = window.element.querySelector('#go-btn');
        const backBtn = window.element.querySelector('#back-btn');
        const forwardBtn = window.element.querySelector('#forward-btn');
        const refreshBtn = window.element.querySelector('#refresh-btn');
        const bookmarkBtn = window.element.querySelector('#bookmark-btn');
        const newTabBtn = window.element.querySelector('#new-tab-btn');

        goBtn.addEventListener('click', () => {
            this.navigateTo(urlBar.value, window);
        });

        urlBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.navigateTo(urlBar.value, window);
            }
        });

        backBtn.addEventListener('click', () => this.goBack(window));
        forwardBtn.addEventListener('click', () => this.goForward(window));
        refreshBtn.addEventListener('click', () => this.refresh(window));
        bookmarkBtn.addEventListener('click', () => this.addBookmark(window));
        newTabBtn.addEventListener('click', () => this.openNewTab());

        this.renderBookmarks(window);
    },

    // Navigate to URL
    navigateTo(url, window) {
        this.currentUrl = url;
        this.history.push(url);

        if (window) {
            const urlBar = window.element.querySelector('#url-bar');
            urlBar.value = url;
        }

        const content = this.getPageContent(url);
        if (window) {
            const contentEl = window.element.querySelector('#browser-content');
            contentEl.innerHTML = content;
        }
    },

    // Get page content based on URL
    getPageContent(url) {
        const pages = {
            'aceos://welcome': this.getWelcomePage(),
            'aceos://directory': this.getDirectoryPage(),
            'aceos://help': this.getHelpPage(),
            'aceos://settings': this.getSettingsPage()
        };

        // Check if it's a published site URL
        if (url.startsWith('aceos://sites/')) {
            return this.getPublishedSiteContent(url);
        }

        return pages[url] || `
            <div style="text-align: center; padding: 3rem;">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Page Not Found</h2>
                <p style="color: var(--text-secondary);">The aceOS URL "${url}" does not exist.</p>
                <p style="margin-top: 1rem;"><a href="#" onclick="webTrap.navigateTo('aceos://welcome'); return false;" style="color: var(--secondary-color);">Return to Welcome</a></p>
            </div>
        `;
    },

    // Get published site content
    getPublishedSiteContent(url) {
        const publishedSites = AceStorage.load('makeTrap_published') || [];
        const site = publishedSites.find(s => s.url === url);
        
        if (!site) {
            return `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Site Not Found</h2>
                    <p style="color: var(--text-secondary);">This site is no longer available.</p>
                    <p style="margin-top: 1rem;"><a href="#" onclick="webTrap.navigateTo('aceos://directory'); return false;" style="color: var(--secondary-color);">Return to Directory</a></p>
                </div>
            `;
        }

        // Increment view count
        site.views++;
        AceStorage.save('makeTrap_published', publishedSites);

        // Return the site HTML wrapped in an iframe-like container
        return `
            <div style="background: white; min-height: 100%; border-radius: 8px; overflow: hidden;">
                <div style="background: var(--background-medium); padding: 1rem; border-bottom: 1px solid rgba(0, 255, 157, 0.2); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 style="color: var(--primary-color); margin: 0;">${site.title}</h3>
                        <p style="color: var(--text-secondary); margin: 0.25rem 0 0 0; font-size: 0.85rem;">By ${site.author} | ${site.views} views</p>
                    </div>
                    <button onclick="webTrap.navigateTo('aceos://directory')" style="background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                        ← Back to Directory
                    </button>
                </div>
                <div style="background: white; padding: 0;">
                    ${site.html}
                </div>
            </div>
        `;
    },

    // Welcome page
    getWelcomePage() {
        // Get available marketplace data
        const marketplaceListings = AceStorage.load('marketPlace_listings') || [];
        const serverCount = marketplaceListings.filter(l => l.category === 'Services').length;
        
        return `
            <div style="max-width: 1000px; margin: 0 auto;">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem; text-align: center;">Welcome to webTrap</h1>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem; text-align: center;">
                    webTrap is the secure browser for aceOS. All content accessed through webTrap is encrypted and exclusive to aceOS users.
                </p>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">🌐 Available Servers</h2>
                <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3 style="color: var(--primary-color); margin: 0;">Active aceOS Servers</h3>
                        <span style="color: var(--secondary-color); font-size: 1.5rem; font-weight: bold;">${serverCount} Online</span>
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">Connect to servers hosted by aceOS users worldwide</p>
                    <button onclick="webTrap.navigateTo('aceos://directory')" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-weight: bold;">
                        Browse Server Directory
                    </button>
                </div>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">🛒 Marketplace</h2>
                <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3 style="color: var(--primary-color); margin: 0;">Marketplace Items</h3>
                        <span style="color: var(--secondary-color); font-size: 1.5rem; font-weight: bold;">${marketplaceListings.length} Available</span>
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">Browse and discover items hosted on this OS</p>
                    <button onclick="Desktop.launchApp('marketBrowser')" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-weight: bold;">
                        Open Marketplace Browser
                    </button>
                </div>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Quick Links</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <a href="#" onclick="webTrap.navigateTo('aceos://directory'); return false;" style="background: var(--background-light); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-decoration: none; color: white; transition: all 0.3s;">
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">🌐 Server Directory</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Browse available aceOS servers</p>
                    </a>
                    <a href="#" onclick="webTrap.navigateTo('aceos://help'); return false;" style="background: var(--background-light); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-decoration: none; color: white; transition: all 0.3s;">
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">❓ Help & Support</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Learn how to use webTrap</p>
                    </a>
                    <a href="#" onclick="webTrap.navigateTo('aceos://settings'); return false;" style="background: var(--background-light); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-decoration: none; color: white; transition: all 0.3s;">
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">⚙️ Settings</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Configure webTrap</p>
                    </a>
                </div>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Features</h2>
                <ul style="color: var(--text-secondary); line-height: 2;">
                    <li>🔒 End-to-end encryption</li>
                    <li>🛡️ Anonymous browsing</li>
                    <li>🎨 Customizable themes</li>
                    <li>📑 Bookmark management with drag-and-drop</li>
                    <li>🔌 Extension support (coming soon)</li>
                </ul>
            </div>
        `;
    },

    // Directory page
    getDirectoryPage() {
        // Load published sites from makeTrap
        const publishedSites = AceStorage.load('makeTrap_published') || [];
        
        let sitesHTML = '';
        if (publishedSites.length === 0) {
            sitesHTML = `
                <div style="background: var(--background-light); padding: 2rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-align: center;">
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">No sites are currently available in the directory.</p>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Use Make+Trap to create and publish your own site!</p>
                </div>
            `;
        } else {
            sitesHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    ${publishedSites.map(site => `
                        <div style="background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); border-radius: 8px; overflow: hidden; transition: all 0.3s; cursor: pointer;" onclick="webTrap.navigateTo('${site.url}')">
                            <div style="padding: 1.5rem;">
                                <h3 style="color: var(--primary-color); margin: 0 0 0.5rem 0; font-size: 1.1rem;">${site.title}</h3>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                    <span style="color: var(--text-secondary); font-size: 0.85rem;">👤 ${site.author}</span>
                                    <span style="color: var(--text-secondary); font-size: 0.85rem;">👁️ ${site.views} views</span>
                                </div>
                                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 0.5rem;">
                                    Published: ${new Date(site.publishedAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div style="background: var(--background-medium); padding: 0.75rem 1.5rem; border-top: 1px solid rgba(0, 255, 157, 0.1);">
                                <div style="color: var(--secondary-color); font-size: 0.85rem;">🌐 ${site.url}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        return `
            <div style="max-width: 1200px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div>
                        <h1 style="color: var(--primary-color); margin: 0 0 0.5rem 0;">Site Directory</h1>
                        <p style="color: var(--text-secondary); margin: 0;">Browse sites created and published by aceOS users worldwide</p>
                    </div>
                    <div style="color: var(--primary-color); font-size: 1.5rem; font-weight: bold;">
                        ${publishedSites.length} Live Sites
                    </div>
                </div>
                
                ${sitesHTML}
                
                <div style="margin-top: 3rem; padding: 2rem; background: var(--background-light); border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-align: center;">
                    <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Want to publish your own site?</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Use Make+Trap website builder to create amazing sites with drag-and-drop modules!</p>
                    <button onclick="Desktop.launchApp('makeTrap')" style="background: linear-gradient(135deg, #00ff9d, #00cc7d); color: #0a0a0f; border: none; padding: 0.75rem 2rem; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 1rem;">
                        ✏️ Open Make+Trap
                    </button>
                </div>
            </div>
        `;
    },

    // Help page
    getHelpPage() {
        return `
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem;">webTrap Help</h1>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Getting Started</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    webTrap is designed for accessing encrypted content within the aceOS ecosystem. All URLs use the aceos:// protocol.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Navigation</h2>
                <ul style="color: var(--text-secondary); line-height: 2;">
                    <li>Use the URL bar to enter aceOS addresses</li>
                    <li>Click bookmarks for quick access</li>
                    <li>Use back/forward buttons to navigate history</li>
                </ul>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Bookmarks</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    Click the star button to bookmark the current page. Bookmarks are stored locally and encrypted.
                </p>
            </div>
        `;
    },

    // Settings page
    getSettingsPage() {
        return `
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem;">webTrap Settings</h1>
                
                <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); margin-bottom: 1rem;">
                    <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Privacy</h3>
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer; margin-bottom: 0.5rem;">
                        <input type="checkbox" checked style="margin-right: 0.5rem;"> Anonymous mode enabled
                    </label>
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer;">
                        <input type="checkbox" checked style="margin-right: 0.5rem;"> Encrypt all data
                    </label>
                </div>

                <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2);">
                    <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Appearance</h3>
                    <p style="color: var(--text-secondary);">Theme customization coming soon...</p>
                </div>
            </div>
        `;
    },

    // Bookmark management
    loadBookmarks() {
        this.bookmarks = AceStorage.load('bookmarks') || [];
    },

    saveBookmarks() {
        AceStorage.save('bookmarks', this.bookmarks);
    },

    addBookmark(window) {
        const urlBar = window.element.querySelector('#url-bar');
        const url = urlBar.value;

        if (!this.bookmarks.find(b => b.url === url)) {
            const title = prompt('Bookmark title:', url);
            if (title) {
                this.bookmarks.push({ title, url });
                this.saveBookmarks();
                this.renderBookmarks(window);
                Desktop.showNotification('Bookmark Added', `"${title}" has been bookmarked`);
            }
        } else {
            Desktop.showNotification('Already Bookmarked', 'This page is already in your bookmarks');
        }
    },

    renderBookmarks(window) {
        const bookmarksBar = window.element.querySelector('#bookmarks-bar');
        bookmarksBar.innerHTML = this.bookmarks.map(bookmark => 
            `<div class="bookmark" onclick="webTrap.navigateTo('${bookmark.url}')">${bookmark.title}</div>`
        ).join('');
        
        // Enable drag-and-drop on the bookmarks bar
        this.setupBookmarksDragDrop(window);
    },

    // Setup drag-and-drop for bookmarks bar
    setupBookmarksDragDrop(window) {
        const bookmarksBar = window.element.querySelector('#bookmarks-bar');
        const urlBar = window.element.querySelector('#url-bar');
        
        // Make bookmarks bar a drop zone
        bookmarksBar.addEventListener('dragover', (e) => {
            e.preventDefault();
            bookmarksBar.style.background = 'rgba(0, 255, 157, 0.1)';
        });
        
        bookmarksBar.addEventListener('dragleave', (e) => {
            bookmarksBar.style.background = '';
        });
        
        bookmarksBar.addEventListener('drop', (e) => {
            e.preventDefault();
            bookmarksBar.style.background = '';
            
            const url = e.dataTransfer.getData('text/plain') || urlBar.value;
            if (url && url.startsWith('aceos://')) {
                if (!this.bookmarks.find(b => b.url === url)) {
                    const title = prompt('Bookmark title:', url);
                    if (title) {
                        this.bookmarks.push({ title, url });
                        this.saveBookmarks();
                        this.renderBookmarks(window);
                        Desktop.showNotification('Bookmark Added', `"${title}" has been bookmarked`);
                    }
                } else {
                    Desktop.showNotification('Already Bookmarked', 'This page is already in your bookmarks');
                }
            }
        });
        
        // Make URL bar draggable
        urlBar.setAttribute('draggable', 'true');
        urlBar.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', urlBar.value);
        });
    },

    // Navigation methods
    goBack(window) {
        // Simplified back navigation
        if (this.history.length > 1) {
            this.history.pop();
            const previousUrl = this.history[this.history.length - 1];
            this.navigateTo(previousUrl, window);
        }
    },

    goForward(window) {
        Desktop.showNotification('Forward', 'Forward navigation not yet implemented');
    },

    refresh(window) {
        this.navigateTo(this.currentUrl, window);
    },

    // Open new tab
    openNewTab() {
        this.launch();
    }
};

// Export for use in other modules
window.webTrap = webTrap;
