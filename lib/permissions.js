// check that userId specfied owns the documents
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}