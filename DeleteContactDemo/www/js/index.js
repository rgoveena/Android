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
alert("device ready..")
   //     $(document).on("pagecreate","#contacts-home", function(){
     //       var selectedID = $(this).attr('id');
       //     app.getContactByID(selectedID);

       // });
       $(document).on("pagecreate","#contacts-home",function(){
               $("#contact-del").bind( "touchstart", app. doContactPicker);


    //});
      //  $(document).bind("pagechange", this.onPageChange);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // alert("Device Ready");
       navigator.notification.alert("This is alert ", null, "tested for title",'Done');
    },
    doContactPicker: function(){
        alert("In the contact Picker method");
        navigator.contacts.pickContact(function(contact){


            app.contactInfo = JSON.stringify(contact)
            alert('The following contact has been selected:' + app.contactInfo);
            app.contactInfo.removeThisContact;

           // contact.deleteRow();
           // deleteContact(contact);
           // deleteContact(JSON.stringify(contact));

            alert('The following contact has been removed:' + app.contactInfo);
           $.mobile.changePage($('#page3'));
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
                alert('before clearing the data');
                app.clearValues();
               alert(activeContact.getData());
                //$('#contact_header h1').html(contactInfo.name.formatted);
                var json = JSON.parse(app.contactInfo);
                alert("I am here --> Object selected-->" + json.name.formatted);
                $('#givenName').val(json.name.formatted);
                $('#familyName').val(json.name.familyName);

                $('#phone').val(json.phoneNumbers[0].value);
                $('#email').val(json.emails[0].value);



                break;
        }
    },

    removeThisContact: {


    },

    getContactByID: function(contactID) {
        contactInfo = JSON.parse(localStorage.getItem(contactID));
        alert("After get contact info");

       // var rm = JSON.Parse(localStorage.removeItem(contactID));
        contactinfo.removeItem(contactID);

        // alert("After removal of contact info");
        $.mobile.changePage($('#page3'));
    },


        clearValues:function(){
        $('input[type=text]').each(function() {
            $('#' + this.id + '').val('');
        });

    }
};
