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
                        <span style="color: var(--text-secondary);">Theme Category:</span>
                        <select class="settings-select" id="theme-category-select">
                            <option value="all">All Themes (50)</option>
                            <option value="original">Original (4)</option>
                            <option value="neon">Neon (6)</option>
                            <option value="pastel">Pastel (6)</option>
                            <option value="dark">Dark (6)</option>
                            <option value="nature">Nature (6)</option>
                            <option value="professional">Professional (6)</option>
                            <option value="gaming">Gaming (6)</option>
                            <option value="vibrant">Vibrant (6)</option>
                            <option value="light">Light (4)</option>
                        </select>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Theme:</span>
                        <select class="settings-select" id="theme-select">
                            <optgroup label="Original Themes">
                                <option value="default" ${systemInfo.config.theme === 'default' ? 'selected' : ''}>Default (Green)</option>
                                <option value="dark" ${systemInfo.config.theme === 'dark' ? 'selected' : ''}>Dark Purple</option>
                                <option value="blue" ${systemInfo.config.theme === 'blue' ? 'selected' : ''}>Blue</option>
                                <option value="red" ${systemInfo.config.theme === 'red' ? 'selected' : ''}>Red</option>
                            </optgroup>
                            <optgroup label="Neon Themes">
                                <option value="neon-pink" ${systemInfo.config.theme === 'neon-pink' ? 'selected' : ''}>Neon Pink</option>
                                <option value="neon-green" ${systemInfo.config.theme === 'neon-green' ? 'selected' : ''}>Neon Green</option>
                                <option value="neon-orange" ${systemInfo.config.theme === 'neon-orange' ? 'selected' : ''}>Neon Orange</option>
                                <option value="neon-purple" ${systemInfo.config.theme === 'neon-purple' ? 'selected' : ''}>Neon Purple</option>
                                <option value="neon-blue" ${systemInfo.config.theme === 'neon-blue' ? 'selected' : ''}>Neon Blue</option>
                                <option value="neon-yellow" ${systemInfo.config.theme === 'neon-yellow' ? 'selected' : ''}>Neon Yellow</option>
                            </optgroup>
                            <optgroup label="Pastel Themes">
                                <option value="pastel-mint" ${systemInfo.config.theme === 'pastel-mint' ? 'selected' : ''}>Pastel Mint</option>
                                <option value="pastel-lavender" ${systemInfo.config.theme === 'pastel-lavender' ? 'selected' : ''}>Pastel Lavender</option>
                                <option value="pastel-peach" ${systemInfo.config.theme === 'pastel-peach' ? 'selected' : ''}>Pastel Peach</option>
                                <option value="pastel-sky" ${systemInfo.config.theme === 'pastel-sky' ? 'selected' : ''}>Pastel Sky</option>
                                <option value="pastel-rose" ${systemInfo.config.theme === 'pastel-rose' ? 'selected' : ''}>Pastel Rose</option>
                                <option value="pastel-lemon" ${systemInfo.config.theme === 'pastel-lemon' ? 'selected' : ''}>Pastel Lemon</option>
                            </optgroup>
                            <optgroup label="Dark Themes">
                                <option value="midnight" ${systemInfo.config.theme === 'midnight' ? 'selected' : ''}>Midnight</option>
                                <option value="charcoal" ${systemInfo.config.theme === 'charcoal' ? 'selected' : ''}>Charcoal</option>
                                <option value="obsidian" ${systemInfo.config.theme === 'obsidian' ? 'selected' : ''}>Obsidian</option>
                                <option value="noir" ${systemInfo.config.theme === 'noir' ? 'selected' : ''}>Noir</option>
                                <option value="deep-purple" ${systemInfo.config.theme === 'deep-purple' ? 'selected' : ''}>Deep Purple</option>
                                <option value="deep-blue" ${systemInfo.config.theme === 'deep-blue' ? 'selected' : ''}>Deep Blue</option>
                            </optgroup>
                            <optgroup label="Nature Themes">
                                <option value="forest" ${systemInfo.config.theme === 'forest' ? 'selected' : ''}>Forest</option>
                                <option value="ocean" ${systemInfo.config.theme === 'ocean' ? 'selected' : ''}>Ocean</option>
                                <option value="sunset" ${systemInfo.config.theme === 'sunset' ? 'selected' : ''}>Sunset</option>
                                <option value="aurora" ${systemInfo.config.theme === 'aurora' ? 'selected' : ''}>Aurora</option>
                                <option value="desert" ${systemInfo.config.theme === 'desert' ? 'selected' : ''}>Desert</option>
                                <option value="garden" ${systemInfo.config.theme === 'garden' ? 'selected' : ''}>Garden</option>
                            </optgroup>
                            <optgroup label="Professional Themes">
                                <option value="corporate" ${systemInfo.config.theme === 'corporate' ? 'selected' : ''}>Corporate</option>
                                <option value="slate" ${systemInfo.config.theme === 'slate' ? 'selected' : ''}>Slate</option>
                                <option value="steel" ${systemInfo.config.theme === 'steel' ? 'selected' : ''}>Steel</option>
                                <option value="silver" ${systemInfo.config.theme === 'silver' ? 'selected' : ''}>Silver</option>
                                <option value="platinum" ${systemInfo.config.theme === 'platinum' ? 'selected' : ''}>Platinum</option>
                                <option value="executive" ${systemInfo.config.theme === 'executive' ? 'selected' : ''}>Executive</option>
                            </optgroup>
                            <optgroup label="Gaming Themes">
                                <option value="cyber" ${systemInfo.config.theme === 'cyber' ? 'selected' : ''}>Cyber</option>
                                <option value="matrix" ${systemInfo.config.theme === 'matrix' ? 'selected' : ''}>Matrix</option>
                                <option value="arcade" ${systemInfo.config.theme === 'arcade' ? 'selected' : ''}>Arcade</option>
                                <option value="retro" ${systemInfo.config.theme === 'retro' ? 'selected' : ''}>Retro</option>
                                <option value="synthwave" ${systemInfo.config.theme === 'synthwave' ? 'selected' : ''}>Synthwave</option>
                                <option value="vaporwave" ${systemInfo.config.theme === 'vaporwave' ? 'selected' : ''}>Vaporwave</option>
                            </optgroup>
                            <optgroup label="Vibrant Themes">
                                <option value="tropical" ${systemInfo.config.theme === 'tropical' ? 'selected' : ''}>Tropical</option>
                                <option value="candy" ${systemInfo.config.theme === 'candy' ? 'selected' : ''}>Candy</option>
                                <option value="rainbow" ${systemInfo.config.theme === 'rainbow' ? 'selected' : ''}>Rainbow</option>
                                <option value="electric" ${systemInfo.config.theme === 'electric' ? 'selected' : ''}>Electric</option>
                                <option value="flame" ${systemInfo.config.theme === 'flame' ? 'selected' : ''}>Flame</option>
                                <option value="cosmic" ${systemInfo.config.theme === 'cosmic' ? 'selected' : ''}>Cosmic</option>
                            </optgroup>
                            <optgroup label="Light Themes">
                                <option value="pearl" ${systemInfo.config.theme === 'pearl' ? 'selected' : ''}>Pearl</option>
                                <option value="cream" ${systemInfo.config.theme === 'cream' ? 'selected' : ''}>Cream</option>
                                <option value="cotton" ${systemInfo.config.theme === 'cotton' ? 'selected' : ''}>Cotton</option>
                                <option value="snow" ${systemInfo.config.theme === 'snow' ? 'selected' : ''}>Snow</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Preview Theme:</span>
                        <button class="settings-btn" id="theme-preview-btn">Preview Gallery</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">User Profile</h2>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Profile Name:</span>
                        <input type="text" class="settings-select" id="profile-name" value="${systemInfo.config.profileName || 'Anonymous User'}" style="flex: 1;" />
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Profile Avatar:</span>
                        <select class="settings-select" id="profile-avatar">
                            <option value="🔒">🔒 Lock</option>
                            <option value="👤">👤 User</option>
                            <option value="🎭">🎭 Mask</option>
                            <option value="🦊">🦊 Fox</option>
                            <option value="🐺">🐺 Wolf</option>
                            <option value="🦁">🦁 Lion</option>
                            <option value="🐉">🐉 Dragon</option>
                            <option value="👽">👽 Alien</option>
                            <option value="🤖">🤖 Robot</option>
                            <option value="👻">👻 Ghost</option>
                        </select>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Export Profile:</span>
                        <button class="settings-btn" id="export-profile-btn">Export Profile</button>
                    </div>
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Import Profile:</span>
                        <button class="settings-btn" id="import-profile-btn">Import Profile</button>
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
                    <div class="settings-row">
                        <span style="color: var(--text-secondary);">Password Lock:</span>
                        <button class="settings-btn" id="password-lock-btn">${systemInfo.config.passwordLock ? 'Change Password' : 'Set Password'}</button>
                    </div>
                    ${systemInfo.config.passwordLock ? `<div class="settings-row">
                        <span style="color: var(--text-secondary);">Lock Status:</span>
                        <span style="color: var(--primary-color);">🔒 Enabled</span>
                    </div>` : ''}
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
                        <span style="color: var(--text-secondary);">Download OS Package:</span>
                        <button class="settings-btn" id="download-os-btn">📦 Download OS</button>
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
        const themeCategorySelect = window.element.querySelector('#theme-category-select');
        const themePreviewBtn = window.element.querySelector('#theme-preview-btn');
        const profileName = window.element.querySelector('#profile-name');
        const profileAvatar = window.element.querySelector('#profile-avatar');
        const exportProfileBtn = window.element.querySelector('#export-profile-btn');
        const importProfileBtn = window.element.querySelector('#import-profile-btn');
        const passwordLockBtn = window.element.querySelector('#password-lock-btn');
        const checkUpdatesBtn = window.element.querySelector('#check-updates-btn');
        const exportBtn = window.element.querySelector('#export-btn');
        const importBtn = window.element.querySelector('#import-btn');
        const downloadOSBtn = window.element.querySelector('#download-os-btn');
        const clearBtn = window.element.querySelector('#clear-btn');

        // Theme selection
        themeSelect.addEventListener('change', () => {
            AceSystem.applyTheme(themeSelect.value);
            Desktop.showNotification('Theme Changed', 'Your new theme has been applied');
        });

        // Theme category filter
        if (themeCategorySelect) {
            themeCategorySelect.addEventListener('change', () => {
                const category = themeCategorySelect.value;
                const options = themeSelect.querySelectorAll('optgroup');
                
                if (category === 'all') {
                    options.forEach(group => group.style.display = '');
                } else {
                    options.forEach(group => {
                        const label = group.label.toLowerCase();
                        if (label.includes(category)) {
                            group.style.display = '';
                        } else {
                            group.style.display = 'none';
                        }
                    });
                }
            });
        }

        // Theme preview gallery
        if (themePreviewBtn) {
            themePreviewBtn.addEventListener('click', () => {
                this.showThemePreview();
            });
        }

        // Profile management
        if (profileName) {
            profileName.addEventListener('change', () => {
                AceSystem.updateProfile({ profileName: profileName.value });
                Desktop.showNotification('Profile Updated', 'Your profile name has been changed');
            });
        }

        if (profileAvatar) {
            profileAvatar.addEventListener('change', () => {
                AceSystem.updateProfile({ profileAvatar: profileAvatar.value });
                Desktop.showNotification('Profile Updated', 'Your avatar has been changed');
            });
        }

        if (exportProfileBtn) {
            exportProfileBtn.addEventListener('click', () => {
                AceSystem.exportProfile();
            });
        }

        if (importProfileBtn) {
            importProfileBtn.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        AceSystem.importProfile(file);
                    }
                };
                input.click();
            });
        }

        // Password lock
        if (passwordLockBtn) {
            passwordLockBtn.addEventListener('click', () => {
                this.showPasswordDialog();
            });
        }

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

        if (downloadOSBtn) {
            downloadOSBtn.addEventListener('click', () => {
                AceSystem.downloadOS();
            });
        }

        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all aceOS data? This cannot be undone!')) {
                AceStorage.clearAll();
                Desktop.showNotification('Data Cleared', 'All aceOS data has been removed. Reloading...');
                setTimeout(() => location.reload(), 2000);
            }
        });
    },

    showThemePreview() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .theme-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; padding: 1rem; max-height: 500px; overflow-y: auto; }
                .theme-card { background: var(--background-light); border: 2px solid rgba(0, 255, 157, 0.2); border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s; }
                .theme-card:hover { transform: scale(1.05); border-color: var(--primary-color); }
                .theme-preview { width: 100%; height: 60px; border-radius: 4px; margin-bottom: 0.5rem; }
            </style>
            <div class="theme-gallery" id="theme-gallery"></div>
        `;

        const window = WindowManager.createWindow({
            title: 'Theme Preview Gallery',
            icon: '🎨',
            app: 'theme-preview',
            width: 900,
            height: 600,
            content: content
        });

        const gallery = content.querySelector('#theme-gallery');
        const themes = [
            'default', 'dark', 'blue', 'red',
            'neon-pink', 'neon-green', 'neon-orange', 'neon-purple', 'neon-blue', 'neon-yellow',
            'pastel-mint', 'pastel-lavender', 'pastel-peach', 'pastel-sky', 'pastel-rose', 'pastel-lemon',
            'midnight', 'charcoal', 'obsidian', 'noir', 'deep-purple', 'deep-blue',
            'forest', 'ocean', 'sunset', 'aurora', 'desert', 'garden',
            'corporate', 'slate', 'steel', 'silver', 'platinum', 'executive',
            'cyber', 'matrix', 'arcade', 'retro', 'synthwave', 'vaporwave',
            'tropical', 'candy', 'rainbow', 'electric', 'flame', 'cosmic',
            'pearl', 'cream', 'cotton', 'snow'
        ];

        themes.forEach(theme => {
            const card = document.createElement('div');
            card.className = 'theme-card';
            card.innerHTML = `
                <div class="theme-preview theme-${theme}" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));"></div>
                <strong>${theme.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</strong>
            `;
            card.addEventListener('click', () => {
                AceSystem.applyTheme(theme);
                Desktop.showNotification('Theme Applied', `${theme} theme is now active`);
            });
            gallery.appendChild(card);
        });
    },

    showPasswordDialog() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .password-dialog { padding: 2rem; }
                .password-input { width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; margin-bottom: 1rem; }
                .password-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.5rem 2rem; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
            </style>
            <div class="password-dialog">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Set Password Lock</h2>
                <input type="password" class="password-input" id="password-input" placeholder="Enter password" />
                <input type="password" class="password-input" id="password-confirm" placeholder="Confirm password" />
                <button class="password-btn" id="save-password-btn">Set Password</button>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Password Lock',
            icon: '🔒',
            app: 'password-lock',
            width: 400,
            height: 300,
            content: content
        });

        const passwordInput = content.querySelector('#password-input');
        const passwordConfirm = content.querySelector('#password-confirm');
        const saveBtn = content.querySelector('#save-password-btn');

        saveBtn.addEventListener('click', () => {
            if (passwordInput.value && passwordInput.value === passwordConfirm.value) {
                AceSystem.setPasswordLock(passwordInput.value);
                Desktop.showNotification('Password Set', 'Password lock has been enabled');
                WindowManager.closeWindow(window);
            } else {
                Desktop.showNotification('Error', 'Passwords do not match or are empty');
            }
        });
    }
};

window.settings = settings;
