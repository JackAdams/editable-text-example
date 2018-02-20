Posts = new Mongo.Collection('posts');
Comments = new Mongo.Collection('comments');

EditableText.useMethods = false;

if (Meteor.isClient) {

  Template.posts.helpers({
    posts: function() {
      return Posts.find();
    },
	comments: function() {
	  return Comments.find({post_id:this._id});
	},
	newCommentDoc: function() {
	  return {};  
	}
  });
  
}

// The below is not included in the LOC count :-)
if (Meteor.isServer) {
  var destroy = function() {
	Posts.remove({});
	Comments.remove({});
	Posts.insert({_id:"abc123",timestamp:Date.now(),title:"Editable post title - delete this title to remove the post",body:'This is the body of the post, written with the <strong>wysiwyg editor</strong>.  It is editable because we wrote {{> editableText collection="posts" field="body" wysiwyg=true}} in the template instead of {{body}}.<br /><br />This demo app was written with meteor packages (meteorhacks:fast-render, babrahams:editable-text-wysiwyg-bootstrap-3) and 76 lines of code (<a href="https://github.com/JackAdams/editable-text-example/blob/master/editable-text-example.html" target="_blank">html: 32 loc</a>, <a href="https://github.com/JackAdams/editable-text-example/blob/master/editable-text-example.js" target="_blank">js: 15 loc</a>, <a href="https://github.com/JackAdams/editable-text-example/blob/master/editable-text-example.css" target="_blank">css: 29 loc</a>).<br /><br />See the source at <a href="https://github.com/JackAdams/editable-text-example">https://github.com/JackAdams/editable-text-example.</a>'});
	Comments.insert({post_id:"abc123",text:"To remove a comment, delete the text and press 'Enter'. This is possible because we wrote {{> editableText collection=\"comments\" field=\"text\" textarea=true removeEmpty=true}} instead of {{text}} in the template."});
	Comments.insert({post_id:"abc123",text:"All posts will self destruct every 15 minutes."});
	Meteor.setTimeout(function() {
	  destroy();
    },15 * 60 * 1000);
  }
  destroy();
}