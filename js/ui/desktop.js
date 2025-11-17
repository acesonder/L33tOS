// aceOS Desktop UI Manager
// Manages desktop interactions, start menu, and taskbar

const Desktop = {
    startMenuOpen: false,

    // Initialize desktop
    init() {
        this.setupStartButton();
        this.setupQuickLaunch();
        this.setupDesktopIcons();
        this.setupSystemTray();
        this.startClock();
    },

    // Setup start button
    setupStartButton() {
        const startBtn = document.getElementById('start-btn');
        const startMenu = document.getElementById('start-menu');

        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleStartMenu();
        });

        // Close start menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
                this.closeStartMenu();
            }
        });

        // Setup app launchers in start menu
        const appLaunchers = document.querySelectorAll('.app-launcher');
        appLaunchers.forEach(launcher => {
            launcher.addEventListener('click', () => {
                const appName = launcher.dataset.app;
                this.launchApp(appName);
                this.closeStartMenu();
            });
        });
    },

    // Toggle start menu
    toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        this.startMenuOpen = !this.startMenuOpen;
        
        if (this.startMenuOpen) {
            startMenu.classList.add('active');
        } else {
            startMenu.classList.remove('active');
        }
    },

    // Close start menu
    closeStartMenu() {
        const startMenu = document.getElementById('start-menu');
        startMenu.classList.remove('active');
        this.startMenuOpen = false;
    },

    // Setup quick launch buttons
    setupQuickLaunch() {
        const quickButtons = document.querySelectorAll('.quick-btn');
        quickButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const appName = btn.dataset.app;
                this.launchApp(appName);
            });
        });
    },

    // Setup desktop icons
    setupDesktopIcons() {
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => {
            icon.addEventListener('dblclick', () => {
                const appName = icon.dataset.app;
                this.launchApp(appName);
            });
        });
    },

    // Setup system tray
    setupSystemTray() {
        const encryptionStatus = document.getElementById('encryption-status');
        const networkStatus = document.getElementById('network-status');

        encryptionStatus.addEventListener('click', () => {
            this.showNotification('Encryption Active', 'All data is encrypted and secure');
        });

        networkStatus.addEventListener('click', () => {
            this.showNotification('Anonymous Network', 'You are connected via anonymous network');
        });
    },

    // Start clock
    startClock() {
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            document.getElementById('time-display').textContent = `${hours}:${minutes}`;
        };

        updateClock();
        setInterval(updateClock, 1000);
    },

    // Launch application
    launchApp(appName) {
        console.log(`Launching ${appName}...`);

        // Check if app is already open
        const existingWindow = WindowManager.getWindowByApp(appName);
        if (existingWindow) {
            if (existingWindow.minimized) {
                WindowManager.restoreWindow(existingWindow);
            } else {
                WindowManager.focusWindow(existingWindow);
            }
            return;
        }

        // Launch the app
        if (window[appName] && typeof window[appName].launch === 'function') {
            window[appName].launch();
        } else {
            console.warn(`App ${appName} not found or has no launch method`);
            this.showNotification('Coming Soon', `${appName} is not yet implemented`);
        }
    },

    // Show notification
    showNotification(title, message, duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(26, 26, 46, 0.98);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 255, 157, 0.3);
            border-radius: 8px;
            padding: 1rem 1.5rem;
            color: white;
            z-index: 10001;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            animation: slideIn 0.3s ease-out;
            min-width: 300px;
        `;

        notification.innerHTML = `
            <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">${title}</h4>
            <p style="margin: 0; color: var(--text-secondary);">${message}</p>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
};

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
window.Desktop = Desktop;
