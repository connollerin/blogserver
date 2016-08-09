import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.id = req.body.id;
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
// can use cleanPosts later
  Post.find().sort('-created_at').exec((error, posts) => {
    res.json(posts.map(post => {
      return { id: post._id, title: post.title, tags: post.tags }; // instead of separate function
    }));
  });
};

export const getPost = (req, res) => {
  Post.find({ _id: req.params.id }).exec((error, posts) => { // do I need to use findOne?
    const post = posts[0];
    res.json({ id: post._id, title: post.title, tags: post.tags, content: post.content });
  });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }, (error, posts) => {
    if (error === null) {
      res.json({ message: 'Sucessfully deleted!' });
    } else {
      res.json({ message: 'error deleting post' });
    }
  });
};
export const updatePost = (req, res) => {
  Post.update({ _id: req.params.id }, { title: req.body.title, tags: req.body.tags, content: req.body.content }, {}, (error, posts) => {
    if (error === null) {
      res.json({ message: 'Sucessfully updated!' });
    } else {
      res.json({ message: 'error updating post' });
    }
  });
};
