# aceOS - Anonymous Virtual Operating System

![aceOS](https://img.shields.io/badge/aceOS-v1.0.0-00ff9d)
![License](https://img.shields.io/badge/license-MIT-blue)

**Anonymous. Secure. Untraceable.**

aceOS is an innovative virtual operating system designed for ultimate privacy and anonymity. It runs entirely in your browser, providing a secure environment with encrypted storage and anonymous networking capabilities.

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

## 🧪 PHP Feature Management System (NEW)

### ⚠️ CRITICAL SECURITY WARNING

This branch includes a **PHP-based feature management system** with ~200 feature stubs for development and testing purposes.

**⚠️  INSECURE DEFAULT CREDENTIALS:**
- The system uses **root** with a **blank password** for MySQL by default
- These defaults are **ONLY for local development**
- **NEVER use these settings in production**

### Production Security Checklist

Before deploying to production:

1. **Create a `.env` file** based on `.env.example`
2. **Set a strong database password** (`DB_PASS=your_secure_password`)
3. **Create a dedicated database user** (not root):
   ```sql
   CREATE USER 'l33tos_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT SELECT, INSERT, UPDATE, DELETE ON l33tos.* TO 'l33tos_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
4. **Update `.env`** with the new credentials
5. **Verify `.env` is in `.gitignore`** (never commit credentials)
6. **Run the database schema**: `mysql -u root -p l33tos < db/init_schema.sql`

### Quick Start - PHP Feature System

#### Prerequisites
- PHP 7.4+ with MySQLi extension
- MySQL 5.7+ or MariaDB 10.2+
- Web server (Apache/Nginx) or PHP built-in server

#### Setup Steps

1. **Configure Database** (optional - works without DB):
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE l33tos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   
   # Import schema
   mysql -u root -p l33tos < db/init_schema.sql
   ```

2. **Generate Feature Stubs**:
   ```bash
   # Via CLI
   php tools/generate_feature_stubs.php
   
   # Or via browser
   # Navigate to: http://localhost:8000/tools/generate_feature_stubs.php
   ```

3. **Start PHP Development Server**:
   ```bash
   php -S localhost:8000
   ```

4. **Access the Application**:
   - Dashboard: http://localhost:8000/index.php
   - Feature Generator: http://localhost:8000/tools/generate_feature_stubs.php
   - Feature Registry: http://localhost:8000/admin/features_registry.php
   - Sample Feature: http://localhost:8000/features/feature_0001.php

#### Feature Categories (200 Features Total)

The system includes 8 categories with 25 features each:

1. **Core System** (Features 1-25) - System infrastructure
2. **webTrap Browser** (Features 26-50) - Browser functionality
3. **Marketplace Hosting** (Features 51-75) - Hosting platform
4. **Make+Trap Website Builder** (Features 76-100) - Website builder
5. **chatTrap** (Features 101-125) - Messaging system
6. **mailTrap** (Features 126-150) - Email client
7. **BankTrap** (Features 151-175) - Financial tools
8. **crapTrap** (Features 176-200) - System utilities

#### Testing the System

1. **Generate all 200 features**:
   ```bash
   php tools/generate_feature_stubs.php
   ```

2. **View the feature registry**:
   - Open http://localhost:8000/admin/features_registry.php
   - Toggle features on/off
   - View individual feature pages

3. **Verify toggles**:
   - Check `data/feature_toggles.json` to see saved states
   - Toggle a feature and verify the JSON updates

#### File Structure

```
L33tOS/
├── config.php                    # Database configuration
├── .env.example                  # Example environment config
├── index.php                     # Main dashboard
├── includes/
│   ├── header.php               # Layout header
│   └── footer.php               # Layout footer
├── features/
│   ├── feature_0001.php         # Sample feature (200 total when generated)
│   └── ...
├── admin/
│   ├── features_registry.php    # Feature management UI
│   └── toggle_feature.php       # AJAX toggle endpoint
├── tools/
│   └── generate_feature_stubs.php  # Feature generator
├── data/
│   └── feature_toggles.json     # Feature state storage
├── assets/
│   ├── css/custom.css           # 3D styles and animations
│   └── js/app.js                # JavaScript utilities
└── db/
    └── init_schema.sql          # Database schema
```

## 🎮 Getting Started - Browser-Based OS

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