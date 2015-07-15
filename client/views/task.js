
if (Meteor.isClient) {
	
  Meteor.subscribe("tasks");
  // This code only runs on the client
  Template.mainLayout.helpers({
    tasks: function(){
		if (Session.get("hideCompleted")) {
		  // If hide completed is checked, filter tasks
		  return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
		} else {
		  // Otherwise, return all of the tasks
		  return Tasks.find({}, {sort: {createdAt: -1}});
		}
	},
	hideCompleted: function () {
		return Session.get("hideCompleted");
	},
	nbIncompleted: function(){
		return Tasks.find({checked: {$ne: true}}).count();
	}

  });
  
  Template.mainLayout.events({
	"submit .new-task": function (event) {
		// This function is called when the new task form is submitted
		console.log('submit received');
		var text = event.target.text.value;

		Meteor.call("addTask", text);
		// Clear form
		event.target.text.value = "";
		// Prevent default form submit
		return false;
	},
	"change .hide-completed input": function (event) {
	  Session.set("hideCompleted", event.target.checked);
	}
  });
  
  // Define a helper to check if the current user is the task owner
  Template.task.helpers({
	  isOwner: function () {
		return this.owner === Meteor.userId();
	  }
  });
  Template.task.events({
	  "click .delete" : function(event){
		  Meteor.call("deleteTask", this._id);
	  },
	  
	  "click .toggle-checked" : function(event){
		  Meteor.call("setChecked", this._id, ! this.checked);
	  },
	  
	  "click .toggle-private" : function(event){
		  Meteor.call("setPrivate",this._id, ! this.private);
	  }
  });
  
  Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
  });
}
