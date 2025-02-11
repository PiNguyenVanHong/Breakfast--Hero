const circleFood = document.getElementById("circle-container");
let rateWrapper = document.getElementById("rate-wrapper");
let foodOverviewWrapper = document.getElementById("food-overview-wrapper");
const box = document.getElementById("box");
const radios = document.querySelectorAll('input[type="radio"][name="food"]');
const labels = document.querySelectorAll(".bottom .slide-wrapper label");
const rateBackground = document.querySelector(".rate-count");
const pagination = document.getElementById("pagination");
const boxDetails = document.getElementById("box-details");

let imgCircleFood = circleFood.querySelectorAll(".circle img");

let foodInfo = document.querySelectorAll(".food-info");

const rateCount = rateWrapper.querySelectorAll("p");

let foodOverview = foodOverviewWrapper.querySelectorAll("div");

let foodLike = document.querySelector(".like-button a#likes p");

let iconLike = document.querySelector(".like-button a#likes i");

let itemPagination = pagination.querySelectorAll("li");

const colorRate = [
  { backgroundColor: "#FFA961", color: "#333", likes: 1412 },
  { backgroundColor: "#F9BDCB", color: "#333", likes: 0 },
  { backgroundColor: "#B8C89B", color: "#333", likes: 69 },
  { backgroundColor: "#FDCF56", color: "#333", likes: 0 },
];

let prev = 3;
let current = 0;
const totalRadios = radios.length;

let intervalId;

let isReloading = false;

window.addEventListener("DOMContentLoaded", () => {
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const checkedRadio = document.querySelector(
        'input[type="radio"][name="food"]:checked'
      );
      prev = current;
      current = checkedRadio.dataset.index;

      startSlide(checkedRadio);
    });
  });

  labels.forEach((element) => {
    element.addEventListener("mouseenter", stopInterval);
    element.addEventListener("mouseleave", startInterval);
  });

  boxDetails.addEventListener("mouseenter", stopInterval);
  boxDetails.addEventListener("mouseleave", startInterval);

  box.classList.add("hidden");

  window.onload = () => {
    setTimeout(() => {

    box.classList.remove("hidden");
    box.classList.add("active");
    
    startInterval();
  }, 4000);
};
});

function startInterval() {
  intervalId = setInterval(() => {
    radios.forEach((radio) => (radio.checked = false));
    // prev = radios.length;
    current = (current + 1) % totalRadios;

    radios[current].checked = true;

    startSlide(radios[current]);
  }, 3000);
}

function stopInterval() {
    console.log("Stop");
  clearInterval(intervalId);
}

function startSlide(checkdRadio) {
  if (checkdRadio) {
    circleFood.style.setProperty("--index", current);
    imgCircleFood[current].classList.add("active");

    rateCount.forEach((item, index) => {
      if (item.classList.contains("active")) {
        item.classList.add("hidden");
        prev = index;
        return;
      }
    });

    console.log(prev);

    foodInfo[prev].classList.add("hidden");

    foodOverview[prev].classList.add("hidden");

    if (colorRate[current].likes === 0) {
      if (!foodLike.classList.contains("empty")) {
        foodLike.textContent = "";
        foodLike.classList.add("empty");
        iconLike.classList.remove("ri-thumb-up-fill");
        iconLike.classList.add("ri-thumb-up-line");
      }
    } else {
      if (foodLike.classList.contains("empty")) {
        foodLike.classList.remove("empty");
        iconLike.classList.remove("ri-thumb-up-line");
      }

      if (!iconLike.classList.contains("ri-thumb-up-fill")) {
        iconLike.classList.add("ri-thumb-up-fill");
      }

      foodLike.textContent = colorRate[current].likes + " likes";
    }

    setTimeout(() => {
      setTimeout(() => {
        foodInfo[current].classList.add("active");
      }, 600);

      imgCircleFood[prev].classList.remove("active");

      foodInfo[prev].classList.remove("hidden");
      foodInfo[prev].classList.remove("active");

      rateCount[prev].classList.remove("hidden");
      rateCount[prev].classList.remove("active");

      foodOverview[prev].classList.remove("hidden");
      foodOverview[prev].classList.remove("active");

      rateCount[current].classList.add("active");
      rateBackground.style.setProperty(
        "--background-color",
        colorRate[current].backgroundColor
      );
      rateBackground.style.setProperty("--color", colorRate[current].color);

      foodOverview[current].classList.add("active");

      itemPagination.forEach((item) => {
        item.classList.remove("active");
      });

      itemPagination[current].classList.add("active");
    }, 500);
  }
}

