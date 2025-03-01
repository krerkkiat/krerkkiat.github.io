+++
title = "Taking a screenshot of Canvas' SpeedGrader panel"
date = "2025-02-28"
+++

While I was serving as a teaching assistant back in Fall 2024-2025, the Electrical Engineering and Computer Science (EECS) department underwent a preparation
for an ABET evaluation of its Computer Science (CS) program. Part of the evaluation requires collecting samples of all the
assignments in the course.

A modern browser like Firefox allows a screenshot of the page to be taken easily. It can also handle a page with
long content. However, when the page size fit the screen, but the elements in the page itself has a scroll bar,
Firefox will only take a screenshot of the content that is visible.

This became a problem when we have to take a screenshot of the feedback we gave to the students. Canvas' SpeedGrader
has two panels, the left and right panels. Each of the panels has its own scrollbar, so Firefox will be unable to
take a full page screenshot since to Firefox, the whole page has the same height as the screen.

One solution is to remove one of the panel out of the view and set the remaining panel's `overflow` CSS property
to `visible`. The following bit of JavaScript code is doing just that to remove the left panel from the DOM tree.

```js
// Copy the right panel over to the main section.
var newParent = document.getElementById("full_width_container");
var targetNode = document.getElementsByClassName("right_side_content")[0];
newParent.appendChild(targetNode);

// Deleting unused DOM elements.
document.getElementById("left_side").remove();
document.getElementById("speed_grader_rubric_assessment_tray_wrapper").remove();
document.getElementById("right_side").remove();

// Remove overflow-x: auto
document.getElementById("rightside_inner").style.overflow = "visible";
```

The code also moved the `div.right_side_content` (that sits under `div#right_side`) to be under the `div#full_width_container` since the `div#left_side` and `div#right_side` have their `width` limited.

On some types of the assignment (like quizzes), Canvas will add a print button for the content in the left panel, but the older
style quiz, there is no such button. In this case, we can remove the right panel instead.

```js
document.getElementById("speed_grader_rubric_assessment_tray_wrapper").remove();
document.getElementById("right_side").remove();

var targetNode = document.getElementById("left_side");
targetNode.style.overflow = "visible !important";

// Obtain the height of the iframe's content and set it to the height of the panel.
var iframes = targetNode.getElementsByTagName("iframe");
if (iframes.length !== 0) {
    var iframeDoc = iframes[0].contentDocument || iframes[0].contentWindow.document;
    var height = iframeDoc.body.scrollHeight;
    targetNode.style.height = height + "px";
}
```

The first two lines are the same as before. We remove the elements we do not want. Next we are making sure that the
content will always be visible. The last part is to set the `#left_side` panel to be the same height as the content's height in the iframe.
