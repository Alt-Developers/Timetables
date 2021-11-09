// Time
const time = new Date();
const updateTime = function () {
  document.querySelector(".time").innerHTML = `${time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
};

updateTime();
setInterval(updateTime, 20000);
