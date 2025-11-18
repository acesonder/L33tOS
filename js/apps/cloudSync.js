// CloudSync - Cloud Storage and Synchronization for aceOS

const cloudSync = {
    syncedFiles: [],
    syncStatus: 'disconnected',

    // Launch CloudSync app
    launch() {
        const content = this.createCloudUI();
        
        const window = WindowManager.createWindow({
            title: 'CloudSync - Storage Manager',
            icon: '☁️',
            app: 'cloudSync',
            width: 900,
            height: 650,
            content: content
        });

        this.loadSyncedFiles();
        this.setupCloudEvents(window);
    },

    // Create cloud UI
    createCloudUI() {
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                .cloudsync { display: flex; flex-direction: column; height: 100%; background: var(--background-dark); }
                .sync-header { padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); display: flex; justify-content: space-between; align-items: center; }
                .sync-status { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--background-light); border-radius: 4px; }
                .status-indicator { width: 10px; height: 10px; border-radius: 50%; background: #00ff9d; animation: pulse 2s infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .sync-toolbar { display: flex; gap: 0.5rem; padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .sync-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
                .sync-content { flex: 1; overflow: auto; padding: 2rem; }
                .storage-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
                .stat-box { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1.5rem; border-radius: 8px; text-align: center; }
                .stat-value { color: var(--primary-color); font-size: 2rem; font-weight: bold; }
                .stat-label { color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem; }
                .file-list { display: flex; flex-direction: column; gap: 0.5rem; }
                .file-item { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
                .file-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
                .file-icon { font-size: 2rem; }
                .file-actions { display: flex; gap: 0.5rem; }
                .action-btn { background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
            </style>
            <div class="cloudsync">
                <div class="sync-header">
                    <h2 style="color: var(--primary-color); margin: 0;">☁️ CloudSync</h2>
                    <div class="sync-status">
                        <div class="status-indicator"></div>
                        <span style="color: var(--text-secondary); font-size: 0.9rem;" id="status-text">Connected</span>
                    </div>
                </div>
                <div class="sync-toolbar">
                    <button class="sync-btn" id="upload-file-btn">📤 Upload File</button>
                    <button class="sync-btn" id="create-folder-btn">📁 New Folder</button>
                    <button class="sync-btn" id="sync-now-btn">🔄 Sync Now</button>
                    <button class="sync-btn" id="settings-btn" style="margin-left: auto;">⚙️ Settings</button>
                </div>
                <div class="sync-content">
                    <div class="storage-stats">
                        <div class="stat-box">
                            <div class="stat-value" id="used-storage">0 MB</div>
                            <div class="stat-label">Used Storage</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value" id="total-storage">5 GB</div>
                            <div class="stat-label">Total Storage</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value" id="file-count">0</div>
                            <div class="stat-label">Files Synced</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value" id="last-sync">Never</div>
                            <div class="stat-label">Last Sync</div>
                        </div>
                    </div>
                    <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">📂 Synced Files</h3>
                    <div class="file-list" id="file-list"></div>
                </div>
            </div>
        `;
        return container;
    },

    // Setup event handlers
    setupCloudEvents(window) {
        const uploadBtn = window.element.querySelector('#upload-file-btn');
        const createFolderBtn = window.element.querySelector('#create-folder-btn');
        const syncNowBtn = window.element.querySelector('#sync-now-btn');
        const settingsBtn = window.element.querySelector('#settings-btn');

        uploadBtn.addEventListener('click', () => {
            this.uploadFile(window);
        });

        createFolderBtn.addEventListener('click', () => {
            this.createFolder();
        });

        syncNowBtn.addEventListener('click', () => {
            this.performSync(window);
        });

        settingsBtn.addEventListener('click', () => {
            this.showSettings();
        });

        this.refreshFileList(window);
        this.updateStats(window);
    },

    // Upload file
    uploadFile(window) {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = (e) => {
            Array.from(e.target.files).forEach(file => {
                const fileData = {
                    id: 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploaded: new Date().toISOString(),
                    synced: true
                };

                this.syncedFiles.push(fileData);
                this.saveSyncedFiles();
            });

            Desktop.showNotification('CloudSync', `${e.target.files.length} file(s) uploaded`);
            this.refreshFileList(window);
            this.updateStats(window);
        };
        input.click();
    },

    // Create folder
    createFolder() {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            const folder = {
                id: 'folder_' + Date.now(),
                name: folderName,
                type: 'folder',
                created: new Date().toISOString(),
                files: []
            };

            this.syncedFiles.push(folder);
            this.saveSyncedFiles();
            Desktop.showNotification('CloudSync', `Folder "${folderName}" created`);
        }
    },

    // Perform sync
    performSync(window) {
        const statusText = window.element.querySelector('#status-text');
        statusText.textContent = 'Syncing...';

        setTimeout(() => {
            statusText.textContent = 'Connected';
            Desktop.showNotification('CloudSync', 'Sync completed successfully');
            this.updateStats(window);
        }, 2000);
    },

    // Show settings
    showSettings() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .sync-settings { padding: 2rem; }
                .setting-row { padding: 1rem; margin-bottom: 0.5rem; background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
                .toggle-btn { background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
            </style>
            <div class="sync-settings">
                <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">☁️ CloudSync Settings</h2>
                <div class="setting-row">
                    <span style="color: var(--text-secondary);">Auto-sync:</span>
                    <button class="toggle-btn">✓ Enabled</button>
                </div>
                <div class="setting-row">
                    <span style="color: var(--text-secondary);">Sync Interval:</span>
                    <select class="toggle-btn" style="width: auto;">
                        <option>5 minutes</option>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                    </select>
                </div>
                <div class="setting-row">
                    <span style="color: var(--text-secondary);">Bandwidth Limit:</span>
                    <select class="toggle-btn" style="width: auto;">
                        <option>Unlimited</option>
                        <option>1 MB/s</option>
                        <option>5 MB/s</option>
                        <option>10 MB/s</option>
                    </select>
                </div>
                <div class="setting-row">
                    <span style="color: var(--text-secondary);">Encryption:</span>
                    <button class="toggle-btn">✓ End-to-End</button>
                </div>
            </div>
        `;

        WindowManager.createWindow({
            title: 'CloudSync Settings',
            icon: '⚙️',
            app: 'sync-settings',
            width: 500,
            height: 400,
            content: content
        });
    },

    // Refresh file list
    refreshFileList(window) {
        const list = window.element.querySelector('#file-list');
        if (!list) return;

        list.innerHTML = '';

        if (this.syncedFiles.length === 0) {
            list.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <h3>No files synced yet</h3>
                    <p>Upload files to get started</p>
                </div>
            `;
            return;
        }

        this.syncedFiles.forEach(file => {
            const item = document.createElement('div');
            item.className = 'file-item';
            
            const icon = file.type === 'folder' ? '📁' : this.getFileIcon(file.type);
            const size = file.size ? this.formatFileSize(file.size) : '';
            
            item.innerHTML = `
                <div class="file-info">
                    <div class="file-icon">${icon}</div>
                    <div>
                        <div style="color: var(--primary-color); font-weight: bold;">${file.name}</div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">${size} • ${new Date(file.uploaded || file.created).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="file-actions">
                    <button class="action-btn" onclick="cloudSync.downloadFile('${file.id}')">⬇️ Download</button>
                    <button class="action-btn" onclick="cloudSync.shareFile('${file.id}')">🔗 Share</button>
                    <button class="action-btn" onclick="cloudSync.deleteFile('${file.id}')">🗑️ Delete</button>
                </div>
            `;
            list.appendChild(item);
        });
    },

    // Update stats
    updateStats(window) {
        const totalSize = this.syncedFiles.reduce((sum, f) => sum + (f.size || 0), 0);
        
        const usedStorage = window.element.querySelector('#used-storage');
        const fileCount = window.element.querySelector('#file-count');
        const lastSync = window.element.querySelector('#last-sync');

        if (usedStorage) usedStorage.textContent = this.formatFileSize(totalSize);
        if (fileCount) fileCount.textContent = this.syncedFiles.length;
        if (lastSync) lastSync.textContent = new Date().toLocaleTimeString();
    },

    // Get file icon
    getFileIcon(type) {
        if (!type) return '📄';
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('video/')) return '🎥';
        if (type.startsWith('audio/')) return '🎵';
        if (type.includes('pdf')) return '📕';
        if (type.includes('text')) return '📝';
        return '📄';
    },

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    // Download file
    downloadFile(fileId) {
        Desktop.showNotification('CloudSync', 'Download started');
    },

    // Share file
    shareFile(fileId) {
        const file = this.syncedFiles.find(f => f.id === fileId);
        if (file) {
            const shareLink = `aceos://cloudsync/share/${fileId}`;
            navigator.clipboard.writeText(shareLink);
            Desktop.showNotification('CloudSync', 'Share link copied to clipboard');
        }
    },

    // Delete file
    deleteFile(fileId) {
        if (confirm('Are you sure you want to delete this file?')) {
            this.syncedFiles = this.syncedFiles.filter(f => f.id !== fileId);
            this.saveSyncedFiles();
            Desktop.showNotification('CloudSync', 'File deleted');
            
            const mainWindow = WindowManager.windows.find(w => w.app === 'cloudSync');
            if (mainWindow) {
                this.refreshFileList(mainWindow);
                this.updateStats(mainWindow);
            }
        }
    },

    // Load synced files from storage
    loadSyncedFiles() {
        const saved = AceStorage.load('cloudSync_files');
        if (saved) {
            this.syncedFiles = saved;
        }
    },

    // Save synced files to storage
    saveSyncedFiles() {
        AceStorage.save('cloudSync_files', this.syncedFiles);
    }
};

window.cloudSync = cloudSync;
