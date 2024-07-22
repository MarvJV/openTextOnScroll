console.log("Hello, world!");

const mainContainer = document.querySelector("#mainContainer");

const textTitle_1 = document.querySelector("#title_1");
const textTitle_2 = document.querySelector("#title_2");
const textTitle_3 = document.querySelector("#title_3");
const textTitle_4 = document.querySelector("#title_4");

const textParagraph_1 = document.querySelector("#textParagraph_1");
const textParagraph_2 = document.querySelector("#textParagraph_2");
const textParagraph_3 = document.querySelector("#textParagraph_3");
const textParagraph_4 = document.querySelector("#textParagraph_4");

function scrollHandler() {}

function mainContainerIsVisibleHandler(entries) {
  entries.forEach((entry) => {
    const isVisible = entry.isIntersecting;
    if (isVisible) {
      window.addEventListener("scroll", scrollHandler);
      console.log("Main Container is visible");
    } else {
      window.removeEventListener("scroll", scrollHandler);
      console.log("Main Container is not visible");
    }
  });
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.25,
};

const observer = new IntersectionObserver(
  mainContainerIsVisibleHandler,
  options
);
observer.observe(mainContainer);
