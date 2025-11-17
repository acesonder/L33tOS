// bankTrap - Financial Tools for aceOS

const bankTrap = {
    launch() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .bank-container { padding: 2rem; }
                .bank-header { text-align: center; margin-bottom: 3rem; }
                .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
                .feature-card { background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-align: center; }
                .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
            </style>
            <div class="bank-container">
                <div class="bank-header">
                    <h1 style="color: var(--primary-color); margin-bottom: 1rem;">💰 bankTrap</h1>
                    <p style="color: var(--text-secondary);">Secure financial management and cryptocurrency tools</p>
                </div>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">💳</div>
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">Wallet</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Manage your crypto assets securely</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">Analytics</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Track your portfolio performance</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔄</div>
                        <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">Transactions</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Send and receive anonymously</p>
                    </div>
                </div>
                <div style="margin-top: 3rem; padding: 1.5rem; background: var(--background-medium); border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); text-align: center;">
                    <p style="color: var(--text-secondary);">Full bankTrap functionality coming soon...</p>
                </div>
            </div>
        `;

        WindowManager.createWindow({
            title: 'bankTrap - Financial Tools',
            icon: '💰',
            app: 'bankTrap',
            width: 800,
            height: 600,
            content: content
        });
    }
};

window.bankTrap = bankTrap;
