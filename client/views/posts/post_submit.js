Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		// Initally, we wrote directly to the collection with next lines.
		// post._id = Posts.insert(post);
		// Meteor.Router.to('postPage', post);

		Meteor.call('post', post, function(error, id) {
			if(error) 
				return alert(error.reason)

			Meteor.Router.to('postPage', id);
		});
	}
});