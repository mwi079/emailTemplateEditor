const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db_url = "mongodb://localhost:27017/templates";
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(db_url);

const templateSchema = new mongoose.Schema({
  counters: { type: mongoose.Schema.Types.Mixed, required: false },
  body: { type: mongoose.Schema.Types.Mixed, required: false },
});

const Template = mongoose.model("templates", templateSchema, "templates");

app.get("/templates", async (request, response) => {
  try {
    const templates = await Template.find();
    response.send(templates);
  } catch (error) {
    response.sendStatus(500);
    console.log(error);
  }
});
app.post("/templates", async (request, response) => {
  try {
    const template = request.body;
    const newTemplate = await Template.create(template);
    response.send(newTemplate);
  } catch (error) {
    response.sendStatus(500);
    console.log(error);
  }
});

app.put("/templates/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const template = request.body;
    const newTemplate = await Template.findByIdAndUpdate(id, template);
    response.send(newTemplate);
  } catch (error) {
    response.sendStatus(500);
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Hello, i am a server");
});
