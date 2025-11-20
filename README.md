# aceOS - Anonymous Virtual Operating System

![aceOS](https://img.shields.io/badge/aceOS-v1.0.0-00ff9d)
![License](https://img.shields.io/badge/license-MIT-blue)

**Anonymous. Secure. Untraceable.**

aceOS is an innovative virtual operating system designed for ultimate privacy and anonymity. It runs entirely in your browser, providing a secure environment with encrypted storage and anonymous networking capabilities.

## 🆕 PHP Feature Scaffold (Branch: feature/stubs-200)

This branch contains a complete PHP/HTML/CSS/JS scaffold with **200 feature stubs** ready for development.

### ⚠️ CRITICAL SECURITY WARNING
**This scaffold uses INSECURE database defaults:**
- Default MySQL user: `root`
- Default password: `blank` (empty)
- **NEVER use these settings in production!**
- Create a `.env` file with secure credentials before deploying
- See `.env.example` for configuration template

### 🛠️ PHP Scaffold Setup

1. **Requirements:**
   - PHP 7.4 or higher
   - MySQL 5.7 or higher
   - Web server (Apache/Nginx) or use PHP built-in server

2. **Database Setup:**
   ```bash
   # Create database and import schema
   mysql -u root -p < db/init_schema.sql
   ```

3. **Configuration:**
   ```bash
   # Copy .env.example to .env and update with your credentials
   cp .env.example .env
   # Edit .env with secure database credentials
   ```

4. **Run Development Server:**
   ```bash
   # Using PHP built-in server
   php -S localhost:8000
   # Then visit http://localhost:8000/index.php
   ```

5. **Generate Feature Stubs:**
   ```bash
   # From command line
   php tools/generate_feature_stubs.php
   # Or visit http://localhost:8000/tools/generate_feature_stubs.php
   ```

### 📁 Scaffold Structure
```
/
├── index.php                    # Main dashboard
├── config.php                   # Database configuration
├── .env.example                 # Example environment file
├── includes/
│   ├── header.php              # Page header with navbar
│   └── footer.php              # Page footer
├── admin/
│   └── features_registry.php   # Feature management & toggles
├── features/                    # 200 feature stub files
│   ├── feature_0001.php        # Core System features (1-25)
│   ├── feature_0026.php        # webTrap features (26-75)
│   ├── feature_0076.php        # Marketplace Hosting (76-125)
│   ├── feature_0126.php        # Make+Trap Builder (126-150)
│   ├── feature_0151.php        # chatTrap (151-165)
│   ├── feature_0166.php        # mailTrap (166-180)
│   ├── feature_0181.php        # bankTrap (181-190)
│   └── feature_0191.php        # crapTrap (191-200)
├── tools/
│   └── generate_feature_stubs.php  # Feature generator script
├── db/
│   └── init_schema.sql         # Database schema with seeds
├── data/
│   └── feature_toggles.json    # Feature toggle state
└── assets/
    ├── css/
    │   └── custom.css          # 3D styles & transitions
    └── js/
        └── app.js              # AJAX toggles & modals
```

### 🎨 Features
- **Bootstrap 5** for responsive UI
- **Font Awesome** icons
- **3D-styled navbar** and cards with CSS transforms
- **Smooth transitions** and animations
- **AJAX feature toggles** with JSON persistence
- **Modal demos** for each feature
- **Category filtering** and search
- **MySQL database** with 200 seeded features
- **File-based fallback** when database unavailable

### 📊 Feature Categories (200 Total)
- **Core System**: 25 features
- **webTrap**: 50 features
- **Marketplace Hosting**: 50 features
- **Make+Trap Website Builder**: 25 features
- **chatTrap**: 15 features
- **mailTrap**: 15 features
- **bankTrap**: 10 features
- **crapTrap**: 10 features

## 🚀 Features

### Core Capabilities
- **🔒 Complete Anonymity**: No login required - launch a clean session every time
- **💾 Local Storage Only**: All data stays on your device, encrypted and secure
- **🎨 Professional UI**: Modern interface with 3D elements and smooth transitions
- **🛡️ Encrypted Everything**: All data is encrypted using session-based keys
- **⚡ Portable**: Run from any browser - no installation needed
- **🔄 Auto-Updates**: Keep your system secure with automatic update checks

### Built-in Applications

#### 🌐 webTrap Browser
- Secure browser for aceOS-exclusive content
- Bookmark management with encryption
- Anonymous browsing capabilities
- Custom theming support

#### ✏️ Make+Trap Website Builder
- Drag-and-drop website builder with 30+ pre-built modules
- Visual design with no coding required
- Pre-built modules: layouts, forms, e-commerce, blogs, reviews, chat, and more
- Live preview and instant publishing
- GO LIVE button to publish sites to the aceOS network
- Published sites appear in webTrap browser directory for all users worldwide

#### 💬 chatTrap (Coming Soon)
- Secure, encrypted messaging
- Anonymous communication channels

#### 📧 mailTrap (Coming Soon)
- Encrypted email service
- Anonymous email addresses

#### 💰 bankTrap (Coming Soon)
- Cryptocurrency management
- Anonymous financial transactions
- Portfolio tracking

#### 🔧 crapTrap (Coming Soon)
- System utilities
- File encryption tools
- Secure file deletion
- Text editor and calculator

#### ⚙️ Settings
- Theme customization
- Privacy controls
- Data backup and restore
- System information

#### ❓ Help & Tutorials
- Comprehensive documentation
- Getting started guides
- Feature tutorials

## 🎮 Getting Started

### Quick Start
1. Open `index.html` in any modern web browser
2. Wait for the boot sequence to complete
3. **First-time users**: Complete the interactive Welcome Tour (7 easy steps)
4. Start using aceOS!

### Welcome Tour (First Launch)
When you launch aceOS for the first time, an interactive tour will guide you through:
- **Profile Setup**: Choose your name and avatar
- **Security Configuration**: Set up password, PIN, or biometric protection
- **Auto-Reset Timer**: Configure automatic session reset (1h, 6h, 12h, 24h, or never)
- **Encryption Level**: Choose standard, enhanced, or maximum encryption
- **Theme Selection**: Pick from 50 beautiful themes
- **Backup & Restore**: Learn about data protection options

**Note**: You can skip the tour and use default settings, or access help documentation anytime.

### Usage
- **Launch Apps**: Click the start button or use desktop icons
- **Create Windows**: Double-click desktop icons or use the start menu
- **Navigate**: Use the taskbar for quick access to running apps
- **Customize**: Open Settings to change themes and configure privacy options
- **Get Help**: Access comprehensive documentation through Help & Tutorials app

## 🔐 Security & Privacy

### Encryption
All data stored by aceOS is encrypted using session-based keys. Your data is automatically encrypted when saved and decrypted when loaded.

### Anonymous Fingerprint
aceOS generates a unique, time-based fingerprint for each session, ensuring complete anonymity while allowing participation in server directories.

### Local Storage
No data is ever transmitted to external servers. Everything stays on your device, giving you complete control over your privacy.

### Data Backup
You are responsible for backing up your content. Use the Export function in Settings to create backups of your data regularly.

## 🎨 Themes

aceOS includes multiple themes:
- **Default** (Green) - Classic aceOS look
- **Dark** (Purple) - Deep purple accents
- **Blue** - Cool blue tones
- **Red** - Warm red highlights

Change themes in Settings (⚙️).

## 📦 Project Structure

```
aceOS/
├── index.html              # Main entry point
├── css/
│   ├── style.css          # Main stylesheet
│   └── themes.css         # Theme definitions
├── js/
│   ├── core/
│   │   ├── crypto.js      # Encryption module
│   │   ├── storage.js     # Storage management
│   │   └── system.js      # System core
│   ├── ui/
│   │   ├── window-manager.js  # Window management
│   │   └── desktop.js         # Desktop UI
│   ├── apps/
│   │   ├── webTrap.js     # Secure browser
│   │   ├── makeTrap.js    # WYSIWYG editor
│   │   ├── chatTrap.js    # Messaging (placeholder)
│   │   ├── mailTrap.js    # Email (placeholder)
│   │   ├── bankTrap.js    # Finance (placeholder)
│   │   ├── crapTrap.js    # Utilities (placeholder)
│   │   ├── settings.js    # System settings
│   │   └── help.js        # Help & tutorials
│   └── main.js            # Boot sequence
└── README.md              # This file
```

## 🛠️ Technical Details

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Storage Requirements
- Minimal: Uses browser LocalStorage
- No server-side requirements
- All processing done client-side

### Technologies Used
- Pure HTML5/CSS3/JavaScript (ES6+)
- No external dependencies
- No build process required
- LocalStorage API for data persistence
- Web Crypto API for encryption

## 🚧 Roadmap

### Phase 1 (Complete) ✅
- Core OS shell and UI framework
- webTrap browser with basic functionality
- Make+Trap drag-and-drop website builder with 30+ modules
- Site publishing and directory system
- Settings and Help system
- Theme system
- Window management

### Phase 2 (In Progress)
- Complete chatTrap messaging app
- Complete mailTrap email client
- Enhanced webTrap features (tabs, extensions)
- Additional Make+Trap modules and templates

### Phase 3 (Planned)
- bankTrap financial tools
- crapTrap utilities suite
- Advanced encryption options
- P2P networking capabilities
- Mobile responsive design improvements

### Phase 4 (Future)
- Plugin/extension system
- Community server directory
- Enhanced privacy features
- Advanced customization options

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📚 Documentation

- **[STARTUP_GUIDE.md](STARTUP_GUIDE.md)** - Comprehensive startup guide with step-by-step instructions for the welcome tour, configuration options, and best practices
- **[featuresguide.md](featuresguide.md)** - Complete feature documentation covering all 13 apps and 50 themes
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributors
- **Built-in Help App** - Access documentation directly within aceOS

## ⚠️ Disclaimer

aceOS is designed for privacy and security education. Users are responsible for their own actions and data. The developers assume no liability for misuse of this software.

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the built-in Help & Tutorials app
- Review the [STARTUP_GUIDE.md](STARTUP_GUIDE.md) documentation
- Read the [featuresguide.md](featuresguide.md) for detailed features

---

**Made with 💚 for privacy enthusiasts**

aceOS v1.0.0 - Anonymous. Secure. Untraceable.