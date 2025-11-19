//START - DB/INIT_SCHEMA.SQL
-- ==============================================================================
-- L33tOS Database Schema
-- ==============================================================================
-- This file contains the database schema for the L33tOS feature management
-- system. Run this script to initialize your database.
--
-- Usage:
--   mysql -u root -p l33tos < db/init_schema.sql
--
-- Or from MySQL command line:
--   USE l33tos;
--   SOURCE /path/to/db/init_schema.sql;
-- ==============================================================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS l33tos
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE l33tos;

-- ==============================================================================
-- Features Table
-- ==============================================================================
-- Stores feature metadata and configuration
-- ==============================================================================

DROP TABLE IF EXISTS features;

CREATE TABLE features (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    feature_id VARCHAR(50) NOT NULL UNIQUE,
    feature_number INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    enabled BOOLEAN DEFAULT FALSE,
    priority INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_feature_id (feature_id),
    INDEX idx_category (category),
    INDEX idx_enabled (enabled),
    INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- Feature Categories Table
-- ==============================================================================
-- Stores category definitions
-- ==============================================================================

DROP TABLE IF EXISTS feature_categories;

CREATE TABLE feature_categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    color VARCHAR(50),
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- Feature Logs Table
-- ==============================================================================
-- Tracks feature activation/deactivation events
-- ==============================================================================

DROP TABLE IF EXISTS feature_logs;

CREATE TABLE feature_logs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    feature_id VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    previous_state BOOLEAN,
    new_state BOOLEAN,
    user_id INT UNSIGNED,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_feature_id (feature_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (feature_id) REFERENCES features(feature_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- Seed Data - Feature Categories
-- ==============================================================================

INSERT INTO feature_categories (name, icon, color, display_order) VALUES
('Core System', 'fa-server', 'primary', 1),
('webTrap Browser', 'fa-globe', 'success', 2),
('Marketplace Hosting', 'fa-store', 'info', 3),
('Make+Trap Website Builder', 'fa-paint-brush', 'warning', 4),
('chatTrap', 'fa-comments', 'danger', 5),
('mailTrap', 'fa-envelope', 'secondary', 6),
('BankTrap', 'fa-piggy-bank', 'primary', 7),
('crapTrap', 'fa-tools', 'dark', 8);

-- ==============================================================================
-- Seed Data - Features (Sample)
-- ==============================================================================
-- You can populate this table by running a script or manually
-- Generator script: tools/generate_feature_stubs.php
--
-- To auto-generate seed data for all 200 features, run:
--   php tools/seed_database.php
--
-- Or manually insert features:
-- INSERT INTO features (feature_id, feature_number, name, category) VALUES
--   ('feature_0001', 1, 'Feature 0001', 'Core System'),
--   ('feature_0002', 2, 'Feature 0002', 'Core System'),
--   ...and so on
-- ==============================================================================

-- Sample feature insert (commented out - use generator instead)
-- INSERT INTO features (feature_id, feature_number, name, category, enabled) VALUES
-- ('feature_0001', 1, 'Core System Feature 1', 'Core System', FALSE);

-- ==============================================================================
-- Views
-- ==============================================================================

-- View: Enabled Features
DROP VIEW IF EXISTS v_enabled_features;
CREATE VIEW v_enabled_features AS
SELECT 
    f.id,
    f.feature_id,
    f.feature_number,
    f.name,
    f.category,
    f.priority,
    c.icon,
    c.color
FROM features f
INNER JOIN feature_categories c ON f.category = c.name
WHERE f.enabled = TRUE
ORDER BY f.priority DESC, f.feature_number ASC;

-- View: Features by Category
DROP VIEW IF EXISTS v_features_by_category;
CREATE VIEW v_features_by_category AS
SELECT 
    c.name AS category_name,
    c.icon,
    c.color,
    COUNT(f.id) AS feature_count,
    SUM(CASE WHEN f.enabled = TRUE THEN 1 ELSE 0 END) AS enabled_count
FROM feature_categories c
LEFT JOIN features f ON c.name = f.category
GROUP BY c.id, c.name, c.icon, c.color, c.display_order
ORDER BY c.display_order;

-- ==============================================================================
-- Stored Procedures
-- ==============================================================================

-- Procedure: Toggle Feature
DELIMITER //
DROP PROCEDURE IF EXISTS toggle_feature//
CREATE PROCEDURE toggle_feature(
    IN p_feature_id VARCHAR(50),
    IN p_enabled BOOLEAN
)
BEGIN
    UPDATE features 
    SET enabled = p_enabled,
        updated_at = CURRENT_TIMESTAMP
    WHERE feature_id = p_feature_id;
    
    -- Log the change
    INSERT INTO feature_logs (feature_id, action, new_state)
    VALUES (p_feature_id, 'toggle', p_enabled);
END//
DELIMITER ;

-- Procedure: Get Feature Statistics
DELIMITER //
DROP PROCEDURE IF EXISTS get_feature_stats//
CREATE PROCEDURE get_feature_stats()
BEGIN
    SELECT 
        COUNT(*) AS total_features,
        SUM(CASE WHEN enabled = TRUE THEN 1 ELSE 0 END) AS enabled_features,
        SUM(CASE WHEN enabled = FALSE THEN 1 ELSE 0 END) AS disabled_features,
        COUNT(DISTINCT category) AS total_categories
    FROM features;
END//
DELIMITER ;

-- ==============================================================================
-- Indexes for Performance
-- ==============================================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_category_enabled ON features(category, enabled);
CREATE INDEX idx_enabled_priority ON features(enabled, priority);

-- ==============================================================================
-- Database User Setup (Optional)
-- ==============================================================================
-- ⚠️  SECURITY: Create a dedicated user instead of using root
--
-- CREATE USER 'l33tos_user'@'localhost' IDENTIFIED BY 'your_strong_password_here';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON l33tos.* TO 'l33tos_user'@'localhost';
-- FLUSH PRIVILEGES;
--
-- Then update your .env file:
-- DB_USER=l33tos_user
-- DB_PASS=your_strong_password_here
-- ==============================================================================

-- ==============================================================================
-- Verification Queries
-- ==============================================================================
-- Run these to verify the schema was created successfully:
--
-- SHOW TABLES;
-- DESCRIBE features;
-- DESCRIBE feature_categories;
-- DESCRIBE feature_logs;
-- SELECT * FROM feature_categories;
-- SELECT * FROM v_features_by_category;
-- ==============================================================================

SELECT 'Database schema initialized successfully!' AS Status;
//END - DB/INIT_SCHEMA.SQL
