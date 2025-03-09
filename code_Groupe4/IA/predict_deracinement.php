<?php
$longitude = $_POST['longitude'];
$latitude = $_POST['latitude'];
$clc_secteur = $_POST['clc_secteur'];
$haut_tot = $_POST['haut_tot'];
$tronc_diam = $_POST['tronc_diam'];
$age_estim = $_POST['age_estim'];
// Commande pour exécuter le script Python
$command = escapeshellcmd("/var/www/html/projet/sklearn-env/bin/python3 /var/www/html/projet/IA/F3F4use.py $longitude $latitude $clc_secteur $haut_tot $tronc_diam $age_estim");

// Exécution de la commande et capture de la sortie
$output = shell_exec($command);
echo $output;

// Lecture du fichier JSON généré par le script Python
$jsonFile = 'predicted_cluster.json';
if (file_exists($jsonFile)) {
    $cluster = file_get_contents($jsonFile);
    echo "<h2>Numéro du cluster prédit: $cluster</h2>";
} else {
    echo "<h2>Erreur lors de la prédiction. Veuillez vérifier les entrées et réessayer.</h2>";
}
?>