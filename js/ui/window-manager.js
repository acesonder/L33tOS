// aceOS Window Manager
// Manages application windows with dragging, resizing, and state management

const WindowManager = {
    windows: [],
    zIndexCounter: 100,
    activeWindow: null,

    // Create a new window
    createWindow(options) {
        const windowId = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const window = {
            id: windowId,
            title: options.title || 'Untitled Window',
            icon: options.icon || '📄',
            app: options.app || 'unknown',
            x: options.x || 100,
            y: options.y || 100,
            width: options.width || 800,
            height: options.height || 600,
            minimized: false,
            maximized: false,
            element: null
        };

        // Create window element
        const windowEl = this.createWindowElement(window);
        window.element = windowEl;

        // Add to container
        const container = document.getElementById('window-container');
        container.appendChild(windowEl);

        // Store window
        this.windows.push(window);

        // Setup window interactions
        this.setupWindowDrag(window);
        this.setupWindowControls(window);

        // Show window with animation
        setTimeout(() => {
            windowEl.classList.add('active');
            this.focusWindow(window);
        }, 10);

        // Add content if provided
        if (options.content) {
            const contentEl = windowEl.querySelector('.window-content');
            if (typeof options.content === 'string') {
                contentEl.innerHTML = options.content;
            } else {
                contentEl.appendChild(options.content);
            }
        }

        return window;
    },

    // Create window DOM element
    createWindowElement(window) {
        const el = document.createElement('div');
        el.className = 'window';
        el.id = window.id;
        el.style.left = window.x + 'px';
        el.style.top = window.y + 'px';
        el.style.width = window.width + 'px';
        el.style.height = window.height + 'px';

        el.innerHTML = `
            <div class="window-titlebar">
                <div class="window-title">
                    <span class="icon">${window.icon}</span>
                    <span>${window.title}</span>
                </div>
                <div class="window-controls">
                    <button class="window-btn minimize" title="Minimize">−</button>
                    <button class="window-btn maximize" title="Maximize">□</button>
                    <button class="window-btn close" title="Close">×</button>
                </div>
            </div>
            <div class="window-content"></div>
        `;

        return el;
    },

    // Setup window dragging
    setupWindowDrag(window) {
        const titlebar = window.element.querySelector('.window-titlebar');
        let isDragging = false;
        let currentX, currentY, initialX, initialY;

        titlebar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-controls')) return;
            if (window.maximized) return;

            isDragging = true;
            initialX = e.clientX - window.x;
            initialY = e.clientY - window.y;
            
            this.focusWindow(window);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            window.x = currentX;
            window.y = currentY;

            window.element.style.left = currentX + 'px';
            window.element.style.top = currentY + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    },

    // Setup window control buttons
    setupWindowControls(window) {
        const minimizeBtn = window.element.querySelector('.window-btn.minimize');
        const maximizeBtn = window.element.querySelector('.window-btn.maximize');
        const closeBtn = window.element.querySelector('.window-btn.close');

        minimizeBtn.addEventListener('click', () => this.minimizeWindow(window));
        maximizeBtn.addEventListener('click', () => this.toggleMaximize(window));
        closeBtn.addEventListener('click', () => this.closeWindow(window));

        // Double-click titlebar to maximize
        const titlebar = window.element.querySelector('.window-titlebar');
        titlebar.addEventListener('dblclick', (e) => {
            if (!e.target.closest('.window-controls')) {
                this.toggleMaximize(window);
            }
        });
    },

    // Focus a window
    focusWindow(window) {
        this.windows.forEach(w => {
            w.element.style.zIndex = w.id === window.id ? ++this.zIndexCounter : w.element.style.zIndex;
        });
        this.activeWindow = window;
    },

    // Minimize window
    minimizeWindow(window) {
        window.minimized = true;
        window.element.style.opacity = '0';
        window.element.style.transform = 'scale(0.9)';
        window.element.style.pointerEvents = 'none';
    },

    // Restore window
    restoreWindow(window) {
        window.minimized = false;
        window.element.style.opacity = '1';
        window.element.style.transform = 'scale(1)';
        window.element.style.pointerEvents = 'all';
        this.focusWindow(window);
    },

    // Toggle maximize
    toggleMaximize(window) {
        window.maximized = !window.maximized;
        
        if (window.maximized) {
            window.element.classList.add('maximized');
        } else {
            window.element.classList.remove('maximized');
            window.element.style.left = window.x + 'px';
            window.element.style.top = window.y + 'px';
            window.element.style.width = window.width + 'px';
            window.element.style.height = window.height + 'px';
        }
    },

    // Close window
    closeWindow(window) {
        const index = this.windows.findIndex(w => w.id === window.id);
        if (index > -1) {
            window.element.classList.remove('active');
            setTimeout(() => {
                window.element.remove();
                this.windows.splice(index, 1);
            }, 300);
        }
    },

    // Get window by app name
    getWindowByApp(appName) {
        return this.windows.find(w => w.app === appName);
    },

    // Get all windows for an app
    getWindowsByApp(appName) {
        return this.windows.filter(w => w.app === appName);
    }
};

// Export for use in other modules
window.WindowManager = WindowManager;
