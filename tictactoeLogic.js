function playerTurn(){
  
  rounds++;
  if(turn === 1){
    
    $('.stats .col-xs-6:nth-child(2) p').addClass('turn');
    $('.stats .col-xs-6:first-child p').removeClass();
    turn = 2;
    return (player1Choice);
  }else{
    
    $('.stats .col-xs-6:first-child p').addClass('turn');
    $('.stats .col-xs-6:nth-child(2) p').removeClass();
    turn = 1;
    if(numPlayers === 2)
      return (player2Choice);
    else
      return (compTurn());
  }
}

function compTurn(){
  
  var valid = false;
  var square;
  
  do{
    //if(rounds >= 1 && rounds <= 3)
      square = "#square" + (Math.floor(Math.random() * 8) + 1);
    if($(square).text() === "")
      valid = true;
  }while(!valid);
  
  $(square).text(compChoice);
  
}

function checkWin(){
  
  if (($('#square1').text() === "X" || $('#square1').text() === "O") && $('#square1').text() == $('#square2').text() && $('#square2').text() == $('#square3').text()){

    $('#square1 ,#square2 ,#square3').addClass('won');
		return 1;
  }
	else if (($('#square4').text() === "X" || $('#square4').text() === "O") && $('#square4').text() == $('#square5').text() && $('#square5').text() == $('#square6').text()){

    $('#square4 ,#square5 ,#square6').addClass('won');
		return 1;
  }
	else if (($('#square7').text() === "X" || $('#square7').text() === "O") && $('#square7').text() == $('#square8').text() && $('#square8').text() == $('#square9').text()){

    $('#square7 ,#square8 ,#square9').addClass('won');
		return 1;
  }
	else if (($('#square1').text() === "X" || $('#square1').text() === "O") && $('#square1').text() == $('#square4').text() && $('#square4').text() == $('#square7').text()){

    $('#square1 ,#square4,#square7').addClass('won');
		return 1;
  }
	else if (($('#square2').text() === "X" || $('#square2').text() === "O") && $('#square2').text() == $('#square5').text() && $('#square5').text() == $('#square8').text()){

    $('#square2,#square5,#square8').addClass('won');
		return 1;
  }
	else if (($('#square3').text() === "X" || $('#square3').text() === "O") && $('#square3').text() == $('#square6').text() && $('#square6').text() == $('#square9').text()){

    $('#square3,#square6,#square9').addClass('won');
		return 1;
  }
	else if (($('#square1').text() === "X" || $('#square1').text() === "O") && $('#square1').text() == $('#square5').text() && $('#square5').text() == $('#square9').text()){

    $('#square1,#square5,#square9').addClass('won');
		return 1;
  }
	else if (($('#square3').text() === "X" || $('#square3').text() === "O") && $('#square3').text() == $('#square5').text() && $('#square5').text() == $('#square7').text()){

    $('#square3,#square5,#square7').addClass('won');
		return 1;
  }
	else if (rounds === 10){

    $('.board .col-xs-12 .col-xs-4 p').addClass('draw');
    $('.stats .col-xs-6:nth-child(3) p').css('color', 'red');
		return 0;
  }else
		return -1;
}

$(document).on('click touchend', '.users .col-xs-12:last-child div:first-child p', function(){
  
  numPlayers = 1;
  $('.stats .col-xs-6:nth-child(2)').html('<p>Computer: <span>0</span></p>');
});

$(document).on('click touchend', '.users .col-xs-12:last-child div:last-child p', function(){
  
  numPlayers = 2;
  $('.stats .col-xs-6:nth-child(2)').html('<p>Player#2: <span>0</span></p>');
});

$(document).on('click touchend', '.users .col-xs-12:last-child div p', function(){
  
  $('.users').hide();
  $('.player').show();
  $('.interface').data('state', 2);
  optimize($('.interface').data('state'));
  
});

$(document).on('click touchend', '.player .col-xs-12:nth-child(2) div:first-child p', function(){
  
  player1Choice = "X";
  if(numPlayers === 1)  
    compChoice = "O";
  else
    player2Choice = "O";
  
});

$(document).on('click touchend', '.player .col-xs-12:nth-child(2) div:last-child p', function(){
  
  player1Choice = "O";
  if(numPlayers === 1)  
    compChoice = "X";
  else
    player2Choice = "X";
});

$(document).on('click touchend', '.player .col-xs-12:nth-child(2) div p', function(){
  
  $('.player').hide();
  $('.board').show();
  $('.stats').show();
  $('.interface').data('state', 3);
  optimize($('.interface').data('state'));
  optimize($('.interface').data('state'));
  alert("FYI: The current player's turn will be highlited in blue!");
});

$(document).on('click touchend', '.player .col-xs-12:last-child p', function(){
  
  $('.users').show();
  $('.player').hide();
  $('.interface').data('state', 1);
  optimize($('.interface').data('state'));
  numPlayers = 0;
});

$(document).on('click touchend', '.stats .col-xs-6:last-child p', function(){
  
  $('.board,.stats').hide();
  $('.users').show();
  $('.interface').data('state', 1);
  optimize($('.interface').data('state'));
  optimize($('.interface').data('state'));
  $('.board .col-xs-12 .col-xs-4 p').text("");
  if(numPlayers === 1)
    compChoice = "";
  else 
    player2Choice = "";
  player1Choice = "";
  numPlayers = 0;
  turn = 1;
  rounds = 1;
  $('.stats span').text(0);
  
});

$(document).on('click touchend', '.board .col-xs-12 .col-xs-4', function(){
  
  var won = -2;
  var finish = false;
  
  if($(this).find('p').text() === ""){
  
    $(this).find('p').text(playerTurn());

    if(rounds > 5)
      won = checkWin();

    if(won === 1){

      //alert('winner');
      setTimeout(function(){
        $('.board .col-xs-12 .col-xs-4 p').text("").removeClass('won');
      }, 2000);
        rounds = 1;
        var winningChoice = $('.board').find('.won').text();
        winningChoice = winningChoice[0];
        if(winningChoice === player1Choice){

          var value = $('.stats .col-xs-6:first-child span').text();
          value++;
          $('.stats .col-xs-6:first-child span').text(value);
          turn = 1;
          $('.stats .col-xs-6:first-child p').addClass('turn');
          $('.stats .col-xs-6:nth-child(2) p').removeClass();
        }else{

          var value = $('.stats .col-xs-6:nth-child(2) span').text();
          value++;
          $('.stats .col-xs-6:nth-child(2) span').text(value);
          turn = 2;
          $('.stats .col-xs-6:nth-child(2) p').addClass('turn');
          $('.stats .col-xs-6:first-child p').removeClass();
        }
        finish = true;
    }else if(won === 0){

      setTimeout(function(){
        $('.board .col-xs-12 .col-xs-4 p').text("").removeClass('draw');
        $('.stats .col-xs-6:nth-child(3) p').css('color', 'white');
      }, 2000);
      if($('.stats .col-xs-6:first-child span').text() < $('.stats .col-xs-6:nth-child(2) span').text()){

         turn = 1;
          $('.stats .col-xs-6:first-child p').addClass('turn');
          $('.stats .col-xs-6:nth-child(2) p').removeClass();
      }else{

        turn = 2;
          $('.stats .col-xs-6:nth-child(2) p').addClass('turn');
          $('.stats .col-xs-6:first-child p').removeClass();
      }
      rounds = 1;
      var value = $('.stats .col-xs-6:nth-child(3) span').text();
      value++;
      $('.stats .col-xs-6:nth-child(3) span').text(value);
      finish = true;
    }
    
    if(numPlayers === 1 && !finish){
      playerTurn();  
      if(rounds > 5)
        won = checkWin();
      if(won === 1){

      //alert('winner');
      setTimeout(function(){
        $('.board .col-xs-12 .col-xs-4 p').text("").removeClass('won');
      }, 2000);
        rounds = 1;
        var winningChoice = $('.board').find('.won').text();
        winningChoice = winningChoice[0];
        if(winningChoice === player1Choice){

          var value = $('.stats .col-xs-6:first-child span').text();
          value++;
          $('.stats .col-xs-6:first-child span').text(value);
          turn = 1;
          $('.stats .col-xs-6:first-child p').addClass('turn');
          $('.stats .col-xs-6:nth-child(2) p').removeClass();
        }else{

          var value = $('.stats .col-xs-6:nth-child(2) span').text();
          value++;
          $('.stats .col-xs-6:nth-child(2) span').text(value);
          turn = 2;
          $('.stats .col-xs-6:nth-child(2) p').addClass('turn');
          $('.stats .col-xs-6:first-child p').removeClass();
        }

    }else if(won === 0){

      setTimeout(function(){
        $('.board .col-xs-12 .col-xs-4 p').text("").removeClass('draw');
        $('.stats .col-xs-6:nth-child(3) p').css('color', 'white');
      }, 2000);
      if($('.stats .col-xs-6:first-child span').text() < $('.stats .col-xs-6:nth-child(2) span').text()){

         turn = 1;
          $('.stats .col-xs-6:first-child p').addClass('turn');
          $('.stats .col-xs-6:nth-child(2) p').removeClass();
      }else{

        turn = 2;
          $('.stats .col-xs-6:nth-child(2) p').addClass('turn');
          $('.stats .col-xs-6:first-child p').removeClass();
      }
      rounds = 1;
      var value = $('.stats .col-xs-6:nth-child(3) span').text();
      value++;
      $('.stats .col-xs-6:nth-child(3) span').text(value);
    }
    }
    
    if(turn === 2 && numPlayers === 1 && rounds === 1){
      setTimeout(function(){
          playerTurn();
      }, 3000);
    }  
 }
  
});