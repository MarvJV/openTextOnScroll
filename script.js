console.log("Hello, world!");

const mainContainer = document.querySelector("#mainContainer");
const textContainers = document.querySelectorAll(".textContainer");
const titles = document.querySelectorAll(".textTitle");
const paragraphs = document.querySelectorAll(".textParagraph");

function scrollHandler() {
  const scrollPosition =
    window.pageYOffset / (document.body.offsetHeight - window.innerHeight);

  let focusedIndex = -1;

  textContainers.forEach((container, index) => {
    const containerPosition = container.offsetTop / document.body.offsetHeight;

    if (
      scrollPosition >= containerPosition - 0.1 &&
      scrollPosition <= containerPosition + 0.1
    ) {
      focusedIndex = index;
    }
  });

  titles.forEach((title, index) => {
    if (index === focusedIndex) {
      title.classList.add("fokusParagraphTitle");
    } else {
      title.classList.remove("fokusParagraphTitle");
    }
  });

  paragraphs.forEach((paragraph, index) => {
    if (index === focusedIndex) {
      paragraph.classList.add("showParagraphText");
    } else {
      paragraph.classList.remove("showParagraphText");
    }
  });
}

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
  threshold: 0.8,
};

const observer = new IntersectionObserver(
  mainContainerIsVisibleHandler,
  options
);
observer.observe(mainContainer);
