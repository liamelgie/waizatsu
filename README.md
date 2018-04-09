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
import Waizatsu from 'waizatsu.min.js';
````
Targeting a browser without `Module` support? Include the following:
````HTML
<script nomodule src="waizatsu-fallback.js"></script>
````
## Hello World
The following is the most simple use of Waizatsu:
````Javascript
const garbler = new Waizatsu("猥雑 Waizatsu");
console.log(garbler.value);
=> '趣갖 Vvfdeihm'
````
## Usage
### Syntax
````Javascript
new Waizatsu(base [, options]);
````
#### Parameters
##### `base` 
String value that represents the original (base) value that will be garbled.
##### `options`
An options object that contains values that determine how Waizatsu operates. 
The possible options are:
###### `caseSensitive`
Boolean that signals whether to maintain the `base` string's case when garbling. Defaults to `false`.
###### `characterSet`
String value or Array that determines which characters to use when garbling. Defaults to `'alphabet'`.
If a string value is given, the correspoding character set will be used. For example, 'alphabet' will use the ALPHABET character set, etc.
If an array is given, the corresponding character set at each index will be combined. For example, ['alphabet', 'numbers', 'symbols'] will use all three sets when garbling. 
###### `customCharacterSet`
Array that provides a custom set of characters that can be used when garbling. To use a custom character set, `characterSet` must also be set to or include 'custom'. Defaults to `[]` (An empty array).
###### `refreshEvery`
Integer value that determines how often the interval used by the repetear method should tick. Defaults to `50`.

