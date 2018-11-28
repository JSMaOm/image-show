/* here we wanna know which images is clicked
so I have to detect the image from the DOM using eventListener for clicking
after that I have to know the coordinated of the selected image using .getBoundingClientRect()
retreiving the 'left and top' then use them animate the orginal image back to the select image's place
MODAL 
*/

let items = document.querySelectorAll(".item"),
  preview = document.querySelector(".preview"),
  previewImage = document.querySelector(".preview_image"),
  closeButton = document.querySelector(".close_button");

// for each item we wanna attach eventListener for clicked images
Array.from(items).forEach(item => {
  showTheModal(item);
});

TweenMax.set(preview, {
  autoAlpha: 0
});

TweenMax.set(".overlay", {
  autoAlpha: 0
});

// show the Image
function showTheModal(selectedItem) {
  let selectedImage,
    restImages,
    originalImage,
    originalImageSrc = selectedItem.querySelector("a");
  selectedItem.addEventListener("click", e => {
    e.preventDefault();
    selectedImage =
      e.target.tagName === "IMG"
        ? e.target
        : selectedItem.querySelector(".img_thumb");

    console.log(selectedImage);
    restImages = Array.from(items).filter(item => item !== selectedItem);
    originalImage = setOriginalImg(originalImageSrc, selectedImage);
    openImg(originalImage, selectedImage, restImages);
    closeButton.addEventListener("click", () => {
      closeImg(originalImage, selectedImage, restImages);
    });
  });
}

function setOriginalImg(originalImageSrc, selectedImage) {
  let originalImage = document.querySelector(".original_image");
  originalImage.setAttribute("src", originalImageSrc.getAttribute("href"));
  // set the orginal image style before animating
  TweenMax.set(originalImage, {
    left: selectedImage.getBoundingClientRect().left,
    top: selectedImage.getBoundingClientRect().top,
    width: selectedImage.offsetWidth,
    height: selectedImage.offsetHeight,
    autoAlpha: 0
  });

  return originalImage;
}

function openImg(originalImage, selectedImage, restImages) {
  // show the preview when clicking any photo
  TweenMax.to(preview, 0.5, {
    autoAlpha: 1
  });

  // show the original photo
  TweenMax.to(originalImage, 1, {
    autoAlpha: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  });

  // hide the clicked image
  TweenMax.to(selectedImage, 1, {
    autoAlpha: 0
  });
  // hide the rest images except the clicked one
  TweenMax.to(restImages, 1, {
    scale: 0.1
  });
  // show the overlay layer after showing the orginal photo
  TweenMax.to(".overlay", 1, {
    autoAlpha: 1,
    delay: 0.5
  });
}

// hide the image

function closeImg(originalImage, selectedImage, restImages) {
  TweenMax.to(".overlay", 1, {
    autoAlpha: 0
  });

  // show the original photo
  TweenMax.to(originalImage, 1, {
    left: selectedImage.getBoundingClientRect().left,
    top: selectedImage.getBoundingClientRect().top,
    width: selectedImage.offsetWidth,
    height: selectedImage.offsetHeight
  });

  // hide the clicked image
  TweenMax.to(selectedImage, 1, {
    autoAlpha: 1,
    delay: 0.5
  });
  // hide the rest images except the clicked one
  TweenMax.to(restImages, 1, {
    scale: 1
  });

  TweenMax.to(originalImage, 0.2, {
    autoAlpha: 0,
    delay: 1
  });

  TweenMax.to(preview, 1, {
    autoAlpha: 0
  });
}
