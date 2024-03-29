Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function(userId, post, fieldNames) {
		// may only edit the following two fields:
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user();
		var postsWithSameLink = Posts.findOne({url: postAttributes.url});

		// Ensure the user is logged in
		if(!user)
			throw new Meteor.Error(401, "You need to login to post new stories");

		// Ensure the post has a title
		if(!postAttributes.title)
			throw new Meteor.Error(422, "Please fill in a headline");

		// Check that there are no previous posts with the same link
		if(postAttributes.url && postsWithSameLink) 
			throw new Meteor.Error(302, 'This link has already been posted', postsWithSameLink._id);

		// Pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), 
		{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
});





// Initially, we allowed direct writes to the Posts collection
// Posts.allow({
//	insert: function(userId, doc) {
//		// only allow posting if you are logged in
//		return !! userId;
//	}
//})