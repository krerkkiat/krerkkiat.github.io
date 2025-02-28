+++
title = "Taking a screenshot of Canvas' SpeedGrader panel"
date = "2025-02-04"
draft = true
+++

While I was serving as a teaching assistant back in Fall 2024-2025, the EECS department undergoes a preparation
for an ABET evaluation of its CS program. Part of the evaluation requires collecting samples of all the
assignments in the course.

A modern browser like Firefox allows a screenshot of the page to be taken easily. It can also handle a page with
long content. However, when the page size fit the screen, but the elements in the page itself has a scroll bar,
Firefox fails will only take a screenshot of the content that is visible.

This became a problem when we have to take a screenshot of the feedback we gave to the students. As you may see
in the image below, the left and right panel of Canvas' SpeedGrader has their own scroll bar. Thus, taking a
screenshot of the individual panel is not possible.

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

Similarly, we can remove the right panel if we only want to take a screenshot of the long content in the left panel
with the code below.

```js
var newParent = document.getElementById("full_width_container");
var targetNode = document.getElementsByClassName("right_side_content")[0];
newParent.appendChild(targetNode);

// TODO
```
