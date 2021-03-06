import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.profile.helpers({
  currentUser () {
    return Meteor.user();
  },
  usersCollection () {
    // Return reference to Meteor.users collection
    return Meteor.users;
  },
});
