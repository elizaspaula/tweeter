/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  $("#tweets-container").empty();
  // // loops through tweets
  for (let tweet of tweets) {
    // // calls createTweetElement for each tweet
    $tweet = createTweetElement(tweet);

    // // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet);
  }
};

const createTweetElement = function (tweetData) {
  TweeTime = timeago.format(tweetData.created_at);

  const $tweet =
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

const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
    .then((data) => {
      const sorted = data.sort((a, b) => b.created_at - a.created_at);
      renderTweets(sorted);
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

$(document).ready(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    const textValue = $("form").serialize();

    const textArea = $(".new-tweet form textarea");

    if (textArea.val().length > 140) {
      alert("Your message is too long");
      return;
    }
    if (textArea.val().length === 0) {
      alert("The message can't be blank");
      return;
    }

    $.ajax({
      data: textValue,
      method: "POST",
      url: "/tweets",
    })
      .then((result) => {
        console.log("result", result);
        loadTweets();
        textArea.val("");
        const counter = $(".counter");
        counter.val(140);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  });
  loadTweets();
});
