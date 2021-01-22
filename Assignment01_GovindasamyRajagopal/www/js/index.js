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

/*

compiled By: Govi Rajagopal
References: Google API usages
Requirements: GeoLocation Map Assignment - Accessing the map locations using a Text Button
and reverse geo the location and plot it on the map with Marker

- Last Modified on: 11/04/2014

 */


var app = {


// Application Constructor
initialize: function() {
this.bindEvents();

},

// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {

document.addEventListener('deviceready', this.onDeviceReady, false);
},
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicity call 'app.receivedEvent(...);'
/*Let's start creating our custom code within the JavaScript tag block. ' +
First, we'll create the event listener to ensure the device is ready and we'll also create the onDeviceReady method, which will run using the listener:*/
onDeviceReady: function() {
//  alert('GR:On Device Ready called');


},


    searchLoc:function(){

        var x=prompt("Enter your value for Latitude:");
        var y=prompt("Enter your value for Longitude:");
        var latLng = new google.maps.LatLng(x,y);

        var mapOptions = {
            center: latLng,
            panControl: false,
            zoomControl: true,
            zoom: 8,
            //mapTypeId: google.maps.MapTypeId.HYBRID
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(
            document.getElementById('map_holder'),
            mapOptions
        );

        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });


        // Set attributes for control buttons
        document.getElementById('searchLoc').disabled = true;


    },
    projInfo:function(){


        // Set attributes for control buttons
        document.getElementById('projInfo').disabled = true;


    },
    // Update DOM on a Received Event

/*
    Next we can write the onSuccess method, which will give us access to the returned location data via the position object.
    Let's take the latitude and longitude information obtained from the device geolocation sensor response and create a latLng object which we will send into the Map object when we initialize the component.
    We will then set the options for our Map, setting the center of it to the coordinates we set into the latLng variable. Not all of the Google Map controls translate well to the small screen, especially in terms of usability. We can define which controls we would like to use. In this case we'll accept the zoomControl but not the panControl.
    To define the Map object itself we reference a div element and pass through the mapOptions variable we have previously declared.
    To close off this method, let's now create a Marker variable to display at the exact location as set in the latLng variable:*/

    onSuccess: function(position) {
        alert('GR:Success called');

     // Option 1 - using the default values
          var latLng	=
          new google.maps.LatLng(
             position.coords.latitude,
             position.coords.longitude);


        var latTemp=position.coords.latitude;
        var longTemp=position.coords.latitude;


        var mapOptions = {
            center: latLng,
            panControl: false,
            zoomControl: true,
            zoom: 16,
            //mapTypeId: google.maps.MapTypeId.HYBRID
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(
            document.getElementById('map_holder'),
            mapOptions
        );

        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    },
/*    To ensure we correctly handle any errors that may occur,
    let's now include the onError function which will display the specific string message according to the error within a div element:*/
    onError: function (error) {
        var errString = '';

        // Check to see if we have received an error code
        if(error.code) {
            // If we have, handle it by case
            switch(error.code)
            {
                case 1: // PERMISSION_DENIED
                    errString =
                        'Unable to obtain the location information ' +
                        'because the device does not have permission '+
                        'to the use that service.';
                    break;
                case 2: // POSITION_UNAVAILABLE
                    errString =
                        'Unable to obtain the location information ' +
                        'because the device location could not be ' +
                        'determined.';
                    break;
                case 3: // TIMEOUT
                    errString =
                        'Unable to obtain the location within the ' +
                        'specified time allocation.';
                    break;
                default: // UNKNOWN_ERROR
                    errString =
                        'Unable to obtain the location of the ' +
                        'device due to an unknown error.';
                    break;
            }

        }

        // Handle any errors we may face
        var element = document.getElementById('map_holder');
        element.innerHTML = errString;
    }
};
