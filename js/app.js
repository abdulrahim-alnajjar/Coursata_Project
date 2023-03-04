// Glopal variables
let sideBar = document.querySelector(".side-bar");
let searchBar = document.querySelector(".search-bar");
let barIcon = document.querySelector(".bars-icon");
let siteMood = document.querySelector(".side-bar .setting .mood-button");
let mood = {};

// load function
window.onload = function () {
  //mood of site
  if (!localStorage.getItem("siteMood")) {
    localStorage.siteMood = JSON.stringify({ one: "#e6e6e6", two: "#000" });
  }
  mood = JSON.parse(localStorage.siteMood);
  moodFunction();
  // pen side bar
  if (!localStorage.getItem("sideBar")) {
    localStorage.sideBar = "false";
  }
  if (localStorage.sideBar === "true") {
    openSideBar();
  }
};

// open and close the side bar
barIcon.addEventListener("click", () => {
  openSideBar();
  if (sideBar.classList.contains("open-side-bar")) {
    localStorage.sideBar = "true";
  } else {
    localStorage.sideBar = "false";
  }
});
function openSideBar() {
  barIcon.classList.toggle("active");
  sideBar.classList.toggle("open-side-bar");
}

//change landing back ground
setInterval(() => {
  let rand = Math.floor(Math.random() * 5 + 1);
  document.querySelector(
    ".landing"
  ).style.backgroundImage = `url("./images/0 (${rand}).jpg")`;
  rand = Math.floor(Math.random() * 3 + 1);
  document.querySelector(
    ".images img"
  ).src = `./images/intro cards (${rand}).jpg`;
}, 10000);

// searching
document
  .querySelector(".web-header .search-icon")
  .addEventListener("click", (e) => {
    e.target.classList.toggle("active");
    searchBar.classList.toggle("open-search-bar");
    if (searchBar.classList.contains("open-search-bar")) {
      document.querySelector(".search-bar .search-form .search-input").focus();
    }
  });
document
  .querySelector(".search-bar .search-form .submit")
  .addEventListener("click", (e) => {
    e.target.parentElement.submit();
  });
document
  .querySelector(".search-bar .search-form .close-search-bar")
  .addEventListener("click", () => {
    searchBar.classList.toggle("open-search-bar");
    document
      .querySelector(".web-header .search-icon")
      .classList.toggle("active");
  });

console.log(searchBar.children);
window.addEventListener("click", (ele) => {
  console.log(ele.target);
  if (ele.target != searchBar.firstChild) {
    console.log("0");
  }
});

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
