// Mouse Cricle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`;
  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`;
};

//End Of Mouse Cricle

// Animated Cricles
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
const animationDistance = 100;
const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${animationDistance}px`;
    });
    mainImg.style.left = `${animationDistance}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${animationDistance}px`;
    });
    mainImg.style.left = `-${animationDistance}px`;
  }
  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${animationDistance}px`;
    });
    mainImg.style.top = `${animationDistance}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${animationDistance}px`;
    });
    mainImg.style.top = `-${animationDistance}px`;
  }
  mX = e.clientX;
  mY = e.clientY;
};
// End of Animated Cricles

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  mouseCircleFn(x, y);
  animateCircles(e, x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});

// Main Button
const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    console.log("hi");
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

// End of Main Button

// About Me Text
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent =
  "I am a designer & I create awards winning websites with the best user experience & I do not talk much, just contact me. :)";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);
  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
  });
});
// End About Me Text

// Projects
const section3 = document.querySelector(".section-3");
const container = document.querySelector(".container");
const projectHideBtn = document.querySelector(".project-hide-btn");
const projects = document.querySelectorAll(".project");

projects.forEach((project, i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // Big Project Image
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);
    const bigImg = document.createElement("img");
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    bigImg.className = "project-img";
    bigImg.setAttribute("src", `${imgPath}-big.jpg`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflow = "hidden";

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";
    };
  });

  // End of Big Project Image
  i >= 6 && (project.style.cssText = "display:none;opacity:0");
});

const projectsBtn = document.querySelector(".projects-btn");
const projectsBtnText = document.querySelector(".projects-btn span");
let showHiddeBool = true;

const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "flex";
    section3.scrollIntoView({ block: "end" });
  }, 600);
  setTimeout(() => {
    project.style.opacity = "1";
  }, i * 200);
};

const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "none";
    section3.scrollIntoView({ block: "start" });
  }, 1200);
  setTimeout(() => {
    project.style.opacity = "0";
  }, i * 100);
};

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");
  showHiddeBool
    ? (projectsBtnText.textContent = "Show Less")
    : (projectsBtnText.textContent = "Show More");

  projects.forEach((project, i) => {
    i >= 6 &&
      (showHiddeBool ? showProjects(project, i) : hideProjects(project, i));
  });

  showHiddeBool = !showHiddeBool;
});
// End of Projects
