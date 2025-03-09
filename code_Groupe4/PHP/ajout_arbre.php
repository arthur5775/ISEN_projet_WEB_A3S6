<?php
require_once('constant.php');

// Fonction pour insérer les lignes dans la lignes
function insertRow($tableName, $data) {
    // connection à la base de données
    $conn = dbConnect();
    if ($conn === FALSE) {
        return FALSE;
    }

    // SQL query pour l'insertion
    $columns = implode(", ", array_keys($data));
    $placeholders = implode(", ", array_fill(0, count($data), '?'));
    $sql = "INSERT INTO $tableName ($columns) VALUES ($placeholders)";

    // Prepare and execute the query
    try {
        $stmt = $conn->prepare($sql);
        // Bind values and execute
        $stmt->execute(array_values($data));
        return TRUE;
    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
        return FALSE;
    }
}

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

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Define table name
    $tableName = 'ajout_arbre';

    // Extract and sanitize form data
    $id = uniqid();
    $data['id'] = $id;
    $data = [
        'espece' => $_POST['species'],
        'hauteur_totale' => $_POST['total_height'],
        'hauteur_tronc' => $_POST['trunk_height'],
        'diametre_tronc' => $_POST['trunk_diameter'],
        'remarquable' => isset($_POST['remarkable']) ? 'Oui' : 'Non',
        'latitude' => $_POST['latitude'],
        'longitude' => $_POST['longitude'],
        'etat' => $_POST['status'],
        'stadedev' => $_POST['development_stage'],
        'type_port' => $_POST['port_type'],
        'type_pied' => $_POST['foot_type']
    ];

    // Insert data into database
    if (insertRow($tableName, $data)) {
        header("Location: ../HTML/view_tree.html");
        exit(); // Make sure to exit after redirection
    }
}
?>
