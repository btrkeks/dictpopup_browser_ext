// content.js
function getJapaneseTextFromPosition(element, x, y) {
  const range = document.caretRangeFromPoint(x, y);
  if (!range) return null;

  let startNode = range.startContainer;
  let startOffset = range.startOffset;

  if (startNode.nodeType === Node.TEXT_NODE) {
    startOffset = Array.from(startNode.parentNode.childNodes).indexOf(startNode) + startOffset;
    startNode = startNode.parentNode;
  }

  let text = startNode.textContent.slice(startOffset);
  const match = text.match(/^[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]{1,20}/);
  
  return match ? match[0] : null;
}

let debounceTimer;
let currentShiftListener = null;

function debounce(func, delay) {
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

function removeCurrentShiftListener() {
  if (currentShiftListener) {
    document.removeEventListener('keydown', currentShiftListener);
    currentShiftListener = null;
  }
}

const handleMouseMove = debounce(function(event) {
  removeCurrentShiftListener();

  const japaneseText = getJapaneseTextFromPosition(event.target, event.clientX, event.clientY);
  
  if (japaneseText) {
    console.log('Hovering over Japanese text:', japaneseText);
    
    currentShiftListener = function(e) {
      if (e.key === 'Shift') {
        console.log('Shift pressed, sending message with text:', japaneseText);
        chrome.runtime.sendMessage({action: "showDefinition", text: japaneseText}, function(response) {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
          } else if (response.error) {
            console.error("Error from background script:", response.error);
          } else {
            console.log("Message sent successfully, response:", response);
            // Handle the successful response here (e.g., display the definition)
          }
        });
        removeCurrentShiftListener();
      }
    };

    document.addEventListener('keydown', currentShiftListener);
  }
}, 10);  // 10ms debounce time

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseout', removeCurrentShiftListener);
