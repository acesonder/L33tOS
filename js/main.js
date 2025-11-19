// aceOS Main Entry Point
// Initializes the operating system and manages boot sequence

(function() {
    'use strict';

    // Boot sequence
    async function boot() {
        console.log('aceOS booting...');

        // Show boot screen
        const bootScreen = document.getElementById('boot-screen');
        const desktop = document.getElementById('desktop');
        const bootStatus = document.querySelector('.boot-status');

        bootScreen.classList.add('active');

        // Simulate boot process with status updates
        const bootSteps = [
            'Initializing secure environment...',
            'Loading encryption modules...',
            'Establishing anonymous network...',
            'Loading system components...',
            'Starting aceOS...'
        ];

        for (let i = 0; i < bootSteps.length; i++) {
            bootStatus.textContent = bootSteps[i];
            await sleep(400);
        }

        // Initialize core systems
        try {
            AceStorage.init();
            AceSystem.init();
            
            // Initialize UI
            Desktop.init();
            
            console.log('aceOS boot complete');
            bootStatus.textContent = 'Welcome to aceOS';
            
            // Transition from boot screen to desktop
            await sleep(500);
            bootScreen.classList.remove('active');
            desktop.classList.add('active');

            // Check if this is first launch and show welcome tour
            if (WelcomeTour.isFirstLaunch()) {
                setTimeout(() => {
                    WelcomeTour.launch();
                }, 500);
            } else {
                // Show welcome notification
                setTimeout(() => {
                    Desktop.showNotification(
                        'Welcome to aceOS',
                        'Anonymous. Secure. Untraceable.',
                        5000
                    );
                }, 500);
                
                // Check auto-reset timer
                AceSystem.checkAutoReset();
            }
            
            // Update activity timestamp
            AceSystem.updateActivity();
            
            // Set up activity tracking
            ['click', 'keydown', 'mousemove'].forEach(event => {
                document.addEventListener(event, () => {
                    AceSystem.updateActivity();
                }, { once: false, passive: true });
            });

        } catch (error) {
            console.error('Boot failed:', error);
            bootStatus.textContent = 'Boot failed. Please reload.';
            bootStatus.style.color = '#ff0066';
        }
    }

    // Helper function for delays
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Start boot when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    // Prevent accidental page unload
    window.addEventListener('beforeunload', (e) => {
        const hasUnsavedData = AceStorage.load('makeTrap_content')?.length > 0;
        if (hasUnsavedData) {
            e.preventDefault();
            e.returnValue = 'You have unsaved content in makeTrap. Are you sure you want to leave?';
        }
    });

    // Handle visibility changes for security
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('aceOS hidden - maintaining encryption');
        } else {
            console.log('aceOS visible - resuming');
        }
    });

    // Expose version info
    console.log(`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║           aceOS v1.0.0                ║
    ║                                       ║
    ║   Anonymous. Secure. Untraceable.    ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
    `);

})();
