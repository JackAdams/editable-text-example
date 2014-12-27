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

if (Meteor.isServer) {
  var destroy = function() {
	Meteor.setTimeout(function() {
	  Posts.remove({});
	  Comments.remove({});
	  Posts.insert({_id:"abc123",title:"Editable post title - delete this title to remove the post",body:'This is the body of the post, written with the <strong>wysiwyg editor</strong>.<br /><br />To remove comments, delete the text and press \'Enter\'.<br /><br />This app was written in 80 lines of code (30 of which were CSS), leaning heavily on the package <a href="https://github.com/JackAdams/meteor-editable-text">babrahams:editable-text</a>.<br /><br />See the source at <a href="https://github.com/JackAdams/editable-text-example">https://github.com/JackAdams/editable-text-example.</a>'});
	  Comments.insert({post_id:"abc123",text:"And this is an editable comment from a textarea."});
	  Comments.insert({post_id:"abc123",text:"All posts will self destruct every 15 minutes."});
	  destroy();
    },15 * 60 * 1000);
  }
  destroy();
}