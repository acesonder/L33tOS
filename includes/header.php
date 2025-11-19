//START - INCLUDES/HEADER.PHP
<?php
if (!defined('DB_HOST')) {
    require_once __DIR__ . '/../config.php';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?? 'L33tOS Feature Manager'; ?></title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/assets/css/custom.css">
</head>
<body>
    <!-- 3D Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-3d">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="/index.php">
                <i class="fas fa-code me-2"></i>L33tOS
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/index.php">
                            <i class="fas fa-home me-1"></i>Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/tools/generate_feature_stubs.php">
                            <i class="fas fa-cog me-1"></i>Generator
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/features_registry.php">
                            <i class="fas fa-toggle-on me-1"></i>Feature Registry
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/features/feature_0001.php">
                            <i class="fas fa-file-code me-1"></i>Sample Feature
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <!-- Main Content Container -->
    <div class="container-fluid py-4">
//END - INCLUDES/HEADER.PHP
