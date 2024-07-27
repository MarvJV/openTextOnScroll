const mainContainer = document.querySelector("#mainContainer");
const textContainers = document.querySelectorAll(".textContainer");
const titles = document.querySelectorAll(".textTitle");
const paragraphs = document.querySelectorAll(".textParagraph");

let isMainContainerVisible = false;
let defaultFocusedIndex = 0;

/**
 * Function to set default focus based on the scroll position of the window.
 * Adds or removes focus classes to titles and paragraphs based on their index.
 */
function setDefaultFocus() {
  const scrollTop = window.scrollY;
  const scrollBottom = scrollTop + window.innerHeight;
  const documentHeight = document.body.offsetHeight;

  if (scrollTop === 0) {
    defaultFocusedIndex = 0;
  } else if (scrollBottom >= documentHeight) {
    defaultFocusedIndex = textContainers.length - 1;
  } else {
    return;
  }

  titles.forEach((title, index) => {
    if (index === defaultFocusedIndex) {
      title.classList.add("fokusParagraphTitle");
    } else {
      title.classList.remove("fokusParagraphTitle");
    }
  });

  paragraphs.forEach((paragraph, index) => {
    if (index === defaultFocusedIndex) {
      paragraph.classList.add("showParagraphText");
    } else {
      paragraph.classList.remove("showParagraphText");
    }
  });
}

/**
 * Function to clear focus classes from all titles and paragraphs.
 * Ensures that no titles or paragraphs have the focus classes applied.
 */
function clearFocus() {
  titles.forEach((title) => {
    title.classList.remove("fokusParagraphTitle");
  });
  paragraphs.forEach((paragraph) => {
    paragraph.classList.remove("showParagraphText");
  });
}

/**
 * Function to handle scroll events and determine the focused text container.
 * Calculates the midpoint of the viewport and determines which container is in focus.
 * Adds or removes focus classes based on the container in view.
 */
function scrollHandler() {
  const viewportHeight = window.innerHeight;
  const midViewport = window.scrollY + viewportHeight / 2;

  let focusedIndex = -1;

  textContainers.forEach((container, index) => {
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const containerBottom = containerTop + container.offsetHeight;

    if (midViewport >= containerTop && midViewport <= containerBottom) {
      focusedIndex = index;
    }
  });

  if (focusedIndex !== -1) {
    clearFocus();
    titles[focusedIndex].classList.add("fokusParagraphTitle");
    paragraphs[focusedIndex].classList.add("showParagraphText");
  }
}

/**
 * Function to handle visibility changes of the main container using Intersection Observer.
 * Adds or removes scroll event listeners based on the visibility of the main container.
 * When the main container is visible, it adds the scroll event listener and handles the scroll event.
 * When the main container is not visible, it removes the scroll event listener.
 */
function mainContainerIsVisibleHandler(entries) {
  entries.forEach((entry) => {
    isMainContainerVisible = entry.isIntersecting;
    if (isMainContainerVisible) {
      window.addEventListener("scroll", scrollHandler);
      scrollHandler();
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
  threshold: 0.5,
};
const observer = new IntersectionObserver(
  mainContainerIsVisibleHandler,
  options
);
observer.observe(mainContainer);

window.addEventListener("load", () => {
  setDefaultFocus();
});

window.addEventListener("scroll", () => {
  if (!isMainContainerVisible) {
    setDefaultFocus();
  }
});
