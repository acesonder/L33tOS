// crapTrap - System Utilities for aceOS

const crapTrap = {
    launch() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .utils-container { padding: 2rem; }
                .utils-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 2rem; }
                .util-card { background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); cursor: pointer; transition: all 0.3s; }
                .util-card:hover { border-color: var(--primary-color); transform: translateY(-2px); }
            </style>
            <div class="utils-container">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">🔧 crapTrap</h1>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">System utilities and tools</p>
                
                <div class="utils-grid">
                    <div class="util-card">
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">📁 File Manager</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Browse and manage local files</p>
                    </div>
                    <div class="util-card">
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">🔒 Encryption Tools</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Encrypt and decrypt files</p>
                    </div>
                    <div class="util-card">
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">📝 Text Editor</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Edit text files securely</p>
                    </div>
                    <div class="util-card">
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">🧮 Calculator</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Basic and scientific calculations</p>
                    </div>
                    <div class="util-card">
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">📊 System Monitor</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">View system resources and performance</p>
                    </div>
                    <div class="util-card">
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">🗑️ Secure Delete</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Permanently erase files</p>
                    </div>
                </div>

                <div style="margin-top: 2rem; padding: 1.5rem; background: var(--background-medium); border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-align: center;">
                    <p style="color: var(--text-secondary);">Individual utilities coming in future updates</p>
                </div>
            </div>
        `;

        WindowManager.createWindow({
            title: 'crapTrap - System Utilities',
            icon: '🔧',
            app: 'crapTrap',
            width: 900,
            height: 700,
            content: content
        });
    }
};

window.crapTrap = crapTrap;
