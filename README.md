Carousel
========

A javascript for a responsive website carousel.

Written by Aaron Pinero, designer/developer

Why?
====

There are a million scripts out there for creating a carousel on we website. Why write another one?

* I want a carousel that is truly responsive.
* I want a carousel that doesn't come with it's own styles. I want to create my own.
* I want a carousel to handle more than just images.
* I want a carousel that will work with my HTML's class and id attributes.
* I want a carousel that uses a simple, easy to understand JavaScript.

If you want the same things, then you might find this script useful.


How It Works
============

The script contains a constructor function for a Carousel. The function accepts three arguments:

* the selector for the carousel container
* the selector for the carousel item list
* the selector assigned to each item

The container serves as the carousel window, showing one part of the carousel ribbon at a time. The container is an HTML element with the display style "block" and overflow style "hidden".

The ribbon (or item list) contains the sequence of items in the carousel. The item list is an HTML element with display style "block" and white space style "nowrap".

Each item in the item list is an HTML element with a display style "inline-block". There can be no white space in the HTML code between the items in the item list, or else the carousel will not advance properly from one item (or set of items) to the next.

The percentage width of each item determines how many items are visible in the carousel at one time:

* 100% = one item visible at a time
* 50% = two items visible at a time
* 33% = three items visible at a time
* and so on

The script generates an unordered HTML list, appended to the container element. The first list item is the previous button. The last list item is the next button. In between are 'dots' indicating how many steps (sets of 1 or more items) are in the ribbon. The script assigns event handlers to each list item step back, step forward, or skip to a specific step as appropriate.

A few styles are applied to the carousel (via classes when the carousel is created) to create the bare minimum of carousel behavior. The rest of the styles are up to you.