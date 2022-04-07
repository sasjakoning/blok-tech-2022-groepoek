// const { log } = require("npmlog");

// fix for transitions firing on load
window.addEventListener("load", () => {
  document.querySelector("body").classList.remove("preload");
  console.log("removed preload");
});

const navBar = document.querySelector("nav")

var lastScrollTop = 0;

window.addEventListener("scroll", () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      console.log("scroll down");
      navBar.classList.add("navAnimDown")
      navBar.classList.remove("navAnimUp")
    } else {
      // upscroll code
      console.log("scroll up");
      navBar.classList.add("navAnimUp")
      navBar.classList.remove("navAnimDown")
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  },
  false
);

// scroll credit: https://stackoverflow.com/questions/31223341/detecting-scroll-direction

const sPath = window.location.pathname;
const sPage = sPath.substring(sPath.lastIndexOf("/") + 1);

console.log(sPath.includes("swiping"));

if (sPath.includes("swiping")) {
  console.log("swiping");
  /****************/
  /* like dislike */
  /****************/

  const actionOverlay = document.querySelector(".actionOverlay");
  const actionOverlayImg = actionOverlay.querySelector("img");

  const card = document.querySelector(".cardLabel:first-of-type");

  const likeForm = document.querySelector(".form-like");

  const otherCards = document.querySelectorAll(
    ".cardLabel:not(:first-of-type)"
  );

  likeForm.addEventListener("submit", (e) => {
    console.log("submitted");

    e.preventDefault();

    card.classList.add("cardLike");
    actionOverlay.classList.add("actionLiked");
    actionOverlayImg.src = "/images/overlayLike.svg";

    otherCards.forEach((card) => {
      card.classList.add("cardsMove");
    });

    card.addEventListener("animationend", () => {
      likeForm.submit();
    });
  });

  const dislikeForm = document.querySelector(".form-dislike");

  dislikeForm.addEventListener("submit", (e) => {
    console.log("submitted");

    e.preventDefault();

    card.classList.add("cardDislike");
    actionOverlayImg.src = "/images/overlayDislike.svg";
    actionOverlay.classList.add("actionLiked");

    otherCards.forEach((card) => {
      card.classList.add("cardsMove");
    });

    card.addEventListener("animationend", () => {
      dislikeForm.submit();
    });
  });

  // match popup
  const continueBtn = document.querySelector(".continue");
  const matchBackground = document.querySelector(".matchBackground");
  const matchPopup = document.querySelector(".matchPopup");

  //check if element exists
  if (matchBackground != null) {
    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      matchBackground.remove();
      matchPopup.remove();
    });
  }

  // Voor Slider
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
} else if (sPath.includes("profile")) {
  console.log("profile");

  window.onload = function dragOverAvatarUploadField() {
    const dropZone = document.querySelector(".avatarUploadField");
    const stockFotoInDropZone = document.querySelector(
      ".avatarUploadField img:first-of-type"
    );
    const HuidigeAvatar = document.querySelector(".eigenAvatarfotoGr");
    const uploadFotoOverlay = document.querySelector(".uploadFotoOverlay");
    const profilePageGlobal = document.querySelector(".profilePage");
    const editButton = document.querySelector(
      ".profilePage > img:first-of-type"
    );

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("hover");
      stockFotoInDropZone.classList.add("hidden");
      HuidigeAvatar.classList.add("transparent50");
      uploadFotoOverlay.classList.remove("hidden");
    });

    dropZone.addEventListener("dragleave", (e) => {
      dropZone.classList.remove("hover");
      stockFotoInDropZone.classList.remove("hidden");
      HuidigeAvatar.classList.remove("transparent50");
      uploadFotoOverlay.classList.add("hidden");
    });

    dropZone.addEventListener("dragend", (e) => {
      dropZone.classList.remove("hover");
      stockFotoInDropZone.classList.remove("hidden");
      HuidigeAvatar.classList.remove("transparent50");
      uploadFotoOverlay.classList.add("hidden");
    });
    dropZone.addEventListener("mouseover", (e) => {
      stockFotoInDropZone.classList.add("hidden");
      HuidigeAvatar.classList.add("transparent50");
      uploadFotoOverlay.classList.remove("hidden");
    });
    dropZone.addEventListener("mouseout", (e) => {
      stockFotoInDropZone.classList.remove("hidden");
      HuidigeAvatar.classList.remove("transparent50");
      uploadFotoOverlay.classList.add("hidden");
    });
    editButton.addEventListener("click", (e) => {
      profilePageGlobal.classList.add("editingProfile");
    });
  };
}
