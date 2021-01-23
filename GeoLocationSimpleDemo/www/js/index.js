/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    //Cordova Ready variable, can't enable the watch until
    //Cordova initializes
    cvaReady: false,
    //LocationInfo portion of the page
    li: null,
    //Dialog constants
    alertTitle: "Geolocation",
    alertBtn: "Continue",
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
        document.getElementById('getLocationButton').addEventListener('click',this.getLocation,false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log("Entering onDeviceReady");
        navigator.notification.alert("Cordova is ready", null, "Device Ready", "Continue");
        //Set the variable that lets other parts of the program
        //know that Cordova has initialized
        app.cvaReady = true;
        //Get a handle we'll use to manipulate the geolocation
        //content on the page
        app.li = document.getElementById('locationInfo');
        console.log("Leaving onDeviceReady");
    },
    getLocation: function () {
        console.log("Entering getLocation");
        if (app.cvaReady == true) {
            //Replace the existing reading on the page
            app.li.innerHTML = 'Starting Watch';
            var locOptions = {
                timeout: 5000,
                enableHighAccuracy: true
            };
            //get the current location
            navigator.geolocation.getCurrentPosition(app.locationSuccess, app.locationError, locOptions);
            //Clear the current location while we wait for a reading
            app.li.innerHTML = "Reading location...";

        } else {
            alert("Please wait,Cordova is not ready.");
        }
        console.log("Entering getLocation");
    },
    locationSuccess: function(loc) {
    function makeListItem(theLabel, theValue) {
        console.log('Label: ' + theLabel);
        console.log('Value: ' + theValue);
        return '<li class="topcoat-list__item">' + theLabel + ': ' + theValue + '</li>';
    }


    console.log("Entering locationSuccess");
    //We received something from the API, so first get the
    // timestamp in a date object so we can work with it
    var d = new Date(loc.timestamp);
    var tmpStr;
    //Build the HTML block which will render the location reading
    tmpStr = '<ul class="topcoat-list__container"><h3 class="topcoat-list__header">Location Reading</h3>';
    tmpStr += makeListItem('Latitude', loc.coords.latitude);
    tmpStr += makeListItem('Longitude', loc.coords.longitude);
    tmpStr += makeListItem('Altitude', loc.coords.altitude);
    tmpStr += makeListItem('Accuracy', loc.coords.accuracy);
    tmpStr += makeListItem('Altitude Accuracy', loc.coords.altitudeAccuracy);
    tmpStr += makeListItem('Heading', loc.coords.heading);
    tmpStr += makeListItem('Speed', loc.coords.speed);
    tmpStr += makeListItem('Timestamp', d.toLocaleString());
    tmpStr += '</ul>';
    //replace the page content with the current location reading
    app.li.innerHTML = tmpStr;
    console.log("Exiting locationSuccess");
},

    locationError: function (errObj) {
    console.error("Entering locationError");
    app.li.innerHTML = 'Error Reading Location';
    console.error(JSON.stringify(errObj));
    navigator.notification.alert("Error: " + errObj.message + "(" + errObj.code + ")", null, app.alertTitle, app.alertBtn);
    console.error("Leaving locationError");
}


};
