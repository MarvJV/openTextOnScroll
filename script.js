const mainContainer = document.querySelector("#mainContainer");
const textContainers = document.querySelectorAll(".textContainer");
const titles = document.querySelectorAll(".textTitle");
const paragraphs = document.querySelectorAll(".textParagraph");

let isMainContainerVisible = false;
let defaultFocusedIndex = 0;

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
      textContainers[index].classList.add("showParagraph");
    } else {
      paragraph.classList.remove("showParagraphText");
      textContainers[index].classList.remove("showParagraph");
    }
  });
}

function clearFocus() {
  titles.forEach((title) => {
    title.classList.remove("fokusParagraphTitle");
  });
  paragraphs.forEach((paragraph) => {
    paragraph.classList.remove("showParagraphText");
  });
  textContainers.forEach((container) => {
    container.classList.remove("showParagraph");
  });
}

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
    textContainers[focusedIndex].classList.add("showParagraph");
  }
}

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
