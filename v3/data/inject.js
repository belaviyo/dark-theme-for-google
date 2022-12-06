/*
  test pages:
  https://www.google.com/
  https://www.google.de/?gws_rd=ssl
  https://www.google.com/webhp?hl=en
  https://www.google.com/search?q=lifehacker
  https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=book&btnG=
  https://www.google.com/search?q=1%2B2
  https://www.google.co.uk/preferences?hl=en
  https://www.google.com/search?q=ooki
  https://www.google.com/search?bih=1307&biw=1632&hl=en&ei=yC8MYMqYD46qtQX_tJ7ICA&q=besiktas&oq=besiktas&gs_lcp=CgZwc3ktYWIQAzIJCAAQQxBGEP0BMgQIABBDMgUILhCxAzIFCC4QsQMyBAgAEEMyCAgAELEDEIMBMggIABCxAxCDATIICAAQsQMQgwEyAggAMgIIADoHCAAQsAMQQzoFCAAQkQI6AgguOggILhCxAxCDAToFCAAQsQM6CAguEMcBEKMCOgsILhCxAxDHARCjAjoHCC4QsQMQQzoOCC4QsQMQgwEQxwEQrwFQpNUBWMXjAWDm5AFoAnACeACAAe0CiAG3EJIBAzMtNpgBAKABAaoBB2d3cy13aXrIAQrAAQE&sclient=psy-ab&ved=0ahUKEwjKnOWgn7LuAhUOVa0KHX-aB4kQ4dUDCA0&uact=5
  https://translate.google.com/?sl=en&tl=es&text=This%0A&op=translate
  https://www.google.com/search?q=timer
  https://www.google.com/search?q=color picker
  https://www.google.com/search?q=wert#dobs=ok
  https://www.google.com/search?q=10 btc to usd
  https://www.google.com/search?q=book in french
  https://www.google.com/doodles
  https://www.google.com/docs/about/
  https://photos.google.com/?pli=1
  https://messages.google.com/web/conversations
  https://calendar.google.com/calendar/u/0/r
  https://support.google.com/accounts/thread/3131026/how-can-i-know-if-im-using-the-current-version-of-gmail-account?hl=en
*/

const DARK = 'dark';
const isFirefox = /Firefox/.test(navigator.userAgent) || typeof InstallTrigger !== 'undefined';

const prefs = {
  'enabled': true,

  'bg-color': '#101111',
  'bg-light-color': '#1d1e1f',
  'bg-red-color': '#ea4335',
  'bg-blue-color': '#253650',
  'link-color': '#9bb6df',
  'visited-color': '#906f51',
  'link-header-color': '#6b886b',
  'selection-color': '#eeeeee',
  'selection-bg': '#404040',
  'button-bg': '#1a73e8',
  'front-color': '#aaa6a2',
  'front-light-color': '#ddd8d2',
  'front-dark-color': '#1e2022',
  'box-shadow-color': '#37383b',
  'border-light-color': '#35383b',
  'border-blue-color': '#80a5de',
  'border-red-color': '#ea4335',

  'custom-css': '',
  'exclude-search': false,
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
  'exclude-scholar': false,
  'exclude-messages': false,
  'exclude-calendar': false,

  'exclude-dark-meta': true
};

const replaceVars = location.hostname === 'messages.google.com';

// custom styling
const css = document.createElement('style');
css.classList.add(DARK);
document.documentElement.appendChild(css);

const style = document.documentElement.style;
const root = () => {
  style.setProperty('--bg-color', prefs['bg-color']);
  style.setProperty('--bg-blue-color', prefs['bg-blue-color']);
  style.setProperty('--bg-light-color', prefs['bg-light-color']);
  style.setProperty('--bg-red-color', prefs['bg-red-color']);
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
  style.setProperty('--border-red-color', prefs['border-red-color']);
  style.setProperty('--fix-light-color', '#fff');
};
root();
document.documentElement.classList.add(DARK);

class Observe {
  constructor() {
    this.cache = new WeakMap();
    this.enabled = true;
    this.cstyles = getComputedStyle(document.documentElement);
  }
  check() {
    for (const sheet of document.styleSheets) {
      if (this.cache.has(sheet)) {
        continue;
      }
      const node = sheet.ownerNode;
      if (node.tagName === 'STYLE' && node.classList.contains(DARK)) {
        this.cache.set(sheet, true);
        if (node !== css) {
          this.clean(sheet);
        }
      }
      else if (node.tagName === 'LINK' && node.classList.contains(DARK)) {
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
        if (style) {
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
        }
      };
      const parse = sheet => {
        for (const rule of sheet.rules) {
          try {
            if (rule.styleSheet) {
              try {
                parse(rule.styleSheet);
              }
              catch (e) {}
            }
            if (rule.style) {
              check(rule);
            }
            else if (rule.cssRules) {
              for (const r of rule.cssRules) {
                check(r);
              }
            }
          }
          catch (e) {
            console.warning(e);
          }
        }
      };
      parse(sheet);
    }
    catch (e) {
      this.remote(sheet);
    }
  }
  parse(style, property, sub) {
    let str = style[property].toLowerCase();
    // only replace unloaded or unknown vars in the places that we have checked
    sub = replaceVars ? sub : undefined;

    /* dealing with loaded vars:
      var(--mdc-ripple-color,rgba(255,255,255,0.87))
      var(--mdc-ripple-color,#bb86fc)
    */

    str = str.replace(/var\(([^;]*)\)/g, (a, b) => {
      const first = b.split(/\s*,\s*/)[0];

      if (first.startsWith('--')) {
        const d = this.cstyles.getPropertyValue(first);
        if (d) {
          return d;
        }
      }
      const second = b.replace(first, '').replace(/^\s*,\s*/, '');

      return second || sub || a;
    }).trim();

    /* has important */
    const important = style.getPropertyPriority(property);
    /* fixed color */
    str = str.replace('black', '#000000');
    str = str.replace('white', '#ffffff');
    str = str.replace('whitesmoke', '#f5f5f5');
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
    else if (str[0] === '#') { // #168aff transparent or #f0f0f0!important
      replace = str.replace(/^#\w+/, '%%');
    }
    else if (str.startsWith('rgb')) { // rgba(123, 123, 123, 0.5) transparent
      replace = str.replace(/rgba?\([^)]+\)/, '%%');
    }
    // not a valid rgb or hex color
    if (str[0] !== 'r' && str[0] !== '#') {
      // console.log('skipping', str);
      return;
    }
    if (str.startsWith('rgb')) {
      const r = /(\d+)[,\s]+(\d+)[,\s]+(\d+)[,\s]*([\d.]+)*/.exec(str);
      if (r) {
        return {
          r: parseInt(r[1]),
          g: parseInt(r[2]),
          b: parseInt(r[3]),
          a: parseFloat(r[4] || 1),
          replace,
          important
        };
      }
    }
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(str) ||
      /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})/i.exec(str);

    if (r) {
      return {
        r: parseInt(r[1], 16),
        g: parseInt(r[2], 16),
        b: parseInt(r[3], 16),
        a: 1,
        replace,
        important
      };
    }
  }
  color(rule) {
    const o = this.parse(rule.style, 'color', '#000');

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
      // if color was white; keep the bright color (e.g. calculator buttons)
      else if (o.r === 255 && o.g === 255 && o.b === 255) {
        return 'var(--front-light-color)';
      }
      // default
      else if (o.r > 60 && o.g > 60 && o.b > 60) {
        return 'var(--front-color)';
      }
      return 'var(--front-light-color)';
    };

    if (o) {
      rule.style.setProperty('color', convert(o), o.important);
    }
  }
  'background-color'(rule) {
    const o = this.parse(rule.style, 'background-color', '#fff');
    // console.log(o, rule.style['background-color']);

    const convert = ({r, g, b, replace}) => {
      // blue
      if ((b - g) > 50 && (b - r) > 50) {
        return replace.replace('%%', 'var(--button-bg)');
      }
      // Light blue
      else if (b > 250 && (b - g) > 20 && (b - r) > 20) {
        return replace.replace('%%', 'var(--bg-blue-color)');
      }
      // red
      else if ((r - g) > 50 && (r - b) > 50) {
        return 'var(--bg-red-color)';
      }
      return replace.replace('%%', 'var(--bg-light-color)');
    };
    if (o) {
      if (o.a > 0.5) {
        rule.style.setProperty('background-color', convert(o), o.important);
      }
    }
  }
  border(rule) {
    const convert = ({r, g, b, replace}) => {
      // blue
      if ((b - g) > 50 && (b - r) > 50) {
        return replace.replace('%%', 'var(--border-blue-color)');
      }
      // red
      else if ((r - g) > 50 && (r - b) > 50) {
        return replace.replace('%%', 'var(--border-red-color)');
      }
      return replace.replace('%%', 'var(--border-light-color)');
    };

    const properties = ['border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color',
      'border-color', 'stroke', 'fill'];
    for (const property of properties) {
      if (rule.style[property]) {
        const o = this.parse(rule.style, property, '#000');
        if (o) {
          rule.style.setProperty(property, convert(o), o.important);
        }
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
  const cache = new WeakMap();

  const one = node => {
    // remove the old cloned node; since the content is updated
    if (cache.has(node)) {
      const n = cache.get(node);
      n.remove();
    }
    const n = node.cloneNode(true);
    cache.set(node, n);
    n.classList.add(DARK);
    n.removeAttribute('nonce');
    n.removeAttribute('id');
    node.after(n);

    return n;
  };
  const dup = nodes => {
    if (nodes.size) {
      for (const node of nodes.values()) {
        one(node);
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
          if (node.tagName === 'LINK' && node.rel === 'stylesheet' && node.classList.contains(DARK) === false) {
            // in case the clean works on the remote, make sure to have a copy
            one(node).addEventListener('load', () => observe.check());
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
  if (prefs['exclude-search'] === true && location.pathname === '/search') {
    observe.exclude();
  }
  if (prefs['exclude-dark-meta'] && document.querySelector('[content="dark"]')) {
    observe.exclude();
  }
  if (prefs['exclude-translate'] === true && location.hostname.startsWith('translate.google.')) {
    observe.exclude();
  }
  if (prefs['exclude-messages'] === true && location.hostname.startsWith('messages.google.')) {
    observe.exclude();
  }
  if (prefs['exclude-calendar'] === true && location.hostname.startsWith('calendar.google.')) {
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
  // if (location.hostname === 'calendar.google.com') {
  //   observe.exclude();
  // }
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

// TO-DO - remove when matchMedia is supported in bg page
if (window.top === window && isFirefox === false) {
  const m = matchMedia('(prefers-color-scheme: dark)');
  m.addListener(e => chrome.runtime.sendMessage({
    method: 'prefers-color-scheme',
    matches: e.matches
  }));
  chrome.runtime.sendMessage({
    method: 'prefers-color-scheme',
    matches: m.matches
  });
}

