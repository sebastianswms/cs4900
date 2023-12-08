const apiButton = document.getElementById('apiButton');
const resultDiv = document.getElementById('result');

apiButton.addEventListener('click', async () => {
  const year = document.getElementById('apiRequestYear').value;
  const eventCode = document.getElementById('apiRequestEvent').value;

  let schedule;
  let scores;
  let scoresMap = new Map();

  try {
    url = `https://frc-api.firstinspires.org/v3.0/${year}/scores/${eventCode}/Qualification`;
    scores = await window.api.get(url);
    url = `https://frc-api.firstinspires.org/v3.0/${year}/schedule/${eventCode}?tournamentLevel=Qualification`;
    schedule = await window.api.get(url);
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }


  for(scoreEntry of scores["MatchScores"]) {
    scoresMap.set(scoreEntry["matchLevel"] + scoreEntry["matchNumber"], scoreEntry["alliances"])
  }

  for(scheduleEntry of schedule["Schedule"]) {
    const mapKey = scheduleEntry["tournamentLevel"] + scheduleEntry["matchNumber"]
    if (scoresMap.has(mapKey)) {
      scheduleEntry.alliances = scoresMap.get(scheduleEntry["tournamentLevel"] + scheduleEntry["matchNumber"])
    }
  }

  resultDiv.innerHTML = JSON.stringify(schedule);

});

