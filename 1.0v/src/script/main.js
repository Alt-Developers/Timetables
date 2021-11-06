const time = new Date();
document.querySelector(
  ".header__text"
).innerHTML = `Hi there, <br> Its Currently ${time.toLocaleString("en-US", {
  hour: "numeric",
  hour12: true,
})}`;
