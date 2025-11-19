//START - ADMIN/TOGGLE_FEATURE.PHP
<?php
/**
 * Feature Toggle AJAX Endpoint
 * 
 * Updates feature toggle state in JSON file
 */

require_once __DIR__ . '/../config.php';

// Set JSON response header
header('Content-Type: application/json');

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!isset($data['feature_id']) || !isset($data['enabled'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

$featureId = $data['feature_id'];
$enabled = (bool)$data['enabled'];

try {
    // Load current toggles
    $toggles = loadFeatureToggles();
    
    // Update toggle
    $toggles[$featureId] = $enabled;
    
    // Save toggles
    if (saveFeatureToggles($toggles)) {
        echo json_encode([
            'success' => true,
            'feature_id' => $featureId,
            'enabled' => $enabled
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save toggles']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
//END - ADMIN/TOGGLE_FEATURE.PHP
