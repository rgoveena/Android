
var app = {
    btnText:'Continue',
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $( "#takePicture" ).bind( "click", function() {
          app.takePicture();
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.notification.alert('deviceready');
    },
    // Update DOM on a Received Event
    takePicture: function(id) {
        console.log("Entering takePhoto");

        // option 1
        // navigator.camera.getPicture(this.cameraSuccess, this.cameraError);


        // option 2
        navigator.camera.getPicture(this.cameraSuccessPicOnTheDiv, this.cameraError);

        // option 3
var cameraOptions = {

}
        navigator.camera.getPicture(this.cameraSuccessPicOnTheDiv, this.cameraError, cameraOptions);


        console.log("Entering takePhoto");
    },
    cameraSuccess:function(imageURL){
        console.log("Entering cameraSuccess");

        navigator.notification.alert(imageURL, null, "Photo Results", app.btnText);
        console.log("Leaving cameraSuccess");
    },
    cameraSuccessPicOnTheDiv: function(imageURL){
        console.log("Entering cameraSuccessPicOnTheDiv");
        //navigator.notification.alert(imageURL, null, "Photo Results", app.btnText);
        var ic = document.getElementById('imagePlaceHolder');
        //Then write an image tag out to the div using the
        //URL we received from the camera application
        ic.innerHTML = '<img src="' + imageURL + '" width="50%" />';
        console.log("Leaving cameraSuccessPicOnTheDiv");

    },
    showPosition:function(position){
        alert("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);


    },
    cameraError: function(errObj){
        console.log("Entering cameraError");
        console.error(JSON.stringify(errObj));
        navigator.notification.alert("Error: " + JSON.stringify(errObj), null, "Camera Error", app.btnText);
        console.log("Leaving cameraError");

    }
};
