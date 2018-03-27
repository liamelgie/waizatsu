# Waizatsu
An efficient, easy-to-use text garbler, written in vanilla JS.
## Features
- Predefined and custom character sets
- Stop garbling text on:
    - Elapsed duration
    - Fired event
    - Called method
- Transition effects

## Usage
#### HTML
````
<h1 id="example-element"></h1>
`````
#### JS
````Javascript
let garble = new TextGarbler(
  "example-element",
  "Snape kills Dumbledore ",
  {
    transition: "reveal",
    duration: 5000
  }
);
garble.start();
````
#### Result
<p align="center">
  <img alt="Example Output" src="https://i.imgur.com/w7Fki9I.gif">
</p>
