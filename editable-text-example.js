Posts = new Mongo.Collection('posts');
Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {

  Template.posts.helpers({
    posts: function() {
      return Posts.find();
    },
	comments: function() {
	  return Comments.find({post_id:this._id});
	},
	doc: function() {
	  return {};  
	}
  });
  
}