/*
  Google Homepage
  Google Images
  Google Images Preview
  Color Picker
  Timer
  Exchange Currency
  Google Translate
  Google Translate Inline
  Google Travel
  scholar.google.com


*/
'use strict';

const style = document.documentElement.style;
const invert = hex => {
  return '#' + (Number(`0x1${hex.substr(1)}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
};

const css = document.createElement('style');
document.documentElement.appendChild(css);

const update = prefs => {
  if ('enabled' in prefs) {
    document.documentElement.classList[prefs.enabled ? 'add' : 'remove']('dark');
  }
  if (prefs['exclude-translate'] === true && location.hostname === 'translate.google.com') {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-scholar'] === true && location.hostname === 'scholar.google.com') {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-images'] === true && location.search.includes('tbm=isch')) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-blog'] === true && location.search.includes('tbm=blg')) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-books'] === true && location.search.includes('tbm=bks')) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-discussions'] === true && location.search.includes('tbm=dsc')) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-news'] === true && location.hostname === 'news.google.com') {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-places'] === true && (location.search.includes('tbm=plcs') || location.search.includes('tbm=lcl'))) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-recipes'] === true && location.search.includes('tbm=rcp')) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-shopping'] === true && location.search.includes('tbm=shop')) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-video'] === true && location.search.includes('tbm=vid')) {
    document.documentElement.classList.remove('dark');
  }
  if (prefs['exclude-photos'] === true && location.pathname.startsWith('/photos')) {
    document.documentElement.classList.remove('dark');
  }

  /* permanent excludes */
  if (location.hostname === 'translate.google.com' && location.search.includes('&u=')) {
    document.documentElement.classList.remove('dark');
  }
  if (location.pathname.startsWith('/travel/') || location.pathname.startsWith('/flights/')) {
    document.documentElement.classList.remove('dark');
  }
  if ('bg-color' in prefs) {
    style.setProperty('--bg-color', invert(prefs['bg-color']));
    style.setProperty('--bg-color-inverted', prefs['bg-color']);
  }
  if ('bg-light-color' in prefs) {
    style.setProperty('--bg-light-color', invert(prefs['bg-light-color']));
  }
  if ('link-color' in prefs) {
    style.setProperty('--link-color-inverted', prefs['link-color']);
    style.setProperty('--link-color', invert(prefs['link-color']));
    style.setProperty('--gm-colortextbutton-ink-color', invert(prefs['link-color']));
  }
  if ('visited-color' in prefs) {
    style.setProperty('--visited-color', invert(prefs['visited-color']));
  }
  if ('link-header-color' in prefs) {
    style.setProperty('--link-header-color', invert(prefs['link-header-color']));
  }
  if ('link-visited-header-color' in prefs) {
    style.setProperty('--link-visited-header-color', invert(prefs['link-visited-header-color']));
  }
  if ('front-color' in prefs) {
    style.setProperty('--front-color', invert(prefs['front-color']));
  }
  if ('selection-color' in prefs) {
    style.setProperty('--selection-color', invert(prefs['selection-color']));
  }
  if ('selection-bg' in prefs) {
    style.setProperty('--selection-bg', invert(prefs['selection-bg']));
  }
  if ('button-bg' in prefs) {
    style.setProperty('--button-bg', invert(prefs['button-bg']));
  }
  css.textContent = prefs['custom-css'];
};

chrome.storage.local.get({
  'enabled': true,
  'bg-color': '#101111',
  'bg-light-color': '#292a2c',
  'link-color': '#9bb6df',
  'visited-color': '#906f51',
  'link-header-color': '#6b886b',
  'link-visited-header-color': '#8a7885',
  'front-color': '#e9e8e7',
  'selection-color': '#eeeeee',
  'selection-bg': '#404040',
  'button-bg': '#1a73e8',
  'custom-css': '',
  'exclude-images': false,
  'exclude-photos': false,
  'exclude-translate': false,
  'exclude-blog': false,
  'exclude-books': false,
  'exclude-discussions': false,
  'exclude-news': false,
  'exclude-places': false,
  'exclude-recipes': false,
  'exclude-shopping': false,
  'exclude-video': false,
  'exclude-scholar': false
}, update);

chrome.storage.onChanged.addListener(ps => {
  const prefs = Object.keys(ps).reduce((p, c) => {
    p[c] = ps[c].newValue;
    return p;
  }, {});
  update(prefs);
});
