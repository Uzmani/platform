import { ApiLogo } from '/apis/logo/collection/collection';
import { Apis } from '/apis/collection';
import { fileNameEndsWith } from '/core/helper_functions/file_name_ends_with';

Meteor.startup(function () {
  ApiLogo.resumable.on('fileAdded', function (file) {
    return ApiLogo.insert({
      _id: file.uniqueIdentifier,
      filename: file.fileName,
      contentType: file.file.type,
    }, function (err, apiLogoFile) {
      if (err) {
        console.warn('File creation failed!', err);
        return;
      }

      const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

      if (fileNameEndsWith(file.file.name, acceptedExtensions)) {
        // Get the id from API logo file object
        const apiLogoFileId = file.uniqueIdentifier;

        // Get apibackend id
        const api = Apis.findOne();

        // Update logo id field
        Apis.update(api._id, { $set: { apiLogoFileId } });

        // Get success message translation
        const message = TAPi18n.__('apiLogo_resumable_successfully_uploaded');

        sAlert.success(message);

        return ApiLogo.resumable.upload();
      } else {
        // Get error message translation related to accepted extensions
        const message = TAPi18n.__('apiLogo_resumable_acceptedExtensions');

        // Alert user of error
        sAlert.error(message);
      }
    });
  });
});
