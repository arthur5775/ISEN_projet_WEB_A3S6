/*
document.getElementById('addTreeForm').addEventListener('submit', ajouter_arbre);

function ajouter_arbre(event){
    let species;
    let total_height;
    let trunk_height;
    let trunk_diameter;
    let remarkable;
    let latitude;
    let longitude;
    let status;
    let development_stage;
    let port_type;
    let foot_type;

    event.preventDefault();

    species = document.getElementById('species').value;
    total_height = document.getElementById('total_height').value;
    trunk_height = document.getElementById('trunk_height').value;
    trunk_diameter = document.getElementById('trunk_diameter').value;
    remarkable = document.getElementById('remarkable').value;
    latitude = document.getElementById('latitude').value;
    longitude = document.getElementById('longitude').value;
    status = document.getElementById('status').value;
    development_stage = document.getElementById('development_stage').value;
    port_type = document.getElementById('port_type').value;
    foot_type = document.getElementById('foot_type').value;

    ajaxRequest('POST', '../PHP/ajout.php?request=arbres', get_arbres, 'species=' + species + '&total_height=' + total_height +
    '&trunk_height=' + trunk_height + '&trunk_diameter=' +trunk_diameter + '&remarkable=' + '&latitude=' +latitude +
    '&latitude=' + latitude + '&longitude=' + longitude + '&status=' + status + '&development_stage=' + development_stage +
    '&port_type=' + port_type + '&foot_type=' + foot_type);
}

function get_arbres() {
    let species = document.getElementById('species').value;
    let total_height = document.getElementById('total_height').value;
    let trunk_height = document.getElementById('trunk_height').value;
    let trunk_diameter = document.getElementById('trunk_diameter').value;
    let remarkable = document.getElementById('remarkable').value;
    let latitude = document.getElementById('latitude').value;
    let longitude = document.getElementById('longitude').value;
    let status = document.getElementById('status').value;
    let development_stage = document.getElementById('development_stage').value;
    let port_type = document.getElementById('port_type').value;
    let foot_type = document.getElementById('foot_type').value;

    ajaxRequest('GET', '../PHP/ajout.php?request=arbres&species=','species=' + species + '&total_height=' + total_height +
    '&trunk_height=' + trunk_height + '&trunk_diameter=' +trunk_diameter + '&remarkable=' + '&latitude=' +latitude +
    '&latitude=' + latitude + '&longitude=' + longitude + '&status=' + status + '&development_stage=' + development_stage +
    '&port_type=' + port_type + '&foot_type=' + foot_type);
}

function ajaxRequest(type, url,callback,data = null){
    let xhr = new XMLHttpRequest();
    if (type == 'GET' && data != null)
        url += '?' + data;
    xhr.open(type,url);


    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload =()=>{
        switch(xhr.status){
            case 200: 
                let resp = JSON.parse(xhr.responseText);
                console.log(resp);
                callback(resp);
                break;
            case 201: 
                console.log(xhr.responseText);
                break;
            default: 
                console.log('HTTP error:'+xhr.status);
                displayErrors(xhr.status);
        }
    };   
    xhr.send(data);
}

function displayErrors(status){
    let mess_err = document.getElementById('errors');
    mess_err.style.color = "red";
    switch(status){
        case 400:mess_err.innerHTML="Requ&ecirc;te incorrecte";
        case 401:mess_err.innerHTML="Authentifiez-vous";
        case 404:mess_err.innerHTML="Page non trouvée";
        case 500:mess_err.innerHTML="Erreur interne du serveur";
        case 503:mess_err.innerHTML="Service indisponible";
    }
}
*/
/*
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

$(document).ready(function() {
    $('#submitFormBtn').on('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire (soumission)

        // Récupérer les valeurs des champs du formulaire
        let species = $('#species').val();
        let total_height = $('#total_height').val();
        let trunk_height = $('#trunk_height').val();
        let trunk_diameter = $('#trunk_diameter').val();
        let remarkable = $('#remarkable').is(':checked') ? 'Oui' : 'Non';
        let latitude = $('#latitude').val();
        let longitude = $('#longitude').val();
        let status = $('#status').val();
        let development_stage = $('#development_stage').val();
        let port_type = $('#port_type').val();
        let foot_type = $('#foot_type').val();

        // Envoyer les données via AJAX
        $.ajax({
            type: 'POST',
            url: '../PHP/ajout_arbre.php',
            data: {
                species: species,
                total_height: total_height,
                trunk_height: trunk_height,
                trunk_diameter: trunk_diameter,
                remarkable: remarkable,
                latitude: latitude,
                longitude: longitude,
                status: status,
                development_stage: development_stage,
                port_type: port_type,
                foot_type: foot_type
            },
            success: function(response) {
                // Traiter la réponse du serveur si nécessaire
                console.log(response); // Afficher la réponse dans la console par exemple
                // Réinitialiser le formulaire ou afficher un message de succès
            },
            error: function(xhr, status, error) {
                // Gérer les erreurs d'envoi de la requête
                console.error(error); // Afficher l'erreur dans la console par exemple
            }
        });
    });
});
*/






/*
$(document).ready(function() {
    $('#addTreeForm').on('submit', function(event) {
        event.preventDefault(); // Empêcher la soumission normale du formulaire

        // Récupérer les valeurs des champs du formulaire
        let species = $('#species').val();
        let total_height = $('#total_height').val();
        let trunk_height = $('#trunk_height').val();
        let trunk_diameter = $('#trunk_diameter').val();
        let remarkable = $('#remarkable').is(':checked') ? 'Oui' : 'Non';
        let latitude = $('#latitude').val();
        let longitude = $('#longitude').val();
        let status = $('#status').val();
        let development_stage = $('#development_stage').val();
        let port_type = $('#port_type').val();
        let foot_type = $('#foot_type').val();

        // Envoyer les données via AJAX pour l'insertion dans la base de données
        $.ajax({
            type: 'POST',
            url: '../PHP/ajout_arbre.php',
            data: {
                species: species,
                total_height: total_height,
                trunk_height: trunk_height,
                trunk_diameter: trunk_diameter,
                remarkable: remarkable,
                latitude: latitude,
                longitude: longitude,
                status: status,
                development_stage: development_stage,
                port_type: port_type,
                foot_type: foot_type
            },
            success: function(response) {
                console.log(response); // Afficher la réponse dans la console

                // Après l'insertion réussie, prédire le cluster
                predictAndFillCluster(total_height, trunk_diameter);
            },
            error: function(xhr, status, error) {
                console.error(error); // Afficher l'erreur dans la console
            }
        });
    });

    // Fonction pour prédire le cluster et mettre à jour la base de données
    function predictAndFillCluster(total_height, trunk_diameter) {
        // Appel AJAX pour prédire le cluster
        $.ajax({
            type: 'POST',
            url: '../IA/F1F4use.py', // URL à adapter selon votre structure
            data: {
                total_height: total_height,
                trunk_diameter: trunk_diameter
            },
            success: function(response) {
                console.log(response); // Afficher la réponse dans la console

                // Mettre à jour la base de données avec le cluster prédit
                updateDatabaseWithCluster(response.cluster); // Assurez-vous d'avoir une méthode appropriée pour mettre à jour la base de données
            },
            error: function(xhr, status, error) {
                console.error(error); // Afficher l'erreur dans la console
            }
        });
    }

    // Fonction pour mettre à jour la base de données avec le cluster prédit
    function updateDatabaseWithCluster(cluster) {
        // Appel AJAX pour mettre à jour la base de données
        $.ajax({
            type: 'POST',
            url: '../PHP/update_cluster.php', // URL à adapter selon votre structure
            data: {
                cluster: cluster
            },
            success: function(response) {
                console.log(response); // Afficher la réponse dans la console
                // Mettre à jour l'interface utilisateur ou afficher un message de succès si nécessaire
            },
            error: function(xhr, status, error) {
                console.error(error); // Afficher l'erreur dans la console
            }
        });
    }
});

*/















$(function() {
    var species = [
        'QUERUB', 'PINNIGnig', 'ACEPSE', 'ACEPLA', 'SALBAB', 'TILCOR', 'TILTOM', 'PLAACE', 'CATBIG', 
        'THUPLIatr', 'ACESAC', 'SEQGIG', 'AESHIP', 'PRUSER', 'CARBETfas', 'POPNIGita', 'POPTRE', 
        'POPCAN', 'ACENEG', 'POPSIM', 'CHALAW', 'POPALB', 'ROBPSE', 'BETPEN', 'POPEUR', 'SORDOM', 
        'FRAEXC', 'ACEFRE', 'AESCAR', 'BETVER', 'PLAORIspe', 'AESPAV', 'PINSYL', 'CUPARI', 'TAXBAC', 
        'MAGGRA', 'PSEMEN', 'CORKOU', 'FAGSYLpen', 'LIRTUL', 'PYRCALcha', 'CARBET', 'SORAUC', 'MAL', 
        'CERSIL', 'KOEPAN', 'GINBIL', 'ACEPAL', 'MAGSOU', 'ACEPLApur', 'JUGREG', 'ABIGLA', 'CRYJAP', 
        'TAXBACfas', 'PRUCERpis', 'AMELAM', 'NOTANT', 'CORCOL', 'CRALAEpau', 'CHANOO', 'CUPSEM', 
        'LABANA', 'LIQSTY', 'PICABI', 'PINWAL', 'ULMRES', 'CASSAT', 'SALALB', 'FRAANG', 'PRUAVI', 
        'RHUTYP', 'ACECAM', 'LARDEC', 'ALNGLU', 'PYRCAL', 'PINNIGlar', 'POPNIG', 'MALTOR', 'CEDLIB', 
        'CUPARIgla', 'ACECAMros', 'SORARIlut', 'THUPLI', 'ACESACwie', 'ULMMIN', 'PRUSERfas', 'MALTRI', 
        'FRAANGray', 'TAXDIS', 'SORARI', 'PARPER', 'FAGSYLfas', 'PRUSERkan', 'ACENEGvar', 'ACEPSEatr', 
        'ABICON', 'GLETRI', 'ULMJAP', 'AESCAR', 'ACEPLAcri', 'ABINOR', 'ACECAP', 'QUECER', 'ALNGLUimp', 
        'QUEPET', 'MALPEReve', 'CUPLEYvar', 'MAGKOB', 'TILHEN', 'PRUSUBaut', 'CRAMON', 'METGLY', 
        'FRAEXCpen', 'CEDDEO', 'MAGSOUhea', 'SAMNIG', 'CEDATLpen', 'PYRCOM', 'GLETRIsun', 'PRUSERpen', 
        'QUEROB', 'QUEPAL', 'TILPLA', 'FRAAME', 'MALTOR1', 'MALBAC', 'GLETRIine', 'SALCAP', 'ILEAQU', 
        'TILEUR', 'ALNCOR', 'AILALT', 'SOPJAP', 'ABILASari', 'FRAORN', 'CEDATLgla', 'SOPJAPpen', 'CUPfas', 
        'MALPEN', 'ABINUM', 'PRUSERama', 'JUNMEDpfi', 'MALTORbro', 'BETPAP', 'MALred', 'ULMRESsap', 
        'MALDOM', 'ELAANG', 'ABI', 'THUPLIzeb', 'TAMGAL', 'PRUAVIbea', 'PRUAVIbig', 'PRUAVImar', 
        'CYDVULbou', 'PRUPERnuc', 'PRUDOMrei3', 'PRUDOMrei', 'PRUDOMmir', 'PRUDOMrei1', 'PRUDOMrei2', 
        'PRUDOMcha', 'PRUDOMals', 'PRUDOMmon', 'PRUCERbig2', 'PRUCERbig', 'PRUCERbig1', 'PRUCERcoe', 
        'PYRCOMcon', 'PYRCOMdoy', 'MALDOMcal', 'MALDOMmel', 'MALDOMrei', 'MALDOMgra', 'MALDOMcox', 
        'MALDOMbos', 'MALDOMbel', 'MALDOMast', 'CORAVE', 'MALCOMtra', 'QUECAS', 'QUESHU', 'QUEELL', 
        'QUEBIC', 'QUEMAC', 'QUECOC', 'QUEILE', 'MALgol', 'ACEPLAcol', 'ACECAMele', 'MALCOM', 'MALCOMgol', 
        'PRUCER', 'BETPENyou', 'CUPLEY', 'SORALB', 'MALTSC', 'SALALBche', 'ALNSPA', 'PRUMAAamb', 'ACERUB', 
        'FRAPENcim', 'BETUTIjac', 'PRU', 'SORTOR', 'ACE', 'FAGSYLdawpur', 'BUXSEM', 'ACEPSEleo', 'AEShom', 
        'FAGSYLdawgol', 'PRULAU', 'FRAPEN', 'ACECAMred', 'ROBPSEfri', 'ACEPLAfai', 'ULMRESreb', 'LAGIND', 
        'ALBJUL', 'ALBJULcho'
    ];

    $("#species").autocomplete({
        source: species,
        minLength: 3
    });
    $("#totalHeightSlider").slider({
        min: 0,
        max: 50,
        step: 0.25,
        value: 6.0,
        slide: function(event, ui) {
            $("#total_height").val(ui.value);
        }
    });
    $("#trunkHeightSlider").slider({
        min: 0,
        max: 50,
        step: 0.25,
        value: 3.0,
        slide: function(event, ui) {
            $("#trunk_height").val(ui.value);
        }
    });
    $("#trunkDiameterSlider").slider({
        min: 0,
        max: 750,
        step: 0.25,
        value: 100.0,
        slide: function(event, ui) {
            $("#trunk_diameter").val(ui.value);
        }
    });
});

// Initialiser la carte et définir sa vue sur Saint-Quentin
var map = L.map('map').setView([49.8489, 3.2877], 13);

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Ajouter un écouteur d'événement pour le clic gauche
map.on('click', function(e) {
    // Obtenir les coordonnées du clic
    var coords = e.latlng;
    // Formater les coordonnées à 6 décimales
    var formattedLat = coords.lat.toFixed(6);
    var formattedLng = coords.lng.toFixed(6);
    // Mettre à jour les champs du formulaire avec les coordonnées formatées
    document.getElementById('latitude').value = formattedLat;
    document.getElementById('longitude').value = formattedLng;
});

$(document).ready(function() {
    /*
    function adjustTreeImageSize() {
        var totalHeight = parseFloat($('#total_height').val()) || 0;
        var trunkDiameter = parseFloat($('#trunk_diameter').val()) || 0;

        var width = trunkDiameter * 10; // Vous pouvez ajuster le facteur de conversion
        var height = totalHeight * 10; // Vous pouvez ajuster le facteur de conversion

        $('#tree-image').css({
            width: width + 'px',
            height: height + 'px'
        });

        if (totalHeight > 0 || trunkDiameter > 0) {
            $('#tree-image-container').show();
        } else {
            $('#tree-image-container').hide();
        }
    }
    $('#total_height, #trunk_diameter').on('input', function() {
        adjustTreeImageSize();
    });
*/
    var form = $('#addTreeForm'); // Assurez-vous que l'ID correspond à votre formulaire
    var progressBar = $('.progress-bar'); // Assurez-vous que la classe correspond à votre barre de progression
    function updateProgressBar() {
        var filledFields = 0;
        var totalFields = form.find('input[type="text"], input[type="number"], select').length;
/*,input[type="checkbox"]:checked*/
        form.find('input[type="text"], input[type="number"], select').each(function() {
            if ($(this).val() !== '') {
                filledFields++;
            }
        });

        var progress = (filledFields / totalFields) * 100;
        progressBar.css('width', progress + '%').attr('aria-valuenow', progress);
    }

    // Événement pour détecter les changements dans les champs du formulaire
    form.find('input, select').on('change keyup', function() {
        updateProgressBar();
    });

    // Initialisation de la barre de progressionf
    updateProgressBar();
});

