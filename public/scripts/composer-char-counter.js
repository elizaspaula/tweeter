$(document).ready(function () {
  $(".new-tweet form textarea").on("input", function () {
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
