// Array para almacenar los datos de los partidos
var matches = [];

// Función para calcular el promedio
function calculateAverage() {
  var totalMMR = 0;
  var numMatches = 0;

  // Obtener los valores de los partidos y calcular el total y el número de partidos válidos
  for (var i = 1; i <= 10; i++) {
    var matchMMR = parseInt(document.getElementById("match" + i).value);
    if (!isNaN(matchMMR)) {
      var match = {
        matchNumber: i,
        mmr: matchMMR
      };
      matches.push(match);
      totalMMR += matchMMR;
      numMatches++;
    }
  }

  // Calcular el promedio
  var averageMMR = 0;
  if (numMatches > 0) {
    averageMMR = totalMMR / numMatches;
  }

  // Mostrar el promedio en el elemento "result"
  var resultElement = document.getElementById("result");
  resultElement.textContent = "Average MMR: " + averageMMR.toFixed(2);
  saveMatchesToJSON();
}

function saveMatchesToJSON() {
  var lastTenMatches = matches.slice(-10); // Traer los ultimos 10 matches
  var json = JSON.stringify(lastTenMatches); // Convertir a Json
  localStorage.setItem("lastMatches", json); // Guardar en el local "lastMatches"
}

function loadMatchesFromJSON() {
  var json = localStorage.getItem("lastMatches"); // Pedir Json
  if (json) {
    var lastTenMatches = JSON.parse(json); // convertir el Json en array
    displayMatchesTable(lastTenMatches); // Poner los matches en una tabla
  } else {
    alert("No saved matches found.");
  }
}

function displayMatchesTable(matchesArray) {
  var table = document.getElementById("mmrTable");
  // Limpiar los matches
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // aniadir los matches a la tabla
  for (var i = 0; i < matchesArray.length; i++) {
    var match = matchesArray[i];
    var newRow = table.insertRow();
    var matchNumberCell = newRow.insertCell(0);
    var mmrCell = newRow.insertCell(1);
    matchNumberCell.textContent = "Match " + match.matchNumber;
    mmrCell.textContent = match.mmr;
  }
}


// Función para buscar partidos por MMR
function searchMatchesByMMR() {
  // Solicitar al usuario el MMR a buscar
  var targetMMR = parseInt(prompt("Enter the MMR to search for:"));
  
  // Filtrar los partidos que coinciden con el MMR objetivo
  var filteredMatches = matches.filter(function(match) {
    return match.mmr === targetMMR;
  });

  // Mostrar los partidos encontrados o un mensaje si no se encontraron coincidencias
  var resultElement = document.getElementById("result");
  if (filteredMatches.length > 0) {
    var matchNumbers = filteredMatches.map(function(match) {
      return "Match " + match.matchNumber;
    });
    resultElement.textContent = "Matches with MMR " + targetMMR + ": " + matchNumbers.join(", ");
  } else {
    resultElement.textContent = "No matches found with MMR " + targetMMR;
  }
}
//fetch para traer del html el input y pasarlo a la APi
function fetchPlayerData() { 
  const playerId = document.getElementById("playerId").value;
  const apiUrl = `https://api.opendota.com/api/players/${playerId}`; 

  fetch(apiUrl) 
    .then(response => response.json()) //la promesa
    .then(playerData => {
      displayPlayerData(playerData); //de json a constante
    })
    .catch(error => {
      console.error('Error fetching player data:', error);
    });
}
function displayPlayerData(playerData) { //funcion para mostrar el los datos de la Api
  const playerDataDiv = document.getElementById("playerData");

  if (playerData.profile) {
    const personaname = playerData.profile.personaname;
    const soloCompetitiveRank = playerData.solo_competitive_rank;
    const mmrEstimate = playerData.mmr_estimate.estimate;
    const avatarUrl = playerData.profile.avatarfull;

    const playerInfo = `
      <p>Personaname: ${personaname}</p>
      <p>Solo Competitive Rank: ${soloCompetitiveRank}</p>
      <p>MMR Estimate: ${mmrEstimate}</p>
      <img src="${avatarUrl}" alt="Avatar">
    `;

    playerDataDiv.innerHTML = playerInfo;
  } else {
    playerDataDiv.innerHTML = "Player data not found."; //mensaje de error en caso de no encontrar Datos de la api en ese ID
  }
}

