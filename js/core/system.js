// aceOS System Core
// Manages system state, configuration, and updates

const AceSystem = {
    version: '1.0.0',
    fingerprint: null,
    config: {
        theme: 'default',
        anonymousMode: true,
        autoUpdate: true,
        serverDirectory: 'private', // 'private' or 'public'
        profileName: 'Anonymous User',
        profileAvatar: '🔒',
        passwordLock: false,
        passwordHash: null
    },

    // Initialize the system
    init() {
        console.log(`aceOS v${this.version} initializing...`);
        
        // Generate anonymous fingerprint
        this.fingerprint = AceCrypto.generateFingerprint();
        
        // Load saved configuration
        const savedConfig = AceStorage.load('config');
        if (savedConfig) {
            this.config = { ...this.config, ...savedConfig };
        }

        // Apply theme
        this.applyTheme(this.config.theme);

        console.log(`aceOS initialized. Fingerprint: ${this.fingerprint}`);
    },

    // Save configuration
    saveConfig() {
        AceStorage.save('config', this.config);
    },

    // Apply theme
    applyTheme(themeName) {
        document.body.className = `theme-${themeName}`;
        this.config.theme = themeName;
        this.saveConfig();
    },

    // Check for updates
    async checkForUpdates() {
        // In a real implementation, this would check a remote server
        console.log('Checking for updates...');
        
        return {
            available: false,
            version: this.version,
            message: 'You are running the latest version of aceOS'
        };
    },

    // Get system information
    getSystemInfo() {
        return {
            version: this.version,
            fingerprint: this.fingerprint,
            config: this.config,
            storage: AceStorage.getUsage(),
            timestamp: new Date().toISOString()
        };
    },

    // Export data for backup
    exportData() {
        const data = {
            system: this.getSystemInfo(),
            bookmarks: AceStorage.load('bookmarks') || [],
            settings: AceStorage.load('settings') || {},
            makeTrapContent: AceStorage.load('makeTrap_content') || []
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aceOS_backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // Import data from backup
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.bookmarks) AceStorage.save('bookmarks', data.bookmarks);
                if (data.settings) AceStorage.save('settings', data.settings);
                if (data.makeTrapContent) AceStorage.save('makeTrap_content', data.makeTrapContent);
                
                alert('Data imported successfully! Reload aceOS to apply changes.');
            } catch (err) {
                alert('Failed to import data: Invalid file format');
            }
        };
        reader.readAsText(file);
    },

    // Update profile
    updateProfile(profileData) {
        this.config = { ...this.config, ...profileData };
        this.saveConfig();
    },

    // Export user profile
    exportProfile() {
        const profileData = {
            profileName: this.config.profileName,
            profileAvatar: this.config.profileAvatar,
            theme: this.config.theme,
            anonymousMode: this.config.anonymousMode,
            serverDirectory: this.config.serverDirectory,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aceOS_profile_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // Import user profile
    importProfile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const profileData = JSON.parse(e.target.result);
                this.updateProfile(profileData);
                alert('Profile imported successfully! Reload aceOS to apply changes.');
            } catch (err) {
                alert('Failed to import profile: Invalid file format');
            }
        };
        reader.readAsText(file);
    },

    // Set password lock
    async setPasswordLock(password) {
        // Simple hash for demo (in production use proper encryption)
        const hash = await this.hashPassword(password);
        this.config.passwordLock = true;
        this.config.passwordHash = hash;
        this.saveConfig();
    },

    // Hash password (simple implementation)
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    // Verify password
    async verifyPassword(password) {
        const hash = await this.hashPassword(password);
        return hash === this.config.passwordHash;
    },

    // Download OS as package
    downloadOS() {
        const osFiles = {
            'index.html': document.documentElement.outerHTML,
            'README.md': 'aceOS - Anonymous Virtual Operating System\n\nUnzip this package and open index.html in your browser.',
            'version.txt': this.version
        };

        // In a real implementation, this would package all files
        const manifest = {
            version: this.version,
            timestamp: new Date().toISOString(),
            files: Object.keys(osFiles)
        };

        const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aceOS_v${this.version}_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        if (Desktop && Desktop.showNotification) {
            Desktop.showNotification('OS Downloaded', 'aceOS package has been downloaded');
        }
    }
};

// Export for use in other modules
window.AceSystem = AceSystem;
