-- L33tOS Database Schema
-- Features table with 200 seeded feature records

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS l33tos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE l33tos;

-- Drop table if exists
DROP TABLE IF EXISTS features;

-- Create features table
CREATE TABLE features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    implemented TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_implemented (implemented),
    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Core System features (1-25)
INSERT INTO features (code, title, category, implemented) VALUES
(1, 'Multi-stage boot sequence', 'Core System', 0),
(2, 'BIOS-style boot screen', 'Core System', 0),
(3, 'Custom boot logo support', 'Core System', 0),
(4, 'Fast boot mode', 'Core System', 0),
(5, 'Safe mode', 'Core System', 0),
(6, 'Boot from URL', 'Core System', 0),
(7, 'Auto-resume session', 'Core System', 0),
(8, 'Boot diagnostics', 'Core System', 0),
(9, 'Memory check', 'Core System', 0),
(10, 'Storage verification', 'Core System', 0),
(11, 'Network test', 'Core System', 0),
(12, 'Custom splash screens', 'Core System', 0),
(13, 'Boot sound effects', 'Core System', 0),
(14, 'Boot optimization', 'Core System', 0),
(15, 'Parallel loading', 'Core System', 0),
(16, 'Lazy loading', 'Core System', 0),
(17, 'Boot log viewer', 'Core System', 0),
(18, 'System recovery', 'Core System', 0),
(19, 'Factory reset', 'Core System', 0),
(20, 'Export/import config', 'Core System', 0),
(21, 'Desktop widgets', 'Core System', 0),
(22, 'System monitor', 'Core System', 0),
(23, 'Weather widget', 'Core System', 0),
(24, 'Calendar widget', 'Core System', 0),
(25, 'Clock widget', 'Core System', 0);

-- Seed webTrap features (26-75)
INSERT INTO features (code, title, category, implemented) VALUES
(26, 'Tab management', 'webTrap', 0),
(27, 'New tab button', 'webTrap', 0),
(28, 'Tab reordering', 'webTrap', 0),
(29, 'Tab pinning', 'webTrap', 0),
(30, 'Tab muting', 'webTrap', 0),
(31, 'Tab groups', 'webTrap', 0),
(32, 'Tab suspending', 'webTrap', 0),
(33, 'Tab search', 'webTrap', 0),
(34, 'Recently closed tabs', 'webTrap', 0),
(35, 'Tab sessions', 'webTrap', 0),
(36, 'URL bar autocomplete', 'webTrap', 0),
(37, 'Smart suggestions', 'webTrap', 0),
(38, 'Search suggestions', 'webTrap', 0),
(39, 'History suggestions', 'webTrap', 0),
(40, 'Bookmark management', 'webTrap', 0),
(41, 'Bookmark bar', 'webTrap', 0),
(42, 'Bookmark folders', 'webTrap', 0),
(43, 'Bookmark tags', 'webTrap', 0),
(44, 'Server directory', 'webTrap', 0),
(45, 'Marketplace integration', 'webTrap', 0),
(46, 'Dark mode', 'webTrap', 0),
(47, 'Custom CSS', 'webTrap', 0),
(48, 'User scripts', 'webTrap', 0),
(49, 'Theme engine', 'webTrap', 0),
(50, 'Font customization', 'webTrap', 0),
(51, 'Icon packs', 'webTrap', 0),
(52, 'Keyboard shortcuts', 'webTrap', 0),
(53, 'Voice control', 'webTrap', 0),
(54, 'Translation support', 'webTrap', 0),
(55, 'Dictionary', 'webTrap', 0),
(56, 'Grammar checker', 'webTrap', 0),
(57, 'Reading mode', 'webTrap', 0),
(58, 'PDF viewer', 'webTrap', 0),
(59, 'Screenshot tools', 'webTrap', 0),
(60, 'Screen recording', 'webTrap', 0),
(61, 'Privacy protection', 'webTrap', 0),
(62, 'Ad blocking', 'webTrap', 0),
(63, 'Tracker blocking', 'webTrap', 0),
(64, 'Cookie management', 'webTrap', 0),
(65, 'Password manager', 'webTrap', 0),
(66, 'Form autofill', 'webTrap', 0),
(67, 'Download manager', 'webTrap', 0),
(68, 'History sync', 'webTrap', 0),
(69, 'Bookmarks sync', 'webTrap', 0),
(70, 'Extensions support', 'webTrap', 0),
(71, 'Developer tools', 'webTrap', 0),
(72, 'Inspect element', 'webTrap', 0),
(73, 'Console', 'webTrap', 0),
(74, 'Network monitor', 'webTrap', 0),
(75, 'Performance profiler', 'webTrap', 0);

-- Seed Marketplace Hosting features (76-125)
INSERT INTO features (code, title, category, implemented) VALUES
(76, 'Server registration', 'Marketplace Hosting', 0),
(77, 'Server directory', 'Marketplace Hosting', 0),
(78, 'Server search', 'Marketplace Hosting', 0),
(79, 'Server ratings', 'Marketplace Hosting', 0),
(80, 'Server reviews', 'Marketplace Hosting', 0),
(81, 'Server categories', 'Marketplace Hosting', 0),
(82, 'Featured servers', 'Marketplace Hosting', 0),
(83, 'Popular servers', 'Marketplace Hosting', 0),
(84, 'New servers', 'Marketplace Hosting', 0),
(85, 'Random server', 'Marketplace Hosting', 0),
(86, 'Server analytics', 'Marketplace Hosting', 0),
(87, 'Traffic monitoring', 'Marketplace Hosting', 0),
(88, 'Uptime tracking', 'Marketplace Hosting', 0),
(89, 'Error logging', 'Marketplace Hosting', 0),
(90, 'Performance metrics', 'Marketplace Hosting', 0),
(91, 'SEO tools', 'Marketplace Hosting', 0),
(92, 'Meta tags editor', 'Marketplace Hosting', 0),
(93, 'Sitemap generator', 'Marketplace Hosting', 0),
(94, 'Robots.txt editor', 'Marketplace Hosting', 0),
(95, 'SSL certificates', 'Marketplace Hosting', 0),
(96, 'Domain management', 'Marketplace Hosting', 0),
(97, 'DNS configuration', 'Marketplace Hosting', 0),
(98, 'Email hosting', 'Marketplace Hosting', 0),
(99, 'Database hosting', 'Marketplace Hosting', 0),
(100, 'FTP access', 'Marketplace Hosting', 0),
(101, 'File manager', 'Marketplace Hosting', 0),
(102, 'Backup system', 'Marketplace Hosting', 0),
(103, 'Restore system', 'Marketplace Hosting', 0),
(104, 'Migration tools', 'Marketplace Hosting', 0),
(105, 'Staging environment', 'Marketplace Hosting', 0),
(106, 'Version control', 'Marketplace Hosting', 0),
(107, 'Git integration', 'Marketplace Hosting', 0),
(108, 'CI/CD pipeline', 'Marketplace Hosting', 0),
(109, 'Auto deployment', 'Marketplace Hosting', 0),
(110, 'Load balancing', 'Marketplace Hosting', 0),
(111, 'CDN integration', 'Marketplace Hosting', 0),
(112, 'DDoS protection', 'Marketplace Hosting', 0),
(113, 'Firewall rules', 'Marketplace Hosting', 0),
(114, 'Security scanning', 'Marketplace Hosting', 0),
(115, 'Malware detection', 'Marketplace Hosting', 0),
(116, 'Vulnerability assessment', 'Marketplace Hosting', 0),
(117, 'Access control', 'Marketplace Hosting', 0),
(118, 'User permissions', 'Marketplace Hosting', 0),
(119, 'API keys', 'Marketplace Hosting', 0),
(120, 'Webhooks', 'Marketplace Hosting', 0),
(121, 'Custom domains', 'Marketplace Hosting', 0),
(122, 'Subdomain management', 'Marketplace Hosting', 0),
(123, 'URL redirects', 'Marketplace Hosting', 0),
(124, 'Custom error pages', 'Marketplace Hosting', 0),
(125, 'Maintenance mode', 'Marketplace Hosting', 0);

-- Seed Make+Trap Website Builder features (126-150)
INSERT INTO features (code, title, category, implemented) VALUES
(126, 'Drag-and-drop editor', 'Make+Trap Website Builder', 0),
(127, 'Template library', 'Make+Trap Website Builder', 0),
(128, 'Pre-built modules', 'Make+Trap Website Builder', 0),
(129, 'Layout designer', 'Make+Trap Website Builder', 0),
(130, 'Responsive preview', 'Make+Trap Website Builder', 0),
(131, 'Mobile optimization', 'Make+Trap Website Builder', 0),
(132, 'Form builder', 'Make+Trap Website Builder', 0),
(133, 'Contact forms', 'Make+Trap Website Builder', 0),
(134, 'E-commerce module', 'Make+Trap Website Builder', 0),
(135, 'Product catalog', 'Make+Trap Website Builder', 0),
(136, 'Shopping cart', 'Make+Trap Website Builder', 0),
(137, 'Payment integration', 'Make+Trap Website Builder', 0),
(138, 'Blog module', 'Make+Trap Website Builder', 0),
(139, 'Post editor', 'Make+Trap Website Builder', 0),
(140, 'Comment system', 'Make+Trap Website Builder', 0),
(141, 'Review system', 'Make+Trap Website Builder', 0),
(142, 'Gallery module', 'Make+Trap Website Builder', 0),
(143, 'Image optimization', 'Make+Trap Website Builder', 0),
(144, 'Video embedding', 'Make+Trap Website Builder', 0),
(145, 'Social integration', 'Make+Trap Website Builder', 0),
(146, 'SEO optimizer', 'Make+Trap Website Builder', 0),
(147, 'Live preview', 'Make+Trap Website Builder', 0),
(148, 'GO LIVE button', 'Make+Trap Website Builder', 0),
(149, 'Publish to network', 'Make+Trap Website Builder', 0),
(150, 'Version history', 'Make+Trap Website Builder', 0);

-- Seed chatTrap features (151-165)
INSERT INTO features (code, title, category, implemented) VALUES
(151, 'Real-time messaging', 'chatTrap', 0),
(152, 'Message encryption', 'chatTrap', 0),
(153, 'Group chats', 'chatTrap', 0),
(154, 'Private channels', 'chatTrap', 0),
(155, 'File sharing', 'chatTrap', 0),
(156, 'Voice messages', 'chatTrap', 0),
(157, 'Video calls', 'chatTrap', 0),
(158, 'Screen sharing', 'chatTrap', 0),
(159, 'Message history', 'chatTrap', 0),
(160, 'Search messages', 'chatTrap', 0),
(161, 'Message reactions', 'chatTrap', 0),
(162, 'Custom emojis', 'chatTrap', 0),
(163, 'Status updates', 'chatTrap', 0),
(164, 'Typing indicators', 'chatTrap', 0),
(165, 'Read receipts', 'chatTrap', 0);

-- Seed mailTrap features (166-180)
INSERT INTO features (code, title, category, implemented) VALUES
(166, 'Compose email', 'mailTrap', 0),
(167, 'Rich text editor', 'mailTrap', 0),
(168, 'Email templates', 'mailTrap', 0),
(169, 'Attachment support', 'mailTrap', 0),
(170, 'Inbox management', 'mailTrap', 0),
(171, 'Folder organization', 'mailTrap', 0),
(172, 'Email filters', 'mailTrap', 0),
(173, 'Spam detection', 'mailTrap', 0),
(174, 'Contact management', 'mailTrap', 0),
(175, 'Address book', 'mailTrap', 0),
(176, 'Email search', 'mailTrap', 0),
(177, 'Archive emails', 'mailTrap', 0),
(178, 'Email encryption', 'mailTrap', 0),
(179, 'Anonymous addresses', 'mailTrap', 0),
(180, 'Email scheduling', 'mailTrap', 0);

-- Seed bankTrap features (181-190)
INSERT INTO features (code, title, category, implemented) VALUES
(181, 'Wallet management', 'bankTrap', 0),
(182, 'Cryptocurrency support', 'bankTrap', 0),
(183, 'Portfolio tracking', 'bankTrap', 0),
(184, 'Price alerts', 'bankTrap', 0),
(185, 'Transaction history', 'bankTrap', 0),
(186, 'QR code generator', 'bankTrap', 0),
(187, 'Payment requests', 'bankTrap', 0),
(188, 'Balance overview', 'bankTrap', 0),
(189, 'Exchange integration', 'bankTrap', 0),
(190, 'Market charts', 'bankTrap', 0);

-- Seed crapTrap features (191-200)
INSERT INTO features (code, title, category, implemented) VALUES
(191, 'File encryption', 'crapTrap', 0),
(192, 'Secure file deletion', 'crapTrap', 0),
(193, 'Text editor', 'crapTrap', 0),
(194, 'Calculator', 'crapTrap', 0),
(195, 'Password generator', 'crapTrap', 0),
(196, 'Hash calculator', 'crapTrap', 0),
(197, 'Base64 encoder', 'crapTrap', 0),
(198, 'JSON formatter', 'crapTrap', 0),
(199, 'System information', 'crapTrap', 0),
(200, 'System diagnostics', 'crapTrap', 0);

-- Verify data
SELECT category, COUNT(*) as count FROM features GROUP BY category ORDER BY count DESC;
SELECT COUNT(*) as total_features FROM features;
