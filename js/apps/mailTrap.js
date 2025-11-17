// mailTrap - Secure Email for aceOS

const mailTrap = {
    launch() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .mail-container { display: flex; height: 100%; }
                .mail-sidebar { width: 200px; background: var(--background-medium); border-right: 1px solid rgba(0, 255, 157, 0.2); padding: 1rem; }
                .mail-main { flex: 1; display: flex; flex-direction: column; }
                .mail-toolbar { padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .mail-list { flex: 1; overflow-y: auto; }
                .folder-item { padding: 0.5rem; margin-bottom: 0.5rem; border-radius: 4px; cursor: pointer; transition: all 0.3s; }
                .folder-item:hover { background: var(--background-light); }
                .compose-btn { width: 100%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem; border-radius: 4px; cursor: pointer; font-weight: bold; margin-bottom: 1rem; }
            </style>
            <div class="mail-container">
                <div class="mail-sidebar">
                    <button class="compose-btn">✉️ Compose</button>
                    <div class="folder-item">📥 Inbox</div>
                    <div class="folder-item">📤 Sent</div>
                    <div class="folder-item">📝 Drafts</div>
                    <div class="folder-item">🗑️ Trash</div>
                </div>
                <div class="mail-main">
                    <div class="mail-toolbar">
                        <h3 style="margin: 0; color: var(--primary-color);">📧 mailTrap</h3>
                        <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Encrypted email service</p>
                    </div>
                    <div class="mail-list">
                        <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                            <p>No messages yet</p>
                            <p style="margin-top: 1rem; font-size: 0.9rem;">mailTrap is under development</p>
                            <p style="margin-top: 0.5rem; font-size: 0.9rem;">Full email functionality coming soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        WindowManager.createWindow({
            title: 'mailTrap - Secure Email',
            icon: '📧',
            app: 'mailTrap',
            width: 900,
            height: 600,
            content: content
        });
    }
};

window.mailTrap = mailTrap;
