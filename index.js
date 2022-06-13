import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());


const top_stories =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
const new_stories =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
const best_stories =
  "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";

app.get("/topstories", async (req, res) => {
  let resp = await fOne(top_stories);
  console.log("test!", Date.now());
  res.send(resp);
});

app.get("/newstories", async (req, res) => {
  let resp = await fOne(new_stories);
  res.send(resp);
});

app.get("/beststories", async (req, res) => {
  let resp = await fOne(best_stories);
  console.log(resp);
  res.send(resp);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

async function fOne(cat) {
  let top_ids = await fetch(cat);
  let top_ids_1 = await top_ids.json();
  console.log("fone", Date.now());
  top_ids_1 = top_ids_1.slice(0, 10);
    console.log(cat);
  let stories = await getData(top_ids_1);
  return stories;
}

async function getData(ids) {
  let res_stories = [];
  
  for (const element of ids) {
    // console.log("getData1", Date.now());
    let story = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
    );
    // console.log("getData2", Date.now());
    let story1 = await story.json();
    // console.log("getData3", Date.now());
  
    res_stories.push(story1);
  }
  console.log(res_stories);
  return res_stories;
}
