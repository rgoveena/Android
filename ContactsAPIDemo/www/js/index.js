
var app = {

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.getAllContacts();
    },

    /*    The application will execute the getAllContacts method, which will read from the device contacts database.
     To achieve this, we'll set the optional parameter of the contactFindOptions object to return multiple contacts.
     We then set the required contactFields parameter to specify which fields should be returned in each Contact object.
     Finally, we call the find() method, passing in the fields, the options, and the success and error callback method names.*/

    getAllContacts: function() {

        /*The navigator.contacts.find method executes asynchronously, querying the device contacts database and
         returning an array of Contact objects.
         The resulting objects are passed to the contactSuccess callback function specified by the contactSuccess parameter.
         The contactFields parameter specifies the fields to be used as a search qualifier.
         A zero-length contactFields parameter is invalid and results in ContactError.INVALID_ARGUMENT_ERROR.
         A contactFields value of "*" returns all contact fields.
         The contactFindOptions.filter string can be used as a search filter when querying the contacts database.
         If provided, a case-insensitive, partial value match is applied to each field specified in the contactFields parameter.
         If there's a match for any of the specified fields, the contact is returned. Use contactFindOptions.desiredFields parameter to control which contact properties must be returned back.

         Parameters
         contactSuccess: Success callback function invoked with the array of Contact objects returned from the database. [Required]
         contactError: Error callback function, invoked when an error occurs. [Optional]
         contactFields: Contact fields to use as a search qualifier. (DOMString[]) [Required]
         contactFindOptions: Search options to filter navigator.contacts. [Optional] Keys include:
         filter: The search string used to find navigator.contacts. (DOMString) (Default: "")
         multiple: Determines if the find operation returns multiple navigator.contacts. (Boolean) (Default: false)
         desiredFields: Contact fields to be returned back. If specified, the resulting Contact object only features values for these fields. (DOMString[]) [Optional]*/


        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        var fields = ["name", "phoneNumbers",
            "birthday", "emails"];
        navigator.contacts.find(fields,
            app.onAllSuccess, app.onError, options);
    },

    /* Following a successful response, the onAllSuccess method will return an array of Contact objects for us to work with.
     We will initially loop over the returned results and push each Contact object into a new array object,
     arrContactDetails, which allows us to sort the results alphabetically.
     If no results were returned, we'll output a user-friendly message.
     */

    onAllSuccess:function(contacts){

        if(contacts.length) {
            var arrContactDetails = new Array();
            for(var i=0; i<contacts.length; ++i){
                if(contacts[i].name
                    &&  contacts[i].name.formatted
                    && contacts[i].phoneNumbers
                    && contacts[i].phoneNumbers.length){
                    arrContactDetails.push(contacts[i]);
                }
            }

            arrContactDetails.sort(app.alphabeticalSort);

            var alphaHeader = arrContactDetails[0].name.formatted[0];
            for(var i=0; i<arrContactDetails.length; ++i) {
                var contactObject = arrContactDetails[i];

                if( alphaHeader != contactObject.name.formatted[0] ) {
                    //Get the first letter of the name
                    alphaHeader = contactObject.name.formatted[0];

                    //Append the letter to the header of the list
                    $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');

                    //Append the conact record to the the
                    $('#contactList').append(
                        '<li class="contact_list_item" id="' +  contactObject.id + '">' +
                        '<a href="#contact-info">' + contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>'
                    );
                } else {
                    //If this is the first record, Append the letter to the header of the list
                    if( i == 0 ) {
                        $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');
                    }

                    //else the header is already in place and we go ahead and append the record to the list.
                    $('#contactList').append(
                        '<li class="contact_list_item" id="' + contactObject.id + '">' +
                        '<a href="#contact-info">' + contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>');
                }
            }

        } else {
            $('#contactList').append('<li><h3>Sorry, no contacts were found</h3></li>');
        }
        $('#contactList').listview("refresh");
    },

    onAllSuccessCollapsibleList: function (contacts) {
        var arrContactDetails = new Array();
        for (var i = 0; i < contacts.length; ++i) {
            if (contacts[i].name && contacts[i].name.formatted &&
                contacts[i].phoneNumbers && contacts[i].phoneNumbers.length) {
                arrContactDetails.push(contacts[i]);
            }
        }
        for (var i = 0; i < arrContactDetails.length; i++) {
            var contactObject = arrContactDetails[i];
            var html = '<div data-role="collapsible" data-inset="false">';
            html += '<h2>' + contactObject.name.formatted + '</h2>';
            html += '<ul data-role="listview">';
            if (contactObject.phoneNumbers) {
                for (var j = 0; j < contactObject.phoneNumbers.length; j++) {
                    html += '<li>' + contactObject.phoneNumbers[j].type +
                    ": " + contactObject.phoneNumbers[j].value + '</li>';
                }
            }
            html += '</ul></div>';
            $('#contactsListCollapsible').append(html);
        }
        $('[data-role=collapsible]').collapsible().trigger('create');
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
