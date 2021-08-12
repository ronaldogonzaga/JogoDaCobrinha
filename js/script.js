let canvas = document.getElementById("snake");
let context = canvas.getConext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criaBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); // desenha o retangulo usando x e y e a largura e algura setadas
}

function criarCobrinha() {
    for(i = 0; i< snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    coontext.fillRect(food.x, food.y, box, box);
}
// captura o evento de teclado down
document.addEventListener('keydown', update);

function update (event){
    // faz as mudancas de direcao da cobrinha com base nas teclas de setinha
    // veja os codigos de teclado
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// funcao que atualiza o jogo de tempos em tempos
// setInterval = funcao de tempo
function iniciaJogo(){
    // plano cartesiano de 0 a 16 x e y
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    //passa cada funcao para iniciarem
    criaBG();
    criarCobrinha();
    drawFood();
    // setar posição X e Y para ponto de partida da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // cria as coordenadas da cobrinha, ex se estiver indo p/ lado direito, diminui um quadro do lado
    // esquerdo
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    // faz o mesmo para o Y
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    // adicionar a funcao pop que retira o ultimo elemento do array
    snake.pop();

    // cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

// intervalo de 100 milisegundo para iniciar o jogo e a cada 100 ms é renovada
// sem travamento
let jogo = setInterval(iniciarJogo, 100);

