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

Author: Govi Rajagopal
Requirements: Mind Reader

 */


var app = {
// Application Constructor

    count:0,

    initialize: function () {

        this.bindEvents();
    },


// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicity call 'app.receivedEvent(...);'
    /*Let's start creating our custom code within the JavaScript tag block. ' +
     First, we'll create the event listener to ensure the device is ready and we'll also create the onDeviceReady method, which will run using the listener:*/


    onDeviceReady: function () {

        alert('GR:On Device Ready called');

        document.getElementById('Ready').disabled = false;


    },

    /*
     login: function () {
     {
     alert(form.username.value)
     alert(document.getelementbyId(username).value);
     //  alert(form.password.value)
     if (form.username.value == "govi" && form.password.value == "password") {
     alert("User Validated ");
     document.getelementbyId('main').innerHTML = "<p> User Validated  </p>";
     }
     else {
     alert("Incorrect Username or Password");
     }

     }


     //       document.getElementById('map_holder');
     // Set attributes for control buttons
     document.getElementById('login').disabled = true;


     },
     */

    mainFunc: function () {

        alert("GR:mainFunc called");
        alert("Implementation in Progress");

        //   document.getElementById('map_holder');

        // Set attributes for control buttons
        // document.getElementById('mainFunc').disabled = true;

    },

    onLoad1: function() {

        alert('GR:Ready called');


        // Set attributes for control buttons
        document.getElementById('Display-1').innerHTML=" <p> If you see your thinking number click on yes otherwise No <br> 1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31</p>";

    },

    ready: function() {


        alert('GR:Ready called');

            document.getElementById('Display-1').innerHTML=" <p> If you see your thinking number click on yes otherwise No <br> 1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31</p>";

        // Invloke function 1
        // Set attributes for control buttons


    },


    yes: function() {

        alert('GR:yescalled');
        prompt("You have clicked yes");
        count= count +1;
        alert(count);

        // Set attributes for control buttons
        document.getElementById('mypanel').disabled = true;


    },

   no: function() {

        alert('GR:NO called');


        // Set attributes for control buttons
        document.getElementById('mypanel').disabled = true;


    },
    home:function() {

        alert('GR:Home called');
        alert("Implementation in Progress");

        document.getElementById('main');
        // Set attributes for control buttons
        document.getElementById('home').disabled = true;
    },

projInfo:function() {

                alert('GR:projInfo called');
                alert("Implementation in Progress");

                document.getElementById('main').innerHTML="<p> this is test page </p>";


                // Set attributes for control buttons
                // document.getElementById('projInfo').disabled = true;
                }
                };


