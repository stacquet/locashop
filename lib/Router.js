Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'mainLayout',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('task')
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('join');
  this.route('signin');

  this.route('taskPanel', {
    path: '/taskPanel',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
		console.log('on démarre');
      this.todosHandle = Meteor.subscribe('task');

      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
		console.log('on y est');
        dataReadyHold.release();
      }
    },
    data: function () {
		console.log('on data');
      return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    },
    action: function () {
		console.log('on action');
      this.render();
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      //Router.go('listsShow', Lists.findOne());
    }
  });
});
