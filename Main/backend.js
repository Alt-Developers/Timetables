fetch("https://apis.ssdevelopers.xyz/timetables/createTimetable", {
  method: "POST",
  headers: {
    Authorization: "Bearer ", // + Token 🔐;
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    classNo: "2/3",
    program: "english",
    color: "#303030",
    content: {
      monday: ["Science", "Math"],
      tuesday: ["Math", "Steam"],
      wednesday: ["Test", "Subject"],
      Thursday: ["Science", "Science"],
      Friday: ["Hello", "Siri"],
    },
  }),
});

fetch("https://apis.ssdevelopers.xyz/timetables/getUser", {
  headers: {
    Authorization: "Bearer ", // + Token 🔐;
  },
});

fetch("https://apis.ssdevelopers.xyz/timetables/registerUserClass", {
  method: "POST",
  headers: {
    Authorization: "Bearer ", // + Token 🔐;
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    classNo: "2/3",
    program: "english",
  }),
});

const programList = [
  "bell",
  "english",
  "chineseEnglish",
  "mathScience",
  "digitalTechnology",
  "gifted",
];
