// elemento que irá rodar o jogo
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

//cria como lista. Terá varias coordenadas que quando 
//pintadas vai criar os quadradinhos
let snake = [];
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    // desenha o retangulo usando x e y e a largura e algura setadas
    context.fillRect(0, 0, 16*box, 16*box);
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// captura o evento de teclado down
document.addEventListener('keydown', update);

function update(event){
    // faz as mudancas de direcao da cobrinha com base nas teclas de setinha
    // veja os codigos de teclado
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

// funcao que atualiza o jogo de tempos em tempos
// setInterval = funcao de tempo
function iniciarJogo(){
    // plano cartesiano de 0 a 16 x e y
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // exemplo se a posicao zero se chocar com a posicao 1, o jogo vai parar e ameitir alert
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Opa game over');
        }
    }

    //passa cada funcao para iniciarem
    criarBG();
    criarCobrinha();
    drawFood();

    // setar posição X e Y para ponto de partida da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // cria as coordenadas da cobrinha, ex se estiver indo p/ lado direito, diminui um quadro do lado
    // esquerdo
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    // faz o mesmo para o Y
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        // adicionar a funcao pop que retira o ultimo elemento do array
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    // cabeça da cobrinha
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    // Adiciona como primeiro quadro da cobrinha
    snake.unshift(newHead);
}

// intervalo de 100 milisegundo para iniciar o jogo e a cada 100 ms é renovada
// sem travamento
let jogo = setInterval(iniciarJogo, 100);