Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/add/:num1/:num2', {
    name: 'add',
	data : function(){
		return {
			num1 : this.params.num1,
			num2 : this.params.num2,
			resultat : this.params.num1 + this.params.num2
		}
	}
});