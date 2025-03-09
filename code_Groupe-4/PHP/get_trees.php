<?php
header('Content-Type: application/json');
require_once('constant.php'); 

// Function to establish database connection
function dbConnect(){
    $user = DB_USER;
    $password = DB_PASSWORD;
    $dsn = 'pgsql:dbname='.DB_NAME.';host='.DB_SERVER.';port='.DB_PORT;
    try{
        $conn = new PDO($dsn, $user, $password);
        return $conn;
    } catch (PDOException $e){
        echo 'Connexion échouée : ' . $e->getMessage();
        return FALSE;
    }
}

// Function to fetch tree data from the database
function fetchTreeData() {
    $conn = dbConnect(); // fonction dbConnect() pour établir la connexion

    if ($conn === FALSE) {
        echo json_encode(['error' => 'Connexion à la base de données échouée']);
        exit;
    }

    $stmt = $conn->query("SELECT id, espece, hauteur_totale, hauteur_tronc, diametre_tronc, remarquable, latitude, longitude, etat, stadedev, type_port, type_pied FROM ajout_arbre"); // Remplacez ajout_arbre par le nom de votre table

    if (!$stmt) {
        echo json_encode(['error' => 'Erreur lors de la récupération des données']);
        exit;
    }

    $trees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $trees;
}

// Fetch tree data and return as JSON
$trees = fetchTreeData();
echo json_encode($trees);
?>
