# aceOS Startup Guide

**Welcome to aceOS - Your Anonymous, Secure, and Untraceable Virtual Operating System**

Version: 1.0.0  
Last Updated: 2025

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [First-Time Setup](#first-time-setup)
3. [Welcome Tour Guide](#welcome-tour-guide)
4. [System Configuration](#system-configuration)
5. [Applications Overview](#applications-overview)
6. [Security Features](#security-features)
7. [Data Management](#data-management)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Quick Start

### Installation

aceOS requires no installation. Simply:

1. Download the aceOS package or clone the repository
2. Open `index.html` in any modern web browser
3. Wait for the boot sequence to complete (5-10 seconds)
4. Start using aceOS!

### System Requirements

- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Opera 76+
- **Storage**: 10MB+ free browser storage (LocalStorage)
- **Internet**: Not required (aceOS runs completely offline)
- **Screen**: 1280x720 minimum resolution recommended

---

## First-Time Setup

### Welcome Tour

When you launch aceOS for the first time, you'll be greeted with an interactive Welcome Tour that guides you through initial configuration.

**The tour covers:**
- System overview and privacy features
- Profile creation (name and avatar)
- Security configuration options
- Auto-reset timer settings
- Encryption level selection
- Theme customization
- Backup and restore features

**You can:**
- Complete the full tour (recommended for new users)
- Skip the tour and use default settings
- Access help documentation anytime via the Help app

---

## Welcome Tour Guide

### Step 1: Welcome & Overview

Learn about aceOS features and privacy principles:
- Complete anonymity with no login required
- Local-only encrypted data storage
- Anonymous fingerprint system
- 13 built-in applications
- 50 customizable themes

**What to do:** Read the overview and click "Next" to continue.

---

### Step 2: Create Your Profile

Set up your personal profile (optional):

**Profile Name:**
- Default: "Anonymous"
- Can be anything you choose
- Stored only on your device
- Not transmitted or tracked

**Avatar Selection:**
- Choose from 10 unique avatars
- Options include: 🔒 Lock, 👤 User, 🎭 Mask, 🦊 Fox, 🐺 Wolf, 🦁 Lion, 🐉 Dragon, 👽 Alien, 🤖 Robot, 👻 Ghost
- Can be changed later in Settings

**What to do:** 
1. Enter your preferred name or leave as "Anonymous"
2. Select an avatar by clicking on it
3. Click "Next"

---

### Step 3: Security Configuration

Choose how to protect your aceOS session:

**Security Options:**

1. **No Lock** 🔓
   - Quick access without authentication
   - Best for: Personal devices, quick sessions
   - No password required

2. **Password** 🔑
   - Secure with a text password
   - Best for: Shared devices, sensitive data
   - Enter a strong password when selected

3. **PIN Code** 📱
   - 4-6 digit numeric PIN
   - Best for: Mobile devices, quick security
   - Easy to enter on touch screens

4. **Biometric** 👁️
   - Fingerprint or facial recognition
   - Best for: Devices with biometric hardware
   - Note: Simulated in browser environment

**What to do:**
1. Click on your preferred security method
2. If password or PIN selected, enter it in the field that appears
3. Remember your credentials (cannot be recovered!)
4. Click "Next"

---

### Step 4: Auto-Reset Timer

Configure automatic session reset for maximum security:

**What is Auto-Reset?**
Auto-reset automatically clears all session data and resets aceOS to a clean state after a specified period of inactivity.

**Timer Options:**

- **Never** (Default)
  - Manual reset only
  - Best for: Personal devices, trusted environments
  - You control when to clear data

- **1 Hour**
  - Resets after 1 hour of inactivity
  - Best for: Public computers, very sensitive data
  - Maximum security

- **6 Hours**
  - Resets after 6 hours of inactivity
  - Best for: Shared workstations
  - Balanced security

- **12 Hours**
  - Resets after 12 hours of inactivity
  - Best for: Semi-shared devices
  - Moderate security

- **24 Hours**
  - Resets after 24 hours of inactivity
  - Best for: Personal devices in semi-public spaces
  - Light security

**Activity Tracking:**
Any interaction (click, keyboard, mouse movement) resets the inactivity timer.

**What to do:**
1. Select your preferred timer setting
2. Consider your environment and security needs
3. Click "Next"

---

### Step 5: Encryption Settings

Select the encryption strength for your data:

**Encryption Levels:**

1. **Standard** (Recommended)
   - XOR encryption with session keys
   - Fast performance
   - Suitable for most use cases
   - Best for: General use, good balance

2. **Enhanced**
   - Additional encryption layers
   - Slightly slower performance
   - Increased security
   - Best for: Sensitive data, paranoid users

3. **Maximum**
   - Multi-layer encryption with extended keys
   - Noticeably slower performance
   - Highest security level
   - Best for: Extremely sensitive data, maximum paranoia

**Technical Details:**
- All levels use session-based encryption keys
- Keys are generated fresh each session
- Data is encrypted before storage
- No data is ever transmitted to external servers

**Performance Impact:**
- Standard: No noticeable impact
- Enhanced: 10-20% slower storage operations
- Maximum: 30-50% slower storage operations

**What to do:**
1. Select your preferred encryption level
2. Consider the trade-off between security and performance
3. Standard is recommended for most users
4. Click "Next"

---

### Step 6: Choose Your Theme

Customize your aceOS experience with one of 50 beautiful themes:

**Theme Categories:**

- **Original (4):** Default, Dark Purple, Blue, Red
- **Neon (6):** Pink, Green, Orange, Purple, Blue, Yellow
- **Pastel (6):** Mint, Lavender, Peach, Sky, Rose, Lemon
- **Dark (6):** Midnight, Charcoal, Obsidian, Noir, Deep Purple, Deep Blue
- **Nature (6):** Forest, Ocean, Sunset, Aurora, Desert, Garden
- **Professional (6):** Corporate, Slate, Steel, Silver, Platinum, Executive
- **Gaming (6):** Cyber, Matrix, Arcade, Retro, Synthwave, Vaporwave
- **Vibrant (6):** Tropical, Candy, Rainbow, Electric, Flame, Cosmic
- **Light (4):** Pearl, Cream, Cotton, Snow

**Preview:**
The tour shows 8 popular themes. All 50 themes are available in Settings → Appearance.

**What to do:**
1. Click on a theme preview to select it
2. The selected theme will be applied immediately after tour completion
3. You can change themes anytime in Settings
4. Click "Next"

---

### Step 7: Backup & Restore

Learn about data protection and backup options:

**Backup Features:**

- **Export Settings:** Save all configuration to JSON file
- **Export Data:** Backup bookmarks, content, and settings
- **Import Backup:** Restore from previous backup file
- **Encrypted Backups:** All exports are encrypted

**How to Create Backups:**
1. Open Settings app
2. Go to Data Management section
3. Click "Export Data" or "Export Backup"
4. Save the .json file to a secure location
5. Create backups regularly

**Restore from Backup:**
During the tour, you can:
1. Check "I have a backup file to restore"
2. Select your backup file (.json or .zip)
3. Data will be imported and applied

Or later:
1. Open Settings app
2. Go to Data Management section
3. Click "Import Backup"
4. Select your backup file

**What to do:**
1. If you have a backup, check the restore option and select the file
2. If not, click "Finish" to complete the tour
3. Your settings will be applied and saved

---

## System Configuration

### Accessing Settings

1. Click the aceOS start button (bottom-left)
2. Select "Settings" from the System category
3. Or click the ⚙️ icon if it's in your quick access

### Configuration Options

#### Appearance
- **Theme:** Choose from 50 themes across 9 categories
- **Theme Gallery:** Visual preview of all themes
- **Category Filter:** Filter themes by category

#### User Profile
- **Profile Name:** Change your display name
- **Profile Avatar:** Select a different avatar
- **Export Profile:** Save profile settings
- **Import Profile:** Restore profile settings

#### Security
- **Password Lock:** Enable/disable password protection
- **Security Type:** Change authentication method
- **Anonymous Mode:** Always enabled for privacy
- **Private Directory:** Control visibility in server directory

#### System
- **Auto-Update:** Enable/disable update checking
- **Auto-Reset Timer:** Configure session reset
- **Encryption Type:** Change encryption strength
- **Storage Usage:** View current storage consumption

#### Data Management
- **Export Data:** Create full backup
- **Import Data:** Restore from backup
- **Clear All Data:** Reset aceOS to factory state
- **Download OS:** Export complete OS package

---

## Applications Overview

aceOS includes 13 built-in applications:

### Core Applications

#### 🌐 webTrap - Secure Browser
- Anonymous web browsing
- Bookmark management with encryption
- Custom theming support
- No tracking or history retention

**How to use:**
1. Click webTrap icon or launch from start menu
2. Enter URL in address bar
3. Use bookmarks for quick access
4. Browse anonymously

---

#### ✏️ Make+Trap - Website Builder
- Drag-and-drop website builder
- 30+ pre-built modules
- Visual design, no coding required
- Publish to aceOS network

**How to use:**
1. Launch Make+Trap
2. Drag modules from sidebar to canvas
3. Customize content and styling
4. Click "GO LIVE" to publish

---

### Communication Apps

#### 💬 chatTrap - Secure Messaging
- Encrypted chat channels
- Anonymous communication
- Group chat support
- File sharing integration

#### 📧 mailTrap - Encrypted Email
- Anonymous email addresses
- End-to-end encryption
- Secure attachments
- Email organization

---

### Content & Sharing Apps

#### 📤 ContentShare - File Sharing
- Drag & drop file uploads
- Encrypted share links
- Share tracking
- Multiple file format support

#### 🏪 MarketPlace - Marketplace Hosting
- Create product listings
- Multiple categories
- Analytics dashboard
- Sales tracking

#### 🛒 MarketBrowser - Browse Marketplace
- Discover marketplace items
- Search and filter products
- View ratings and reviews
- Purchase interface

#### 🎬 MediaHub - Media Center
- Media library organization
- Video, audio, and image support
- Built-in player controls
- Playlist creation

#### ☁️ CloudSync - Cloud Storage
- File upload and download
- Folder organization
- Auto-sync capabilities
- Storage statistics (5GB simulated)

---

### Utility Apps

#### 💰 bankTrap - Financial Tools
- Cryptocurrency management
- Portfolio tracking
- Transaction history
- Anonymous payments

#### 🔧 crapTrap - System Utilities
- File encryption tools
- Secure file deletion
- Text editor
- Calculator
- System diagnostics

---

### System Apps

#### ⚙️ Settings - System Configuration
- Theme management
- User profile settings
- Security configuration
- Data management
- Update checking

#### ❓ Help & Tutorials - Documentation
- Comprehensive help guides
- Getting started tutorials
- Feature documentation
- FAQ and troubleshooting

---

## Security Features

### Anonymous Fingerprint
- Time-based unique identifier
- Changes each session
- Allows network participation without tracking
- Cannot be linked to previous sessions

### Encryption
- All data encrypted before storage
- Session-based encryption keys
- Keys generated fresh each session
- Three encryption levels available

### No Cloud Storage
- All data stored locally in browser
- No external servers
- No data transmission
- Complete control over your data

### Password Protection
- SHA-256 password hashing
- Multiple authentication methods
- Cannot be recovered (by design)
- Optional - privacy over convenience

### Auto-Reset
- Automatic data clearing
- Configurable inactivity timer
- Ensures no traces on shared devices
- Activity-based timer reset

---

## Data Management

### Creating Backups

**When to backup:**
- Before clearing data
- After significant configuration changes
- When using aceOS on shared devices
- Regularly (weekly/monthly recommended)

**What gets backed up:**
- System configuration
- User profile
- Bookmarks
- Website builder content
- Application data
- Settings and preferences

**How to backup:**
1. Open Settings
2. Go to Data Management
3. Click "Export Data"
4. Save JSON file to secure location
5. Optional: Store in encrypted container

### Restoring Backups

**How to restore:**
1. Open Settings
2. Go to Data Management
3. Click "Import Data"
4. Select your backup JSON file
5. Reload aceOS to apply changes

**During Welcome Tour:**
- Option to restore during initial setup
- Useful when moving to new device/browser
- Can restore complete configuration

### Exporting OS Package

**Download complete OS:**
1. Open Settings
2. Go to Data Management
3. Click "Download OS Package"
4. Save the package file
5. Extract and run anywhere

**Use cases:**
- Portable USB drive installation
- Offline backup of OS
- Distribution to others
- Version archiving

---

## Troubleshooting

### Common Issues

#### aceOS Won't Boot
**Symptoms:** Stuck on boot screen, blank page
**Solutions:**
1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Try different browser
5. Verify all files are present

#### Storage Full Error
**Symptoms:** Can't save data, storage warnings
**Solutions:**
1. Export important data
2. Clear unused bookmarks/content
3. Use "Clear Data" in Settings (after backup!)
4. Check browser storage quota
5. Try different browser

#### Forgot Password
**Symptoms:** Can't access aceOS with password enabled
**Solutions:**
- **Unfortunately, passwords cannot be recovered by design**
- Options:
  1. Clear browser LocalStorage (loses all data)
  2. Restore from unprotected backup
  3. Start fresh aceOS installation

**Prevention:**
- Write down passwords securely
- Use memorable passwords
- Create unencrypted backups
- Consider using "No Lock" for less sensitive use

#### App Not Loading
**Symptoms:** App window blank, app crashes
**Solutions:**
1. Close and reopen the app
2. Reload aceOS (F5)
3. Check browser console for errors
4. Clear app-specific data in Settings
5. Reset aceOS if persistent

#### Theme Not Applying
**Symptoms:** Theme changes don't take effect
**Solutions:**
1. Reload aceOS
2. Re-select theme in Settings
3. Clear browser cache
4. Check for JavaScript errors
5. Try default theme

---

## Best Practices

### For Personal Devices

- ✅ Use default "Never" auto-reset
- ✅ Choose "No Lock" or "Password" security
- ✅ Enable "Standard" encryption
- ✅ Create weekly backups
- ✅ Customize with your favorite theme
- ✅ Set up profile name and avatar

### For Shared Devices

- ✅ Use 6-12 hour auto-reset
- ✅ Enable password or PIN protection
- ✅ Use "Enhanced" or "Maximum" encryption
- ✅ Export data before leaving
- ✅ Manually clear data when done
- ✅ Use "Anonymous" profile name

### For Public Computers

- ✅ Use 1 hour auto-reset
- ✅ Enable password protection
- ✅ Use "Maximum" encryption
- ✅ Don't save any personal data
- ✅ Manually clear data after each session
- ✅ Export important work immediately
- ⚠️ Avoid entering sensitive information

### General Security Tips

1. **Regular Backups:** Export data weekly or after significant changes
2. **Strong Passwords:** Use complex passwords if enabling security
3. **Activity Awareness:** Remember auto-reset timer if enabled
4. **Data Minimization:** Only store what you need
5. **Browser Security:** Keep your browser updated
6. **No Sharing:** Don't share your aceOS credentials
7. **Verify Downloads:** Only download aceOS from trusted sources
8. **Privacy First:** Leverage anonymous mode and encryption

---

## Additional Resources

### Getting Help

- **Built-in Help App:** Comprehensive documentation and tutorials
- **Settings App:** System information and diagnostics
- **GitHub Issues:** Report bugs and request features
- **README.md:** Technical documentation and project info
- **CONTRIBUTING.md:** Guide for contributors

### Documentation Files

- `README.md` - Project overview and technical details
- `CONTRIBUTING.md` - Contribution guidelines
- `featuresguide.md` - Complete features documentation
- `STARTUP_GUIDE.md` - This file

### Version Information

- **Current Version:** 1.0.0
- **Release Date:** 2025
- **License:** MIT
- **Repository:** github.com/acesonder/L33tOS

---

## Welcome to aceOS!

You're now ready to use aceOS. Here's a quick checklist:

- [ ] Complete the Welcome Tour
- [ ] Set up your profile and security preferences
- [ ] Choose your favorite theme
- [ ] Explore the applications
- [ ] Create your first backup
- [ ] Read the Help documentation
- [ ] Enjoy anonymous, secure computing!

**Remember:** aceOS is designed for your privacy and security. All data stays on your device, encrypted and under your control.

**Questions?** Open the Help & Tutorials app or review this guide anytime.

---

**aceOS v1.0.0** - Anonymous. Secure. Untraceable.

*Made with 💚 for privacy enthusiasts*
