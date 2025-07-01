// Event Bubbling (The "Bubble Up" Phase)
// Direction: After the event reaches the actual target element, it then starts traveling upwards from the target element, through its parent, grandparent, and all other ancestors, all the way back to the window or document root.

// Purpose: This is the default and most commonly used phase for event handling. It's intuitive because events "bubble up" from where they originated. It's particularly useful for:

// Event Delegation: Attaching a single event listener to a common ancestor to handle events for multiple descendant elements. This is very efficient for dynamic lists or large tables.

// General Event Handling: Most standard UI interactions are handled during this phase.

// How to Register: By default, addEventListener() registers listeners for the bubbling phase. You can omit the third argument, or explicitly pass false, or use an options object { capture: false } (or { bubble: true }).

const grandParent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

child.addEventListener('click', function() {
    console.log('Child (Bubbling)');
}); // Bubbling phase (default)

parent.addEventListener('click', function() {
    console.log('Parent (Bubbling)');
}, false); // Bubbling phase (explicitly false)

grandParent.addEventListener('click', function() {
    console.log('Grandparent (Bubbling)');
}); // Bubbling phase (default)