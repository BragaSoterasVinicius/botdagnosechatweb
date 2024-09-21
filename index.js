function createBotAnswer(data){
        const galeriaListDiv = document.getElementById('story');
        const content = document.createElement('div');
        content.className = "botfala"
        content.textContent = data
        galeriaListDiv.appendChild(content);
        galeriaListDiv.scrollTop = galeriaListDiv.scrollHeight;
  }

function callBot(nomeMatrix, algoritmo, user_message, energiaCognitiva){
    const botUrl = 'http://127.0.0.1:5000/speak';
    const data = {
        matrixName:"sabedoriajaponesa",
        user_message:"fala um pouco sobre a natureza das coisas mishima forte abraço",
        shouldReturn:"True",
        algoritmo:"b",
        energiaCognitiva:"0.995",
        salvarNaMatrix:"False",
        returnObject:"True"
    };
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(botUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
        throw new Error('Problema de conexão');
        }
        return response.json();
    })
    .then(data => {
        textContent = JSON.stringify(data, null, 2);
        console.log(textContent);
        createBotAnswer(textContent)
        return textContent;
    })
    .catch(error => {
        console.error

    ('Error:', error);
    });
}