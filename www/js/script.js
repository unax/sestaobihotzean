$(document).ready(function(){
	
	// Calling our splashScreen plugin and
	// passing an array with images to be shown
	
	$('#promoIMG').splashScreen({
		textLayers : [
			'img/macbookAir.jpg'
		]
	});
	    window.setTimeout(function(){
        window.location.href = "inicio.html";
    }, 5000);
});
