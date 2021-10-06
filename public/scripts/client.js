/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (tweets) {
  // // loops through tweets
  for (let i in tweets) {
    // // calls createTweetElement for each tweet
    $tweet = createTweetElement(tweets[i]);

    // // takes return value and appends it to the tweets container
    console.log("tweet:", $tweet);
    $("#tweets-container").prepend($tweet);
  }
};

const createTweetElement = function (tweetData) {
  TweeTime = timeago.format(tweetData.created_at);

  let $tweet =
    `<article class="tweet">` +
    `<header>` +
    `<div class="name">` +
    `<img src="${tweetData.user.avatars}">` +
    `<div>${tweetData.user.name}</div>` +
    `</div>` +
    `<div>${tweetData.user.handle}</div>` +
    `</header>` +
    `<p>${tweetData.content.text}</p>` +
    `<footer>` +
    `<div class="time"> ${TweeTime} </div>` +
    `<div class="icons">` +
    `<i class="fas fa-flag"> </i>` +
    `<i class="fas fa-retweet"></i>` +
    `<i class="fas fa-heart"></i>` +
    `</div>` +
    `</footer>` +
    `</article>`;

  return $tweet;
};

renderTweets(data);

// $(document).ready(function () {
//   $("form").on("submit", function (event) {
//     event.preventDefault();
//     //console.log("The default event result has been prevent");

//     $.ajax({
//       data: data,
//       method: "GET",
//     })
//       .then((result) => {
//         console.log("ajax callback called");
//         console.log("result", result);
//       })
//       .catch((error) => {
//         console.log("error:", error);
//       });
//   });
// });
