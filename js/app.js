// Glopal variables
let sideBar = document.querySelector(".side-bar");
let searchBar = document.querySelector(".search-bar");
let barIcon = document.querySelector(".bars-icon");
let siteMood = document.querySelector(".side-bar .setting .mood-button");
let mood = {};

// load function
window.onload = function () {
  // resize the window

  // join buttons
  joinButton();
  //mood of site
  if (!localStorage.getItem("siteMood")) {
    localStorage.siteMood = JSON.stringify({ one: "#fff", two: "#000" });
  }
  mood = JSON.parse(localStorage.siteMood);
  moodFunction();
};

let searchIcon = document.querySelector(".web-header .search-icon");
let searchSubmit = document.querySelector(".search-bar .search-form .submit");
let searchInput = document.querySelector(
  ".search-bar .search-form .search-input"
);
document.onclick = (e) => {
  // open and close the side bar
  if (e.target == barIcon) {
    barIcon.classList.toggle("active");
    sideBar.classList.toggle("open-side-bar");
  } else if (
    !e.target.classList.contains("side-bar") &&
    sideBar.classList.contains("open-side-bar")
  ) {
    barIcon.classList.toggle("active");
    sideBar.classList.toggle("open-side-bar");
  }

  // searching
  if (e.target == searchIcon) {
    searchIcon.classList.toggle("active");
    searchBar.classList.toggle("open-search-bar");
    if (searchBar.classList.contains("open-search-bar")) {
      searchInput.focus();
    }
  } else if (e.target == searchSubmit) {
    searchSubmit.parentElement.submit();
  }else if (
    e.target == document.querySelector(".search-bar .search-form") ||
    e.target == searchInput
  ) {
    searchInput.focus();
  } else {
    searchIcon.classList.remove("active");
    searchBar.classList.remove("open-search-bar");
  }
};

//change landing back ground
let landingImage = document.querySelector(".images img");
setInterval(() => {
  let rand = Math.floor(Math.random() * 5 + 1);
  document.querySelector(
    ".landing"
  ).style.backgroundImage = `url("./images/0 (${rand}).jpg")`;
  rand = Math.floor(Math.random() * 4 + 1);
  landingImage.src = `./images/intro cards (${rand}).jpg`;
  landingImage.nextElementSibling.innerHTML = `New Course ${rand}`;
}, 5000);

// queue of iamge
let count = 0;
let cards = Array.from(
  document.querySelector(".image-queue .container .content").children
);
cards.forEach((e) => {
  e.addEventListener("click", () => {
    console.log(e);
  });
});
setInterval(() => {
  if (window.innerWidth > 992) {
    cards[count].classList.toggle("active");
    count++;
    if (count === 3) count = 0;
    cards[count].classList.toggle("active");
  }
}, 3000);

// site Mood
siteMood.addEventListener("click", () => {
  [mood.one, mood.two] = [mood.two, mood.one];
  moodFunction();
});
function moodFunction() {
  siteMood.style.color = mood.one;
  document.documentElement.style.setProperty("--wight-color", mood.one);
  document.documentElement.style.setProperty("--dark-color", mood.two);
  window.localStorage.siteMood = JSON.stringify(mood);
}

// skills animation
let skillsProgress = document.querySelectorAll(
  ".skills .container .skill-box .skill-progress span"
);
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillsProgress.forEach((ele) => {
          ele.style.width = `${ele.dataset.rate}%`;
          let count = 0;
          let progAnimation = setInterval(() => {
            count++;
            ele.setAttribute("data-value", `${count}%`);
            if (count >= ele.getAttribute("data-rate"))
              clearInterval(progAnimation);
          }, 20);
        });
      } else {
        skillsProgress.forEach((ele) => {
          ele.style.width = "0px";
        });
      }
    });
  },
  { root: document.querySelector("root"), rootMargin: "10px", threshold: 0.1 }
);
observer.observe(document.querySelector(".skills .container"));

// Copy rights
let copyRight = document.querySelector("footer .copy-right");
copyRight.innerHTML = `&copy; ${new Date().getFullYear()}, Abdulrahim Alnjjar`;

// hide join buttons
let joinButtons = document.querySelector(".web-header .join-buttons");
window.onresize = joinButton;
function joinButton() {
  if (window.innerWidth <= 992) {
    document.querySelector(".side-bar .setting").before(joinButtons);
  } else {
    document.querySelector(".web-header .container").appendChild(joinButtons);
  }
}

// form data
let formName = document.querySelector(".send-message .s-m-form .name");
formName.oninput = () => {
  /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(formName.value)
    ? (formName.style.cssText = "border: 2px solid green;")
    : (formName.style.cssText = "border: 2px solid red");
};
let formEmail = document.querySelector(".send-message .s-m-form .email");
formEmail.oninput = () => {
  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g.test(formEmail.value)
    ? (formEmail.style.cssText = "border: 2px solid green;")
    : (formEmail.style.cssText = "border: 2px solid red");
};
let formPhone = document.querySelector(".send-message .s-m-form .phone");
formPhone.oninput = () => {
  /^[0-9]+$/g.test(formPhone.value)
    ? (formPhone.style.cssText = "border: 2px solid green;")
    : (formPhone.style.cssText = "border: 2px solid red");
};
