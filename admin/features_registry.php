//START - ADMIN/FEATURES_REGISTRY.PHP
<?php
require_once __DIR__ . '/../config.php';
$pageTitle = 'Features Registry - L33tOS';

// Handle AJAX toggle requests
if (isset($_GET['action']) && $_GET['action'] === 'toggle' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $input = json_decode(file_get_contents('php://input'), true);
    $featureId = $input['feature_id'] ?? null;
    $enabled = $input['enabled'] ?? 0;
    
    if ($featureId) {
        $togglesFile = __DIR__ . '/../data/feature_toggles.json';
        $toggles = [];
        
        if (file_exists($togglesFile)) {
            $toggles = json_decode(file_get_contents($togglesFile), true) ?? [];
        }
        
        $toggles[$featureId] = (int)$enabled;
        
        if (file_put_contents($togglesFile, json_encode($toggles, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true, 'message' => 'Toggle updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save toggle']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid feature ID']);
    }
    exit;
}

// Load feature toggles
$togglesFile = __DIR__ . '/../data/feature_toggles.json';
$featureToggles = [];
if (file_exists($togglesFile)) {
    $featureToggles = json_decode(file_get_contents($togglesFile), true) ?? [];
}

// Get features from database or scan directory
$features = [];
$dbAvailable = isDatabaseAvailable();

if ($dbAvailable) {
    try {
        $conn = getDBConnection();
        $stmt = $conn->query("SELECT * FROM features ORDER BY code ASC");
        $features = $stmt->fetchAll();
    } catch (Exception $e) {
        $dbAvailable = false;
    }
}

// If DB not available, scan features directory
if (!$dbAvailable) {
    $featuresDir = __DIR__ . '/../features';
    if (is_dir($featuresDir)) {
        $files = glob($featuresDir . '/feature_*.php');
        sort($files);
        foreach ($files as $file) {
            $filename = basename($file);
            if (preg_match('/feature_(\d+)\.php/', $filename, $matches)) {
                $features[] = [
                    'id' => (int)$matches[1],
                    'code' => (int)$matches[1],
                    'title' => 'Feature ' . $matches[1],
                    'category' => 'Uncategorized',
                    'implemented' => 0
                ];
            }
        }
    }
}

// Filter by category if requested
$selectedCategory = $_GET['category'] ?? 'all';
if ($selectedCategory !== 'all') {
    $features = array_filter($features, function($f) use ($selectedCategory) {
        return ($f['category'] ?? '') === $selectedCategory;
    });
}

include __DIR__ . '/../includes/header.php';
?>

<div class="row">
    <div class="col-12">
        <div class="card card-3d mb-4">
            <div class="card-header bg-primary text-white">
                <h2 class="mb-0"><i class="fas fa-list-ul"></i> Features Registry</h2>
            </div>
            <div class="card-body">
                <?php if (!$dbAvailable): ?>
                <div class="alert alert-warning">
                    <i class="fas fa-database"></i> Database not available. Showing features from file system only.
                    Run the SQL schema to enable full database features.
                </div>
                <?php endif; ?>
                
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="categoryFilter" class="form-label">Filter by Category:</label>
                        <select id="categoryFilter" class="form-select" onchange="window.location.href='?category=' + this.value">
                            <option value="all" <?php echo $selectedCategory === 'all' ? 'selected' : ''; ?>>All Categories</option>
                            <option value="Core System" <?php echo $selectedCategory === 'Core System' ? 'selected' : ''; ?>>Core System</option>
                            <option value="webTrap" <?php echo $selectedCategory === 'webTrap' ? 'selected' : ''; ?>>webTrap</option>
                            <option value="Marketplace Hosting" <?php echo $selectedCategory === 'Marketplace Hosting' ? 'selected' : ''; ?>>Marketplace Hosting</option>
                            <option value="Make+Trap Website Builder" <?php echo $selectedCategory === 'Make+Trap Website Builder' ? 'selected' : ''; ?>>Make+Trap Website Builder</option>
                            <option value="chatTrap" <?php echo $selectedCategory === 'chatTrap' ? 'selected' : ''; ?>>chatTrap</option>
                            <option value="mailTrap" <?php echo $selectedCategory === 'mailTrap' ? 'selected' : ''; ?>>mailTrap</option>
                            <option value="bankTrap" <?php echo $selectedCategory === 'bankTrap' ? 'selected' : ''; ?>>bankTrap</option>
                            <option value="crapTrap" <?php echo $selectedCategory === 'crapTrap' ? 'selected' : ''; ?>>crapTrap</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">&nbsp;</label>
                        <div>
                            <span class="badge bg-primary"><?php echo count($features); ?> features shown</span>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th width="80">ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th width="120">Status</th>
                                <th width="100">Toggle</th>
                                <th width="150">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($features as $feature): ?>
                            <tr>
                                <td><span class="badge bg-secondary">#<?php echo str_pad($feature['code'], 4, '0', STR_PAD_LEFT); ?></span></td>
                                <td><strong><?php echo htmlspecialchars($feature['title'] ?? 'Untitled'); ?></strong></td>
                                <td><span class="badge bg-info"><?php echo htmlspecialchars($feature['category'] ?? 'N/A'); ?></span></td>
                                <td>
                                    <?php if (($feature['implemented'] ?? 0) == 1): ?>
                                    <span class="badge bg-success"><i class="fas fa-check"></i> Implemented</span>
                                    <?php else: ?>
                                    <span class="badge bg-warning"><i class="fas fa-clock"></i> Pending</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <div class="form-check form-switch">
                                        <input 
                                            class="form-check-input feature-toggle" 
                                            type="checkbox" 
                                            data-feature-id="<?php echo $feature['id']; ?>"
                                            <?php echo isset($featureToggles[$feature['id']]) && $featureToggles[$feature['id']] ? 'checked' : ''; ?>>
                                    </div>
                                </td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <a href="/features/feature_<?php echo str_pad($feature['code'], 4, '0', STR_PAD_LEFT); ?>.php" 
                                           class="btn btn-primary" 
                                           target="_blank"
                                           title="View Feature">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <button 
                                            class="btn btn-info" 
                                            onclick="showFeatureDemo(<?php echo $feature['id']; ?>, '<?php echo htmlspecialchars($feature['title'] ?? '', ENT_QUOTES); ?>')"
                                            title="Demo">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                            
                            <?php if (empty($features)): ?>
                            <tr>
                                <td colspan="6" class="text-center text-muted">
                                    No features found. Run the generator script to create feature stubs.
                                </td>
                            </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
//END - ADMIN/FEATURES_REGISTRY.PHP
