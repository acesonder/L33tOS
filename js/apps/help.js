// Help & Tutorials for aceOS

const help = {
    launch() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .help-container { display: flex; height: 100%; }
                .help-sidebar { width: 250px; background: var(--background-medium); border-right: 1px solid rgba(0, 255, 157, 0.2); padding: 1rem; overflow-y: auto; }
                .help-content { flex: 1; padding: 2rem; overflow-y: auto; }
                .help-nav-item { padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px; cursor: pointer; transition: all 0.3s; color: var(--text-secondary); }
                .help-nav-item:hover { background: var(--background-light); color: var(--text-primary); }
                .help-nav-item.active { background: var(--background-light); color: var(--primary-color); border-left: 3px solid var(--primary-color); }
                .help-section { display: none; }
                .help-section.active { display: block; }
            </style>
            <div class="help-container">
                <div class="help-sidebar">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Help Topics</h3>
                    <div class="help-nav-item active" data-section="welcome">Getting Started</div>
                    <div class="help-nav-item" data-section="features">Key Features</div>
                    <div class="help-nav-item" data-section="webtrap">Using webTrap</div>
                    <div class="help-nav-item" data-section="maketrap">Using makeTrap</div>
                    <div class="help-nav-item" data-section="apps">Other Apps</div>
                    <div class="help-nav-item" data-section="security">Security & Privacy</div>
                    <div class="help-nav-item" data-section="troubleshooting">Troubleshooting</div>
                </div>
                <div class="help-content" id="help-content">
                    ${this.getHelpContent()}
                </div>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Help & Tutorials',
            icon: '❓',
            app: 'help',
            width: 1000,
            height: 700,
            content: content
        });

        this.setupNavigation(window);
    },

    setupNavigation(window) {
        const navItems = window.element.querySelectorAll('.help-nav-item');
        const sections = window.element.querySelectorAll('.help-section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.dataset.section;
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Show corresponding section
                sections.forEach(section => section.classList.remove('active'));
                const targetSection = window.element.querySelector(`#${sectionId}`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    },

    getHelpContent() {
        return `
            <div id="welcome" class="help-section active">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">Welcome to aceOS</h1>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    aceOS is an anonymous, portable virtual operating system designed for ultimate privacy and security. 
                    This help guide will walk you through the key features and how to use them.
                </p>
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">What is aceOS?</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    aceOS provides a secure environment for:
                </p>
                <ul style="color: var(--text-secondary); line-height: 2;">
                    <li>Anonymous web browsing with webTrap</li>
                    <li>Creating encrypted web content with makeTrap</li>
                    <li>Secure communication through chatTrap and mailTrap</li>
                    <li>Managing finances with bankTrap</li>
                    <li>Various utilities through crapTrap</li>
                </ul>
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">No Login Required</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    aceOS launches in a clean state every time. There's no login or personal account - ensuring 
                    complete anonymity. Your data is stored locally and encrypted.
                </p>
            </div>

            <div id="features" class="help-section">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">Key Features</h1>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">🔒 Anonymity & Privacy</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    All activities within aceOS are encrypted and untraceable. Your unique fingerprint is time-based 
                    and changes with each session, ensuring complete anonymity.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">💾 Local Storage Only</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    All data remains on your device. aceOS never transmits your information to external servers. 
                    You are responsible for backing up your makeTrap content.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">🎨 Professional UI</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    aceOS features a modern interface with 3D elements, smooth transitions, and customizable themes.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">🔄 Automatic Updates</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    The system checks for updates automatically, but you control when to install them.
                </p>
            </div>

            <div id="webtrap" class="help-section">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">Using webTrap</h1>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    webTrap is your secure browser for accessing aceOS-exclusive content.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Navigation</h2>
                <ul style="color: var(--text-secondary); line-height: 2;">
                    <li>Enter aceOS URLs in the format: <code style="background: var(--background-light); padding: 0.25rem 0.5rem; border-radius: 4px;">aceos://pagename</code></li>
                    <li>Use the back/forward buttons to navigate your history</li>
                    <li>Bookmark pages for quick access</li>
                </ul>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Bookmarks</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    Click the star button to bookmark the current page. Your bookmarks are encrypted and stored locally.
                </p>
            </div>

            <div id="maketrap" class="help-section">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">Using makeTrap</h1>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    makeTrap is a WYSIWYG editor for creating secure, encrypted web pages.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Creating Content</h2>
                <ol style="color: var(--text-secondary); line-height: 2;">
                    <li>Open makeTrap from the start menu or desktop</li>
                    <li>Edit HTML in the left panel</li>
                    <li>Add styles in the CSS panel</li>
                    <li>Preview your page in real-time on the right</li>
                    <li>Click "Save" to encrypt and store your page</li>
                </ol>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Exporting</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    Use the "Export HTML" button to save your page as a standard HTML file that can be used outside aceOS.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Templates</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    Load pre-made templates to get started quickly with common page layouts.
                </p>
            </div>

            <div id="apps" class="help-section">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">Other Applications</h1>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">💬 chatTrap</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    Secure messaging application (coming soon)
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">📧 mailTrap</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    Encrypted email service (coming soon)
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">💰 bankTrap</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    Financial transactions and cryptocurrency management (coming soon)
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">🔧 crapTrap</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    System utilities including file manager, encryption tools, and more (coming soon)
                </p>
            </div>

            <div id="security" class="help-section">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">Security & Privacy</h1>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Encryption</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    All data stored by aceOS is encrypted using your session key. This key is generated 
                    automatically and stored only in your browser's session storage.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Anonymous Fingerprint</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    Your fingerprint is a time-based identifier that changes with each session. It allows 
                    you to participate in server directories without revealing your identity.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Data Backup</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    You are responsible for backing up your makeTrap content. Use the Export function in 
                    Settings to create backups of your data.
                </p>
            </div>

            <div id="troubleshooting" class="help-section">
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">Troubleshooting</h1>
                
                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Can't Open an App</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    Try refreshing aceOS. If the problem persists, the app may still be under development.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Lost My Data</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    aceOS stores data locally in your browser. If you clear browser data or use a different 
                    browser, your data won't be accessible. Always export backups regularly.
                </p>

                <h2 style="color: var(--secondary-color); margin: 2rem 0 1rem;">Performance Issues</h2>
                <p style="color: var(--text-secondary); line-height: 1.6;">
                    Close unused windows and clear old data through Settings to improve performance.
                </p>
            </div>
        `;
    }
};

window.help = help;
