# Waizatsu
A flexible and easy-to-use text garbler, written in pure JS.
## Features
* Predefined and custom character sets:
  * Alphabet (A, B, C...)
  * Binary (0, 1)
  * Numbers (0, 1, 3..)
  * Symbols (#, @, ¬...)
  * Emoji (😍, 🔥, 👸...)
  * CJK (Chinese (格, 会, 趣...), Japanese (も, ち, や...), Korean (운, 용, 심...))
* Automatically matches character types
* Built-in interval repeatedly garbles the input at a given rate
* Emmits events and supports callbacks on:
  * Garble: When the input has been garbled
  * RepeaterStart: When the built-in interval has started garbling the input
  * RepeaterStop: When the built-in interval has stopped garbling the input
  * TransitionBegin: When the garbled text begins to transition back to the input
  * TransitionEnd: When the garbled text has finished its transition
* Maintains case
## Installing
npm:
````
npm install waizatsu
````
File include:
Waizatsu supports the `import` syntax:
````HTML
<!-- index.html -->
<script type="module" src="yourscript.js"></script>
````
````Javascript
// yourscript.js
import TextGarbler from 'waizatsu.min.js';
````
Targeting a browser without `Module` support? Include the following:
````HTML
<script nomodule src="waizatsu-fallback.js"></script>
````
## Hello World
The following is the most simple use of Waizatsu:
````Javascript
const garbler = new TextGarbler("猥雑 Waizatsu");
console.log(garbler.value);
=> '趣갖 Vvfdeihm'
````
