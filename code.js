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
  var lastTenMatches = matches.slice(-10); // Get the last 10 matches
  var json = JSON.stringify(lastTenMatches); // Convert to JSON string
  localStorage.setItem("lastMatches", json); // Store in local storage with key "lastMatches"
}

function loadMatchesFromJSON() {
  var json = localStorage.getItem("lastMatches"); // Get the JSON string from local storage
  if (json) {
    var lastTenMatches = JSON.parse(json); // Parse the JSON string back to JavaScript array
    displayMatchesTable(lastTenMatches); // Display the matches in the table
  } else {
    alert("No saved matches found.");
  }
}

function displayMatchesTable(matchesArray) {
  var table = document.getElementById("mmrTable");
  // Clear existing table rows except for the header row
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Add the matches to the table
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

	