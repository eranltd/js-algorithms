//access to dom elements
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');
const rectanglesTableBody = document.querySelector('#rectanglesTable tbody');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const fontSizeInput = document.getElementById('fontSizeInput');

const img = new Image();
// IMPORTANT: Make sure this path is correct relative to your HTML file!
img.src = './Sample_Floorplan.jpeg'; 

let rectangles = [];
let currentInput = null;

// --- Core State Variables for Interactions ---
let currentAction = 'none'; // 'none', 'drawing', 'moving', 'resizing'
let startMouseX, startMouseY; // Mouse coordinates when action started

let selectedRectangle = null; // The rectangle currently being manipulated (moved or resized)
let dragOffsetX, dragOffsetY; // For 'moving': offset from mouse to rect top-left
let resizingHandle = null; // For 'resizing': e.g., 'nw', 'n', 'se'
let initialRectState = null; // For 'resizing': original x,y,w,h of selectedRectangle when resize started

// --- History Variables ---
let history = [];
let historyPointer = -1;
const HISTORY_LIMIT = 50;

const STORAGE_KEY = 'canvasRectanglesData';
const FONT_SIZE_STORAGE_KEY = 'currentFontSize';

let currentGlobalFontSize = parseInt(localStorage.getItem(FONT_SIZE_STORAGE_KEY)) || 16; //font-size
fontSizeInput.value = currentGlobalFontSize;

const HANDLE_SIZE = 8; // Size of the square resize handles

// --- Helper Functions ---

/**
 * Checks if a point (mouseX, mouseY) is inside a given rectangle.
 */
function isPointInRectangle(mouseX, mouseY, rect) {
    return mouseX >= rect.x &&
           mouseX <= rect.x + rect.width &&
           mouseY >= rect.y &&
           mouseY <= rect.y + rect.height;
}

/**
 * Calculates coordinates for all 8 resize handles of a given rectangle.
 * Returns an object mapping handle names to their {x, y} coordinates.
 */
function getHandleCoordinates(rect) {
    const hs = HANDLE_SIZE / 2; // Half handle size for centering
    const handles = {};

    handles['nw'] = { x: rect.x - hs, y: rect.y - hs };
    handles['n'] = { x: rect.x + rect.width / 2 - hs, y: rect.y - hs };
    handles['ne'] = { x: rect.x + rect.width - hs, y: rect.y - hs };
    handles['e'] = { x: rect.x + rect.width - hs, y: rect.y + rect.height / 2 - hs };
    handles['se'] = { x: rect.x + rect.width - hs, y: rect.y + rect.height - hs };
    handles['s'] = { x: rect.x + rect.width / 2 - hs, y: rect.y + rect.height - hs };
    handles['sw'] = { x: rect.x - hs, y: rect.y + rect.height - hs };
    handles['w'] = { x: rect.x - hs, y: rect.y + rect.height / 2 - hs };

    return handles;
}

/**
 * Checks if a mouse point is over any handle of a given rectangle.
 * Returns the handle name ('nw', 'n', etc.) if found, otherwise null.
 */
function getHandleAtPoint(mouseX, mouseY, rect) {
    if (!rect) return null;
    const handles = getHandleCoordinates(rect);
    for (const handleName in handles) {
        const handle = handles[handleName];
        // Check if mouse is within the handle's square bounds
        if (mouseX >= handle.x && mouseX <= handle.x + HANDLE_SIZE &&
            mouseY >= handle.y && mouseY <= handle.y + HANDLE_SIZE) {
            return handleName;
        }
    }
    return null;
}

/**
 * Updates the canvas cursor based on the current interaction context.
 */
function updateCursor(mouseX, mouseY) {
    if (currentAction === 'drawing') {
        canvasContainer.className = 'cursor-crosshair';
    } else if (currentAction === 'moving') {
        canvasContainer.className = 'cursor-grabbing';
    } else if (currentAction === 'resizing') {
         // Cursor is set dynamically during mousemove when resizingHandle is known
    } else { // currentAction === 'none'
        let foundHandle = false;
        let foundRectangle = false;

        // Check for handle hover on the selected rectangle only (if one is already selected)
        if (selectedRectangle) {
            const handleName = getHandleAtPoint(mouseX, mouseY, selectedRectangle);
            if (handleName) {
                setResizeCursor(handleName);
                foundHandle = true;
            }
        }

        if (!foundHandle) {
            // Check for general rectangle hover for moving
            for (let i = rectangles.length - 1; i >= 0; i--) {
                if (isPointInRectangle(mouseX, mouseY, rectangles[i])) {
                    canvasContainer.className = 'cursor-grab';
                    foundRectangle = true;
                    break;
                }
            }
        }

        if (!foundHandle && !foundRectangle) {
            canvasContainer.className = 'cursor-crosshair';
        }
    }
}

/**
 * Sets the appropriate resize cursor based on the handle name.
 */
function setResizeCursor(handleName) {
    switch (handleName) {
        case 'nw': case 'se':
            canvasContainer.className = 'cursor-nwse-resize';
            break;
        case 'ne': case 'sw':
            canvasContainer.className = 'cursor-nesw-resize';
            break;
        case 'n': case 's':
            canvasContainer.className = 'cursor-ns-resize';
            break;
        case 'e': case 'w':
            canvasContainer.className = 'cursor-ew-resize';
            break;
        default:
            canvasContainer.className = 'cursor-crosshair';
    }
}


// --- Data & History Management ---

function loadRectanglesFromStorage() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            rectangles = JSON.parse(storedData);
        } else {
            rectangles = [];
        }
        history = [];
        historyPointer = -1;
        pushToHistory();
    } catch (e) {
        console.error("Error loading data from localStorage:", e);
        localStorage.removeItem(STORAGE_KEY);
        rectangles = [];
        history = [];
        historyPointer = -1;
        pushToHistory();
    }
}

function saveRectanglesToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rectangles));
    } catch (e) {
        console.error("Error saving data to localStorage:", e);
    }
}

function saveCurrentGlobalFontSizeToStorage() {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, currentGlobalFontSize.toString());
}

function pushToHistory() {
    // Trim history if we are not at the latest state
    if (historyPointer < history.length - 1) {
        history.splice(historyPointer + 1);
    }
    history.push(JSON.parse(JSON.stringify(rectangles))); // Deep copy
    if (history.length > HISTORY_LIMIT) {
        history.shift(); // Remove oldest
    } else {
        historyPointer++;
    }
    updateUndoRedoButtons();
    saveRectanglesToStorage();
}

function undo() {
    if (historyPointer > 0) {
        historyPointer--;
        rectangles = JSON.parse(JSON.stringify(history[historyPointer]));
        // Deselect rectangle when undoing, as its state might change
        selectedRectangle = null; 
        redrawCanvas();
        updateRectanglesTable();
        saveRectanglesToStorage();
    }
    updateUndoRedoButtons();
}

function redo() {
    if (historyPointer < history.length - 1) {
        historyPointer++;
        rectangles = JSON.parse(JSON.stringify(history[historyPointer]));
        // Deselect rectangle when redoing, as its state might change
        selectedRectangle = null;
        redrawCanvas();
        updateRectanglesTable();
        saveRectanglesToStorage();
    }
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    undoBtn.disabled = historyPointer <= 0;
    redoBtn.disabled = historyPointer >= history.length - 1;
}

// --- Canvas Drawing ---

function redrawCanvas() {
    // Clear the canvas and redraw the background image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    redrawRectanglesAndLabels();
}

/**
 * Draws all rectangles, their labels, dimensions, and resize handles for the selected one.
 */
function redrawRectanglesAndLabels() {
    rectangles.forEach(rect => {
        ctx.strokeStyle = rect.color;
        ctx.lineWidth = rect.lineWidth;
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

        // Draw the Label (Title) above the rectangle
        if (rect.text) {
            ctx.fillStyle = 'black';
            ctx.font = `${currentGlobalFontSize * 0.8}px Inter`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            const labelX = rect.x + rect.width / 2; //in the middle of the rectangle frame
            const labelY = rect.y - 5; //above the rectangle
            ctx.fillText(rect.text, labelX, labelY);
        }

        // Draw the Dimensions (Width x Height) inside the rectangle
        ctx.fillStyle = 'black';
        ctx.font = `${currentGlobalFontSize}px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const dimensionsText = `${Math.round(rect.width)}x${Math.round(rect.height)}`; //100x100 and not 101.2x102.2
        ctx.fillText(dimensionsText, centerX, centerY);

        // --- Draw Handles for the Selected Rectangle ---
        if (rect === selectedRectangle) {
            const handles = getHandleCoordinates(rect);
            ctx.fillStyle = 'blue'; // Handle color
            ctx.strokeStyle = 'white'; // Handle border
            ctx.lineWidth = 1;

            for (const handleName in handles) {
                const h = handles[handleName];
                ctx.fillRect(h.x, h.y, HANDLE_SIZE, HANDLE_SIZE);
                ctx.strokeRect(h.x, h.y, HANDLE_SIZE, HANDLE_SIZE);
            }
        }
    });
}

// --- Table Management ---

function updateRectanglesTable() {
    rectanglesTableBody.innerHTML = '';

    if (rectangles.length === 0) {
        const noDataRow = document.createElement('tr');
        const noDataCell = document.createElement('td');
        noDataCell.colSpan = 6;
        noDataCell.textContent = 'No rectangles drawn yet.';
        noDataCell.style.textAlign = 'center';
        noDataCell.style.padding = '20px';
        noDataCell.style.color = '#666';
        noDataRow.appendChild(noDataCell);
        rectanglesTableBody.appendChild(noDataRow);
        return;
    }

    rectangles.forEach((rect, index) => {
        const row = document.createElement('tr');

        const labelCell = document.createElement('td');
        labelCell.textContent = rect.text || '(No Label)';
        row.appendChild(labelCell);

        const xCell = document.createElement('td');
        xCell.textContent = Math.round(rect.x);
        row.appendChild(xCell);

        const yCell = document.createElement('td');
        yCell.textContent = Math.round(rect.y);
        row.appendChild(yCell);

        const widthCell = document.createElement('td');
        widthCell.textContent = Math.round(rect.width);
        row.appendChild(widthCell);

        const heightCell = document.createElement('td');
        heightCell.textContent = Math.round(rect.height);
        row.appendChild(heightCell);

        const actionsCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.dataset.index = index;
        removeButton.addEventListener('click', handleRemoveRectangle);
        actionsCell.appendChild(removeButton);
        row.appendChild(actionsCell);

        rectanglesTableBody.appendChild(row);
    });
}

// --- Interaction Handlers ---

function handleRemoveRectangle(event) {
    if (currentInput) {
        currentInput.remove();
        currentInput = null;
    }
    selectedRectangle = null; // Deselect any rectangle

    const indexToRemove = parseInt(event.target.dataset.index, 10);

    if (indexToRemove >= 0 && indexToRemove < rectangles.length) {
        rectangles.splice(indexToRemove, 1);
        pushToHistory();
        redrawCanvas();
        updateRectanglesTable();
    }
}

function createTextInputForRectangle(rectObject) {
    if (currentInput) {
        currentInput.remove();
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'rectangle-input';
    input.placeholder = 'Enter label...';
    input.value = rectObject.text || '';

    const inputWidth = 120;
    const inputHeight = 30;

    input.style.left = `${rectObject.x + (rectObject.width / 2) - (inputWidth / 2)}px`;
    input.style.top = `${rectObject.y + (rectObject.height / 2) - (inputHeight / 2)}px`;
    input.style.width = `${inputWidth}px`;
    input.style.height = `${inputHeight}px`;

    canvasContainer.appendChild(input);
    input.focus();
    currentInput = input;

    input.select();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const originalText = rectObject.text;
            rectObject.text = input.value.trim();

            input.remove();
            currentInput = null;

            if (originalText !== rectObject.text) {
                pushToHistory();
            }
            redrawCanvas();
            updateRectanglesTable();
        }
    });

    input.addEventListener('blur', () => {
        if (currentInput === input) {
            const originalText = rectObject.text;
            rectObject.text = input.value.trim();

            if (originalText === '' && rectObject.text === '') {
                const index = rectangles.indexOf(rectObject);
                if (index > -1) {
                    rectangles.splice(index, 1);
                    pushToHistory();
                }
            } else if (originalText !== rectObject.text) {
                pushToHistory();
            }

            input.remove();
            currentInput = null;
            redrawCanvas();
            updateRectanglesTable();
        }
    });
}

// --- Main Event Listeners ---

undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);

fontSizeInput.addEventListener('change', (e) => {
    let newSize = parseInt(e.target.value, 10);
    if (isNaN(newSize) || newSize < 8) {
        newSize = 8;
    } else if (newSize > 48) {
        newSize = 48;
    }
    currentGlobalFontSize = newSize; //update global font size, will be used later to redraw rectangles
    e.target.value = newSize;
    saveCurrentGlobalFontSizeToStorage();
    redrawCanvas();
});

canvas.addEventListener('mousedown', (e) => {
    // Dismiss any active input field
    if (currentInput) {
        currentInput.remove();
        currentInput = null;
    }

    // Get mouse coordinates relative to the canvas
    const mouseX = e.clientX - canvas.getBoundingClientRect().left; 
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    startMouseX = mouseX; // Store for calculating deltas during drag
    startMouseY = mouseY;

    // 1. Check if clicking on a resize handle of the currently selected rectangle
    if (selectedRectangle) { // Only check handles on the already selected rectangle
        const handleName = getHandleAtPoint(mouseX, mouseY, selectedRectangle);
        if (handleName) {
            currentAction = 'resizing';
            resizingHandle = handleName;
            // Store initial state for accurate resizing calculations
            initialRectState = { ...selectedRectangle }; // Create a shallow copy
            setResizeCursor(handleName); // Set specific resize cursor
            return;
        }
    }
    
    // 2. Check if clicking on an existing rectangle to select/move it
    // Iterate in reverse to select the topmost rectangle visually
    for (let i = rectangles.length - 1; i >= 0; i--) {
        const rect = rectangles[i];
        if (isPointInRectangle(mouseX, mouseY, rect)) {
            if (selectedRectangle !== rect) { // If clicking a different rectangle
                selectedRectangle = rect; // Select it
                redrawCanvas(); // Redraw to show handles on new selection
            }
            currentAction = 'moving';
            dragOffsetX = mouseX - rect.x;
            dragOffsetY = mouseY - rect.y;
            canvasContainer.className = 'cursor-grabbing'; // Indicate active drag
            return;
        }
    }

    // 3. If no handle or existing rectangle clicked, start drawing a new one
    currentAction = 'drawing';
    selectedRectangle = null; // Deselect any existing rectangle
    redrawCanvas(); // Clear handles from previous selection if any
    canvasContainer.className = 'cursor-crosshair'; // Ensure drawing cursor
});

canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    // Calculate delta from start of drag
    const deltaX = mouseX - startMouseX;
    const deltaY = mouseY - startMouseY;

    if (currentAction === 'resizing' && selectedRectangle && initialRectState) {
        // Resize logic based on which handle is active
        const rect = selectedRectangle; // Reference to the actual rectangle object

        let newX = initialRectState.x;
        let newY = initialRectState.y;
        let newWidth = initialRectState.width;
        let newHeight = initialRectState.height;

        switch (resizingHandle) {
            case 'nw':
                newX = initialRectState.x + deltaX;
                newY = initialRectState.y + deltaY;
                newWidth = initialRectState.width - deltaX;
                newHeight = initialRectState.height - deltaY;
                break;
            case 'n':
                newY = initialRectState.y + deltaY;
                newHeight = initialRectState.height - deltaY;
                break;
            case 'ne':
                newY = initialRectState.y + deltaY;
                newWidth = initialRectState.width + deltaX;
                newHeight = initialRectState.height - deltaY;
                break;
            case 'e':
                newWidth = initialRectState.width + deltaX;
                break;
            case 'se':
                newWidth = initialRectState.width + deltaX;
                newHeight = initialRectState.height + deltaY;
                break;
            case 's':
                newHeight = initialRectState.height + deltaY;
                break;
            case 'sw':
                newX = initialRectState.x + deltaX;
                newWidth = initialRectState.width - deltaX;
                newHeight = initialRectState.height + deltaY;
                break;
            case 'w':
                newX = initialRectState.x + deltaX;
                newWidth = initialRectState.width - deltaX;
                break;
        }

        // Handle potential flipping (width/height becoming negative)
        if (newWidth < 0) {
            rect.x = newX + newWidth; // Adjust x to the new left edge
            rect.width = -newWidth;   // Make width positive
        } else {
            rect.x = newX;
            rect.width = newWidth;
        }

        if (newHeight < 0) {
            rect.y = newY + newHeight; // Adjust y to the new top edge
            rect.height = -newHeight;   // Make height positive
        } else {
            rect.y = newY;
            rect.height = newHeight;
        }

        redrawCanvas();
        return;
    }

    if (currentAction === 'moving' && selectedRectangle) {
        selectedRectangle.x = mouseX - dragOffsetX;
        selectedRectangle.y = mouseY - dragOffsetY;
        redrawCanvas();
        return;
    }

    if (currentAction === 'drawing') {
        redrawCanvas();

        const x = Math.min(startMouseX, mouseX);
        const y = Math.min(startMouseY, mouseY);
        const width = Math.abs(startMouseX - mouseX);
        const height = Math.abs(startMouseY - mouseY);

        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = 'blue';
        ctx.font = `${currentGlobalFontSize}px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const tempDimensionsText = `${Math.round(width)}x${Math.round(height)}`;
        ctx.fillText(tempDimensionsText, x + width / 2, y + height / 2);
    } else {
        // If no action is active, update cursor based on hover
        updateCursor(mouseX, mouseY);
    }
});

canvas.addEventListener('mouseup', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    if (currentAction === 'resizing' && selectedRectangle) {
        // Ensure min size after resize
        selectedRectangle.width = Math.max(selectedRectangle.width, 10); // Minimum width
        selectedRectangle.height = Math.max(selectedRectangle.height, 10); // Minimum height

        // Clamp to canvas bounds after resize
        selectedRectangle.x = Math.max(0, Math.min(canvas.width - selectedRectangle.width, selectedRectangle.x));
        selectedRectangle.y = Math.max(0, Math.min(canvas.height - selectedRectangle.height, selectedRectangle.y));

        pushToHistory(); // Record the resize action
        redrawCanvas();
        updateRectanglesTable();
    } else if (currentAction === 'moving' && selectedRectangle) {
        // Clamp to canvas bounds after move
        selectedRectangle.x = Math.max(0, Math.min(canvas.width - selectedRectangle.width, selectedRectangle.x));
        selectedRectangle.y = Math.max(0, Math.min(canvas.height - selectedRectangle.height, selectedRectangle.y));

        pushToHistory(); // Record the move action
        redrawCanvas();
        updateRectanglesTable();
    } else if (currentAction === 'drawing') {
        const x = Math.min(startMouseX, mouseX);
        const y = Math.min(startMouseY, mouseY);
        const width = Math.abs(startMouseX - mouseX);
        const height = Math.abs(startMouseY - mouseY);

        const MIN_SIZE = 10; // Increased min size for drawing
        if (width < MIN_SIZE || height < MIN_SIZE) {
            selectedRectangle = null; // Deselect and don't add
            redrawCanvas();
            currentAction = 'none';
            updateCursor(mouseX, mouseY); // Update cursor after clearing
            return;
        }

        const newRect = {
            x: x,
            y: y,
            width: width,
            height: height,
            color: 'red',
            lineWidth: 2,
            text: '',
            fontSize: currentGlobalFontSize 
        };

        rectangles.push(newRect);
        selectedRectangle = newRect; // Select the newly drawn rectangle
        pushToHistory();
        redrawCanvas();
        updateRectanglesTable();

        createTextInputForRectangle(newRect);
    }

    // Reset state variables after any action
    currentAction = 'none';
    resizingHandle = null;
    initialRectState = null;
    updateCursor(mouseX, mouseY); // Set cursor back to hover state
});


// --- Initialization on page load ---
img.onload = function() {
    loadRectanglesFromStorage();
    redrawCanvas();
    updateRectanglesTable();
    updateUndoRedoButtons();
    fontSizeInput.value = currentGlobalFontSize;
};

// If the image is already cached, onload might not fire.
// This ensures the initial load and table update happens even if the image loads instantly.
if (img.complete) {
    img.onload();
}