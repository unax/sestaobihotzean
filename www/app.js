    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    

    // Wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);
    // PhoneGap is ready
    function onDeviceReady() {
        console.log("Devide Ready");
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        //$("#camaras").hide();
        $("#preloader").hide(); // will fade out the white DIV that covers the website.
        /* $("#mostrar").click(function() {
            $("#camaras").slideDown("slow");
        });*/
        
        donde_estoy();
        
    }
    
        function uploadPhoto(imageURI2) {
		        $("#preloader").show();
         var imageURI = document.getElementById('image').getAttribute("src");
		  
		var str = imageURI;
		var imageURI = str.replace("file:///var/", "file://localhost/var/"); 
	//	alert (imageURI);
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	//	alert(options.fileName);
        options.mimeType="image/jpeg";

 

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;
        options.chunkedMode = false;

        var url = 'http://www.sestaobihotzean.eus/participa-movil';
        var form_data = {
            titulo: $("#titulo").val(),
            email: $("#email").val(),
            lati: $("#lat").val(),
            longi: $("#lon").val(),
            categoria: $("#categoria").val(), 
            texto: $("#texto").val(),
            is_ajax: 1
        };
        //alert($("#titulo").val());
        console.log("Hacemos el POST");
   //     $.post(url, form_data, function(data) {
    //        console.log("POST hecho");
       //    alert(data);
      //  });
	  
		if ( document.getElementById("texto").value=="" || document.getElementById("titulo").value==""  ){
		alert ("El título y el texto son campos obligatorios");
		return;
		}else{
	  //correccion
	          var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        options.params = {
            titulo: document.getElementById("titulo").value,
            email: document.getElementById("email").value,
            lati: document.getElementById("lat").value,
            longi: document.getElementById("lon").value,
            texto: document.getElementById("texto").value,
            categoria: document.getElementById("categoria").value
        }
		   var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI("http://www.sestaobihotzean.eus/participa-movil"), win, onFail, options);
   }
		//correccion
		/*
        var ft = new FileTransfer();
        console.log("Subimos la imagen");
        ft.upload(imageURI, encodeURI(""), win, onFail, options); */
        var pic1 = document.getElementById("image");
        // que hace esto??? if (image == typeof('image')) return;
        pic1.src = imageURI;
    }

    function onPhotoURISuccess(imageURI) {
        console.log("SOMOS onPhotoURISuccess");
        // Uncomment to view the image file URI 
        console.log(imageURI);


        // Get image handle
        //
        var largeImage = document.getElementById('image');

        // Unhide image elements 
        //
        largeImage.style.display = 'block';
            $("#image").show();
            $("#botoncancela").show();
            $("#botonenvio").show();
        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        largeImage.src = imageURI;       
        console.log("FIN onPhotoURISuccess");
    }

    function capturePhoto() {
      // Take picture using device camera and retrieve image 
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 20,         correctOrientation: true,
        targetWidth: 800,
        targetHeight: 800,

        destinationType: destinationType.FILE_URI });
    }

    function getPhoto(source) {
//	alert(source);
      // Retrieve image file location from specified source
	     navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 20, 
        destinationType: destinationType.FILE_URI,
        sourceType: source }); 
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
    //  alert('Failed because: ' + message);
    }
    function win(r) {
        $("#status").fadeIn(); 
        $("#preloader").show();
        $("#preloader").fadeIn(3500);
     //   alert(r.response);
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        var delay = 3000; 

        setTimeout(function(){ 
            $("#status").fadeOut(); 
            $("#preloader").fadeOut(1500); 
            $("#titulo").val("");
            $("#email").val("");
            $("#categoria").val("");
            $("#texto").val("");
            $("#image").attr("src","second.jpg");
            //$("#camaras").slideUp("slow");
            
            }, delay);
		 	alert('Enviado! Muchas gracias!');
			location.href="index.html";
    }
        function cancelar() { 
				location.href='index.html';
    }

//Opciones de geolocalizacion
var geo_options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

/*
 * Funcion que lanza la geolocalizacion
 */
 
function donde_estoy() {
        console.log("Vamos a probar la geolocation");
        navigator.geolocation.getCurrentPosition(LocationOnSuccess, LocationOnError,geo_options);
        console.log("Esperar al callback");
    }


/*
 * Callbacks de la localizacion
 */
    
// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var LocationOnSuccess = function(position) {
    console.log("Callback onsucces de geolocation");
    $("#lat").val(position.coords.latitude);
    $("#lon").val(position.coords.longitude);
 alert (position.coords.longitude);  comprobar gps
    console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function LocationOnError(error) {
    console.log("Callback onserror de geolocation");
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    console.log("Lo intentamos otra vez");
    donde_estoy();          
}

                                                                     
