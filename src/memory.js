class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards=[];
    this.pairsClicked=0;
    this.pairsGuessed=0;
  }
  shuffleCards () {
    for (let i = 0; i < this.cards.length-2; i++) {
      let random = Math.floor(Math.random()*(this.cards.length - i)) + i;
      let aux = this.cards[i];
      this.cards[i] = this.cards[random];
      this.cards[random] = aux;
    }
  };

  checkIfPair (firstCard, secondCard) {
    if (firstCard === secondCard){
      this.pairsGuessed++;
      return true;
    }
    return false;
  }

  isFinished () {
    if(this.pairsGuessed === 12){
      return true;
    }
    return false;
  };
}

class Pic {
  constructor(name){
    this.name = name;
    this.back;
    this.front;
  }
}