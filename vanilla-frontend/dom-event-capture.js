/*
Event Capturing (The "Trickle Down" Phase)
Direction: The event starts from the root of the document (usually window or document), and travels downwards through the ancestor elements until it reaches the actual target element where the event occurred.

Purpose: This phase allows ancestor elements to "capture" the event before it reaches the target element. It's less commonly used for general event handling but can be useful for specific scenarios like:

Early Interception: If you need to stop an event from reaching its target or other handlers further down the tree.

Debugging: To see events as they descend.

How to Register: To register an event listener for the capturing phase, you pass true as the third argument to addEventListener() or use an options object { capture: true }.
*/


const grandParent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

grandParent.addEventListener('click', function() {
    console.log('Grandparent (Capturing)');
}, true); // Capture phase

parent.addEventListener('click', function() {
    console.log('Parent (Capturing)');
}, { capture: true }); // Capture phase

child.addEventListener('click', function() {
    console.log('Child (Capturing)');
}, true); // Capture phase