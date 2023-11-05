const Users = require("../models/schema");
const postPoetry = require("../models/poetry");
const asyncHandler = require("express-async-handler");

const getPost = asyncHandler(async (req, res) => {});
const addPost = asyncHandler(async (req, res) => {
  console.log("addpos", req.body);
  if (!req.body.id) {
    let uData = [];
    const data = await postPoetry.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "name",
          foreignField: "_id",
          as: "name",
        },
      },
    ]);
    data.map((obj) => {
      if (obj["name"][0]["name"].indexOf(req.body.name) != -1) {
        // console.log("obj : ", obj["name"][0]["name"]);
        uData.push(obj);
      }
    });
    console.log(uData);
    return res.send(uData);
  }
  if (req.body.content !== "") {
    const user = await Users.findById(req.body.id);
    if (user !== null) {
      const Post = await postPoetry.create({
        name: req.body.id,
        content: req.body.content,
      });
      await Post.save()
        .then(() => {
          return res.status(201).json({ posted: true });
        })
        .catch((e) => {
          return res.status(409).json({ created: false });
        });
    } else {
      return res.send("not found");
    }
  }
});

const updatePost = asyncHandler(async (req, res) => {});

const deletePost = asyncHandler(async (req, res) => {});

module.exports = {
  getPost,
  addPost,
  updatePost,
  deletePost,
};
