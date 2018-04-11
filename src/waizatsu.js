'use strict';

const ALPHABET = (() => {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.concat(caps.map(letter => letter.toLowerCase()));
})();
const AUTO = "AUTO";
const EMOJI = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄",
"🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌",
"❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾",
"🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜",
"😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸",
"🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚","🤬"];
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const BINARY = ["0", "1"];
const SYMBOLS = ["`", "¬", "\\", "|", "!", "\"", "£", "$", "¢", "#", "¡", "™",
"#", "∞", "%", "^", "§", "&", "¶", "*", "•", "ª", "(", ")", "º", "-", "_", "≠",
"+", "=", "[", "]", "{", "}", ":", ";", "'", "@", "~", "<", ">", ",", ".", "/",
"?", "≥", "≤", "÷"];
const CHINESE = ["増", "給", "像", "再", "西", "窓", "愛", "封", "犯", "検", "掲",
"東", "紙", "金", "語", "毎", "米", "資", "承", "都", "設", "正", "膳", "記", "暮",
"護", "間", "格", "税", "市", "聞", "付", "十", "新", "進", "式", "職", "掲", "性",
"勝", "経", "参", "初", "毎", "仲", "国", "経", "一", "抜", "氏", "管", "欧", "典",
"童", "規", "継", "情", "始", "場", "害", "埋", "購", "田", "北", "切", "山", "救",
"習", "珈", "先", "責", "着", "会", "固", "題", "日", "度", "就", "冷", "数", "究",
"真", "愛", "終", "南", "滞", "再", "見", "公", "薄", "趣", "却", "相", "男", "敗",
"啓", "軍", "貞", "金", "全", "校", "浮", "後", "稿", "防", "夜", "集", "含", "毎",
"手", "少", "属", "市", "二", "時", "線", "暑", "週", "支", "盗", "来", "訃", "談",
"朝", "画", "見", "開", "米", "催", "日", "歩", "議", "対", "協", "議", "福", "疑",
"約", "古", "家", "禁", "噛", "校", "来", "持"];
const JAPANESE = ["以", "ユ", "ル", "ン", "メ", "オ", "他", "鵜", "阿", "シ", "フ",
"保", "鵜", "保", "擢", "野", "も", "き", "ほ", "は", "お", "無", "差", "課", "つ",
"せ", "ょ", "に", "無", "二", "巣", "と", "樹", "名", "屋", "二", "他", "模", "夜",
"模", "ひ", "い", "ゅ", "ゆ", "て", "は", "魔", "擢", "く", "ま", "都", "樹", "樹",
"ち", "せ", "ふ", "根", "等", "知", "名", "日", "派", "舳", "列", "絵", "素", "ね",
"み", "や", "絵", "く", "む", "の", "鵜", "目", "ヨ", "ク", "モ", "ネ", "む", "ね",
"派", "屋", "尾", "他", "他", "ほ", "て", "差", "手", "魔", "擢", "魔", "ん", "手",
"他", "舳", "野", "カ", "レ", "ミ", "野", "差", "区", "れ", "し", "せ", "れ", "の",
"シ", "ト", "ミ", "カ", "離", "魔", "そ", "ち", "ゆ", "手", "名", "雲", "夜", "ア",
"ヌ", "ル", "ー", "以", "野", "っ", "み", "つ", "瀬", "屋", "御", "模", "舳", "素",
"ひ", "な", "ぬ", "セ", "ラ", "ス", "チ", "カ", "け", "れ", "よ", "か", "え", "ら",
"こ", "野", "よ", "な", "り", "ゅ", "ゅ", "夜", "え", "ょ", "あ", "も", "ね"];
const KOREAN = ["百", "실", "로", "주", "며", "그", "들", "에", "게", "더", "운", "지",
"라", "가", "지", "에", "예", "가", "놀", "이", "있", "으", "랴", "심", "장", "의", "청",
"춘", "의", "살", "용", "기", "가", "설", "산", "에", "서", "위", "하", "여", "광", "야",
"에", "서", "평", "화", "스", "러", "운", "보", "라", "수", "끓", "는", "우", "는", "사",
"막", "이", "다", "있", "다", "이", "상", "은", "있", "는", "소", "리", "다", "속", "잎",
"나", "고", "속", "잎", "나", "고", "온", "갖", "인", "간", "의", "역", "사", "를", "뜨",
"거", "운", "지", "라"];
const CJK = CHINESE.concat(JAPANESE, KOREAN);

const CHARACTER_SETS = {
  AUTO: AUTO,
  ALPHABET: ALPHABET,
  BINARY: BINARY,
  NUMBERS: NUMBERS,
  EMOJI: EMOJI,
  SYMBOLS: SYMBOLS,
  CHINESE: CHINESE,
  JAPANESE: JAPANESE,
  KOREAN: KOREAN,
  CJK: CJK,
  CUSTOM: null
};

class Waizatsu {
  constructor(base, options) {
    options = Object.assign({}, {
      caseSensitive: false,
      characterSet: "auto",
      customCharacterSet: [],
      refreshEvery: 50,
    }, options);

    const CUSTOM = options.customCharacterSet;
    CHARACTER_SETS.CUSTOM = CUSTOM;

    this.value;
    this.base = base;
    this.caseSensitive = options.caseSensitive;
    this.characterSet = (() => {
      if (options.characterSet) {
        if (typeof options.characterSet === "object") {
          let combinedSet = [];
          for (const set of options.characterSet) {
            if (
              ["AUTO", "ALPHABET", "NUMBERS", "EMOJI", "BINARY", "SYMBOLS",
              "CHINESE", "JAPANESE", "KOREAN", "CJK", "CUSTOM"]
              .includes(set.toUpperCase())
            ) {
              if (set.toUpperCase() === "AUTO") return AUTO;
              combinedSet = combinedSet.concat(CHARACTER_SETS[set.toUpperCase()]);
            } else {
              console.error(`${set} is not a valid character set.
              Use one of the following: \n
              AUTO, ALPHABET, NUMBERS, EMOJI, BINARY, SYMBOLS, CHINESE, JAPANESE,
              KOREAN, CJK or CUSTOM.`);
            }
          }
          return combinedSet;
        } else if (typeof options.characterSet === "string") {
          if (!
            ["AUTO", "ALPHABET", "NUMBERS", "EMOJI", "BINARY", "SYMBOLS",
            "CHINESE", "JAPANESE", "KOREAN", "CJK", "CUSTOM"]
            .includes(options.characterSet.toUpperCase())
          ) {
            console.error(`${options.characterSet} is not a valid character set.
            Use one of the following: \n
            AUTO, ALPHABET, NUMBERS, EMOJI, BINARY, SYMBOLS, CHINESE, JAPANESE,
            KOREAN, CJK or CUSTOM.`);
            // Fallback to ALPHABET
            return (CHARACTER_SETS[ALPHABET]);
          } else {
            return (CHARACTER_SETS[options.characterSet.toUpperCase()]);
          }
        }
      }
    })();
    this.events = {
      onGarble: () => {},
      onRepeaterStart: () => {},
      onRepeaterStop: () => {},
      onTransitionBegin: () => {},
      onTransitionEnd: () => {}
    }
    this.repeater = {
      isActive: false,
      milliseconds: options.refreshEvery,
      start: () => {
        if (this.events.onRepeaterStart) this.events.onRepeaterStart();
        if (this.repeater.isActive) clearInterval(this.repeater.interval);
        this.repeater.isActive = true;
        this.repeater.interval = setInterval(() => {
          this.garble();
        }, this.repeater.milliseconds);
        return;
      },
      stop: (transition=true) => {
        if (this.repeater.isActive) {
          if (this.events.onRepeaterStop) this.events.onRepeaterStop();
          clearInterval(this.repeater.interval);
          if (transition) {
            this.repeater.transition().then(() => {
              this.repeater.isActive = false;
            });
          }
          return true;
        } else {
          return false;
        }
      },
      transition: () => {
        return new Promise((resolve, reject) => {
          if (this.events.onTransitionBegin) this.events.onTransitionBegin();
          const transitionEffect = (() => {
            return new Promise((resolve, reject) => {
              let charactersRevealed = 0;
              this.repeater.interval = setInterval(() => {
                const splitbase = this.base.split('');
                const splitGarbledString = this.garble(true, "array");
                for (let i = 0; i < charactersRevealed; i++) {
                  splitGarbledString[i] = splitbase[i];
                }
                this.value = splitGarbledString.join('');
                if (this.events.onGarble) this.events.onGarble();
                charactersRevealed++;
                if (charactersRevealed > this.base.length) {
                  clearInterval(this.repeater.interval);
                  this.value = this.base;
                  if (this.events.onGarble) this.events.onGarble();
                  resolve();
                }
              }, this.repeater.milliseconds);
            });
          });
          transitionEffect().then(() => {
            if (this.events.onTransitionEnd) this.events.onTransitionEnd();
            resolve();
          });
        });
      }
    }

    this.garble();
  }

  on(event, callback) {
    if (typeof event != "string" || typeof callback != "function") {
      if (typeof event != "string") console.error(`Invalid parameter:
        ${event} must be a string but is instead a ${typeof event}`);
      if (typeof callback != "function") console.error(`Invalid parameter:
        ${callback} must be a function but is instead a ${typeof callback}`);
    }
    switch(event) {
    case "garble":
      this.events.onGarble = () => {
        callback(this.value);
      };
      break;
    case "repeaterStart":
      this.events.onRepeaterStart = callback;
      break;
    case "repeaterStop":
      this.events.onRepeaterStop = callback;
      break;
    case "transitionBegin":
      this.events.onTransitionBegin = callback;
      break;
    case "transitionEnd":
      this.events.onTransitionEnd = callback;
      break;
    default:
      console.error(`${event} is not a valid event. The following events are valid:
        garble, repeaterStart, repeaterStop, transitionBegin, transitionEnd.`);
      return false;
    }
    return true;
  }

  garble(returnValue=false, returnAs="string") {
    const splitString = this.base.split('');
    const splitGarbledString = [];

    for (let character of splitString) {
      let garbledCharacter;
      if (this.characterSet === AUTO) {
        garbledCharacter = /\s/.test(character) ? ' '
          : BINARY.includes(character) ? generateRandomCharacter(BINARY)
          : NUMBERS.includes(character) ? generateRandomCharacter(NUMBERS)
          : SYMBOLS.includes(character) ? generateRandomCharacter(SYMBOLS)
          : /[^-!$%^&*()_+|~=`{}\[\]:";'<>@?,.\/\w\d\s]/.test(character) ? generateRandomCharacter(CJK)
          : generateRandomCharacter(ALPHABET);
      } else {
        garbledCharacter = generateRandomCharacter(this.characterSet);
      }

      if (this.caseSensitive) {
        garbledCharacter = /[a-z]/.test(character) ? garbledCharacter.toLowerCase()
        : /[A-Z]/.test(character) ? garbledCharacter.toUpperCase()
        : garbledCharacter
      }

      splitGarbledString.push(garbledCharacter);
    }

    this.value = splitGarbledString.join('');
    if (returnValue && returnAs.toLowerCase() === "string") return splitGarbledString.join('');
    if (returnValue && returnAs.toLowerCase() === "array") return splitGarbledString;
    if (returnValue && returnAs.toLowerCase() != ("array" || "string")) console.error(`
      Cannot return the garbled data as the following type: ${returnAs}. Use either 'string' or 'array'.`
    );

    if (this.events.onGarble) this.events.onGarble();
    return;
  }

  startRepeater() {
    this.repeater.start();
  }

  stopRepeater(transition=true) {
    this.repeater.stop(transition);
  }

  transition() {
    this.repeater.transition();
  }
}

function generateRandomCharacter(characterSet) {
  return characterSet[generateRandomInteger(characterSet.length)];
}

function generateRandomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
