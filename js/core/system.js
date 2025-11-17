// aceOS System Core
// Manages system state, configuration, and updates

const AceSystem = {
    version: '1.0.0',
    fingerprint: null,
    config: {
        theme: 'default',
        anonymousMode: true,
        autoUpdate: true,
        serverDirectory: 'private' // 'private' or 'public'
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
    }
};

// Export for use in other modules
window.AceSystem = AceSystem;
