Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/task', {
    name: 'task',
	data : function(){
		return {
		tasks : Tasks.find({}, {sort: {createdAt: -1}})
		};
	}
});