$(document).ready(function() {
    var currentPage = 1;
    var rowsPerPage = 1000; //le nombre de lignes par page

    var allData = [];

    function displayData(data) {
        var startIndex = (currentPage - 1) * rowsPerPage;
        var endIndex = startIndex + rowsPerPage;
        var tableRows = '';

        /*<td style="color: ${tree.remarquable === 'Non' ? 'red' : 'green'};">${tree.remarquable}</td>*/
        /*<td>${tree.remarquable === 'Oui' ? 'Oui' : 'Non'}</td>*/

        /*
            tableRows += `<tr>
                <td><input type="radio" name="selectedTree" value="${i}"></td>
                <td>${tree.espece}</td>
                <td>${tree.hauteur_totale}</td>
                <td>${tree.hauteur_tronc}</td>
                <td>${tree.diametre_tronc}</td>
                <td style="background-color: ${tree.remarquable === 'Non' ? 'red' : 'green'};">${tree.remarquable}</td>
                <td>${tree.latitude}</td>
                <td>${tree.longitude}</td>
                <td>${tree.etat}</td>
                <td>${tree.stadedev}</td>
                <td>${tree.type_port}</td>
                <td>${tree.type_pied}</td>
            </tr>`;

        */

        for (var i = startIndex; i < endIndex && i < data.length; i++) {
            var tree = data[i];
            tableRows += `<tr class="${i % 2 === 0 ? 'beige-row' : 'white-row'}">
            <td><input type="radio" name="selectedTree" value="${i}"></td>
            <td>${tree.id}</td>
            <td>${tree.espece}</td>
            <td>${tree.hauteur_totale}</td>
            <td>${tree.hauteur_tronc}</td>
            <td>${tree.diametre_tronc}</td>
            <td style="background-color: ${tree.remarquable === 'Non' ? 'red' : 'green'};">${tree.remarquable}</td>
            <td>${tree.latitude}</td>
            <td>${tree.longitude}</td>
            <td>${tree.etat}</td>
            <td>${tree.stadedev}</td>
            <td>${tree.type_port}</td>
            <td>${tree.type_pied}</td>
            <td>${tree.cluster}</td>
        </tr>`;
        
        }

        $('#table-container').html(`<table><tr><th>Sélection</th><th>id</th><th>Espèce</th><th>Hauteur Totale (m)</th><th>Hauteur du Tronc (m)</th><th>Diamètre du Tronc (cm)</th><th>Remarquable</th><th>Latitude (°)</th><th>Longitude (°)</th><th>État</th><th>Stade de Développement</th><th>Type de Port</th><th>Type de Pied</th><th>Cluster</th></tr>${tableRows}</table>`);
    }

    function filterData() {
        var species = $('#species').val().toLowerCase();
        var minHeight = parseFloat($('#min-height').val());
        var maxHeight = parseFloat($('#max-height').val());
        var remarkable = $('#remarkable').val();

        var filteredData = allData.filter(function(tree) {
            var matchesSpecies = species ? tree.espece.toLowerCase().includes(species) : true;
            var matchesMinHeight = minHeight ? tree.hauteur_totale >= minHeight : true;
            var matchesMaxHeight = maxHeight ? tree.hauteur_totale <= maxHeight : true;
            var matchesRemarkable = remarkable ? (remarkable === 'Oui' ? tree.remarquable === 'Oui' : tree.remarquable === 'Non') : true;

            return matchesSpecies && matchesMinHeight && matchesMaxHeight && matchesRemarkable;
        });

        return filteredData;
    }

    function updatePagination(totalPages) {
        $('#pagination').empty();
        for (var i = 1; i <= totalPages; i++) {
            $('#pagination').append(`<button class="page-link" data-page="${i}">${i}</button>`);
        }
    }

    $.ajax({
        url: '../PHP/get_trees.php', 
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            allData = data;
            var filteredData = filterData();
            displayData(filteredData);
            displayMap(filteredData);
            var totalPages = Math.ceil(filteredData.length / rowsPerPage);
            updatePagination(totalPages);

            $(document).on('click', '.page-link', function() {
                currentPage = parseInt($(this).attr('data-page'));
                displayData(filteredData);
            });

            $('#predict-uprooting').on('click', function() {
                var selectedTreeIndex = $('input[name="selectedTree"]:checked').val();
                if (selectedTreeIndex !== undefined) {
                    window.location.href = 'predict_uprooting.php?tree_index=' + selectedTreeIndex;
                } else {
                    alert('Veuillez sélectionner un arbre.');
                }
            });

            $('#predict-clusters').on('click', function() {
                var filteredData = filterData(); // Get the current filtered data
                predictClusters(filteredData); // Call predictClusters with the filtered data
            });
            
            function predictClusters(trees) {
                var treeCoordinates = trees.map(tree => ({
                    latitude: tree.latitude,
                    longitude: tree.longitude
                }));
            
                $.ajax({
                    url: '../PHP/predict_clusters.php',
                    method: 'POST',
                    data: { trees: JSON.stringify(treeCoordinates) },
                    success: function(response) {
                        var clusters = JSON.parse(response);
                        displayClusteredMap(trees, clusters);
                    },
                    error: function() {
                        alert('Erreur lors de la prédiction des clusters.');
                    }
                });
            }
            
            function displayClusteredMap(trees, clusters) {
                var clusterColors = {
                    0: 'blue',
                    1: 'yellow'
            };
            
                var locations = trees.map(function(tree) {
                    var cluster = clusters[`${tree.latitude},${tree.longitude}`];
                    return {
                        lat: tree.latitude,
                        lon: tree.longitude,
                        text: `Espèce: ${tree.espece}<br>Hauteur Totale: ${tree.hauteur_totale} m<br>Hauteur du Tronc: ${tree.hauteur_tronc} m<br>Diamètre du Tronc: ${tree.diametre_tronc} cm<br>Remarquable: ${tree.remarquable === 'Oui' ? 'Oui' : 'Non'}<br>État: ${tree.etat}<br>Stade de Développement: ${tree.stadedev}<br>Type de Port: ${tree.type_port}<br>Type de Pied: ${tree.type_pied}<br>Cluster: ${cluster}`,
                        hoverinfo: 'text',
                        marker: { color: clusterColors[cluster], size: 14 }
                    };
                });
            
                var data = [{
                    type: 'scattermapbox',
                    mode: 'markers',
                    text: locations.map(loc => loc.text),
                    lon: locations.map(loc => loc.lon),
                    lat: locations.map(loc => loc.lat),
                    marker: {
                        color: locations.map(loc => loc.marker.color),
                        size: locations.map(loc => loc.marker.size)
                    }
                }];
            
                var layout = {
                    mapbox: {
                        style: 'open-street-map',
                        center: { lat: locations[0].lat, lon: locations[0].lon },
                        zoom: 12
                    },
                    margin: { t: 0, b: 0 }
                };
            
                Plotly.newPlot('map', data, layout);
            }
           
            $('#apply-filters').on('click', function() {
                currentPage = 1;
                var filteredData = filterData();
                displayData(filteredData);
                displayMap(filteredData);
                var totalPages = Math.ceil(filteredData.length / rowsPerPage);
                updatePagination(totalPages);
            });

            // Ajouter un écouteur d'événement pour empêcher la soumission par défaut du formulaire
            $('#filters').on('submit', function(event) {
                event.preventDefault();
            });
        },
        error: function() {
            $('#table-container').html('<p>Erreur lors de la récupération des données.</p>');
        }
    });

    function displayMap(data) {
        var locations = data.map(function(tree) {
            return {
                lat: tree.latitude,
                lon: tree.longitude,
                text: `Espèce: ${tree.espece}<br>Hauteur Totale: ${tree.hauteur_totale} m<br>Hauteur du Tronc: ${tree.hauteur_tronc} m<br>Diamètre du Tronc: ${tree.diametre_tronc} cm<br>Remarquable: ${tree.remarquable === 'Oui' ? 'Oui' : 'Non'}<br>État: ${tree.etat}<br>Stade de Développement: ${tree.stadedev}<br>Type de Port: ${tree.type_port}<br>Type de Pied: ${tree.type_pied}`,
                hoverinfo: 'text',
            };
        });

        var data = [{
            type: 'scattermapbox',
            mode: 'markers',
            text: locations.map(loc => loc.text),
            lon: locations.map(loc => loc.lon),
            lat: locations.map(loc => loc.lat),
            marker: { size: 7 }
        }];

        var layout = {
            mapbox: {
                style: 'open-street-map',
                center: { lat: locations[0].lat, lon: locations[0].lon },
                zoom: 12
            },
            margin: { t: 0, b: 0 }
        };

        Plotly.newPlot('map', data, layout);
    }

    function predictClusters(trees) {
        var treeCoordinates = trees.map(tree => ({
            latitude: tree.latitude,
            longitude: tree.longitude
        }));

        $.ajax({
            url: '../PHP/predict_clusters.php',
            method: 'POST',
            data: { trees: JSON.stringify(treeCoordinates) },
            success: function(response) {
                var clusters = JSON.parse(response);
                displayClusteredMap(trees, clusters);
            },
            error: function() {
                alert('Erreur lors de la prédiction des clusters.');
            }
        });
    }

    function displayClusteredMap(trees, clusters) {
        var clusterColors = {
            1: 'red',
            2: 'blue',
            3: 'green',
            4: 'orange',
            5: 'purple'
        };

        var locations = trees.map(function(tree) {
            var cluster = clusters[`${tree.latitude},${tree.longitude}`];
            return {
                lat: tree.latitude,
                lon: tree.longitude,
                text: `Espèce: ${tree.espece}<br>Hauteur Totale: ${tree.hauteur_totale} m<br>Hauteur du Tronc: ${tree.hauteur_tronc} m<br>Diamètre du Tronc: ${tree.diametre_tronc} cm<br>Remarquable: ${tree.remarquable === 'Oui' ? 'Oui' : 'Non'}<br>État: ${tree.etat}<br>Stade de Développement: ${tree.stadedev}<br>Type de Port: ${tree.type_port}<br>Type de Pied: ${tree.type_pied}<br>Cluster: ${cluster}`,
                hoverinfo: 'text',
                marker: { color: clusterColors[cluster], size: 14 }
            };
        });

        var data = [{
            type: 'scattermapbox',
            mode: 'markers',
            text: locations.map(loc => loc.text),
            lon: locations.map(loc => loc.lon),
            lat: locations.map(loc => loc.lat),
            marker: {
                color: locations.map(loc => loc.marker.color),
                size: locations.map(loc => loc.marker.size)
            }
        }];

        var layout = {
            mapbox: {
                style: 'open-street-map',
                center: { lat: locations[0].lat, lon: locations[0].lon },
                zoom: 12
            },
            margin: { t: 0, b: 0 }
        };

        Plotly.newPlot('map', data, layout);
    }
document.addEventListener('DOMContentLoaded', function() {
    // Effectuer un appel AJAX pour récupérer haut_tot et tronc_diam depuis PHP
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../PHP/get_tree_info.php', true); 
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var haut_tot = response.hauteur_totale;
            var tronc_diam = response.diametre_tronc;
            
            document.getElementById('predict_clusters').addEventListener('click', function(event) {
                event.preventDefault();
                
                // Envoi de la requête AJAX POST
                var xhr2 = new XMLHttpRequest();
                xhr2.open('POST', '../IA/predict_clusters.php', true);
                xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr2.onreadystatechange = function() {
                    if (xhr2.readyState === 4 && xhr2.status === 200) {
                        // Afficher le résultat sur la page
                        document.getElementById('cluster-prediction').innerHTML = "Cluster prédit : " + xhr2.responseText;
                    }
                };
                xhr2.send('haut_tot=' + encodeURIComponent(haut_tot) + '&tronc_diam=' + encodeURIComponent(tronc_diam));
            });
        }
    };
    xhr.send();
});

});
