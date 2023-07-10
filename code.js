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
  if (filteredMatches.length > 0) {
    var matchNumbers = filteredMatches.map(function(match) {
      return "Match " + match.matchNumber;
    });
    alert("Matches with MMR " + targetMMR + ": " + matchNumbers.join(", "));
  } else {
    alert("No matches found with MMR " + targetMMR);
  }
}

	