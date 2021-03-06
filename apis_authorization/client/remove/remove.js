import { Apis } from '/apis/collection';
import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

Template.apiRemoveAuthorizedUser.events({
  'click #confirm-remove' (event, templateInstance) {
    // Get API ID
    const apiId = templateInstance.data.api._id;

    // Get User ID
    const userId = templateInstance.data.user._id;

    // Remove User ID from authorized users array
    Apis.update({ _id: apiId },
       { $pull:
         { authorizedUserIds: userId },
       }
     );

    // Dismiss the modal dialogue
    Modal.hide('apiRemoveAuthorizedUser');
  },
});
