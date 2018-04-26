// Mes variables globals
var cardSelected = [];
var cptFruitTrouve = 0;
var timer;
var s = 0;

/* je créer mon application */
var app = {
  init: function() {
    alert('Attention le jeu va commencer quand tu click sur OK !');
    // declaration variable et intialisation des fruits
    var board = document.querySelector('#board_game');
    var cpt = 0;
    var cards = ["fruit1","fruit2","fruit3","fruit4","fruit5","fruit6","fruit7","fruit8","fruit9","fruit10","fruit11","fruit12","fruit13","fruit14","fruit1","fruit2","fruit3","fruit4","fruit5","fruit6","fruit7","fruit8","fruit9","fruit10","fruit11","fruit12","fruit13","fruit14"];

    // affectation des fruits aux cartes
    app.shuffleCarte(cards);
    $('.carte').each(function(){
      var element = $(this);
      element.addClass(cards[cpt]);
      cpt++;
    });

    // ajout de l'evenement click
    $(board).on('click','.cache',app.selectCarte);

    // declenchement du timer
    app.timerGamer();
  },

  selectCarte: function(event) {
    // manage css class
    $(this).addClass('image');
    $(this).removeClass('cache');
    // manage game rules
    cardSelected.push(event.target);
    // si deux cartes sont selectionnées
    if (cardSelected.length === 2) {
      // teste de leurs fruits
      if (cardSelected[0].className === cardSelected[1].className) {
        cptFruitTrouve ++;
        if (cptFruitTrouve == 14){
          window.setTimeout(function(){
            alert("BRAVO C'EST GAGNE !!!");
            location.reload();
          },100);
        }
        cardSelected = [];
      }
      else {
        $('#board_game').off('click','.cache',app.selectCarte);
        window.setTimeout(function(){
          $(cardSelected).each(function(){
            $(this).removeClass('image');
            $(this).addClass('cache');
          })
          cardSelected = [];
          $('#board_game').on('click','.cache',app.selectCarte);
        },1000);
      }
    }
  },

  shuffleCarte: function(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  },

  timerGamer: function() {
    timer = setInterval(function()
      {
        s++; // On incrémente le nombre de seconde
        $('.progress-bar').attr('aria-valuenow', s);
        $('.progress-bar').css('width', s*(100/60) + '%');

        if(s > 59) // Si s est supérieur à 59 ..
        {
          window.setTimeout(function(){
            alert("TRY AGAIN !!!");
            location.reload();
          },100);
        }
      },1000);
      // Animation complete.
  }
}

/* J'initialise mon appli*/
$(document).ready(function(){
    app.init();
});
