getMatrixList();
getAlgoritmosList();

document.getElementById('formBoterson').addEventListener('submit', function(event){
    event.preventDefault();
    const nomeMatrix = document.getElementById("matrix").value;
    const algoritmo = document.getElementById("algoritmos").value;
    const user_message = document.getElementById("inputbox").value;
    const energiaCognitiva = document.getElementById("energiaCognitiva").value;

    createMessageBox(user_message, "userfala");
    document.getElementById('inputbox').value = "";
    callBot(nomeMatrix, algoritmo, user_message, energiaCognitiva);
});

function setList(list, listTypeid){
    const select = document.getElementById(listTypeid);
    console.log(list)
    for (let i = 0; i < list.length; i++) {
        const options = document.createElement('option');
        options.text = list[i];
        options.value = list[i] ;
        select.appendChild(options)
      }

}

function getMatrixList(){
    const botUrl = 'http://127.0.0.1:5000/listmatrixes';
    fetch(botUrl)
    .then(response => {

        if (!response.ok) {
        throw new Error('Problema de conexão');
        }
        return response.json();
    })
    .then(data => {
        listContent = JSON.stringify(data, null, 2);
        const jsonArray = JSON.parse(listContent);
        setList(jsonArray, 'matrix');
    })
}

function getAlgoritmosList(){
    const botUrl = 'http://127.0.0.1:5000/listalgoritms';
    fetch(botUrl)
    .then(response => {

        if (!response.ok) {
        throw new Error('Problema de conexão');
        }
        return response.json();
    })
    .then(data => {
        listContent = JSON.stringify(data, null, 2);
        const jsonArray = JSON.parse(listContent);
        setList(jsonArray, 'algoritmos');
    })
}

function createMessageBox(data, classname){
        const galeriaListDiv = document.getElementById('story');
        const content = document.createElement('div');
        content.className = classname
        content.textContent = data
        galeriaListDiv.appendChild(content);
        galeriaListDiv.scrollTop = galeriaListDiv.scrollHeight;
    }

function destroyLoadingElement(){
    document.getElementById("apagar").remove();
}

function createLoadingElement(){
    const galeriaListDiv = document.getElementById('story');
    const img = document.createElement("img");
    img.src = 'loading-gif.gif';
    img.id = "apagar";
    galeriaListDiv.appendChild(img);
}

function callBot(nomeMatrix, algoritmo, user_message, energiaCognitiva){
    createLoadingElement();
    const botUrl = 'http://127.0.0.1:5000/speak';
    const data = {
        matrixName: nomeMatrix,
        user_message: user_message,
        shouldReturn:"True",
        algoritmo:algoritmo,
        energiaCognitiva: energiaCognitiva,
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
        destroyLoadingElement();
        return response.json();
    })
    .then(data => {
        textContent = JSON.stringify(data, null, 2);
        console.log(textContent);
        createMessageBox(textContent, "botfala")
        return textContent;
    })
    .catch(error => {
        console.error

    ('Error:', error);
    });
}