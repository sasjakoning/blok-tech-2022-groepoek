// fix for transitions firing on load
window.addEventListener("load", () => {
  document.querySelector("body").classList.remove("preload");
  console.log("removed preload");
});

/****************/
/* like dislike */
/****************/

const actionOverlay = document.querySelector(".actionOverlay");
const actionOverlayImg = actionOverlay.querySelector("img");

const card = document.querySelector(".cardLabel:first-of-type");

const likeForm = document.querySelector(".form-like");
console.log(likeForm);
console.log(card)
console.log("hello");

likeForm.addEventListener("submit", (e) => {
  console.log("submitted");

  e.preventDefault();

  card.classList.add("cardLike");
  actionOverlay.classList.add("actionLiked");
  actionOverlayImg.src = "/images/overlayLike.svg";

  card.addEventListener("animationend", () => {
    likeForm.submit();
  });
});

const dislikeForm = document.querySelector(".form-dislike");

dislikeForm.addEventListener("submit", (e) => {
  console.log("submitted");

  e.preventDefault();

  card.classList.add("cardDislike");
  actionOverlay.classList.add("actionDisliked");
  actionOverlayImg.src = "/images/overlayDislike.svg";

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

// const forms = document.querySelectorAll("form");

// forms.forEach((form) => {
//   form.addEventListener("submit", (e) => {
//     console.log("yes")
//     //prevent the html submit
//     e.preventDefault();
//     //post the form yourself via JavaScript
//     fetch(e.target.action, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     }).then((res) => {
//       console.log("Request complete! response:", res);
//     });
//   });
// });

// forms.forEach((form) => {
//   form.addEventListener("submit", (e) => {
//     console.log("yes")
//     //prevent the html submit
//     e.preventDefault();
//     //post the form yourself via JavaScript
//     fetch(e.target.action, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     }).then((res) => {
//       console.log("Request complete! response:", res);
//     });
//   });
// });
