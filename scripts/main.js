  
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var Direct_Buttons='[data-image-role="button"]';
var ESC_KEY = 27;







function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}


function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}


function DirectionalButtons() {
    "use strict";
    var CurrentImage;
    var CurrentTitle;
    var GetCurrentTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    var Buttons = document.querySelectorAll(Direct_Buttons);
    var ButtonsArray = [].slice.call(Buttons);
    var PrevButton = ButtonsArray[0];
    var NextButton = ButtonsArray[1];
    var ThumbArray = getThumbnailsArray();
    var length=ThumbArray.length
      PrevButton.addEventListener("click", function(event) {
      event.preventDefault();
      for (var i = 0; i < length; i++) {
        if (ThumbArray[i].getAttribute("data-image-title") == GetCurrentTitle.textContent) {
          if (i == 0) {
            CurrentImage = imageFromThumb(ThumbArray[length]-1);
            CurrentImage = titleFromThumb(ThumbArray[length]-1);
            setDetails(CurrentImage, CurrentTitle);
            break;
          } else if (i != 0) {
            CurrentImage = imageFromThumb(ThumbArray[i - 1]);
            CurrentTitle = titleFromThumb(ThumbArray[i - 1]);
            setDetails(CurrentImage, CurrentTitle);
          }
        }
      }
  
    });
    NextButton.addEventListener("click", function(event) {
      event.preventDefault();
      for (var i = 0; i < length; i++) {
        if (ThumbArray[i].getAttribute("data-image-title") == GetCurrentTitle.textContent) {
          if (i == ThumbArray.length - 1) {
            CurrentImage = imageFromThumb(ThumbArray[0]);
            CurrentTitle = titleFromThumb(ThumbArray[0]);
            setDetails(CurrentImage, CurrentTitle);
          } else {
            CurrentImage = imageFromThumb(ThumbArray[i + 1]);
            CurrentTitle = titleFromThumb(ThumbArray[i + 1]);
            setDetails(CurrentImage, CurrentTitle);
            break;
          }
        }
      }
    });
  }

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    DirectionalButtons();
}

  

initializeEvents();