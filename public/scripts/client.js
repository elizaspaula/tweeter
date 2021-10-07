/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  //clear the container before to read all tweets
  $("#tweets-container").empty();
  // // loops through tweets
  for (let tweet of tweets) {
    // // calls createTweetElement for each tweet
    $tweet = createTweetElement(tweet);

    // // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet);
  }
};
//Function to convert the input in the textArea to a text.
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
    `<p>${escape(tweetData.content.text)}</p>` +
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
      $("#tweet-text").focus();
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

    $(".alert").empty();

    if (textArea.val().length > 140) {
      $(".alert").append(
        "Your message is too long. Please respect our limit of 140 chars."
      );
      $(".alert").slideDown();
      $(".tweet-button").prop("disabled", true);
      $("#tweet-text").focus();
      return;
    }
    if (textArea.val().length === 0) {
      $(".alert").append("The tweet can't be blank.");
      $(".alert").slideDown();
      $(".tweet-button").prop("disabled", true);
      $("#tweet-text").focus();
      return;
    }

    $.ajax({
      data: textValue,
      method: "POST",
      url: "/tweets",
    })
      .then((result) => {
        console.log("result", result);
        loadTweets(); //load the new tweet
        textArea.val(""); //clean text box after post
        const counter = $(".counter");
        counter.val(140); //reload counter to 140 after post
        $(".alert").slideUp();
      })
      .catch((error) => {
        console.log("error:", error);
      });
  });
  loadTweets();
  $(".alert").hide();
});
