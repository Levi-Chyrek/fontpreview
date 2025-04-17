









document.getElementById('print').addEventListener('click', function () {
  window.print();
});

document.getElementById('sidetoggle').addEventListener('click', toggleside);
function toggleside() {
  var topbar = document.getElementById("topbar");
  var previewText = document.getElementById("previewText");

  if (topbar.classList.contains('close')) {
    topbar.classList.remove('close');
  } else {
    topbar.classList.add('close');
  }

  // if (previewText.classList.contains('fullscreen')) {
  //   previewText.classList.remove('fullscreen');
  // } else {
  //   previewText.classList.add('fullscreen');
  // }
}


// zooming 

document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey === true || event.metaKey === true) &&
      (event.key === '+' || event.key === '-' || event.key === '0' || event.key === '=')) {
      event.preventDefault();
      
  }
});

// Disable zooming using mouse wheel (Ctrl + mouse wheel)
document.addEventListener('wheel', function(event) {
  if (event.ctrlKey === true || event.metaKey === true) {
      event.preventDefault();
  }
}, { passive: false });



// document.getElementById('removeNikkudBtn').addEventListener('click',  function () {
//   const previewTextElement = document.getElementById('previewText');
//   const nikkudPattern = /[\u05B0-\u05B1\u05B2\u05B3\u05B4\u05B5\u05B6\u05B7\u05B8\u05B9\u05BA\u05BB\u05BC\u05BD\u05BF\u05C1\u05C2\u05C3\u05C4\u05C5\u05C7\u0591\u0592\u0593\u0594\u0595\u0596\u0597\u0598\u0599\u059A\u059B\u059C\u059D\u059E\u059F\u05A0\u05A1\u05A2\u05A3\u05A4\u05A5\u05A6\u05A7\u05A8\u05A9\u05AA\u05AB\u05AC\u05AD\u05AE\u05AF]/g;
  
//   if (previewTextElement) {
//     const previewText = previewTextElement.textContent || '';
//     const convertedText = previewText.replace(nikkudPattern, '');
//     previewTextElement.textContent = convertedText; // Update text content
//   }
// });

// document.getElementById('removeTaamBtn').addEventListener('click', function () {
//   const previewTextElement = document.getElementById('previewText');
//   const taamPattern = /[\u05BC-\u05BD\u05BF\u05C1\u05C2\u05C3\u05C4\u05C5\u05C7\u0591\u0592\u0593\u0594\u0595\u0596\u0597\u0598\u0599\u059A\u059B\u059C\u059D\u059E\u059F\u05A0\u05A1\u05A2\u05A3\u05A4\u05A5\u05A6\u05A7\u05A8\u05A9\u05AA\u05AB\u05AC\u05AD\u05AE\u05AF]/g;
  
//   if (previewTextElement) {
//     const previewText = previewTextElement.textContent || '';
//     const convertedText = previewText.replace(taamPattern, '');
//     previewTextElement.textContent = convertedText; // Update text content
//   }
// });

document.getElementById('removeNikkudBtn').addEventListener('click', removeNikkud);
function removeNikkud() {
  const previewTextElement = document.getElementById('previewText');
  const nikkudPattern = /[\u05B0-\u05B1\u05B2\u05B3\u05B4\u05B5\u05B6\u05B7\u05B8\u05B9\u05BA\u05BB\u05BC\u05BD\u05BF\u05C1\u05C2\u05C3\u05C4\u05C5\u05C7\u0591\u0592\u0593\u0594\u0595\u0596\u0597\u0598\u0599\u059A\u059B\u059C\u059D\u059E\u059F\u05A0\u05A1\u05A2\u05A3\u05A4\u05A5\u05A6\u05A7\u05A8\u05A9\u05AA\u05AB\u05AC\u05AD\u05AE\u05AF]/g; // Consolidated nikkud range
  updateURLParams("n");

  if (previewTextElement) {
    // Target all <p> tags inside previewText
    const allPTags = previewTextElement.querySelectorAll('p');
    allPTags.forEach((p) => {
      const text = p.textContent || '';
      p.textContent = text.replace(nikkudPattern, '');
    });
  }
};
document.getElementById('removeTaamBtn').addEventListener('click', removeTaam);

function removeTaam() {
  const previewTextElement = document.getElementById('previewText');
  const taamPattern = /[\u05BD-\u05BF\u05C1\u05C2\u05C3\u05C4\u05C5\u05C7\u0591\u0592\u0593\u0594\u0595\u0596\u0597\u0598\u0599\u059A\u059B\u059C\u059D\u059E\u059F\u05A0\u05A1\u05A2\u05A3\u05A4\u05A5\u05A6\u05A7\u05A8\u05A9\u05AA\u05AB\u05AC\u05AD\u05AE\u05AF]/g; // Consolidated taam range
  updateURLParams("t");

  if (previewTextElement) {
    // Target all <p> tags inside previewText
    const allPTags = previewTextElement.querySelectorAll('p');
    allPTags.forEach((p) => {
      const text = p.textContent || '';
      p.textContent = text.replace(taamPattern, '');
    });
  }
};




// Function to handle font upload
function handleFontUpload(event) {
  const file = event.target.files[0]; // Get the first selected file
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    const fontFamily = 'uploaded-font';

    // Dynamically load the font using @font-face
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fileUrl}');
      }
    `;
    document.head.appendChild(styleElement);

    // Apply the font to the preview text
    const previewTextElement = document.getElementById('previewText');
    if (previewTextElement) {
      previewTextElement.style.fontFamily = fontFamily;
    }

    // Display the font name
    const fontNameElement = document.getElementById('fontname');
    if (fontNameElement) {
      fontNameElement.textContent = `Font Name: ${file.name}`;
    }

    // Configure the download button
    const loadFontButton = document.getElementById('loadFontButton');
    if (loadFontButton) {
      loadFontButton.onclick = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = file.name;
        link.click();
      };
    }
  }
}

// Attach event listeners to file inputs
document.getElementById('fileInputMain').addEventListener('change', (event) => {
  if (event.target.files.length > 0) {
    handleFontUpload(event);
  }
});

document.getElementById('fileInputPopup').addEventListener('change', (event) => {
  if (event.target.files.length > 0) {
    handleFontUpload(event);
  }
});



  
  // Function to change text alignment
  function changeTextAlignment(alignment, alignmentLast) {
    document.getElementById('previewText').style.textAlign = alignment;
    document.getElementById('previewText').style.textAlignLast = alignmentLast;

  }
  
  
 const previewText = document.getElementById('previewText');
 const fontSizeSlider = document.getElementById('fontSizeSlider');
 const fontSizeValue = document.getElementById('fontSizeValue');
 const fontWeightSlider = document.getElementById('fontWeightSlider');
 const fontWeightValue = document.getElementById('fontWeightValue');

 // Load font size from localStorage on page load
 const savedFontSize = localStorage.getItem('fontSize') || 80;
 previewText.style.fontSize = savedFontSize + 'px';
 fontSizeSlider.value = savedFontSize;
 fontSizeValue.textContent = savedFontSize;

 // Update font size based on slider input
 fontSizeSlider.addEventListener('input', function () {
   const fontSize = this.value;
   previewText.style.fontSize = fontSize + 'px';
   fontSizeValue.textContent = fontSize;
   localStorage.setItem('fontSize', fontSize);
 });

 // Update font size based on slider input
 fontWeightSlider.addEventListener('input', function () {
  const fontWeight = this.value;
  previewText.style.fontWeight = fontWeight + 'px';
  fontWeightValue.textContent = fontWeight;
});

   // Function to adjust font size
   function adjustFontSize(change) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const selectedRange = selection.getRangeAt(0);
    const selectedNode = selectedRange.startContainer;

    // Find the closest <p> containing the selected text
    const paragraph = selectedNode.nodeType === Node.ELEMENT_NODE
      ? selectedNode
      : selectedNode.parentElement.closest('p');

    if (paragraph) {
      // Get the current font size and adjust it
      const currentFontSize = parseFloat(window.getComputedStyle(paragraph).fontSize);
      const newFontSize = Math.max(10, currentFontSize + change); // Minimum font size of 10px
      paragraph.style.fontSize = `${newFontSize}px`;
    }
  }

  // Add zoom in/out functionality
  window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === '=' || event.key === '-')) {
      event.preventDefault();
      adjustFontSize(event.key === '=' ? 5 : -5);
    } else if (event.ctrlKey && (event.key === '+' || event.key === '-')) {
      event.preventDefault();
      adjustFontSize(event.key === '+' ? 5 : -5);
    }
  });

 window.addEventListener('wheel', function (event) {
   if (event.ctrlKey) {
     event.preventDefault();
     adjustFontSize(event.deltaY < 0 ? 5 : -5);
   }
 });

  


 function adjustFontSize(change) {
   // Get current font size from previewText
   let currentFontSize = parseInt(window.getComputedStyle(previewText).fontSize, 10);
   const newFontSize = Math.max(10, Math.min(currentFontSize + change, 1000)); // Clamp between 10 and 100
   previewText.style.fontSize = newFontSize + 'px';
   fontSizeValue.textContent = newFontSize;
   fontSizeSlider.value = newFontSize; // Update slider
   localStorage.setItem('fontSize', newFontSize); // Save to localStorage
 }

  
  // Function to update line spacing
  function updateLineSpacing(event) {
    const lineSpacing = event.target.value;
    document.getElementById('previewText').style.lineHeight = lineSpacing;
    document.getElementById('lineSpacingValue').textContent = lineSpacing;
  }


   // Add zoom in/out functionality
   window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === ']' || event.key === '[')) {
      event.preventDefault();
      adjustFontWeight(event.key === ']' ? 5 : -5);
    }
  });


  // Function to update font-variation-settings (wght)
  function updateFontWeight(event) {
    const fontWeight = event.target.value;
    document.getElementById('previewText').style.fontVariationSettings = `"wght" ${fontWeight}`;
    document.getElementById('fontWeightValue').textContent = fontWeight;

    const newFontWeight = Math.max(10, Math.min(fontWeight + change, 1000)); // Clamp between 10 and 100
    previewText.style.fontWeight = newFontWeight + 'px';
    fontWeightValue.textContent = newFontWeight;
    fontWeightSlider.value = newFontWeight; // Update slider
  }


// Function to update optical size (opsz)
function updateOpticalSize(event) {
  const opticalSize = event.target.value;
  const previewText = document.getElementById('previewText');
  
  // Preserve existing font-variation-settings values while updating opsz
  const existingSettings = previewText.style.fontVariationSettings || '';
  let newSettings = existingSettings.replace(/"opsz" \d+/, '').trim();
  if (newSettings) newSettings += ', ';
  newSettings += `"opsz" ${opticalSize}`;
  
  previewText.style.fontVariationSettings = newSettings;
  document.getElementById('opticalSizeValue').textContent = opticalSize;
}

  
  // Function to update font width
  function updateFontWidth(event) {
    const fontWidth = event.target.value;
    document.getElementById('previewText').style.fontStretch = fontWidth + '%';
    document.getElementById('fontWidthValue').textContent = fontWidth;
  }
  
  // Attach event listeners to font controls
  document.getElementById('lineSpacingSlider').addEventListener('input', updateLineSpacing);
  document.getElementById('fontWeightSlider').addEventListener('input', updateFontWeight);
  document.getElementById('fontWidthSlider').addEventListener('input', updateFontWidth);
  document.getElementById('opticalSizeSlider').addEventListener('input', updateOpticalSize); // New Optical Size Slider

  
  // Attach event listeners for text alignment buttons
  document.getElementById('alignLeftButton').addEventListener('click', () => changeTextAlignment('left', 'left'));
  document.getElementById('alignCenterButton').addEventListener('click', () => changeTextAlignment('center', 'center'));
  document.getElementById('alignRightButton').addEventListener('click', () => changeTextAlignment('right', 'right'));
  document.getElementById('alignJustifyButton').addEventListener('click', () => changeTextAlignment('justify', 'center'));
  document.getElementById('alignJustifyRightButton').addEventListener('click', () => changeTextAlignment('justify', 'right'));
  document.getElementById('alignJustifyFullButton').addEventListener('click', () => changeTextAlignment('justify', 'justify'));


  
  // Event listeners for color and background color pickers
  const colorPicker = document.querySelector('.color-picker');
  const bgcolorPicker = document.querySelector('.bgcolor-picker');
  
  colorPicker.addEventListener('input', (e) => {
    // document.querySelector('.text-editor').style.color = e.target.value;
    const curstyle = document.querySelector('.text-editor').getAttribute('style', '');
    const curbodystyle = document.querySelector('body').getAttribute('style', '');

        // document.querySelector('.text-editor').style = curstyle + '--editor-cl:' + e.target.value + ';';
        document.querySelector('body').style = curbodystyle + '--editor-cl:' + e.target.value + ';';

  });
 
// // Function to change text color
// function changeTextColor(event) {
//     document.getElementById('previewText').style.textContent = '--editor-cl:' + event.target.value;
//   }
  
//   // Function to change background color
//   function changeBackgroundColor(event) {
//     document.getElementById('previewText').style.backgroundColor = event.target.value;
//   }

  
  bgcolorPicker.addEventListener('input', (e) => {
    document.querySelector('.text-editor').style.background = e.target.value;
    const curbodystyle = document.querySelector('body').getAttribute('style', '');

        // document.querySelector('.text-editor').style = curstyle + '--editor-bg:' + e.target.value + ';';
        document.querySelector('body').style = curbodystyle + '--editor-bg:' + e.target.value + ';';
  });
  
  // Check if a character is supported by the current font
function isCharacterSupported(char) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = window.getComputedStyle(document.getElementById('previewText')).font;
  context.fillText(char, 0, 0);
  const data = context.getImageData(0, 0, 1, 1).data;
  return data[3] !== 0;  // If the alpha value is 0, the character is not rendered (not supported).
}

// Function to remove unsupported Nikkud and Taam characters from the text
function removeUnsupportedMarks(text) {
  const nikkudPattern = /[\u0591-\u05C7]/g; // Unicode range for Nikkud and Taam
  const unsupportedChars = text.split('').filter(char => !isCharacterSupported(char) && nikkudPattern.test(char));
  
  // Remove unsupported characters
  return text.split('').filter(char => !unsupportedChars.includes(char)).join('');
}

// Apply the changes dynamically
function applyFontAndRemoveUnsupportedMarks() {
  const previewTextElement = document.getElementById('previewText');
  const textContent = previewTextElement.textContent;

  // Get the font being applied
  const currentFont = window.getComputedStyle(previewTextElement).fontFamily;

  // Check if the current font supports Nikkud and Taam
  const sanitizedText = removeUnsupportedMarks(textContent);

  // Apply the sanitized text
  previewTextElement.textContent = sanitizedText;
}

// Call this function after setting the font or updating font settings
function updateFontPreview() {
  // Your existing font update code here
  // Example: document.getElementById('previewText').style.fontFamily = 'your-new-font';

  // Now sanitize the text based on the current font
  applyFontAndRemoveUnsupportedMarks();
}

// // Your existing functions below (no changes needed to these functions)

// Check the query parameter and call the appropriate function

function loadMarkStatusFromURL() {
  const params = new URLSearchParams(window.location.search);
  const msValue = params.get("mstate");

  if (msValue === "t") {
    removeTaam();
  } else if (msValue === "n") {
    removeNikkud();
  } else {
    console.log("No matching 'remove' parameter value found.");
  }
}

// Function to update the URL with a new query parameter
function updateURLParams(value) {
  const currentParams = new URLSearchParams(window.location.search);
  
  // Add or update the ms parameter
  currentParams.set("mstate", value);

  // Update the browser's URL without reloading the page
  history.pushState(null, null, "?" + currentParams.toString());
}


  
  // Function to load font from URL query string and fetch font metadata
  function loadFontFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const fontSource = urlParams.get('source');
    
    if (fontSource) {
      const fontFamily = 'current-font';
  
      // Directly fetch the font without using localStorage
      fetchFontData(fontSource, fontFamily);
  
      // Set a generic font name for the display (custom solution)
      const fontName = getFontNameFromURL(fontSource);
      document.getElementById('fontname').textContent = fontName;
  
      // Set the download button action to download the font
      document.getElementById('loadFontButton').onclick = () => {
        downloadFont(fontSource);
      };
    }
  }

  
  
  // Function to get the font name from the URL (you can customize this)
  function getFontNameFromURL(url) {
    const fileName = url.split('/').pop();
    const fontName = fileName.replace(/\.woff2|\.woff|\.otf|\.ttf/gi, '').replace(/%20/g, ' ');
    return fontName || "Unknown Font";
  }
  
  // Function to fetch font data and convert it to Base64
  function fetchFontData(url, fontFamily) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch font: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(buffer => {
        const base64 = arrayBufferToBase64(buffer);
        applyFont(base64, fontFamily, url);
      })
      .catch(error => {
        console.error('Error fetching font:', error);
        applyFallbackFont(fontFamily, url);
      });
  }
  
  // Function to apply the font using Base64 data URL
  function applyFont(base64Data, fontFamily, fontSource) {
    const fontDataUrl = `data:font/woff2;base64,${base64Data}`;
  
    // Dynamically create and apply @font-face
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fontDataUrl}');
      }
    `;
    
    document.head.appendChild(styleElement);
  
    // Apply the font-family to the text editor
    document.querySelector('.text-editor').style.fontFamily = fontFamily;
  }

  
  
  // Function to apply fallback font-face using the direct URL
  function applyFallbackFont(fontFamily, fontSource) {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fontSource}');
      }
    `;
    document.head.appendChild(styleElement);
  
    // Apply the font-family to the text editor
    document.querySelector('.text-editor').style.fontFamily = fontFamily;
  }
  
  // Function to download the font file
  function downloadFont(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  }
  
  
  // Function to convert ArrayBuffer to Base64
  function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode.apply(null, new Uint8Array(buffer));
    return window.btoa(binary);
  }
  
// Use a single window.onload to execute both functions
window.onload = function () {
  loadFontFromURL();
  loadMarkStatusFromURL();
};

  const uploadPopup = document.getElementById('upload-popup');
const labelFileUpload = document.getElementById('label-file-upload');
const fileInput = document.getElementById('fileInputPopup');

// Show the popup when dragging a file over the container
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (uploadPopup.classList.contains('hidden')) {
    uploadPopup.classList.remove('hidden');
  }
});

// // Hide the popup when the drag leaves the container
// document.addEventListener('dragleave', (e) => {
//   e.preventDefault();
//   if (!uploadPopup.contains(e.relatedTarget)) {
//     uploadPopup.classList.add('hidden');
//   }
// });

// Handle file drop
labelFileUpload.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadPopup.classList.add('hidden');
  const file = e.dataTransfer.files[0];
  if (file) {
    handleFontUpload({ target: { files: [file] } });
  }
});

// Prevent showing popup when dragging over other parts of the page (optional)
document.addEventListener('mouseenter' && 'dragenter', (e) => {
  if (e.target !== labelFileUpload) {
    uploadPopup.classList.remove('hidden');
  }
});

// Function to handle font upload (same as before)
function handleFontUpload(event) {
  const file = event.target.files[0]; // Get the first selected file
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    const fontFamily = 'uploaded-font';

    // Dynamically load the font using @font-face
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fileUrl}');
      }
    `;
    document.head.appendChild(styleElement);

    // Apply the font to the preview text
    const previewTextElement = document.getElementById('previewText');
    if (previewTextElement) {
      previewTextElement.style.fontFamily = fontFamily;
    }

    // Display the font name
    const fontNameElement = document.getElementById('fontname');
    if (fontNameElement) {
      fontNameElement.textContent = `Font Name: ${file.name}`;
    }

    // Configure the download button
    const loadFontButton = document.getElementById('loadFontButton');
    if (loadFontButton) {
      loadFontButton.onclick = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = file.name;
        link.click();
      };
    }

    // Hide the popup after the file is uploaded
    uploadPopup.classList.add('hidden');
  }
}

// Attach event listeners to file inputs
fileInput.addEventListener('change', (event) => {
  if (event.target.files.length > 0) {
    handleFontUpload(event);
  }
});


  // labelFileUpload.addEventListener('drop', (e) => {
  //   e.preventDefault();
  //   labelFileUpload.classList.remove('drag-active');
  //   inputFile.files = e.dataTransfer.files;
  //   console.log(inputFile.files); // Optional: Log the uploaded files
  //   uploadPopup.classList.add('hidden');
  // });

  // Handle file selection via the side input
  // sideUploadButton.addEventListener('change', (e) => {
  //   console.log(e.target.files); // Optional: Log the uploaded files
  // });


  
 (function(ch) {
  const btn = document.querySelector("#sidetoggle");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "light") {
      document.body.classList.add("light");
  }

  btn.addEventListener("click", function () {
      document.body.classList.toggle("light");

      let theme = "dark";
      if (document.body.classList.contains("light")) {
          theme = "light";
      }
      localStorage.setItem("theme", theme);
  });
})();

    