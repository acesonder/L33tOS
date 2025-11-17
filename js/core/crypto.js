// aceOS Encryption Module
// Provides encryption/decryption for secure data storage and transmission

const AceCrypto = {
    // Generate a unique session key
    generateSessionKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    // Simple encryption using XOR (for demo purposes - in production use WebCrypto API)
    encrypt(text, key) {
        if (!text || !key) return text;
        
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(
                text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return btoa(result); // Base64 encode
    },

    // Simple decryption using XOR
    decrypt(encryptedText, key) {
        if (!encryptedText || !key) return encryptedText;
        
        try {
            const text = atob(encryptedText); // Base64 decode
            let result = '';
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(
                    text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            return result;
        } catch (e) {
            console.error('Decryption failed:', e);
            return null;
        }
    },

    // Generate time-based fingerprint for anonymous identification
    generateFingerprint() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2);
        const combined = `${timestamp}-${random}`;
        
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        return Math.abs(hash).toString(36);
    },

    // Hash function for secure storage
    hash(text) {
        let hash = 0;
        if (!text) return hash.toString();
        
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return Math.abs(hash).toString(36);
    }
};

// Export for use in other modules
window.AceCrypto = AceCrypto;
