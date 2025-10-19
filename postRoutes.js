const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let postRoutes = express.Router();

postRoutes.route("/posts").get(async (request, response) => {
  const db = database.getDb();

  const data = await db.collection("posts").find({}).toArray();

  if (data.length === 0) throw new Error("Data was not found :(");

  response.json(data);
});

postRoutes.route("/posts/:id").get(async (request, response) => {
  const db = database.getDb();

  const data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });

  if (Object.keys(data).length === 0) throw new Error("Post was not found :(");

  response.json(data);
});

postRoutes.route("/posts").post(async (request, response) => {
  const db = database.getDb();

  const mongoObject = {
    title: request.body.title,
    description: request.body.description,
    content: request.body.content,
    author: request.body.author,
    dateCreated: request.body.dateCreated,
  };

  const data = await db.collection("posts").insertOne(mongoObject);

  response.json(data);
});

postRoutes.route("/posts/:id").put(async (request, response) => {
  const db = database.getDb();

  const mongoObject = {
    $set: {
      title: request.body.title,
      description: request.body.description,
      content: request.body.content,
      author: request.body.author,
      dateCreated: request.body.dateCreated,
    },
  };

  const data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);

  response.json(data);
});

postRoutes.route("/posts/:id").delete(async (request, response) => {
  const db = database.getDb();

  const result = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(request.params.id) });

  if (result.deletedCount === 1) {
    response.json(data);
  }
  response.json(data);
});

module.exports = postRoutes;
