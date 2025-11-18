// webTrap - Secure Browser for aceOS
// Access encrypted content exclusive to aceOS

const webTrap = {
    bookmarks: [],
    history: [],
    currentUrl: '',
    tabs: [],
    activeTabId: null,
    tabCounter: 0,
    currentWindow: null,
    wwwMode: false, // false = aceOS mode, true = WWW mode

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

        this.currentWindow = window;
        this.loadBookmarks();
        this.setupBrowserEvents(window);
        
        // Initialize with first tab
        this.createTab('Welcome', 'aceos://welcome');
    },

    // Create browser UI
    createBrowserUI() {
        const container = document.createElement('div');
        container.className = 'webtrap-browser';
        container.innerHTML = `
            <style>
                .webtrap-browser { display: flex; flex-direction: column; height: 100%; }
                .browser-toolbar { display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); align-items: center; }
                .browser-btn { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; transition: all 0.3s; white-space: nowrap; }
                .browser-btn:hover { background: var(--background-dark); border-color: var(--primary-color); }
                .browser-btn.active { background: linear-gradient(135deg, #00ff9d, #00cc7d); color: #0a0a0f; border-color: var(--primary-color); font-weight: bold; }
                .browser-url-bar { flex: 1; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; font-family: monospace; }
                .browser-content { flex: 1; overflow: auto; padding: 2rem; background: var(--background-dark); }
                .browser-tabs { display: flex; gap: 0.25rem; padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); overflow-x: auto; }
                .browser-tab { display: flex; align-items: center; gap: 0.5rem; background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px 4px 0 0; cursor: pointer; white-space: nowrap; max-width: 200px; }
                .browser-tab.active { background: var(--background-dark); border-bottom-color: transparent; }
                .browser-tab:hover { border-color: var(--primary-color); }
                .browser-tab .tab-title { overflow: hidden; text-overflow: ellipsis; }
                .browser-tab .tab-close { margin-left: auto; font-weight: bold; opacity: 0.6; }
                .browser-tab .tab-close:hover { opacity: 1; color: var(--primary-color); }
                .bookmarks-bar { display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.1); flex-wrap: wrap; }
                .bookmark { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
                .bookmark:hover { background: var(--background-dark); border-color: var(--primary-color); }
                .mode-indicator { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; background: var(--background-dark); border-radius: 4px; font-size: 0.85rem; }
                .mode-indicator.aceos-mode { color: var(--primary-color); }
                .mode-indicator.www-mode { color: #00ccff; }
            </style>
            <div class="browser-tabs" id="tabs-container">
                <button class="browser-btn" id="new-tab-btn">+ New Tab</button>
            </div>
            <div class="browser-toolbar">
                <button class="browser-btn" id="back-btn">←</button>
                <button class="browser-btn" id="forward-btn">→</button>
                <button class="browser-btn" id="refresh-btn">↻</button>
                <button class="browser-btn" id="home-btn">🏠</button>
                <input type="text" class="browser-url-bar" id="url-bar" placeholder="Enter aceOS URL (aceos://...)">
                <button class="browser-btn" id="go-btn">Go</button>
                <button class="browser-btn" id="www-mode-btn" title="Toggle between aceOS and WWW mode">🌐 aceOS Mode</button>
                <button class="browser-btn" id="bookmark-btn">⭐</button>
                <button class="browser-btn" id="history-btn">📜</button>
                <button class="browser-btn" id="tools-btn">🔧</button>
            </div>
            <div class="bookmarks-bar" id="bookmarks-bar"></div>
            <div class="browser-content" id="browser-content"></div>
        `;

        return container;
    },

    // Setup browser event handlers
    setupBrowserEvents(window) {
        const urlBar = window.element.querySelector('#url-bar');
        const goBtn = window.element.querySelector('#go-btn');
        const backBtn = window.element.querySelector('#back-btn');
        const forwardBtn = window.element.querySelector('#forward-btn');
        const refreshBtn = window.element.querySelector('#refresh-btn');
        const homeBtn = window.element.querySelector('#home-btn');
        const bookmarkBtn = window.element.querySelector('#bookmark-btn');
        const newTabBtn = window.element.querySelector('#new-tab-btn');
        const wwwModeBtn = window.element.querySelector('#www-mode-btn');
        const historyBtn = window.element.querySelector('#history-btn');
        const toolsBtn = window.element.querySelector('#tools-btn');

        goBtn.addEventListener('click', () => {
            const activeTab = this.getActiveTab();
            if (activeTab) {
                this.navigateTo(urlBar.value, activeTab.id);
            }
        });

        urlBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const activeTab = this.getActiveTab();
                if (activeTab) {
                    this.navigateTo(urlBar.value, activeTab.id);
                }
            }
        });

        backBtn.addEventListener('click', () => this.goBack());
        forwardBtn.addEventListener('click', () => this.goForward());
        refreshBtn.addEventListener('click', () => this.refresh());
        homeBtn.addEventListener('click', () => this.goHome());
        bookmarkBtn.addEventListener('click', () => this.addBookmark());
        newTabBtn.addEventListener('click', () => this.createNewTab());
        wwwModeBtn.addEventListener('click', () => this.toggleWWWMode());
        historyBtn.addEventListener('click', () => this.showHistory());
        toolsBtn.addEventListener('click', () => this.showTools());

        this.renderBookmarks(window);
    },

    // Tab Management Functions
    createTab(title, url) {
        const tabId = `tab-${++this.tabCounter}`;
        const tab = {
            id: tabId,
            title: title,
            url: url,
            history: [url],
            historyIndex: 0
        };
        
        this.tabs.push(tab);
        this.renderTabs();
        this.switchTab(tabId);
        this.navigateTo(url, tabId);
        
        return tab;
    },

    createNewTab() {
        const defaultUrl = this.wwwMode ? 'https://www.google.com' : 'aceos://welcome';
        this.createTab('New Tab', defaultUrl);
    },

    switchTab(tabId) {
        this.activeTabId = tabId;
        this.renderTabs();
        
        const tab = this.tabs.find(t => t.id === tabId);
        if (tab) {
            const urlBar = this.currentWindow.element.querySelector('#url-bar');
            urlBar.value = tab.url;
            
            const content = this.getPageContent(tab.url);
            const contentEl = this.currentWindow.element.querySelector('#browser-content');
            contentEl.innerHTML = content;
        }
    },

    closeTab(tabId) {
        const index = this.tabs.findIndex(t => t.id === tabId);
        if (index === -1) return;
        
        // Don't allow closing the last tab
        if (this.tabs.length === 1) {
            Desktop.showNotification('Cannot Close Tab', 'Cannot close the last tab');
            return;
        }
        
        this.tabs.splice(index, 1);
        
        // If we closed the active tab, switch to another
        if (tabId === this.activeTabId) {
            const newActiveTab = this.tabs[Math.max(0, index - 1)];
            this.switchTab(newActiveTab.id);
        } else {
            this.renderTabs();
        }
    },

    renderTabs() {
        const tabsContainer = this.currentWindow.element.querySelector('#tabs-container');
        const newTabBtn = tabsContainer.querySelector('#new-tab-btn');
        
        // Clear existing tabs (keep new tab button)
        tabsContainer.innerHTML = '';
        
        // Render tabs
        this.tabs.forEach(tab => {
            const tabEl = document.createElement('div');
            tabEl.className = `browser-tab${tab.id === this.activeTabId ? ' active' : ''}`;
            tabEl.innerHTML = `
                <span class="tab-title">${tab.title}</span>
                <span class="tab-close">×</span>
            `;
            
            tabEl.querySelector('.tab-title').addEventListener('click', () => {
                this.switchTab(tab.id);
            });
            
            tabEl.querySelector('.tab-close').addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeTab(tab.id);
            });
            
            tabsContainer.appendChild(tabEl);
        });
        
        // Re-add new tab button
        tabsContainer.appendChild(newTabBtn);
    },

    getActiveTab() {
        return this.tabs.find(t => t.id === this.activeTabId);
    },

    updateTabTitle(tabId, title) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (tab) {
            tab.title = title.substring(0, 30); // Limit title length
            this.renderTabs();
        }
    },

    // Navigate to URL
    navigateTo(url, tabId) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (!tab) return;

        // Validate URL based on mode
        if (!this.wwwMode && !url.startsWith('aceos://')) {
            // In aceOS mode, redirect non-aceOS URLs
            Desktop.showNotification('aceOS Mode', 'Switch to WWW Mode to access external URLs');
            return;
        }

        tab.url = url;
        
        // Add to tab's history
        if (tab.history[tab.historyIndex] !== url) {
            tab.history = tab.history.slice(0, tab.historyIndex + 1);
            tab.history.push(url);
            tab.historyIndex = tab.history.length - 1;
        }

        // Update URL bar if this is the active tab
        if (tabId === this.activeTabId) {
            const urlBar = this.currentWindow.element.querySelector('#url-bar');
            urlBar.value = url;
            
            const content = this.getPageContent(url);
            const contentEl = this.currentWindow.element.querySelector('#browser-content');
            contentEl.innerHTML = content;
            
            // Update tab title based on content
            this.updateTabTitle(tabId, this.getPageTitle(url));
        }
    },

    getPageTitle(url) {
        if (url.startsWith('aceos://')) {
            const titles = {
                'aceos://welcome': 'Welcome',
                'aceos://directory': 'Directory',
                'aceos://help': 'Help',
                'aceos://settings': 'Settings',
                'aceos://history': 'History',
                'aceos://tools': 'Tools'
            };
            return titles[url] || 'aceOS Page';
        }
        return url.replace(/^https?:\/\//, '').substring(0, 30);
    },

    // Get page content based on URL
    getPageContent(url) {
        // Handle WWW mode URLs
        if (this.wwwMode && (url.startsWith('http://') || url.startsWith('https://'))) {
            return `
                <div style="max-width: 800px; margin: 0 auto; text-align: center; padding: 3rem;">
                    <h2 style="color: var(--primary-color); margin-bottom: 1rem;">🌍 External Website</h2>
                    <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
                        You are attempting to access an external website. aceOS browser cannot directly load external content for security reasons.
                    </p>
                    <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); margin-bottom: 2rem;">
                        <div style="color: var(--text-secondary); word-break: break-all; font-family: monospace;">
                            ${url}
                        </div>
                    </div>
                    <div style="background: rgba(0, 204, 255, 0.1); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 204, 255, 0.3);">
                        <h3 style="color: #00ccff; margin-bottom: 1rem;">ℹ️ Information</h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">
                            To access external websites, please use a standard web browser. webTrap is designed for secure, encrypted aceOS content only.
                        </p>
                        <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
                            Switch back to <strong>aceOS Mode</strong> to browse secure aceOS content.
                        </p>
                    </div>
                </div>
            `;
        }

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
                <p style="margin-top: 1rem;"><a href="#" onclick="webTrap.navigateTo('aceos://welcome', webTrap.activeTabId); return false;" style="color: var(--secondary-color);">Return to Welcome</a></p>
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
                    <p style="margin-top: 1rem;"><a href="#" onclick="webTrap.navigateTo('aceos://directory', webTrap.activeTabId); return false;" style="color: var(--secondary-color);">Return to Directory</a></p>
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
                    <button onclick="webTrap.navigateTo('aceos://directory', webTrap.activeTabId)" style="background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
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
        return `
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem; text-align: center;">Welcome to webTrap</h1>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
                    webTrap is the secure browser for aceOS. All content accessed through webTrap is encrypted and exclusive to aceOS users.
                </p>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Quick Links</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <a href="#" onclick="webTrap.navigateTo('aceos://directory', webTrap.activeTabId); return false;" style="background: var(--background-light); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-decoration: none; color: white; transition: all 0.3s;">
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">🌐 Server Directory</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Browse available aceOS servers</p>
                    </a>
                    <a href="#" onclick="webTrap.navigateTo('aceos://help', webTrap.activeTabId); return false;" style="background: var(--background-light); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-decoration: none; color: white; transition: all 0.3s;">
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">❓ Help & Support</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Learn how to use webTrap</p>
                    </a>
                    <a href="#" onclick="webTrap.navigateTo('aceos://settings', webTrap.activeTabId); return false;" style="background: var(--background-light); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-decoration: none; color: white; transition: all 0.3s;">
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">⚙️ Settings</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Configure webTrap</p>
                    </a>
                </div>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Features</h2>
                <ul style="color: var(--text-secondary); line-height: 2;">
                    <li>🔒 End-to-end encryption</li>
                    <li>🛡️ Anonymous browsing</li>
                    <li>🎨 Customizable themes</li>
                    <li>📑 Bookmark management</li>
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
                        <div style="background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); border-radius: 8px; overflow: hidden; transition: all 0.3s; cursor: pointer;" onclick="webTrap.navigateTo('${site.url}', webTrap.activeTabId)">
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

    // WWW Mode Toggle
    toggleWWWMode() {
        this.wwwMode = !this.wwwMode;
        const wwwModeBtn = this.currentWindow.element.querySelector('#www-mode-btn');
        const urlBar = this.currentWindow.element.querySelector('#url-bar');
        
        if (this.wwwMode) {
            wwwModeBtn.textContent = '🌍 WWW Mode';
            wwwModeBtn.classList.add('active');
            urlBar.placeholder = 'Enter URL (https://...)';
            Desktop.showNotification('WWW Mode Enabled', 'You can now browse external websites. Note: External sites are not encrypted by aceOS.');
        } else {
            wwwModeBtn.textContent = '🌐 aceOS Mode';
            wwwModeBtn.classList.remove('active');
            urlBar.placeholder = 'Enter aceOS URL (aceos://...)';
            Desktop.showNotification('aceOS Mode Enabled', 'Browsing secure aceOS content only');
        }
    },

    // History Panel
    showHistory() {
        const allHistory = [];
        this.tabs.forEach(tab => {
            tab.history.forEach(url => {
                if (!allHistory.find(h => h.url === url)) {
                    allHistory.push({ url, title: this.getPageTitle(url) });
                }
            });
        });

        const historyHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem;">Browsing History</h1>
                ${allHistory.length === 0 ? 
                    '<p style="color: var(--text-secondary);">No history yet</p>' :
                    allHistory.map(item => `
                        <div style="background: var(--background-light); padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; border: 1px solid rgba(0, 255, 157, 0.2); cursor: pointer;" onclick="webTrap.navigateTo('${item.url}', '${this.activeTabId}')">
                            <div style="color: var(--primary-color); font-weight: bold;">${item.title}</div>
                            <div style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.25rem;">${item.url}</div>
                        </div>
                    `).join('')
                }
                <button onclick="webTrap.clearHistory()" style="margin-top: 2rem; background: var(--background-light); border: 1px solid rgba(255, 100, 100, 0.5); color: #ff6464; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer;">
                    Clear History
                </button>
            </div>
        `;

        const contentEl = this.currentWindow.element.querySelector('#browser-content');
        contentEl.innerHTML = historyHTML;
    },

    clearHistory() {
        this.tabs.forEach(tab => {
            tab.history = [tab.url];
            tab.historyIndex = 0;
        });
        Desktop.showNotification('History Cleared', 'Browsing history has been cleared');
        this.showHistory();
    },

    // Tools Panel
    showTools() {
        const toolsHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem;">Browser Tools</h1>
                
                <div style="display: grid; gap: 1rem;">
                    <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2);">
                        <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">🔖 Bookmarks</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">Manage your saved pages</p>
                        <button onclick="webTrap.showBookmarkManager()" style="background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                            Manage Bookmarks
                        </button>
                    </div>
                    
                    <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2);">
                        <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">📜 History</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">View your browsing history</p>
                        <button onclick="webTrap.showHistory()" style="background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                            View History
                        </button>
                    </div>
                    
                    <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2);">
                        <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">🔍 Search</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">Search aceOS content</p>
                        <input type="text" id="search-input" placeholder="Search..." style="width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem;">
                        <button onclick="webTrap.performSearch()" style="background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                            Search
                        </button>
                    </div>
                    
                    <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2);">
                        <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">📊 Statistics</h3>
                        <p style="color: var(--text-secondary);">Active tabs: ${this.tabs.length}</p>
                        <p style="color: var(--text-secondary);">Bookmarks: ${this.bookmarks.length}</p>
                        <p style="color: var(--text-secondary);">Mode: ${this.wwwMode ? 'WWW Mode' : 'aceOS Mode'}</p>
                    </div>
                </div>
            </div>
        `;

        const contentEl = this.currentWindow.element.querySelector('#browser-content');
        contentEl.innerHTML = toolsHTML;
    },

    showBookmarkManager() {
        const bookmarkHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem;">Bookmark Manager</h1>
                ${this.bookmarks.length === 0 ? 
                    '<p style="color: var(--text-secondary);">No bookmarks yet</p>' :
                    this.bookmarks.map((bookmark, index) => `
                        <div style="background: var(--background-light); padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; border: 1px solid rgba(0, 255, 157, 0.2); display: flex; justify-content: space-between; align-items: center;">
                            <div style="flex: 1; cursor: pointer;" onclick="webTrap.navigateTo('${bookmark.url}', '${this.activeTabId}')">
                                <div style="color: var(--primary-color); font-weight: bold;">${bookmark.title}</div>
                                <div style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.25rem;">${bookmark.url}</div>
                            </div>
                            <button onclick="webTrap.deleteBookmark(${index})" style="background: var(--background-dark); border: 1px solid rgba(255, 100, 100, 0.5); color: #ff6464; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-left: 1rem;">
                                Delete
                            </button>
                        </div>
                    `).join('')
                }
            </div>
        `;

        const contentEl = this.currentWindow.element.querySelector('#browser-content');
        contentEl.innerHTML = bookmarkHTML;
    },

    deleteBookmark(index) {
        this.bookmarks.splice(index, 1);
        this.saveBookmarks();
        this.renderBookmarks(this.currentWindow);
        this.showBookmarkManager();
        Desktop.showNotification('Bookmark Deleted', 'Bookmark has been removed');
    },

    performSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.value) {
            const query = searchInput.value;
            if (this.wwwMode) {
                this.navigateTo(`https://www.google.com/search?q=${encodeURIComponent(query)}`, this.activeTabId);
            } else {
                Desktop.showNotification('Search', 'aceOS content search not yet implemented. Switch to WWW mode for web search.');
            }
        }
    },

    // Bookmark management
    loadBookmarks() {
        this.bookmarks = AceStorage.load('bookmarks') || [];
    },

    saveBookmarks() {
        AceStorage.save('bookmarks', this.bookmarks);
    },

    addBookmark() {
        const activeTab = this.getActiveTab();
        if (!activeTab) return;

        const url = activeTab.url;

        if (!this.bookmarks.find(b => b.url === url)) {
            const title = prompt('Bookmark title:', activeTab.title);
            if (title) {
                this.bookmarks.push({ title, url });
                this.saveBookmarks();
                this.renderBookmarks(this.currentWindow);
                Desktop.showNotification('Bookmark Added', `"${title}" has been bookmarked`);
            }
        } else {
            Desktop.showNotification('Already Bookmarked', 'This page is already in your bookmarks');
        }
    },

    renderBookmarks(window) {
        const bookmarksBar = window.element.querySelector('#bookmarks-bar');
        bookmarksBar.innerHTML = this.bookmarks.map(bookmark => 
            `<div class="bookmark" onclick="webTrap.navigateTo('${bookmark.url}', '${this.activeTabId}')">${bookmark.title}</div>`
        ).join('');
    },

    // Navigation methods
    goBack() {
        const activeTab = this.getActiveTab();
        if (!activeTab) return;

        if (activeTab.historyIndex > 0) {
            activeTab.historyIndex--;
            const url = activeTab.history[activeTab.historyIndex];
            activeTab.url = url;
            
            const urlBar = this.currentWindow.element.querySelector('#url-bar');
            urlBar.value = url;
            
            const content = this.getPageContent(url);
            const contentEl = this.currentWindow.element.querySelector('#browser-content');
            contentEl.innerHTML = content;
        }
    },

    goForward() {
        const activeTab = this.getActiveTab();
        if (!activeTab) return;

        if (activeTab.historyIndex < activeTab.history.length - 1) {
            activeTab.historyIndex++;
            const url = activeTab.history[activeTab.historyIndex];
            activeTab.url = url;
            
            const urlBar = this.currentWindow.element.querySelector('#url-bar');
            urlBar.value = url;
            
            const content = this.getPageContent(url);
            const contentEl = this.currentWindow.element.querySelector('#browser-content');
            contentEl.innerHTML = content;
        }
    },

    goHome() {
        const activeTab = this.getActiveTab();
        if (!activeTab) return;
        
        const homeUrl = this.wwwMode ? 'https://www.google.com' : 'aceos://welcome';
        this.navigateTo(homeUrl, activeTab.id);
    },

    refresh() {
        const activeTab = this.getActiveTab();
        if (!activeTab) return;
        
        const content = this.getPageContent(activeTab.url);
        const contentEl = this.currentWindow.element.querySelector('#browser-content');
        contentEl.innerHTML = content;
        
        Desktop.showNotification('Refreshed', 'Page has been refreshed');
    }
};

// Export for use in other modules
window.webTrap = webTrap;
