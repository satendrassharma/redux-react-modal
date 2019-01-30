const express = require("express");
const router = express.Router();
const Post = require("../../modals/PostModel");

//get all posts
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts) res.json(posts);
    else res.status(404).json({ error: "no post found" });
  } catch (e) {
    res.status(404).json({ error: "post error" });
  }
});

//get a post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) res.json(post);
    else res.status(404).json({ error: "no post found" });
  } catch (e) {
    res.status(404).json({ error: "post error" });
  }
});

//add a post
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    const result = await post.save();
    if (result) res.json(result);
    else res.status(404).json({ error: "posts not added" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "post error" });
  }
});

//delete post
router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (post) res.json(post);
    else res.status(404).json({ error: "no post found" });
  } catch (e) {
    res.status(404).json({ error: "post error" });
  }
});

//update a post
router.post("/update/:postId", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: req.body
      },
      { new: true }
    ); //{new:true} give the updated document
    if (post) res.json(post);
    else res.status(404).json({ error: "no post found" });
  } catch (e) {
    res.status(404).json({ error: "post error" });
  }
});

module.exports = router;
