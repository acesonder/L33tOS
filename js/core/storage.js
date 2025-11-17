// aceOS Storage Module
// Manages local storage with encryption

const AceStorage = {
    sessionKey: null,

    // Initialize storage with encryption key
    init() {
        // Generate or retrieve session key
        this.sessionKey = sessionStorage.getItem('aceOS_session_key');
        if (!this.sessionKey) {
            this.sessionKey = AceCrypto.generateSessionKey();
            sessionStorage.setItem('aceOS_session_key', this.sessionKey);
        }
    },

    // Save encrypted data
    save(key, data) {
        try {
            const jsonData = JSON.stringify(data);
            const encrypted = AceCrypto.encrypt(jsonData, this.sessionKey);
            localStorage.setItem(`aceOS_${key}`, encrypted);
            return true;
        } catch (e) {
            console.error('Storage save failed:', e);
            return false;
        }
    },

    // Load and decrypt data
    load(key) {
        try {
            const encrypted = localStorage.getItem(`aceOS_${key}`);
            if (!encrypted) return null;
            
            const decrypted = AceCrypto.decrypt(encrypted, this.sessionKey);
            return JSON.parse(decrypted);
        } catch (e) {
            console.error('Storage load failed:', e);
            return null;
        }
    },

    // Remove data
    remove(key) {
        localStorage.removeItem(`aceOS_${key}`);
    },

    // Clear all aceOS data
    clearAll() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('aceOS_')) {
                localStorage.removeItem(key);
            }
        });
        sessionStorage.removeItem('aceOS_session_key');
    },

    // Get storage usage
    getUsage() {
        let total = 0;
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('aceOS_')) {
                total += localStorage.getItem(key).length;
            }
        });
        return {
            bytes: total,
            kb: (total / 1024).toFixed(2),
            mb: (total / 1024 / 1024).toFixed(2)
        };
    }
};

// Export for use in other modules
window.AceStorage = AceStorage;
