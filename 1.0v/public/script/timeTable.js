"use strict";
let locale;
let count = 0;

const labelChangeLocale = document.querySelector(".changeTo");
const btnChangeLocale = document.querySelector(".changeLocale");
const timetableEng = document.querySelector(".timetable-wrapper__eng");
const timetableTh = document.querySelector(".timetable-wrapper__thai");
const localeList = ["en-GB", "th-TH"];

// timetableEng.classList.toggle("hidden");

const switchLanguage = function () {
  locale = localeList[count];
  count++;
  if (count === localeList.length) count = 0;

  switch (locale) {
    case "en-GB":
      timetableTh.style.opacity = 0;
      setTimeout(function () {
        timetableEng.classList.remove("hidden");
        timetableTh.classList.add("hidden");
        labelChangeLocale.textContent = "TH";
        document.getElementById("searchIn").placeholder = "Search Subjects";
      }, 550);
      setTimeout(function () {
        timetableEng.style.opacity = 100;
      }, 560);

      return;
    case "th-TH":
      timetableEng.style.opacity = 0;
      setTimeout(function () {
        timetableEng.classList.add("hidden");
        timetableTh.classList.remove("hidden");
        labelChangeLocale.textContent = "EN";
        document.getElementById("searchIn").placeholder = "ค้นหาวิชาที่นี้";
      }, 550);
      setTimeout(function () {
        timetableTh.style.opacity = 100;
      }, 560);
      return;
  }
};
switchLanguage();
const updateStats = function () {
  var formatDay = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  document
    .querySelectorAll("#date")
    .forEach(cur => (cur.innerHTML = formatDay));

  function clock() {
    var date = new Date();
    var formatTime = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
    document.getElementById("clock").innerHTML = formatTime;
  }

  setInterval(function () {
    clock();
  }, 1e3);
  var date = new Date();
  console.log(locale);
};

updateStats();

btnChangeLocale.addEventListener("click", function (e) {
  e.preventDefault();
  switchLanguage();
  console.log(locale, count);
  updateStats();
});

const colorSchemeToggle = document.getElementById("color-scheme-toggle");

window.matchMedia("(prefers-color-scheme: dark)").matches
  ? (document.documentElement.className = "dark")
  : (document.documentElement.className = "light");

colorSchemeToggle.addEventListener("click", function (e) {
  if (document.documentElement.className.includes("dark")) {
    document.documentElement.className = "light";
    colorSchemeToggle.innerHTML =
      "<box-icon name='sun' color=\"var(--c-sec)\"></box-icon>";
  } else {
    document.documentElement.className = "dark";
    colorSchemeToggle.innerHTML =
      "<box-icon name='moon' color=\"var(--c-sec)\"></box-icon>";
  }
});

const txtSearch = document.getElementById("searchIn");
const iPeriod = document.querySelectorAll(".i-period");
const iDPeriod = document.querySelectorAll(".i-double-period");

iPeriod.forEach(cur => cur.classList.add("classes"));
iDPeriod.forEach(cur => cur.classList.add("classes"));

const classes = document.querySelectorAll(".classes");
const className = [];

console.log("\\n");

console.log("=== Ended", className);

classes.forEach(function (cur) {
  className.push(
    cur.textContent
      .toLowerCase()
      .split("")
      .filter(cur => {
        if (cur != " ") {
          return cur;
        }
      })
      .join("")
  );
});

txtSearch.addEventListener("keyup", function (e) {
  e.preventDefault();
  const searchValue = txtSearch.value.toLowerCase().split(" ").join("");
  console.log(searchValue);

  console.log("classes : ", classes);
  if (e.key == "Enter") {
    console.log("Enter");
    txtSearch.value = "";
    txtSearch.blur();
  }
  className.forEach(function (cur, i) {
    if (!cur.includes(searchValue)) {
      console.log(classes[i]);
      classes[i].style.opacity = "0";
    } else {
      classes[i].style.opacity = "100";
    }
  });
});
//////////////////

const thaitxtSearch = document.getElementById("searchIn");
const thaiiPeriod = document.querySelectorAll(".ti-period");
const thaiiDPeriod = document.querySelectorAll(".ti-double-period");

thaiiPeriod.forEach(cur => cur.classList.add("tclasses"));
thaiiDPeriod.forEach(cur => cur.classList.add("tclasses"));

const thaiclasses = document.querySelectorAll(".tclasses");
const thaiclassName = [];

console.log("\\n");

console.log("=== Ended", className);

thaiclasses.forEach(function (cur) {
  thaiclassName.push(
    cur.textContent
      .toLowerCase()
      .split("")
      .filter(cur => {
        if (cur != " ") {
          return cur;
        }
      })
      .join("")
  );
});

thaitxtSearch.addEventListener("keyup", function (e) {
  e.preventDefault();
  const searchValue = thaitxtSearch.value.toLowerCase().split(" ").join("");
  console.log(searchValue);

  if (e.key == "Enter") {
    console.log("Enter");
    txtSearch.value = "";
    txtSearch.blur();
  }
  thaiclassName.forEach(function (cur, i) {
    if (!cur.includes(searchValue)) {
      thaiclasses[i].style.opacity = "0";
      console.log("gone");
    } else {
      thaiclasses[i].style.opacity = "100";
      console.log("come");
    }
  });
});

///////////

const days = document.querySelectorAll(".i");
const overlay = document.querySelector(".overlay");
const day = [];
days.forEach(cur => day.push(cur.textContent.toLowerCase()));

days.forEach((cur, i) => {
  console.log(day[i]);
  cur.addEventListener("mouseenter", function (e) {
    const daynum = i;
    document.querySelectorAll(`.${day[daynum]}`).forEach(function (cur) {
      cur.style.zIndex = "10";
      overlay.style.zIndex = "5";

      overlay.style.opacity = "100";
    });
  });
  cur.addEventListener("mouseout", function (e) {
    const daynum = i;
    document.querySelectorAll(`.${day[daynum]}`).forEach(function (cur) {
      cur.style.zIndex = "1";
      overlay.style.zIndex = "-1";
      overlay.style.opacity = "0";
    });
  });
});
console.log(days);
console.log(day);

const thaidays = document.querySelectorAll(".ti");

const thaiday = [];
thaidays.forEach(cur => thaiday.push(cur.textContent.toLowerCase()));

thaidays.forEach((cur, i) => {
  console.log(day[i]);
  cur.addEventListener("mouseenter", function (e) {
    const daynum = i;
    document.querySelectorAll(`.${day[daynum]}`).forEach(function (cur) {
      cur.style.zIndex = "10";
      overlay.style.zIndex = "5";

      overlay.style.opacity = "100";
    });
  });
  cur.addEventListener("mouseout", function (e) {
    const daynum = i;
    document.querySelectorAll(`.${day[daynum]}`).forEach(function (cur) {
      cur.style.zIndex = "1";
      overlay.style.zIndex = "-1";
      overlay.style.opacity = "0";
    });
  });
});
console.log(days);
console.log(day);
