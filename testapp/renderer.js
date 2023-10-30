const apiButton = document.getElementById('apiButton');
const resultDiv = document.getElementById('result');

apiButton.addEventListener('click', async () => {
  const year = document.getElementById('apiRequestYear').value;
  const eventCode = document.getElementById('apiRequestEvent').value;
  const match = document.getElementById('apiRequestMatch').value;
  try {
    url = `https://frc-api.firstinspires.org/v3.0/${year}/scores/${eventCode}/Qualification?matchNumber=${match}`;
    const response = await window.api.get(url);
    resultDiv.innerHTML = JSON.stringify(response, null, 2);
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
});

