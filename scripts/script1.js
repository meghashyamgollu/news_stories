// var urlMetadata = require('url-metadata');
let categories = ["topstories", "newstories", "beststories"];
let current = categories[0];

let storiesIds = [];
var cont1 = document.getElementById("cont_1");
let loading = document.createElement("img");
console.log("cont_1:", cont1);

let url1 = `http://localhost:3000/${categories[0]}`;

getStoryIds(url1);

let new_button = document.getElementById("new_stories");
new_button.addEventListener("click", function () {
  cont1.textContent = "";
  console.log("new_button:", new_button);
  getStoryIds("http://localhost:3000/newstories");
});


let top_button = document.getElementById("top_stories");
top_button.addEventListener("click", function () {
  cont1.textContent = "";
  console.log("top_button:", top_button);
  getStoryIds("http://localhost:3000/topstories");
});


let best_button = document.getElementById("best_stories");
best_button.addEventListener("click", function () {
  cont1.textContent = "";
  console.log("best_button:", best_button);
  getStoryIds("http://localhost:3000/beststories");
});


async function getStoryIds(url) {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("data array", data);
      storiesIds = data;
      console.log(cont1);
      for (let i = 0; i < storiesIds.length; i++) {
        createPost(storiesIds[i], i);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createPost(post, index) {
  // console.log("post:", post);
  var postDiv = document.createElement("div");
  postDiv.setAttribute("class", "post");
  var imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "img_div");
  var content = document.createElement("div");
  content.setAttribute("class", "content");
  var image = document.createElement("img");
  image.setAttribute(
    "src",
    `https://source.unsplash.com/random/200x200?sig=${index}`
  );
  imgDiv.append(image);
  let title = document.createElement("h2");
  title.innerHTML = post.title;
  let creator = document.createElement("i");
  creator.innerHTML = `by ${post.by}`;
  let time = document.createElement("h5");
  let sec = parseInt(post.time, 10); // convert value to number if it's string
  let days = Math.floor(sec / (1000 * 60 * 60 * 24));
  time.innerHTML = days + " days ago";
  let link = document.createElement("a");
  link.setAttribute("href", post.url);
  link.innerHTML = "Read More";
  content.append(title, creator, time, link);
  postDiv.append(imgDiv, content);
  cont1.append(postDiv);
}
