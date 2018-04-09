# Waizatsu
A flexible and easy-to-use text garbler, written in pure JS.
## Features
* Predefined and custom character sets:
  * Alphabet (A, B, C...)
  * Binary (0, 1)
  * Numbers (0, 1, 2...)
  * Symbols (#, @, ¬...)
  * Emoji (👸, 🔥, 😍...)
  * CJK (Chinese (格, 会, 趣...), Japanese (も, ち, や...), Korean (운, 용, 심...))
* Automatically matches character types
* Built-in interval repeatedly garbles the input at a given rate
* Emits events and supports callbacks on:
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
> Not yet published, bear with me 🐻

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
> Also not yet published 🐻

## Hello World
The following is the most simple use of Waizatsu:
````Javascript
const garbler = new Waizatsu("Hello World!");
console.log(garbler.value);
=> 'aMejW lSKwn@'
````
# Usage
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
If a string value is given, the correspoding character set will be used. For example, `'alphabet'` will use the ALPHABET character set, etc.
If an array is given, the corresponding character set at each index will be combined. For example, `['alphabet', 'numbers', 'symbols']` will use all three sets when garbling. 
###### `customCharacterSet`
Array that provides a custom set of characters that can be used when garbling. To use a custom character set, `characterSet` must also be set to or include `'custom'`. Defaults to `[]` (An empty array).
###### `refreshEvery`
Integer value that determines how often the interval used by the repetear method should tick. Defaults to `50`.

## Garble
The `Waizatsu.garble()` method takes the `base` string and generates a string of random characters of the same length. 
The way in which a string is garbled relies on two things:
#### Character Set
When a string is garbled, each character within it will be replaced with a randomly selected character from a given set. The set used is determined by the `characterSet` option. If this option is not present, the character set is defaulted to `'alphabet'`.
##### Available Sets
* Alphabet (A, B, C...) 		- Contains the characters found within the English alphabet. This set **does not** currently include accented characters.
* Binary (0, 1) 					- Contains the binary numbers: 1 and 0.
* Numbers (0, 1, 2...) 		- Contains the decimal digits: 0 to 9.
* Symbols (#, @, ¬...) 		- Contains a variety of symbols that are commonly found on Western keyboards.
* Emoji (👸, 🔥, 😍...) 		- Contains a variety of Emoji but is far from comprehensive.
* Chinese (格, 会, 趣...) 	- Contains a variety of Chinese characters but is far from comprehensive.
* Japanese (も, ち, や...) 	- Contains a variety of Japanese characters but is far from comprehensive.
* Korean (운, 용, 심...) 		- Contains a variety of Korean characters but is not comprehensive.
* CJK 								- Contains a combination of the Chinese, Japanese and Korean sets
##### Custom
A custom set of characters can be provided by the `customCharacterSet` option and can be selected by giving `'custom'` as the value for the `characterSet` option.
###### Example
````Javascript
let example = new Waizatsu("Hello World!", {
	characterSet: 'custom',
	customCharacterSet: ['A', 'c', '2', '91', '@', '}']
});
````
##### Auto
Waizatsu supports automatic detection of character types to replace characters with one of the same type. To use this feature, give `'auto'` as the value for the `characterSet` option.

> While this feature works great for whitespace, numbers, letters and symbols, it is severly limited when it comes to CJK and non-English characters. Better support for these character sets is planned but, unfortunately, is not of the highest priority.

##### Combining Sets
If an array is given as the value for the `characterSet` option, the referenced sets will be combined and used together as a single set.

> If `'auto'` is included in the array of sets to combine, all other values will be ignored and the automatic character type detection feature will be used instead. 

###### Example
````Javascript
let example = new Waizatsu("Hello World!", { 
	characterSet: ['alphabet', 'numbers', 'symbols']
});
// Example of a garbled string using these combined sets
example.value => '7*Dn: k8Bn@f'
````
#### Case Sensitivity
If desired, Waizatsu can maintain a character's case when generating a random new random character. To use this feature, give `true` as the value for the `caseSensitive` option.
### Syntax
````Javascript
Waizatsu.garble([returnValue] [, returnAs]); 
````
#### Parameters
##### `returnValue`
Boolean that signals whether to return the garbled value once it has been set to `Waizatsu.value`. Defaults to `false`. If no other parameters are provided, the garbled value will be return as a string by default.
##### `returnAs`
String value that determines what type to return the garbled value as. Defaults to `'string'`. 
This parameter only supports `'string'` and `'array'`.  The `'array'` value returns the garbled value split into an array.
## Events
Waizatsu emits events during operation that can be listened to via the `Waizatsu.on()` method.
### Syntax
````Javascript
Waizatsu.on(event, callback);
````
#### Parameters
##### `event`
String value that references the event that the `callback` should be fired on. Possible values:
* `'garble'` - Emitted by the `Waizatsu.garble()` method once the `Waizatsu.value` property has been assigned the newly garbled string.
* `'repeaterStart'` - Emitted by the `Waizatsu.startRepeater()` method once the repeater interval has started.
* `'repeaterStop'` - Emitted by the `Waizatsu.stopRepeater()` method once the repeater interval has stopped.
* `'transitionBegin'` - Emitted by the `Waizatsu.repeater.transition()` method, which is called by the `Waizatsu.stopRepeater()` method, once the garbled string begins to transition back to its base value.
* `'transitionEnd'` - Emitted by the `Waizatsu.repeater.transition()` method, which is called by the `Waizatsu.stopRepeater()` method, once the garbled string finishes transitioning back to its base value.
##### `callback`
Function that will be called once the `event` is emitted.

### Example
````Javascript
// Create a new Waizatsu object
let example = new Waizatsu("Hello World!");
// Listen to the 'garble' event
example.on('garble', () => {
	console.log('Garbled!');
});
// Call the `Waizatsu.garble()` method to trigger the event
example.garble();

// Console Output:
'Garbled!';
````
## Repeater
The Repeater feature is a built-in interval that (surprise) repeatedly garbles the text. This feature is functionally the same as creating an interval that calls the `Waizatsu.garble()` method but supports the aforementioned events and a nice transition back to the string's base value once stopped.
###  Starting the Repeater
To start the Repeater, call the `Waizatsu.startRepeater()` method. This sets an interval that garbles the text every *x* milliseconds. The rate at which the interval executes is determined by the `refreshEvery` option. If this option is not present, the rate is defaulted to `50`. 
Once the interval is set, the `repeaterStart` event is emitted.

> If `Waizatsu.startRepeater()` is called while the Repeater is already active, the interval will be cleared and then set again. 
> This clearing of the interval **WILL NOT** trigger the `stopRepeater` event nor begin the transition to the base string.

#### Example
````Javascript
// Create a new Waizatsu object with the refreshEvery option
let example = new Waizatsu("Hello World!", { refreshEvery: 35 });
// Start the Repeater
example.startRepeater();
````
### Stopping the Repeater
To stop the Repeater, call the `Waizatsu.stopRepeater()` method. This clears the interval that's set by the `Waizatsu.startRepeater()` method and transitions the garbled value back to the base value provided when the object was initialised.
Once the interval has been cleared, the `repeaterStop` event is emitted.

> If `Waizatsu.stopRepeater()` is called while the Repeater is not active, it will return false.

#### Example
````Javascript
// Create a new Waizatsu object with options
let example = new Waizatsu("Hello World!", { refreshEvery: 35 });
// Start the Repeater
example.startRepeater();
// Stop the Repeater
example.stopRepeater();
````
### Transitioning back to `base`
When the Repeater is stopped, the object's `value` will begin to transition back to the `base` value that was given when the object was intiailised, one character at a time. In conjunction with the `garble` event, this provides a smooth transition between the two and acts as a sort of reveal. 

> Currently, this transition cannot be triggered by anything other than the `Waizatsu.stopRepeater()` method and does not indepentently emit the `transitionEnd` event. This will be changed in a future revision.

# Putting It All Together
So, what can we do with Waizatsu? All it does is garble text, right? Maybe so but you can implement it into your apps in interesting ways.

> As soon as I think of some, I'll link them here