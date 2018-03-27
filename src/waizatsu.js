/**
  * @fileoverview Garbles text in real-time and resolves it back to its true value on demand.
  * @author Liam Elgie
  * @version 0.9.1
  * @module Waizsatsu
  */

  // Arrays of characters to reference when garbling text
  const ALPHABET = (() => {
    const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
    return caps.concat(caps.map(letter => letter.toLowerCase()));
  })();
  /** @const */
  const EMOJI = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];
  /** @const */
  const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  /** @const */
  const BINARY = ["0", "1"];
  /** @const */
  const SYMBOLS = ["`", "¬", "\\", "|", "!", "\"", "£", "$", "¢", "#", "¡", "™", "#", "∞", "%", "^", "§", "&", "¶", "*", "•", "ª", "(", ")", "º", "-", "_", "≠", "+", "=", "[", "]", "{", "}", ":", ";", "'", "@", "~", "<", ">", ",", ".", "/", "?", "≥", "≤", "÷"];
  /** @const */
  const CJK = ["以", "ユ", "ル", "ン", "メ", "オ", "他", "鵜", "阿", "シ", "フ", "保", "鵜", "保", "擢", "野", "も", "き", "ほ", "は", "お", "無", "差", "課", "つ", "せ", "ょ", "に", "無", "二", "巣", "と", "樹", "名", "屋", "二", "他", "模", "夜", "模", "ひ", "い", "ゅ", "ゆ", "て", "は", "魔", "擢", "く", "ま", "都", "樹", "樹", "ち", "せ", "ふ", "根", "等", "知", "名", "日", "派", "舳", "列", "絵", "素", "ね", "み", "や", "絵", "く", "む", "の", "鵜", "目", "ヨ", "ク", "モ", "ネ", "む", "ね", "派", "屋", "尾", "他", "他", "ほ", "て", "差", "手", "魔", "擢", "魔", "ん", "手", "他", "舳", "野", "カ", "レ", "ミ", "野", "差", "区", "れ", "し", "せ", "れ", "の", "シ", "ト", "ミ", "カ", "離", "魔", "そ", "ち", "ゆ", "手", "名", "雲", "夜", "ア", "ヌ", "ル", "ー", "以", "野", "っ", "み", "つ", "瀬", "屋", "御", "模", "舳", "素", "ひ", "な", "ぬ", "セ", "ラ", "ス", "チ", "カ", "け", "れ", "よ", "か", "え", "ら", "こ", "野", "よ", "な", "り", "ゅ", "ゅ", "夜", "え", "ょ", "あ", "も", "ね", "増", "給", "像", "再", "西", "窓", "愛", "封", "犯", "検", "掲", "東", "紙", "金", "語", "毎", "米", "資", "承", "都", "設", "正", "膳", "記", "暮", "護", "間", "格", "税", "市", "聞", "付", "十", "新", "進", "式", "職", "掲", "性", "勝", "経", "参", "初", "毎", "仲", "国", "経", "一", "抜", "氏", "管", "欧", "典", "童", "規", "継", "情", "始", "場", "害", "埋", "購", "田", "北", "切", "山", "救", "習", "珈", "先", "責", "着", "会", "固", "題", "日", "度", "就", "冷", "数", "究", "真", "愛", "終", "南", "滞", "再", "見", "公", "薄", "趣", "却", "相", "男", "敗", "啓", "軍", "貞", "金", "全", "校", "浮", "後", "稿", "防", "夜", "集", "含", "毎", "手", "少", "属", "市", "二", "時", "線", "暑", "週", "支", "盗", "来", "訃", "談", "朝", "画", "見", "開", "米", "催", "日", "歩", "議", "対", "協", "議", "福", "疑", "約", "古", "家", "禁", "噛", "校", "来", "持", "百", "실", "로", "주", "며", "그", "들", "에", "게", "더", "운", "지", "라", "가", "지", "에", "예", "가", "놀", "이", "있", "으", "랴", "심", "장", "의", "청", "춘", "의", "살", "용", "기", "가", "설", "산", "에", "서", "위", "하", "여", "광", "야", "에", "서", "평", "화", "스", "러", "운", "보", "라", "수", "끓", "는", "우", "는", "사", "막", "이", "다", "있", "다", "이", "상", "은", "있", "는", "소", "리", "다", "속", "잎", "나", "고", "속", "잎", "나", "고", "온", "갖", "인", "간", "의", "역", "사", "를", "뜨", "거", "운", "지", "라"];
class TextGarbler {
  /**
    * @param {Object} element The element that will contain the garbled text.
    * @param {string} trueValue The text that will be garbled.
    * @param {Object} [options] Options that control how the class will perform.
    * @param {string} [options.characterSet="alphabet"] The set of characters that will be used to garble the text.
    * @param {Array} [options.customCharacterSet=[]] A set of custom characters that can be used to garble the text.
    * @param {number} [options.duration=null] The length of time (in milliseconds) that the text will be garbled for.
    * @param {boolean} [options.smartGarble=false] Whether to generate a random character smartly or ignorantly.
    * @param {string} [options.stopOn=null] A DOM Event that will call stop() upon firing. This event is listened for on the element that contains the output of garbled text.
    * @param {string} [options.transition="reveal"] The transition style that will be used when text garbling is stopped.
    * @param {function} [callback] The method that will be called once garbling has stopped.
    */
  constructor(
    element,
    trueValue,
    options = {
      characterSet: "alphabet",
      customCharacterSet: [],
      duration: null,
      stopOn: null,
      transition: "reveal"
    },
    callback = () => {}) {

    // The element/node in which the garbled text will be rendered
    /** @private */
    this.element;
    /* Find and store the element/node
     * Supports strings and objects (Element object)
     * Defaults to null
     * If null, an error will be thrown as the class cannot function without it
     */
    switch(typeof element) {
      case("string"):
        this.element = document.getElementById(element);
        break;
      case("object"):
        this.element = element;
        break;
      default:
        this.element = null;
        console.error("A valid element was not provided or the given ID does not match any elements within the DOM");
        throw Error("Cannot perform operations on null. Please provide a valid element or element ID.");
        break;
    }
    // The string to be garbled
    /** @private */
    this.trueValue = trueValue;
    // The name of the transition that will be used to resolve to the final string
    /** @private */
    this.transition = options.transition;
    // The length of time in which to garble the text for
    /** @private */
    this.duration = options.duration;

    /** @private */
    this.smartGarble = options.smartGarble;

    // A custom character set given by the user
    /** @const */
    const CUSTOM = options.customCharacterSet;
    // The character set to be referenced when garbling text
    /** @private */
    this.characterSet;
    /* Finds and stores the character set specified by the user
     * Defaults to ALPHABET
     */
    switch(options.characterSet) {
      case("alphabet"):
        this.characterSet = ALPHABET;
        break;
      case("emoji"):
        this.characterSet = EMOJI;
        break;
      case ("numbers"):
        this.characterSet = NUMBERS;
        break;
      case ("binary"):
        this.characterSet = BINARY;
        break;
      case ("custom"):
        this.characterSet = CUSTOM;
        break;
      default:
        this.characterSet = ALPHABET;
        break;
    }
    // A boolean to show whether the text is currently being garbled
    /** @private */
    this.isRunning = false;
    // If a stopOn event has been given, set the listerner
    if (options.stopOn) {
      this.element.addEventListener(options.stopOn, (e) => {
        // Only call stop if text is currently being garbled
        // This prevents the event from repeatedly calling the stop method
        if (this.isRunning) {
          this.stop();
        }
      }, false);
    }
    // The callback that will be called once the text has stopped being garbled
    /** @private */
    this.callback = () => {
      callback();
    };
  }

  /**
    * Sets the element's innerHTML to the given string.
    * @param {string} string The string that will be set to the element's innerHTML.
    */
  setElementsContent(string) {
    this.element.innerHTML = string;
    return;
  }

  /**
    * Generates a garbled string. This string matches the given string in
    * length and uses the character set given in the options. Returns either a
    * string or an array containing the split string depending on the returnAsArray
    * parameter.
    * @param {string} stringToGarble String to be garbled.
    * @param {boolean} [returnAsArray=false] Split the garbled string into an
    * array before returning.
    * @return {string|Array} A garbled string or array.
    */
  generateGarbledString(stringToGarble, returnAsArray = false) {
    const stringToGarbleSplit = stringToGarble.split('');
    const garbledSplit = [];
    // Generate a random character for every character in the given string
    for (let character of stringToGarbleSplit) {
      garbledSplit.push(this.generateRandomCharacter());
    }
    if (returnAsArray) {
      return garbledSplit;
    } else {
      // Join the split string and return it
      return garbledSplit.join('');
    }
  }

  generateSmartGarbledString(stringToGarble, returnAsArray = false) {
    const stringToGarbleSplit = stringToGarble.split('');
    const garbledSplit = [];
    // Generate a random character for every character in the given string
    for (let character of stringToGarbleSplit) {
      if (/\s/.test(character)) {
        garbledSplit.push(' ');
      } else if (/[0-1]/.test(character)) {
        garbledSplit.push(this.generateRandomCharacter(BINARY));
      } else if (/[0-9]/.test(character)) {
        garbledSplit.push(this.generateRandomCharacter(NUMBERS));
      } else if (/[-!$%^&*()_+|~=`{}\[\]:";'<>@?,.\/]/.test(character)) {
        garbledSplit.push(this.generateRandomCharacter(SYMBOLS));
      } else if (/[^-!$%^&*()_+|~=`{}\[\]:";'<>@?,.\/\w\d\s]/.test(character)) {
        garbledSplit.push(this.generateRandomCharacter(CJK));
      } else {
        garbledSplit.push(this.generateRandomCharacter());
      }
    }
    if (returnAsArray) {
      return garbledSplit;
    } else {
      // Join the split string and return it
      return garbledSplit.join('');
    }
  }

  /** Starts garbling the text. If given in the options, also sets a timeout that
    * stops garbling the text after a duration has elapsed.
    */
  start() {
    // Signify that the text is currently being garbled
    this.isRunning = true;
    // Start an interval to garble the text every 50 milliseconds
    this.loop = setInterval(() => {
      if (this.smartGarble) {
        this.setElementsContent(this.generateSmartGarbledString(this.trueValue));
      } else {
        this.setElementsContent(this.generateGarbledString(this.trueValue));
      }
    }, 50);

    // If a duration has been given, clear the above interval once it has elapsed
    if (this.duration) {
      setTimeout(() => {
        // Only call stop if the text is currently being garbled
        if (this.isRunning) this.stop();
      }, this.duration);
    }

    return;
  }

  /** Stops garbling the text, initiates the transiton to the final string and
    * then triggers the callback.
    */
  stop() {
    // Signify that the text is no longer being garbled
    this.isRunning = false;
    // Clear the loop to prevent the string from being garbled indefinitely
    clearInterval(this.loop);
    /* Execute the transition
     * The execution is wrapped in a promise to ensure that the callback is
     * executed after the transition phase has ended
     */
    let exitTransition = new Promise(function(resolve, reject) {
      if (this.transition === "reveal") {
        this.reveal()
        .then(() => {resolve()});
      } else {
        reject();
      }
    }.bind(this))
    .then(() => {
      setTimeout(function () {
        // Execute the callback
        this.callback();
        return;
      }.bind(this), 50);
    });
  }

  /**
    * A transiton effect that reveals the final string one character at a time.
    * @return {Promise} A promise that is resolved once the transition is complete.
    */
  reveal() {
    return new Promise(function(resolve, reject) {
      // Track how many characters we have revealed so far
      let charactersRevealed = 0;
      // Set a loop to resolve the garbled string to it's true value progressively
      this.loop = setInterval(() => {
        const trueValueSplit = this.trueValue.split('');
        const garbledSplit = (this.smartGarble
          ? this.generateSmartGarbledString(this.trueValue, true)
          : this.generateGarbledString(this.trueValue, true));
        // Overwrite the garbled characters with the true character for those
        // that have been itterated through
        for (let i = 0; i < charactersRevealed; i++) {
          garbledSplit[i] = trueValueSplit[i];
        }
        // Set the element to the partially garbled string
        this.setElementsContent(garbledSplit.join(''));
        // Increment the amount of characters that have been revealed
        charactersRevealed++;
        // Once the entire string has been itterated through, clear the interval
        // and resolve the promise
        if (charactersRevealed > this.trueValue.length) {
          clearInterval(this.loop);
          this.setElementsContent(this.trueValue);
          resolve();
        }
      }, 50);
    }.bind(this));
  }

  /**
    * Returns a string containing a random character. This character is selected
    * from the chosen characterSet at a random index.
    * @param {Array} [characterSet=this.characterSet] The character set that should
    * be used to generate a random value.
    * @return {string} A single random character.
    */
  generateRandomCharacter(characterSet=this.characterSet) {
    return characterSet[this.generateRandomInteger(characterSet.length)];
  }

  /**
    * Returns a random number between zero and the given max value.
    * @param {number} [max=this.characterSet.length] The maximum value that can
    * generated.
    * @return {number} A random number.
    */
  generateRandomInteger(max=this.characterSet.length) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
