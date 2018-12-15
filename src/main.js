var cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];



document.onload = function() {
  var memoryGame = new MemoryGame(cards);
  memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach(function (pic) {
    html += `<div class="card" data-card-name="${pic.name}">
      <div class="back" name="${pic.img}"></div>
      <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
    </div>`;
  });
  let pairSelect = [];
  let shadow;

  // Add all the div's to the HTML
  let board = document.querySelector('#memory_board');
  board.innerHTML = html;

  // Bind the click event of each element to a function
  let back = document.querySelectorAll('.back');
  back.forEach(function(ele) {
    ele.addEventListener('click', function sel(e) {
      //defino el selector CSS para la carta seleccionada
      // let selector = "#memory_board .back[name='".concat(this.getAttribute("name").concat("']"));

      //compruebo si ya tengo dos cartas destapadas
      if(pairSelect.length === 2){
        if(shadow){
          turnCards(pairSelect)
        }
        pairSelect = [];
      }

      //construyo la carta seleccionada
      //let pic = new Pic(this.getAttribute("name").substring(0,this.getAttribute("name").indexOf(".")));
      let pic = new Pic(this.parentNode.getAttribute("data-card-name"));
      pic.back = this.parentNode.querySelector(".back");
      // pic.front = pic.back.parentNode.querySelector(".front");
      pic.front = pic.back.nextElementSibling;

      console.log(this.parentNode.querySelector(".back"));
      console.log(pic.back.nextElementSibling);
      //descubro la carta seleccionada
      pic.back.className = 'front';
      pic.front.className = 'back';

      //guardo la carta seleccionada y compruebo la jugada
      pairSelect.push(pic);

      if(pairSelect.length === 2){

        console.log(pairSelect);

        //actualizo el contador de jugadas y el score
        memoryGame.pairsClicked++;
        scoreUpdater(memoryGame);

        //compruebo si son iguales y las dejo destapadas
        if(memoryGame.checkIfPair(pairSelect[0].name, pairSelect[1].name)){
          scoreUpdater(memoryGame);
          shadow = false;
        }else{
          //elimino los eventListener si las cartas son iguales
          //ele.removeEventListener('click', sel);
          //setTimeout(turnCards(pairSelect), 3000);
          shadow = true;
        }

        //Compruebo si se han acabado las jugadas
        if (memoryGame.isFinished()){
          //Mostrar en pantalla que se ha acabado el juego - modificando el div del tablero
          finished(memoryGame);
        }
      }

    })
  })
}();

//Funcion para mantener la selección visible 2 segundos
function turnCards(pairSelect) {
  for(let i=0; i<pairSelect.length; i++){
    pairSelect[i].front.className = 'front';
    pairSelect[i].back.className = 'back';
  }
}

//Funcion para actualizar el marcador
function scoreUpdater(memoryGame){
  let clicked = document.querySelector("#pairs_clicked");
  let guessed = document.querySelector("#pairs_guessed");

  clicked.innerText = memoryGame.pairsClicked;
  guessed.innerText = memoryGame.pairsGuessed;
}

//Función para mostrar resumen
function finished(memoryGame){
  let memory_board = document.querySelector('#memory_board');
  let finalDiv = document.createElement('div');
  finalDiv.setAttribute("class", "final");
  finalDiv.innerHTML = `<h1>FINISHED!!!!!</h1>
                        <h2>Your scores:</h2>
                        <p>Pairs Clicked: <span id="pairs_clicked">${memoryGame.pairsClicked}</span></p>
                        <p>Pairs Guessed: <span id="pairs_guessed">${memoryGame.pairsGuessed}</span></p>`;
  finalDiv.setAttribute("width",memory_board.getAttribute("width"));
  finalDiv.setAttribute("height",memory_board.getAttribute("height"));

  document.querySelector(".container").appendChild(finalDiv);
}