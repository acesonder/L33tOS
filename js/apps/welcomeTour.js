// Welcome Tour for aceOS
// Guides new users through initial setup and configuration

const WelcomeTour = {
    currentStep: 0,
    tourData: {
        profileName: 'Anonymous',
        profileAvatar: '🔒',
        securityType: 'none',
        password: '',
        autoResetTime: 'never',
        encryptionType: 'standard',
        theme: 'default',
        restoreBackup: false
    },

    // Check if this is the first launch
    isFirstLaunch() {
        return !AceStorage.load('tour_completed');
    },

    // Launch the welcome tour
    launch() {
        const overlay = document.createElement('div');
        overlay.className = 'tour-overlay';
        overlay.id = 'tour-overlay';
        
        overlay.innerHTML = `
            <style>
                .tour-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.5s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .tour-container {
                    background: var(--background-dark);
                    border: 2px solid var(--primary-color);
                    border-radius: 12px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90vh;
                    overflow: hidden;
                    box-shadow: 0 0 50px rgba(0, 255, 157, 0.3);
                    display: flex;
                    flex-direction: column;
                }
                
                .tour-header {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    padding: 1.5rem;
                    text-align: center;
                }
                
                .tour-header h1 {
                    margin: 0;
                    color: var(--background-dark);
                    font-size: 2rem;
                }
                
                .tour-header p {
                    margin: 0.5rem 0 0;
                    color: var(--background-dark);
                    opacity: 0.9;
                }
                
                .tour-content {
                    padding: 2rem;
                    overflow-y: auto;
                    flex: 1;
                }
                
                .tour-step {
                    display: none;
                }
                
                .tour-step.active {
                    display: block;
                    animation: slideIn 0.3s ease;
                }
                
                @keyframes slideIn {
                    from { 
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .tour-footer {
                    padding: 1.5rem;
                    background: var(--background-medium);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid rgba(0, 255, 157, 0.2);
                }
                
                .tour-progress {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .tour-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(0, 255, 157, 0.3);
                    transition: all 0.3s;
                }
                
                .tour-dot.active {
                    background: var(--primary-color);
                    width: 20px;
                    border-radius: 5px;
                }
                
                .tour-buttons {
                    display: flex;
                    gap: 1rem;
                }
                
                .tour-btn {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                }
                
                .tour-btn-primary {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: var(--background-dark);
                }
                
                .tour-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.4);
                }
                
                .tour-btn-secondary {
                    background: var(--background-light);
                    color: var(--text-primary);
                    border: 1px solid rgba(0, 255, 157, 0.3);
                }
                
                .tour-btn-secondary:hover {
                    background: var(--background-medium);
                }
                
                .form-group {
                    margin-bottom: 1.5rem;
                }
                
                .form-group label {
                    display: block;
                    color: var(--primary-color);
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                
                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 0.75rem;
                    background: var(--background-medium);
                    border: 1px solid rgba(0, 255, 157, 0.3);
                    border-radius: 6px;
                    color: var(--text-primary);
                    font-size: 1rem;
                }
                
                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 8px rgba(0, 255, 157, 0.3);
                }
                
                .avatar-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .avatar-option {
                    padding: 1rem;
                    background: var(--background-medium);
                    border: 2px solid transparent;
                    border-radius: 8px;
                    cursor: pointer;
                    text-align: center;
                    font-size: 2rem;
                    transition: all 0.3s;
                }
                
                .avatar-option:hover {
                    border-color: var(--secondary-color);
                }
                
                .avatar-option.selected {
                    border-color: var(--primary-color);
                    background: rgba(0, 255, 157, 0.1);
                }
                
                .security-options {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .security-card {
                    padding: 1.5rem;
                    background: var(--background-medium);
                    border: 2px solid transparent;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .security-card:hover {
                    border-color: var(--secondary-color);
                }
                
                .security-card.selected {
                    border-color: var(--primary-color);
                    background: rgba(0, 255, 157, 0.1);
                }
                
                .security-card-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }
                
                .security-card-title {
                    color: var(--primary-color);
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                
                .security-card-desc {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                
                .theme-preview-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .theme-preview-card {
                    padding: 1rem;
                    background: var(--background-medium);
                    border: 2px solid transparent;
                    border-radius: 8px;
                    cursor: pointer;
                    text-align: center;
                    transition: all 0.3s;
                }
                
                .theme-preview-card:hover {
                    border-color: var(--secondary-color);
                }
                
                .theme-preview-card.selected {
                    border-color: var(--primary-color);
                    background: rgba(0, 255, 157, 0.1);
                }
                
                .theme-color-bar {
                    height: 40px;
                    border-radius: 6px;
                    margin-bottom: 0.5rem;
                }
                
                .info-box {
                    background: rgba(0, 255, 157, 0.1);
                    border-left: 3px solid var(--primary-color);
                    padding: 1rem;
                    margin: 1rem 0;
                    border-radius: 4px;
                }
                
                .info-box-title {
                    color: var(--primary-color);
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                
                .feature-list {
                    list-style: none;
                    padding: 0;
                }
                
                .feature-list li {
                    padding: 0.5rem 0;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .feature-list li::before {
                    content: '✓';
                    color: var(--primary-color);
                    font-weight: bold;
                }
            </style>
            
            <div class="tour-container">
                <div class="tour-header">
                    <h1>🎉 Welcome to aceOS</h1>
                    <p>Let's set up your secure operating system</p>
                </div>
                
                <div class="tour-content" id="tour-content">
                    ${this.getStepsHTML()}
                </div>
                
                <div class="tour-footer">
                    <div class="tour-progress" id="tour-progress">
                        ${this.getProgressDotsHTML()}
                    </div>
                    <div class="tour-buttons">
                        <button class="tour-btn tour-btn-secondary" id="tour-skip">Skip Tour</button>
                        <button class="tour-btn tour-btn-secondary" id="tour-prev" style="display: none;">Previous</button>
                        <button class="tour-btn tour-btn-primary" id="tour-next">Next</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.setupEventListeners();
        this.showStep(0);
    },

    getProgressDotsHTML() {
        const steps = 7; // Total number of steps
        let html = '';
        for (let i = 0; i < steps; i++) {
            html += `<div class="tour-dot ${i === 0 ? 'active' : ''}" data-step="${i}"></div>`;
        }
        return html;
    },

    getStepsHTML() {
        return `
            <!-- Step 1: Welcome -->
            <div class="tour-step active" data-step="0">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Welcome to aceOS</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                    aceOS is your anonymous, secure, and untraceable virtual operating system. 
                    This quick setup will help you configure your system for optimal privacy and security.
                </p>
                
                <div class="info-box">
                    <div class="info-box-title">🔒 Complete Privacy</div>
                    <ul class="feature-list">
                        <li>No login required - clean session every time</li>
                        <li>All data encrypted and stored locally</li>
                        <li>Anonymous fingerprint for network access</li>
                        <li>No tracking, no cloud, complete control</li>
                    </ul>
                </div>
                
                <div class="info-box">
                    <div class="info-box-title">🚀 Powerful Features</div>
                    <ul class="feature-list">
                        <li>13 built-in applications for productivity and security</li>
                        <li>50 beautiful themes to customize your experience</li>
                        <li>Secure browser, website builder, and more</li>
                        <li>File sharing, marketplace, and media center</li>
                    </ul>
                </div>
            </div>
            
            <!-- Step 2: Profile Setup -->
            <div class="tour-step" data-step="1">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Create Your Profile</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                    Set up your profile name and avatar. This is optional and stored only on your device.
                </p>
                
                <div class="form-group">
                    <label>Profile Name (Optional)</label>
                    <input type="text" id="profile-name" placeholder="Anonymous" value="Anonymous">
                </div>
                
                <div class="form-group">
                    <label>Choose Your Avatar</label>
                    <div class="avatar-grid">
                        <div class="avatar-option selected" data-avatar="🔒">🔒</div>
                        <div class="avatar-option" data-avatar="👤">👤</div>
                        <div class="avatar-option" data-avatar="🎭">🎭</div>
                        <div class="avatar-option" data-avatar="🦊">🦊</div>
                        <div class="avatar-option" data-avatar="🐺">🐺</div>
                        <div class="avatar-option" data-avatar="🦁">🦁</div>
                        <div class="avatar-option" data-avatar="🐉">🐉</div>
                        <div class="avatar-option" data-avatar="👽">👽</div>
                        <div class="avatar-option" data-avatar="🤖">🤖</div>
                        <div class="avatar-option" data-avatar="👻">👻</div>
                    </div>
                </div>
            </div>
            
            <!-- Step 3: Security Options -->
            <div class="tour-step" data-step="2">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Security Configuration</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                    Choose how you want to protect your aceOS session. You can always change this later in Settings.
                </p>
                
                <div class="security-options">
                    <div class="security-card selected" data-security="none">
                        <div class="security-card-icon">🔓</div>
                        <div class="security-card-title">No Lock</div>
                        <div class="security-card-desc">Quick access, no authentication required</div>
                    </div>
                    
                    <div class="security-card" data-security="password">
                        <div class="security-card-icon">🔑</div>
                        <div class="security-card-title">Password</div>
                        <div class="security-card-desc">Secure with a password</div>
                    </div>
                    
                    <div class="security-card" data-security="pin">
                        <div class="security-card-icon">📱</div>
                        <div class="security-card-title">PIN Code</div>
                        <div class="security-card-desc">4-6 digit PIN protection</div>
                    </div>
                    
                    <div class="security-card" data-security="biometric">
                        <div class="security-card-icon">👁️</div>
                        <div class="security-card-title">Biometric</div>
                        <div class="security-card-desc">Fingerprint or facial recognition (if available)</div>
                    </div>
                </div>
                
                <div class="form-group" id="password-field" style="display: none; margin-top: 1.5rem;">
                    <label>Enter Password</label>
                    <input type="password" id="security-password" placeholder="Enter a secure password">
                </div>
                
                <div class="form-group" id="pin-field" style="display: none; margin-top: 1.5rem;">
                    <label>Enter PIN Code</label>
                    <input type="number" id="security-pin" placeholder="Enter 4-6 digit PIN" maxlength="6">
                </div>
            </div>
            
            <!-- Step 4: Auto-Reset Configuration -->
            <div class="tour-step" data-step="3">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Auto-Reset Timer</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                    For maximum security, you can configure aceOS to automatically reset itself after a period of inactivity.
                </p>
                
                <div class="info-box">
                    <div class="info-box-title">⚠️ What is Auto-Reset?</div>
                    <p style="color: var(--text-secondary); margin: 0;">
                        When enabled, aceOS will automatically clear all session data and reset to a clean state 
                        after the specified time. This ensures no traces are left behind on shared devices.
                    </p>
                </div>
                
                <div class="form-group" style="margin-top: 1.5rem;">
                    <label>Reset Timer</label>
                    <select id="auto-reset-time">
                        <option value="never">Never - Manual reset only</option>
                        <option value="12">12 Hours</option>
                        <option value="24">24 Hours</option>
                        <option value="6">6 Hours</option>
                        <option value="1">1 Hour</option>
                    </select>
                </div>
                
                <div class="info-box" style="margin-top: 1.5rem;">
                    <div class="info-box-title">💡 Recommendation</div>
                    <p style="color: var(--text-secondary); margin: 0;">
                        Choose "Never" for personal devices. Use 12-24 hours for shared devices to maintain privacy.
                    </p>
                </div>
            </div>
            
            <!-- Step 5: Encryption Type -->
            <div class="tour-step" data-step="4">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Encryption Settings</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                    All data in aceOS is encrypted. Choose your encryption strength based on your security needs.
                </p>
                
                <div class="form-group">
                    <label>Encryption Level</label>
                    <select id="encryption-type">
                        <option value="standard">Standard - Fast and secure (Recommended)</option>
                        <option value="enhanced">Enhanced - Stronger encryption, slightly slower</option>
                        <option value="maximum">Maximum - Highest security, slower performance</option>
                    </select>
                </div>
                
                <div class="info-box">
                    <div class="info-box-title">🔐 Encryption Details</div>
                    <ul class="feature-list">
                        <li><strong>Standard:</strong> XOR encryption with session keys</li>
                        <li><strong>Enhanced:</strong> Additional encryption layers</li>
                        <li><strong>Maximum:</strong> Multi-layer encryption with extended keys</li>
                    </ul>
                </div>
                
                <div class="info-box">
                    <div class="info-box-title">💡 Note</div>
                    <p style="color: var(--text-secondary); margin: 0;">
                        Standard encryption is sufficient for most use cases and provides the best performance.
                        All data is encrypted locally and never transmitted to external servers.
                    </p>
                </div>
            </div>
            
            <!-- Step 6: Theme Selection -->
            <div class="tour-step" data-step="5">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Choose Your Theme</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                    Customize your aceOS experience with one of 50 beautiful themes. You can change this anytime in Settings.
                </p>
                
                <div class="theme-preview-grid">
                    <div class="theme-preview-card selected" data-theme="default">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #00ff9d, #00ffff);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Default</div>
                    </div>
                    <div class="theme-preview-card" data-theme="dark">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #b366ff, #ff66cc);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Dark Purple</div>
                    </div>
                    <div class="theme-preview-card" data-theme="blue">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #4da6ff, #00ccff);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Blue</div>
                    </div>
                    <div class="theme-preview-card" data-theme="red">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #ff4d6a, #ff8c42);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Red</div>
                    </div>
                    <div class="theme-preview-card" data-theme="neon-pink">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #ff1493, #ff6b35);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Neon Pink</div>
                    </div>
                    <div class="theme-preview-card" data-theme="neon-green">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #39ff14, #ffff00);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Neon Green</div>
                    </div>
                    <div class="theme-preview-card" data-theme="midnight">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #1a237e, #304ffe);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Midnight</div>
                    </div>
                    <div class="theme-preview-card" data-theme="forest">
                        <div class="theme-color-bar" style="background: linear-gradient(135deg, #0f6e33, #2e8b57);"></div>
                        <div style="color: var(--text-primary); font-size: 0.9rem;">Forest</div>
                    </div>
                </div>
                
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 1rem; text-align: center;">
                    50 themes available • Access all themes in Settings → Appearance
                </p>
            </div>
            
            <!-- Step 7: Backup & Complete -->
            <div class="tour-step" data-step="6">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Backup & Restore</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                    Protect your data by creating regular backups. You can export your configuration and restore it later.
                </p>
                
                <div class="info-box">
                    <div class="info-box-title">💾 Backup Features</div>
                    <ul class="feature-list">
                        <li>Export all settings and data to a JSON file</li>
                        <li>Create backup anytime from Settings</li>
                        <li>Import backup to restore your configuration</li>
                        <li>Backups are encrypted for security</li>
                    </ul>
                </div>
                
                <div class="form-group" style="margin-top: 1.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                        <input type="checkbox" id="restore-backup" style="width: auto;">
                        <span>I have a backup file to restore</span>
                    </label>
                </div>
                
                <div class="form-group" id="backup-file-field" style="display: none;">
                    <label>Select Backup File</label>
                    <input type="file" id="backup-file" accept=".json,.zip">
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                        Supported formats: .json, .zip
                    </p>
                </div>
                
                <div class="info-box" style="margin-top: 1.5rem;">
                    <div class="info-box-title">🎉 You're All Set!</div>
                    <p style="color: var(--text-secondary); margin: 0;">
                        aceOS is ready to use. Click "Finish" to start your secure computing experience.
                        You can access Help & Tutorials anytime from the start menu.
                    </p>
                </div>
            </div>
        `;
    },

    setupEventListeners() {
        const nextBtn = document.getElementById('tour-next');
        const prevBtn = document.getElementById('tour-prev');
        const skipBtn = document.getElementById('tour-skip');
        
        nextBtn.addEventListener('click', () => this.nextStep());
        prevBtn.addEventListener('click', () => this.prevStep());
        skipBtn.addEventListener('click', () => this.skipTour());
        
        // Avatar selection
        const avatarOptions = document.querySelectorAll('.avatar-option');
        avatarOptions.forEach(option => {
            option.addEventListener('click', () => {
                avatarOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.tourData.profileAvatar = option.dataset.avatar;
            });
        });
        
        // Security card selection
        const securityCards = document.querySelectorAll('.security-card');
        securityCards.forEach(card => {
            card.addEventListener('click', () => {
                securityCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.tourData.securityType = card.dataset.security;
                
                // Show/hide password/pin fields
                document.getElementById('password-field').style.display = 
                    card.dataset.security === 'password' ? 'block' : 'none';
                document.getElementById('pin-field').style.display = 
                    card.dataset.security === 'pin' ? 'block' : 'none';
            });
        });
        
        // Theme selection
        const themeCards = document.querySelectorAll('.theme-preview-card');
        themeCards.forEach(card => {
            card.addEventListener('click', () => {
                themeCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.tourData.theme = card.dataset.theme;
            });
        });
        
        // Backup restore checkbox
        const restoreCheckbox = document.getElementById('restore-backup');
        if (restoreCheckbox) {
            restoreCheckbox.addEventListener('change', (e) => {
                document.getElementById('backup-file-field').style.display = 
                    e.target.checked ? 'block' : 'none';
                this.tourData.restoreBackup = e.target.checked;
            });
        }
    },

    showStep(stepNumber) {
        this.currentStep = stepNumber;
        
        // Update steps visibility
        const steps = document.querySelectorAll('.tour-step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepNumber);
        });
        
        // Update progress dots
        const dots = document.querySelectorAll('.tour-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === stepNumber);
        });
        
        // Update buttons
        const prevBtn = document.getElementById('tour-prev');
        const nextBtn = document.getElementById('tour-next');
        
        prevBtn.style.display = stepNumber > 0 ? 'block' : 'none';
        nextBtn.textContent = stepNumber === 6 ? 'Finish' : 'Next';
        
        // Scroll to top of content
        document.getElementById('tour-content').scrollTop = 0;
    },

    nextStep() {
        // Collect data from current step
        this.collectStepData();
        
        if (this.currentStep < 6) {
            this.showStep(this.currentStep + 1);
        } else {
            this.completeTour();
        }
    },

    prevStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    },

    skipTour() {
        if (confirm('Are you sure you want to skip the welcome tour? You can always access the help guide later.')) {
            this.completeTour(true);
        }
    },

    collectStepData() {
        // Collect profile name
        const profileNameInput = document.getElementById('profile-name');
        if (profileNameInput) {
            this.tourData.profileName = profileNameInput.value || 'Anonymous';
        }
        
        // Collect password/pin
        const passwordInput = document.getElementById('security-password');
        const pinInput = document.getElementById('security-pin');
        if (passwordInput && this.tourData.securityType === 'password') {
            this.tourData.password = passwordInput.value;
        } else if (pinInput && this.tourData.securityType === 'pin') {
            this.tourData.password = pinInput.value;
        }
        
        // Collect auto-reset time
        const autoResetSelect = document.getElementById('auto-reset-time');
        if (autoResetSelect) {
            this.tourData.autoResetTime = autoResetSelect.value;
        }
        
        // Collect encryption type
        const encryptionSelect = document.getElementById('encryption-type');
        if (encryptionSelect) {
            this.tourData.encryptionType = encryptionSelect.value;
        }
    },

    completeTour(skipped = false) {
        // Save tour data to storage
        if (!skipped) {
            // Apply user selections
            const config = AceSystem.getConfig();
            config.theme = this.tourData.theme;
            config.profileName = this.tourData.profileName;
            config.profileAvatar = this.tourData.profileAvatar;
            config.securityType = this.tourData.securityType;
            config.autoResetTime = this.tourData.autoResetTime;
            config.encryptionType = this.tourData.encryptionType;
            
            // Save password if set
            if (this.tourData.password && this.tourData.securityType !== 'none') {
                config.passwordHash = AceCrypto.hash(this.tourData.password);
            }
            
            AceSystem.updateConfig(config);
            
            // Apply theme immediately
            AceSystem.applyTheme(this.tourData.theme);
        }
        
        // Mark tour as completed
        AceStorage.save('tour_completed', true);
        
        // Remove tour overlay
        const overlay = document.getElementById('tour-overlay');
        if (overlay) {
            overlay.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => overlay.remove(), 500);
        }
        
        // Show completion notification
        if (!skipped) {
            setTimeout(() => {
                Desktop.showNotification(
                    'Setup Complete!',
                    'Welcome to aceOS. Your secure environment is ready.',
                    5000
                );
            }, 600);
        }
    }
};

// Add fadeOut animation
const tourStyle = document.createElement('style');
tourStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(tourStyle);

// Export for use in other modules
window.WelcomeTour = WelcomeTour;
