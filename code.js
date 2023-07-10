function calculateAverage() {
  var totalMMR = 0;
  var numMatches = 0;

  // Calculate the total MMR and count the number of matches with input values
  for (var i = 1; i <= 10; i++) {
    var matchMMR = parseInt(document.getElementById("match" + i).value);
    if (!isNaN(matchMMR)) {
      totalMMR += matchMMR;
      numMatches++;
    }
  }

  // Calculate the average MMR
  var averageMMR = 0;
  if (numMatches > 0) {
    averageMMR = totalMMR / numMatches;
  }

  // Display the average MMR
  var resultElement = document.getElementById("result");
  resultElement.textContent = "Average MMR: " + averageMMR.toFixed(2);
}

	