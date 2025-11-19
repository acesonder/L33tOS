//START - INDEX.PHP
<?php
require_once 'config.php';
$pageTitle = 'L33tOS - Dashboard';

// Load feature toggles
$togglesFile = __DIR__ . '/data/feature_toggles.json';
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
        $stmt = $conn->query("SELECT * FROM features ORDER BY code ASC LIMIT 200");
        $features = $stmt->fetchAll();
    } catch (Exception $e) {
        $dbAvailable = false;
    }
}

// If DB not available, scan features directory
if (!$dbAvailable) {
    $featuresDir = __DIR__ . '/features';
    if (is_dir($featuresDir)) {
        $files = glob($featuresDir . '/feature_*.php');
        sort($files);
        foreach (array_slice($files, 0, 200) as $file) {
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

include 'includes/header.php';
?>

<div class="row">
    <div class="col-12">
        <div class="card card-3d mb-4">
            <div class="card-header bg-primary text-white">
                <h2 class="mb-0"><i class="fas fa-tachometer-alt"></i> L33tOS Dashboard</h2>
            </div>
            <div class="card-body">
                <div class="alert alert-warning" role="alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Security Warning:</strong> This application uses insecure database defaults (root with blank password).
                    Create a <code>.env</code> file with secure credentials before production use!
                </div>
                
                <div class="row">
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card card-3d bg-primary text-white">
                            <div class="stat-icon"><i class="fas fa-layer-group"></i></div>
                            <div class="stat-number"><?php echo count($features); ?></div>
                            <div class="stat-label">Total Features</div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card card-3d bg-success text-white">
                            <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                            <div class="stat-number"><?php echo count(array_filter($features, fn($f) => ($f['implemented'] ?? 0) == 1)); ?></div>
                            <div class="stat-label">Implemented</div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card card-3d bg-warning text-white">
                            <div class="stat-icon"><i class="fas fa-clock"></i></div>
                            <div class="stat-number"><?php echo count(array_filter($features, fn($f) => ($f['implemented'] ?? 0) == 0)); ?></div>
                            <div class="stat-label">Pending</div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card card-3d bg-info text-white">
                            <div class="stat-icon"><i class="fas fa-toggle-on"></i></div>
                            <div class="stat-number"><?php echo count($featureToggles); ?></div>
                            <div class="stat-label">Active Toggles</div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4">
                    <h4>Quick Actions</h4>
                    <div class="btn-group" role="group">
                        <a href="/admin/features_registry.php" class="btn btn-primary">
                            <i class="fas fa-list"></i> View Registry
                        </a>
                        <a href="/tools/generate_feature_stubs.php" class="btn btn-success">
                            <i class="fas fa-magic"></i> Generate Stubs
                        </a>
                        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#aboutModal">
                            <i class="fas fa-info-circle"></i> About
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card card-3d">
            <div class="card-header bg-secondary text-white">
                <h4 class="mb-0"><i class="fas fa-th"></i> Feature Categories</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <?php
                    $categories = [
                        'Core System' => ['icon' => 'microchip', 'color' => 'primary', 'count' => 0],
                        'webTrap' => ['icon' => 'globe', 'color' => 'success', 'count' => 0],
                        'Marketplace Hosting' => ['icon' => 'store', 'color' => 'info', 'count' => 0],
                        'Make+Trap Website Builder' => ['icon' => 'hammer', 'color' => 'warning', 'count' => 0],
                        'chatTrap' => ['icon' => 'comments', 'color' => 'danger', 'count' => 0],
                        'mailTrap' => ['icon' => 'envelope', 'color' => 'secondary', 'count' => 0],
                        'bankTrap' => ['icon' => 'dollar-sign', 'color' => 'dark', 'count' => 0],
                        'crapTrap' => ['icon' => 'wrench', 'color' => 'light', 'count' => 0]
                    ];
                    
                    // Count features per category
                    foreach ($features as $feature) {
                        $cat = $feature['category'] ?? 'Uncategorized';
                        if (isset($categories[$cat])) {
                            $categories[$cat]['count']++;
                        }
                    }
                    
                    foreach ($categories as $catName => $catInfo):
                    ?>
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="category-card card-3d text-center">
                            <div class="category-icon bg-<?php echo $catInfo['color']; ?>">
                                <i class="fas fa-<?php echo $catInfo['icon']; ?>"></i>
                            </div>
                            <h6 class="mt-2"><?php echo htmlspecialchars($catName); ?></h6>
                            <p class="text-muted mb-0"><?php echo $catInfo['count']; ?> features</p>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- About Modal -->
<div class="modal fade" id="aboutModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title"><i class="fas fa-info-circle"></i> About L33tOS Feature Stubs</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p><strong>L33tOS Feature Stubs Platform</strong></p>
                <p>A comprehensive scaffold with 200 feature stubs ready for implementation.</p>
                <ul>
                    <li>PHP/HTML/CSS/JS stack</li>
                    <li>Bootstrap 5 UI with 3D effects</li>
                    <li>MySQL database integration</li>
                    <li>Feature registry and toggles</li>
                    <li>Auto-generation tools</li>
                </ul>
                <p class="text-danger"><strong>Security Note:</strong> Default database configuration is insecure. Always configure proper credentials in production!</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
//END - INDEX.PHP
