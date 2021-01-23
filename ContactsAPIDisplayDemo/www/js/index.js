
var app = {
    localStorage:window.localStorage,
    contactInfo: null,

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).on('click', '#contactList li.contact_list_item', function(){

            var selectedID = $(this).attr('id');
            app.getContactByID(selectedID);

        });

        $(document).bind("pagechange", this.onPageChange);
    },
    onDeviceReady: function() {
        app.getAllContacts();
    },

/*    Let's now add the getContactByID function, which accepts the selected ID of the contact as a required parameter. ' +
     This will obtain the selected contact information from the localStorage database and assign it to
    the contactInfo variable we set earlier. It will then send the user to a new page within the application.*/
    getContactByID: function(contactID) {
        contactInfo = JSON.parse(localStorage.getItem(contactID));
        $.mobile.changePage($('#contact-info'));
    },

    onPageChange:function(event, data){
        var toPageId = data.toPage.attr("id");

        switch (toPageId) {
            case 'contact-info':
                app.clearValues();
                $('#contact_header h1').html(contactInfo.name.formatted);
                $('#givenName').val(contactInfo.name.givenName);
                $('#familyName').val(contactInfo.name.familyName);

                $('#phone').val(contactInfo.phoneNumbers[0].value);
                $('#email').val(contactInfo.emails[0].value);

                break;
        }


    },

    clearValues:function(){
        $('input[type=text]').each(function() {
            $('#' + this.id + '').val('');
        });

    },

    getAllContacts: function() {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        var fields = ["name", "phoneNumbers",
            "birthday", "emails"];
        navigator.contacts.find(fields,
            app.onAllSuccess, app.onError, options);
    },

/*    Let's now amend the onAllSuccess method, which writes out the list of all contacts. ' +
    'Within the loop we'll add in a small portion of code that will add each item to the localStorage.
    Here we will store the entire contact object for each listing, and use the ID for each contact as
    the key which we can use to retrieve the information.*/


    onAllSuccess:function(contacts){

        if(contacts.length) {
            var arrContactDetails = new Array();
            for(var i=0; i<contacts.length; ++i){
                if(contacts[i].name && contacts[i].name.formatted && contacts[i].phoneNumbers && contacts[i].phoneNumbers.length){
                    arrContactDetails.push(contacts[i]);
                }
            }
            arrContactDetails.sort(app.alphabeticalSort);
            var alphaHeader = arrContactDetails[0].name.formatted[0];
            for(var i=0; i<arrContactDetails.length; ++i) {
                var contactObject = arrContactDetails[i];
                if( alphaHeader != contactObject.name.formatted[0] ) {
                    alphaHeader = contactObject.name.formatted[0];
                    $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');
                    $('#contactList').append('<li class="contact_list_item" id="' +
                            contactObject.id + '"><a href="#contact-info">' +
                            contactObject.name.formatted + ' (' +
                            contactObject.id + ')</a></li>'
                    );
                } else {
                    if( i == 0 ) {
                        $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');
                    }
                    $('#contactList').append( '<li class="contact_list_item" id="'
                        + contactObject.id + '"><a href="#contact-info">' +
                        contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>');
                }

                localStorage.setItem(
                    contactObject.id,JSON.stringify(contactObject)
                );
            }

        } else {
            $('#contactList').append('<li><h3>Sorry, no contacts were found</h3></li>');
        }
        $('#contactList').listview("refresh");
    },

//    Include the alphabeticalSort function, which will sort each contact in ascending order using the formatted version of the displayName.

    alphabeticalSort: function(a,b){
        if (a.name.formatted < b.name.formatted){
            return -1;
        }else if (a.name.formatted > b.name.formatted){
            return  1;
        }else{
            return 0;
        }


    },

    onError: function(error) {
        alert('An error has occurred: ' + error.code);
    }

};
