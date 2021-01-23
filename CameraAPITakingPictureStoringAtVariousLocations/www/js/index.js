var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('#dataURL').bind('click',this.takePhoto_DATA_URL);
        $('#file').bind('click',this.takePhoto_FILE_URI);
        $('#nativeURI').bind('click',this.takePhoto_NATIVE_URI);

        $('#photoLib').bind('click',this.takePhoto_PHOTOLIBRARY);
        $('#camera').bind('click',this.takePhoto_CAMERA);
        $('#album').bind('click',this.takePhoto_SAVEDPHOTOALBUM);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log("Entering onDeviceReady");
        //Let the user know that the deviceReady event has fired
        navigator.notification.alert("Cordova is ready", null, "Device Ready", "Continue");
        console.log("Leaving onDeviceReady");
    },

    takePhoto_DATA_URL: function () {
        console.log("Entering takePhoto1");
        var cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA
        }

        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions);
        console.log("Leaving takePhoto1");
    },

    takePhoto_FILE_URI: function () {
        console.log("Entering takePhoto2");
        var cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        }
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions);
        console.log("Leaving takePhoto2");
    },

    takePhoto_NATIVE_URI: function () {
        console.log("Entering takePhoto3");
        var cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.NATIVE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        }
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions);
        console.log("Leaving takePhoto3");
    },

    takePhoto_PHOTOLIBRARY: function () {
        console.log("Entering takePhoto4");
        var cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions);
        console.log("Leaving takePhoto4");
    },

    takePhoto_CAMERA: function () {
        console.log("Entering takePhoto5");
        var cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        }
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions);
        console.log("Leaving takePhoto5");
    },

    takePhoto_SAVEDPHOTOALBUM: function () {
        console.log("Entering takePhoto6");
        var cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        }
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions);
        console.log("Leaving takePhoto6");
    },
    cameraSuccess: function (res) {
        console.log("Entering cameraSuccess");
        console.log("Result: " + res);
        navigator.notification.alert(res, null, "Camera", "Continue");
        console.log("Leaving cameraSuccess");
    },

    cameraError: function (errObj) {
        console.log("Entering cameraError");
        console.error(JSON.stringify(errObj));
        navigator.notification.alert(JSON.stringify(errObj), null, "Camera Error", "Continue");
        console.log("Leaving cameraError");
    }

};
