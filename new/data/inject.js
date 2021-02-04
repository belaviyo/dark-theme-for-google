/*
  test pages:
  https://www.google.com/
  https://www.google.com/webhp?hl=en
  https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=book&btnG=
  https://www.google.com/search?q=1%2B2
  https://www.google.co.uk/preferences?hl=en
  https://www.google.com/search?q=ooki
  https://www.google.com/search?bih=1307&biw=1632&hl=en&ei=yC8MYMqYD46qtQX_tJ7ICA&q=besiktas&oq=besiktas&gs_lcp=CgZwc3ktYWIQAzIJCAAQQxBGEP0BMgQIABBDMgUILhCxAzIFCC4QsQMyBAgAEEMyCAgAELEDEIMBMggIABCxAxCDATIICAAQsQMQgwEyAggAMgIIADoHCAAQsAMQQzoFCAAQkQI6AgguOggILhCxAxCDAToFCAAQsQM6CAguEMcBEKMCOgsILhCxAxDHARCjAjoHCC4QsQMQQzoOCC4QsQMQgwEQxwEQrwFQpNUBWMXjAWDm5AFoAnACeACAAe0CiAG3EJIBAzMtNpgBAKABAaoBB2d3cy13aXrIAQrAAQE&sclient=psy-ab&ved=0ahUKEwjKnOWgn7LuAhUOVa0KHX-aB4kQ4dUDCA0&uact=5
  https://translate.google.com/?sl=en&tl=es&text=This%0A&op=translate
  https://www.google.com/search?hl=en&ei=eh8NYOq5BK6C9PwPoNGIwAo&q=timer&oq=timer&gs_lcp=CgZwc3ktYWIQAzIHCAAQsQMQQzIECAAQQzIHCAAQsQMQQzIECAAQQzIECC4QQzIECC4QQzIHCAAQsQMQQzIICC4QsQMQgwEyBAgAEEMyAggAOggIABCwAxCRAjoJCAAQsAMQBxAeOgUIABCwAzoICAAQsQMQsAM6BQgAELEDOggIABCxAxCDAToOCC4QsQMQgwEQxwEQowI6CwguELEDEMcBEKMCOgcILhCxAxBDUIETWLkWYKoXaAJwAHgAgAG9AogBlweSAQUyLTEuMpgBAKABAaoBB2d3cy13aXrIAQrAAQE&sclient=psy-ab&ved=0ahUKEwjq3rHsg7TuAhUuAZ0JHaAoAqgQ4dUDCA0&uact=5
  https://www.google.com/search?biw=1240&bih=1307&ei=TCENYO2DAvGJ1fAPmNONkAk&q=color+picker&oq=color+picker&gs_lcp=CgZwc3ktYWIQAzIICAAQsQMQyQMyAggAMgIIADIFCAAQsQMyAggAMgIIADICCAAyAggAMgIIADICCAA6BwgAEEcQsAM6BQgAEJECOgQIABBDOgoIABCxAxCDARBDOggILhCxAxCDAToLCC4QsQMQxwEQowI6CAgAELEDEIMBOggIABDJAxCRAjoKCC4QsQMQgwEQQzoHCAAQsQMQQzoCCC46BwgAELEDEApQovMCWI-CA2DxggNoA3ACeACAAdUCiAG2FJIBBzAuNC42LjGYAQCgAQGqAQdnd3Mtd2l6yAEIwAEB&sclient=psy-ab&ved=0ahUKEwjt2cnKhbTuAhXxRBUIHZhpA5IQ4dUDCA0&uact=5
  https://www.google.com/search?client=firefox-b-d&q=wert#dobs=ok
*/

const DARK = 'dark';

const prefs = {
  'enabled': true,

  'bg-color': '#101111',
  'bg-light-color': '#222324',
  'link-color': '#9bb6df',
  'visited-color': '#906f51',
  'link-header-color': '#6b886b',
  'front-color': '#aaa6a2',
  'selection-color': '#eeeeee',
  'selection-bg': '#404040',
  'button-bg': '#1a73e8',
  'front-light-color': '#e7e2dc',
  'front-dark-color': '#1e2022',
  'box-shadow-color': '#37383b',
  'border-light-color': '#35383b',
  'border-blue-color': '#80a5de',

  'custom-css': '',
  'exclude-images': false,
  'exclude-photos': false,
  'exclude-translate': false,
  'exclude-blog': false,
  'exclude-books': false,
  'exclude-discussions': false,
  'exclude-news': true, // has dark theme
  'exclude-places': false,
  'exclude-recipes': false,
  'exclude-shopping': false,
  'exclude-video': false,
  'exclude-scholar': false
};

const style = document.documentElement.style;
const root = () => {
  style.setProperty('--bg-color', prefs['bg-color']);
  style.setProperty('--bg-light-color', prefs['bg-light-color']);
  style.setProperty('--link-color', prefs['link-color']);
  style.setProperty('--visited-color', prefs['visited-color']);
  style.setProperty('--link-header-color', prefs['link-header-color']);
  style.setProperty('--front-color', prefs['front-color']);
  style.setProperty('--selection-color', prefs['selection-color']);
  style.setProperty('--selection-bg', prefs['selection-bg']);
  style.setProperty('--button-bg', prefs['button-bg']);
  style.setProperty('--front-light-color', prefs['front-light-color']);
  style.setProperty('--front-dark-color', prefs['front-dark-color']);
  style.setProperty('--box-shadow-color', prefs['box-shadow-color']);
  style.setProperty('--border-light-color', prefs['border-light-color']);
  style.setProperty('--border-blue-color', prefs['border-blue-color']);
};
root();
document.documentElement.classList.add(DARK);

class Observe {
  constructor() {
    this.cache = new WeakMap();
    this.enabled = true;
  }
  check() {
    for (const sheet of document.styleSheets) {
      if (this.cache.has(sheet)) {
        continue;
      }
      const node = sheet.ownerNode;
      if (node.tagName === 'STYLE' && node.classList.contains(DARK)) {
        this.cache.set(sheet, true);
        this.clean(sheet);
      }
      else if (node.tagName === 'LINK') {
        this.cache.set(sheet, true);
        this.clean(sheet);
      }
    }
  }
  clean(sheet) {
    sheet.by = 'me';
    sheet.disabled = !this.enabled;
    try {
      const check = rule => {
        const {style} = rule;
        if (style.color) {
          this.color(rule);
        }
        if (style['background-color']) {
          this['background-color'](rule);
        }
        if (
          style['border-color'] || style['border-top-color'] || style['border-bottom-color'] ||
          style['border-left-color'] || style['border-right-color'] || style.stroke || style.fill
        ) {
          this.border(rule);
        }
      };
      for (const rule of sheet.rules) {
        if (rule.style) {
          check(rule);
        }
        else if (rule.cssRules) {
          for (const r of rule.cssRules) {
            check(r);
          }
        }
      }
    }
    catch (e) {
      this.remote(sheet);
    }
  }
  parse(str) {
    str = str.toLowerCase();
    if (str === 'black') {
      return {r: 0, g: 0, b: 0, a: 1, replace: '%%'};
    }
    if (str === 'white') {
      return {r: 255, g: 255, b: 255, a: 1, replace: '%%'};
    }
    /* find replacing rule */
    let replace = '%%';
    if (str.startsWith('var')) { // var(--gm-neutraltextbutton-ink-color--stateful,rgb(233, 233, 233))
      if (str.indexOf('rgb') !== -1) {
        replace = str.replace(/rgb[^)]*\)/, m => {
          str = m;
          return '%%';
        });
      }
      else if (str.indexOf('#') !== -1) { // var(--gm-neutraltextbutton-ink-color--stateful,#202124)
        replace = str.replace(/#[^)]*\)/, m => {
          str = m;
          return '%%';
        });
        str = '#' + str.split('#')[1];
      }
    }
    if (str[0] === '#' && str.indexOf(' ') !== -1) { // #168aff transparent
      replace = '%% ' + str.split(' ')[1];
    }
    if (str.startsWith('rgb') && str.indexOf(') ') !== -1) { // rgba(123, 123, 123, 0.5) transparent
      replace = '%% ' + str.split(') ');
    }
    // not a valid rgb or hex color
    if (str[0] !== 'r' && str[0] !== '#') {
      return;
    }
    if (str.startsWith('rgb')) {
      const r = /(\d+)[,\s]+(\d+)[,\s]+(\d+)[,\s]*([\d.]+)*/.exec(str);
      if (r) {
        return {
          r: parseInt(r[1]),
          g: parseInt(r[2]),
          b: parseInt(r[3]),
          a: parseInt(r[4] || 1),
          replace
        };
      }
    }
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(str);
    if (r) {
      return {
        r: parseInt(r[1], 16),
        g: parseInt(r[2], 16),
        b: parseInt(r[3], 16),
        a: 1,
        replace
      };
    }
  }
  color(rule) {
    const o = this.parse(rule.style.color);
    const convert = ({r, g, b}) => {
      // red
      if ((r - g) > 50 && (b - g) > 50) {
        return 'var(--visited-color)';
      }
      // blue
      if ((b - g) > 50 && (b - r) > 50) {
        return 'var(--link-color)';
      }
      // green
      else if ((g - b) > 50 && (g - r) > 50) {
        return 'var(--link-header-color)';
      }
      if (o.r > 60 && o.g > 60 && o.b > 60) {
        return 'var(--front-color)';
      }
      return 'var(--front-light-color)';
    };

    if (o) {
      rule.style.color = convert(o);
    }
  }
  'background-color'(rule) {
    const o = this.parse(rule.style['background-color']);
    const convert = ({r, g, b, replace}) => {
      // blue
      if ((b - g) > 50 && (b - r) > 50) {
        return replace.replace('%%', 'var(--button-bg)');
      }
      return replace.replace('%%', 'var(--bg-light-color)');
    };
    if (o) {
      if (o.a > 0.5) {
        rule.style['background-color'] = convert(o);
      }
    }
  }
  border(rule) {
    const convert = ({r, g, b, replace}) => {
      // blue
      if ((b - g) > 50 && (b - r) > 50) {
        return replace.replace('%%', 'var(--border-blue-color)');
      }
      return replace.replace('%%', 'var(--border-light-color)');
    };

    if (rule.style['border-top-color']) {
      const o = this.parse(rule.style['border-top-color']);
      if (o) {
        rule.style['border-top-color'] = convert(o);
      }
    }
    if (rule.style['border-bottom-color']) {
      const o = this.parse(rule.style['border-bottom-color']);
      if (o) {
        rule.style['border-bottom-color'] = convert(o);
      }
    }
    if (rule.style['border-left-color']) {
      const o = this.parse(rule.style['border-left-color']);
      if (o) {
        rule.style['border-left-color'] = convert(o);
      }
    }
    if (rule.style['border-right-color']) {
      const o = this.parse(rule.style['border-right-color']);
      if (o) {
        rule.style['border-right-color'] = convert(o);
      }
    }
    if (rule.style['border-color']) {
      const o = this.parse(rule.style['border-color']);
      if (o) {
        rule.style['border-color'] = convert(o);
      }
    }
    if (rule.style.stroke) {
      const o = this.parse(rule.style.stroke);
      if (o) {
        rule.style.stroke = convert(o);
      }
    }
    if (rule.style.fill) {
      const o = this.parse(rule.style.fill);
      if (o) {
        rule.style.fill = convert(o);
      }
    }
  }
  remote(sheet) {
    if (sheet.href) {
      const next = content => {
        const style = document.createElement('style');
        style.textContent = content;
        sheet.ownerNode.after(style);
      };
      fetch(sheet.href).then(r => r.text()).then(next).catch(() => chrome.runtime.sendMessage({
        method: 'fetch',
        href: sheet.href
      }, next));
    }
  }
  toggle() {
    this.enabled = !this.enabled;
    document.documentElement.classList[this.enabled ? 'add' : 'remove'](DARK);
    for (const sheet of document.styleSheets) {
      if (sheet.by === 'me') {
        sheet.disabled = !this.enabled;
      }
    }
  }
  exclude() {
    if (this.enabled) {
      this.toggle();
      chrome.runtime.sendMessage({
        method: 'excluded'
      });
    }
  }
}

const observe = new Observe();
{
  const dup = nodes => {
    if (nodes.size) {
      for (const node of nodes.values()) {
        const n = node.cloneNode(true);
        n.classList.add(DARK);
        n.removeAttribute('nonce');
        node.after(n);
      }
      observe.check();
    }
  };
  // check for new style nodes
  const no = new MutationObserver(ms => {
    const nodes = new Set();
    for (const m of ms) {
      for (const node of m.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const {target} = m;
          if (target.tagName === 'STYLE') {
            if (target.classList.contains(DARK) === false) {
              nodes.add(target);
            }
          }
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
            node.addEventListener('load', () => observe.check());
          }
          if (node.tagName === 'STYLE') {
            if (node.classList.contains(DARK) === false && node.textContent) {
              nodes.add(node);
            }
          }
        }
      }
    }
    dup(nodes);
  });
  no.observe(document.documentElement, {
    subtree: true,
    childList: true
  });
  // check for modified style nodes
  const mo = new MutationObserver(ms => {
    const nodes = new Set();
    for (const {target} of ms) {
      if (target.nodeType === Node.TEXT_NODE) {
        const parent = target.parentElement;
        if (parent.tagName === 'STYLE') {
          nodes.add(parent);
        }
      }
    }
    dup(nodes);
  });
  mo.observe(document.documentElement, {
    subtree: true,
    characterData: true
  });
}

// custom styling
const css = document.createElement('style');
document.documentElement.appendChild(css);

/* update */
const update = () => {
  if ('enabled' in prefs) {
    if (observe.enabled && prefs.enabled === false) {
      observe.toggle();
    }
    if (observe.enabled === false && prefs.enabled) {
      observe.toggle();
    }
  }
  if (prefs['exclude-translate'] === true && location.hostname.startsWith('translate.google.')) {
    observe.exclude();
  }
  if (prefs['exclude-scholar'] === true && location.hostname === 'scholar.google.com') {
    observe.exclude();
  }
  if (prefs['exclude-images'] === true && location.search.includes('tbm=isch')) {
    observe.exclude();
  }
  if (prefs['exclude-blog'] === true && location.search.includes('tbm=blg')) {
    observe.exclude();
  }
  if (prefs['exclude-books'] === true && location.search.includes('tbm=bks')) {
    observe.exclude();
  }
  if (prefs['exclude-discussions'] === true && location.search.includes('tbm=dsc')) {
    observe.exclude();
  }
  if (prefs['exclude-news'] === true && location.hostname === 'news.google.com') {
    observe.exclude();
  }
  if (prefs['exclude-places'] === true && (location.search.includes('tbm=plcs') || location.search.includes('tbm=lcl'))
  ) {
    observe.exclude();
  }
  if (prefs['exclude-recipes'] === true && location.search.includes('tbm=rcp')) {
    observe.exclude();
  }
  if (prefs['exclude-shopping'] === true && location.search.includes('tbm=shop')) {
    observe.exclude();
  }
  if (prefs['exclude-video'] === true && location.search.includes('tbm=vid')) {
    observe.exclude();
  }
  if (prefs['exclude-photos'] === true && location.pathname.startsWith('/photos')) {
    observe.exclude();
  }
  // permanent exclude
  if (location.hostname.startsWith('translate.google.') && location.search.includes('&u=')) {
    observe.exclude();
  }
  if (location.pathname.startsWith('/travel') || location.pathname.startsWith('/flights')) {
    observe.exclude();
  }
  root();
  css.textContent = prefs['custom-css'];
};

chrome.storage.local.get(prefs, ps => {
  Object.assign(prefs, ps);
  update();
});

chrome.storage.onChanged.addListener(ps => {
  for (const [key, value] of Object.entries(ps)) {
    prefs[key] = value.newValue;
  }
  update();
});
