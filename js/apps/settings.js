// Settings - System Configuration for aceOS

const settings = {
    launch() {
        const content = document.createElement('div');
        const systemInfo = AceSystem.getSystemInfo();
        
        content.innerHTML = `
            <style>
                .settings-container { padding: 2rem; }
                .settings-section { background: var(--background-light); padding: 1.5rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); }
                .settings-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(0, 255, 157, 0.1); }
                .settings-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
                .settings-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
                .settings-select { background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
            </style>
            <div class="settings-container">
                <h1 style="color: var(--primary-color); margin-bottom: 2rem;">⚙️ Settings</h1>
                
                <div class="settings-section">
                    <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">System Information</h2>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Version:</span>
                        <span style="color: var(--text-primary);">${systemInfo.version}</span>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Fingerprint:</span>
                        <span style="color: var(--text-primary); font-family: monospace;">${systemInfo.fingerprint}</span>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Storage Used:</span>
                        <span style="color: var(--text-primary);">${systemInfo.storage.kb} KB</span>
                    </div>
                </div>

                <div class="settings-section">
                    <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">Appearance</h2>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Theme:</span>
                        <select class="settings-select" id="theme-select">
                            <option value="default" ${systemInfo.config.theme === 'default' ? 'selected' : ''}>Default (Green)</option>
                            <option value="dark" ${systemInfo.config.theme === 'dark' ? 'selected' : ''}>Dark Purple</option>
                            <option value="blue" ${systemInfo.config.theme === 'blue' ? 'selected' : ''}>Blue</option>
                            <option value="red" ${systemInfo.config.theme === 'red' ? 'selected' : ''}>Red</option>
                        </select>
                    </div>
                </div>

                <div class="settings-section">
                    <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">Privacy & Security</h2>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Anonymous Mode:</span>
                        <span style="color: var(--primary-color);">${systemInfo.config.anonymousMode ? '✓ Enabled' : '✗ Disabled'}</span>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Server Directory:</span>
                        <span style="color: var(--text-primary);">${systemInfo.config.serverDirectory === 'private' ? '🔒 Private' : '🌐 Public'}</span>
                    </div>
                </div>

                <div class="settings-section">
                    <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">Updates</h2>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Auto-Update:</span>
                        <span style="color: var(--primary-color);">${systemInfo.config.autoUpdate ? '✓ Enabled' : '✗ Disabled'}</span>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Check for updates:</span>
                        <button class="settings-btn" id="check-updates-btn">Check Now</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">Data Management</h2>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Backup your data:</span>
                        <button class="settings-btn" id="export-btn">Export Backup</button>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Restore from backup:</span>
                        <button class="settings-btn" id="import-btn">Import Backup</button>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Clear all data:</span>
                        <button class="settings-btn" style="background: linear-gradient(135deg, #ff0066, #ff6600);" id="clear-btn">Clear Data</button>
                    </div>
                </div>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Settings',
            icon: '⚙️',
            app: 'settings',
            width: 700,
            height: 600,
            content: content
        });

        this.setupEventHandlers(window);
    },

    setupEventHandlers(window) {
        const themeSelect = window.element.querySelector('#theme-select');
        const checkUpdatesBtn = window.element.querySelector('#check-updates-btn');
        const exportBtn = window.element.querySelector('#export-btn');
        const importBtn = window.element.querySelector('#import-btn');
        const clearBtn = window.element.querySelector('#clear-btn');

        themeSelect.addEventListener('change', () => {
            AceSystem.applyTheme(themeSelect.value);
            Desktop.showNotification('Theme Changed', 'Your new theme has been applied');
        });

        checkUpdatesBtn.addEventListener('click', async () => {
            checkUpdatesBtn.textContent = 'Checking...';
            checkUpdatesBtn.disabled = true;
            
            const result = await AceSystem.checkForUpdates();
            Desktop.showNotification('Update Check', result.message);
            
            checkUpdatesBtn.textContent = 'Check Now';
            checkUpdatesBtn.disabled = false;
        });

        exportBtn.addEventListener('click', () => {
            AceSystem.exportData();
        });

        importBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    AceSystem.importData(file);
                }
            };
            input.click();
        });

        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all aceOS data? This cannot be undone!')) {
                AceStorage.clearAll();
                Desktop.showNotification('Data Cleared', 'All aceOS data has been removed. Reloading...');
                setTimeout(() => location.reload(), 2000);
            }
        });
    }
};

window.settings = settings;
