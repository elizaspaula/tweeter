/**
 * Function renderTweets: this function render the tweets from the database into the tweets container
 * @param {*} tweets tweets for render
 */
const renderTweets = function (tweets) {
  $("#tweets-container").empty();
  for (let tweet of tweets) {
    $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  }
};
/**
 *Function escape: this function convert the data to text.
 * @param {*} str
 * @returns
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
/**
 * Function createTweetElement: this function create a new HTML article for the tweet and add it to the tweets-container.
 * @param {*} tweetData
 * @returns
 */
const createTweetElement = function (tweetData) {
  TweeTime = timeago.format(tweetData.created_at); //method to display the time passed since a tweet was created.

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
/**
 *Function loadTweets: this function will use jQuery to make a request to /tweets and receive the array of tweets as JSON
 */
const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
    .then((data) => {
      const sorted = data.sort((a, b) => b.created_at - a.created_at); //sort the tweet by descending order
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
      //valid if the textArea has more than 140 chars.
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
        textArea.val(""); //clean textArea after post a new tweet
        const counter = $(".counter");
        counter.val(140); //reload counter to 140 after post a new tweet.
        $(".alert").slideUp(); //remove the alert from the page.
      })
      .catch((error) => {
        console.log("error:", error);
      });
  });
  loadTweets();
  $(".alert").hide();
});
