
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
        navigator.notification.alert("This is alert ", null, "tested for title",'Done');

        app.getAllContacts();
    },

    /*    Let's now add the getContactByID function, which accepts the selected ID of the contact as a required parameter. ' +
     This will obtain the selected contact information from the localStorage database and assign it to
     the contactInfo variable we set earlier. It will then send the user to a new page within the application.*/
    getContactByID: function(contactID) {
        contactInfo = JSON.parse(localStorage.getItem(contactID));
       alert(contactInfo);
        alert("After get contact info");
        var rc = localStorage.removeItem(contactID);

        alert("After removing contact info");
       // $.mobile.changePage($('#contact-info'));
    },

    removeContactByID: function(contactID) {
        contactInfo = JSON.parse(localStorage.getItem(contactID));

        alert("After get contact info");
        var rc = localStorage.removeItem(contactID);

        contactInfo.save(app.onSaveSuccess, app.onError);

        alert("After removing contact info");
        // $.mobile.changePage($('#contact-info'));
    },

    onPageChange:function(event, data){
        var toPageId = data.toPage.attr("id");

        switch (toPageId) {

            case 'contacts-home':
                $('#contactList').html('');
                app.getAllContacts();
                break;



            case 'contact-info':
                app.clearValues();
                $('#contact_header h1').html(contactInfo.name.formatted);
                $('#givenName').val(contactInfo.name.givenName);
                $('#familyName').val(contactInfo.name.familyName);

                $('#phone').val(contactInfo.phoneNumbers[0].value);
                $('#email').val(contactInfo.emails[0].value);

                break;

            case 'contact-del':
                alert("Contact delete reached");
                $('#delBtn').bind('touchstart',function() {
                    $('#displayName').val(
                        $('#new_contact_form #givenName').val() +
                        ' ' + $('#new_contact_form #familyName').val()
                    );

                    //var rmContact = navigator.contacts.removeContactByID()
                    app.localStorage.removeItem(contactInfo);
                    var rmContact = navigator.contacts.getContactByID((JSON.parse(contactInfo)));
                    rmContact.save(app.onSaveSuccess, app.onError);

                    alert("remove item called");
                    //alert(app.localStorage.removeItem(contactInfo);
                });
                    break;

            case 'contact-add':
                // app.clearValues();  ???
                $('#saveBtn').bind('touchstart',function(){
                    $('#displayName').val(
                            $('#new_contact_form #givenName').val() +
                            ' ' + $('#new_contact_form #familyName').val()
                    );
                    var arrContactInfo = $('#new_contact_form').serializeArray();
                    var phoneNumbers = new Array();
                    var emails = new Array();
                    var contactInfo = '{';

                    for(var i=0; i<arrContactInfo.length; i++) {
                        switch (arrContactInfo[i].name) {
                            case 'phone':
                                if(arrContactInfo[i].value) {
                                    phoneNumbers[0] = new ContactField('mobile', arrContactInfo[i].value, true);
                                }
                                break;
                            case 'email':
                                if(arrContactInfo[i].value) {
                                    emails[0] = new ContactField('work', arrContactInfo[i].value, true);
                                }
                                break;
                            default:
                                contactInfo += '"' + arrContactInfo[i].name + '" : "' + arrContactInfo[i].value + '"';
                                if(i < arrContactInfo.length-1) { contactInfo += ', ' }
                        }
                    }

                    contactInfo += '}';
alert(contactInfo);  // Debug for showing the fields

                    var newContact = navigator.contacts.create(JSON.parse(contactInfo));

                    newContact.phoneNumbers = phoneNumbers;
                    newContact.emails = emails;

                    newContact.save(app.onSaveSuccess, app.onError);

                });

                break;
        }



    },

    onSaveSuccess:function(contact){
        $.mobile.changePage($('#contacts-home'));
        $('#contactList').listview("refresh");
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
