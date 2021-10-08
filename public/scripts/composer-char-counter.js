/**
 * Function to count the number of chars into the text Area
 */
$(document).ready(function () {
  $(".new-tweet form textarea").on("input", function () {
    $(".tweet-button").prop("disabled", false);
    const textArea = this;
    const charCount = 140 - textArea.value.length;
    const counter = $(".counter");
    counter.val(charCount);
    if (charCount < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });
});
