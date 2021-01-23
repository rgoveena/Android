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
 References: Contacts API Usages
 Requirements: select a contact and delete, Select a contact and Clone
 Issues: Not reflected to Local storage after the deletion/clone process


 - Last Modified on: 11/14/2014

 */


var app = {

    contactInfo:null,
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

        $(document).on("pagecreate","#contacts-home",function() {
            $("#contact-del").bind("touchstart", app.doContactPicker);

        });
               $(document).on("pagecreate","#contacts-home",function() {
                    $("#contact-clone").bind("touchstart", app.doCloneContact);



    });
        $(document).bind("pagechange", this.onPageChange);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'


    onDeviceReady: function() {
        alert("Device Ready");
        navigator.notification.alert("This is alert ", null, "tested for title",'Done');
    },

    doContactPicker: function(){
       // alert("In the contact Picker method");



        navigator.contacts.pickContact(function(contact){

           // var rmContact= JSON.stringify(contact);
           // alert(rmContact;)
          // rmContact.deleteContents();
          // rmContact.save();

           app.contactInfo = JSON.stringify(contact)

           alert('The following contact has been selected:' + app.contactInfo);
            alert(app.contactInfo);
            alert("contact removed successfuly");

          // app.contactInfo.clone();

            /*
            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;
            var fields = ["*"];

            options.filter.id = id;
            options.multiple = "true";
            var fields = ["displayName", "name"];
            navigator.contacts.find(fields, deleteThis, app.onError, options);

            */

            app.contactInfo.remove();
            app.contactInfo.save();
            alert("contact removal - Confirmed ");

            $.mobile.changePage($('#pagetwo'));
        },function(err){
            alert('Error: ' + err);
        });
    },
    doCloneContact: function(){


        navigator.contacts.pickContact(function(contact){


            app.contactInfo = JSON.stringify(contact)

            alert('The following contact has been selected:' + app.contactInfo);
            alert(app.contactInfo);

            app.contactInfo.clone();
            app.contactInfo.save()

            alert("contact Cloning - Confirmed ");

            $.mobile.changePage($('#pagetwo'));
        },function(err){
            alert('Error: ' + err);
        });
    },

    onPageChange:function(event, data){
        var toPageId = data.toPage.attr("id");
        switch (toPageId) {
            case 'contacts-home':
                break;
            case 'pagetwo':
                app.clearValues();
                //$('#contact_header h1').html(contactInfo.name.formatted);
                var json = JSON.parse(app.contactInfo);
               // alert("I am here --> Object selected-->" + json.name.formatted);
                $('#givenName').val(json.name.formatted);
                $('#familyName').val(json.name.familyName);

                $('#phone').val(json.phoneNumbers[0].value);
                $('#email').val(json.emails[0].value);
alert(json);
                break;
        }
    },
    clearValues:function(){
        $('input[type=text]').each(function() {
            $('#' + this.id + '').val('');
        });

    }
};
