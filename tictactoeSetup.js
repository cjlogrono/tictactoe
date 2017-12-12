function optimize(option){
  
  var w_width = $(window).width();
  var w_height = $(window).height();
  var board_h
  var UI_h;
  
  if(w_width < 320)  
    w_width = 320;
  
  if(option === 1){
    UI_h = $('.users div.col-xs-12:first-child').height() + $('.users div.col-xs-12:last-child div').height() + $(".title").height() + 20;
    
  }else if(option === 2){
    
    UI_h = $('.player div.col-xs-12:first-child').height() + $('.player div.col-xs-12:nth-child(2) div').height() + $('.player div.col-xs-12:last-child').height() + $(".title").height() + 15;
    
  }else{
    UI_h = $(".board").height() + $(".title").height() + $(".stats").height() + 30;
  }
  
  var UI_top = (w_height - $(".interface").height()) / 2;
  var UI_left = (w_width - $(".interface").width()) / 2;
  
  $('main .row').css('width', w_width).css('height', w_height);
  $('.interface').css('height', UI_h).css('top', UI_top).css('margin-left', UI_left);
  
}

$(document).ready(function(){
  
  $('.player, .board, .stats').hide();
  $('.interface').data('state', 1);
  optimize($('.interface').data('state'));
  optimize($('.interface').data('state'));
});

$(window).resize(function(){
  
  optimize($('.interface').data('state'));
});