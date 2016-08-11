$( document ).ready(function() {
	
	/*------------------------------ WOW Script ----------------------*/

	new WOW().init();

	/*------------------------------ Voice Control -----------------*/
	
	if (annyang) {
	  var commands = {
		
		'Home': function() {
			window.location = "../../../../../www.themeforest.com"
		}											
			
	  };
	  
	  annyang.addCommands(commands);
	  annyang.start();
	}
		
	/*------------------------------ Waves  -----------------*/	
		
	$('#wave1').pan({fps: 30, speed: 2.5, dir: 'left', depth: 30});
	$('#wave2').pan({fps: 30, speed: 2.0, dir: 'right', depth: 70});	
	$('#wave3').pan({fps: 30, speed: 1.5, dir: 'left', depth: 30});
	$('#wave4').pan({fps: 30, speed: 1.0, dir: 'right', depth: 70});
	$('#wave5').pan({fps: 30, speed: 0.5, dir: 'left', depth: 70});	
	
});

/*------------------------------ Preloader ----------------------*/

$(window).load(function() { 
	$('.spinner').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({'overflow':'visible'});
});