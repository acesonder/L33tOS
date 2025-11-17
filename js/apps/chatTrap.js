// chatTrap - Secure Messaging for aceOS

const chatTrap = {
    launch() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .chat-container { display: flex; flex-direction: column; height: 100%; }
                .chat-header { padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .chat-messages { flex: 1; overflow-y: auto; padding: 1rem; }
                .chat-input-area { padding: 1rem; background: var(--background-medium); border-top: 1px solid rgba(0, 255, 157, 0.2); display: flex; gap: 0.5rem; }
                .chat-input { flex: 1; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.75rem; border-radius: 4px; }
                .send-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
            </style>
            <div class="chat-container">
                <div class="chat-header">
                    <h3 style="margin: 0; color: var(--primary-color);">💬 chatTrap</h3>
                    <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Secure, encrypted messaging</p>
                </div>
                <div class="chat-messages">
                    <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                        <p>Welcome to chatTrap!</p>
                        <p style="margin-top: 1rem; font-size: 0.9rem;">This is a placeholder for the secure messaging feature.</p>
                        <p style="margin-top: 0.5rem; font-size: 0.9rem;">Full functionality coming soon...</p>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" placeholder="Type a message...">
                    <button class="send-btn">Send</button>
                </div>
            </div>
        `;

        WindowManager.createWindow({
            title: 'chatTrap - Secure Messaging',
            icon: '💬',
            app: 'chatTrap',
            width: 600,
            height: 700,
            content: content
        });
    }
};

window.chatTrap = chatTrap;
