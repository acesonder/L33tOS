//START - CONFIG.PHP
<?php
/**
 * L33tOS Configuration File
 * 
 * This file handles database configuration and connection.
 * 
 * ⚠️  SECURITY WARNING:
 * - Default credentials are INSECURE (root with blank password)
 * - These defaults are for local development ONLY
 * - For production: Create a .env file with secure credentials
 * - Never commit .env to version control
 */

// Initialize database availability flag
$DB_AVAILABLE = false;
$DB_CONNECTION = null;

// Load environment variables from .env file if it exists
if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0 || strpos(trim($line), '//') === 0) {
            continue;
        }
        
        // Parse KEY=VALUE pairs
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            
            // Set as environment variable
            if (!empty($key)) {
                $_ENV[$key] = $value;
                putenv("$key=$value");
            }
        }
    }
}

// Database configuration with fallback to insecure defaults
// ⚠️  WARNING: These fallback defaults are INSECURE!
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_NAME', getenv('DB_NAME') ?: 'l33tos');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: ''); // ⚠️  BLANK PASSWORD - INSECURE!

// Display warning if using insecure defaults
if (DB_USER === 'root' && DB_PASS === '') {
    error_log('⚠️  WARNING: Using insecure database defaults (root with blank password). Create a .env file for production!');
}

// Attempt database connection
try {
    $DB_CONNECTION = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check for connection errors
    if ($DB_CONNECTION->connect_error) {
        error_log('Database connection failed: ' . $DB_CONNECTION->connect_error);
        $DB_CONNECTION = null;
        $DB_AVAILABLE = false;
    } else {
        $DB_AVAILABLE = true;
        $DB_CONNECTION->set_charset('utf8mb4');
    }
} catch (Exception $e) {
    error_log('Database connection exception: ' . $e->getMessage());
    $DB_CONNECTION = null;
    $DB_AVAILABLE = false;
}

// Feature toggles file path
define('TOGGLES_FILE', __DIR__ . '/data/feature_toggles.json');

/**
 * Load feature toggles from JSON file
 * 
 * @return array Feature toggles
 */
function loadFeatureToggles() {
    if (file_exists(TOGGLES_FILE)) {
        $json = file_get_contents(TOGGLES_FILE);
        $toggles = json_decode($json, true);
        return $toggles ?: [];
    }
    return [];
}

/**
 * Save feature toggles to JSON file
 * 
 * @param array $toggles Feature toggles
 * @return bool Success status
 */
function saveFeatureToggles($toggles) {
    $json = json_encode($toggles, JSON_PRETTY_PRINT);
    return file_put_contents(TOGGLES_FILE, $json) !== false;
}

/**
 * Check if a feature is enabled
 * 
 * @param string $featureId Feature identifier
 * @return bool Whether feature is enabled
 */
function isFeatureEnabled($featureId) {
    $toggles = loadFeatureToggles();
    return isset($toggles[$featureId]) && $toggles[$featureId] === true;
}
?>
//END - CONFIG.PHP
