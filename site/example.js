import Waizatsu from '../src/waizatsu.js';

const garbler = new Waizatsu(
  "猥雑 Waizatsu",
  {
    refreshEvery: 35,
    caseSensitive: true
  }
);
garbler.on("repeaterStart", () => {
  console.log("started");
  document.getElementById("example-element").classList.remove("done");
});
garbler.on("repeaterStop", () => {
  console.log("stop");
});
garbler.on("garble", (value) => {
  document.getElementById("example-element").innerHTML = value;
});
garbler.on("transitionBegin", () => {
  document.getElementById("example-element").classList.add("done");
});
garbler.on("transitionEnd", () => {
  console.log("transition ended!");
});
document.getElementById("example-element").addEventListener("mouseenter", () => {
  garbler.stopRepeater();
});
document.getElementById("example-element").addEventListener("mouseleave", () => {
  garbler.repeater.start();
});
garbler.startRepeater();
