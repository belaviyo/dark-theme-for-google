'use strict';

// localization
[...document.querySelectorAll('[data-i18n]')].forEach(e => {
  e[e.dataset.i18nValue || 'textContent'] = chrome.i18n.getMessage(e.dataset.i18n);
});

function toast(msg) {
  const status = document.getElementById('status');
  status.textContent = msg;
  clearTimeout(toast.id);
  toast.id = setTimeout(() => status.textContent = '', 750);
}


function save() {
  chrome.storage.local.set({
    'front-color': document.getElementById('front-color').value,
    'link-color': document.getElementById('link-color').value,
    'visited-color': document.getElementById('visited-color').value,
    'link-header-color': document.getElementById('link-header-color').value,
    'bg-color': document.getElementById('bg-color').value,
    'bg-light-color': document.getElementById('bg-light-color').value,
    'selection-color': document.getElementById('selection-color').value,
    'selection-bg': document.getElementById('selection-bg').value,
    'custom-css': document.getElementById('custom-css').value,
    'day-time': document.getElementById('day-time').value,
    'night-time': document.getElementById('night-time').value,
    'schedule': document.getElementById('schedule').checked,
    'mode': document.getElementById('scheme').checked ? 'system' : 'user',
    'faqs': document.getElementById('faqs').checked,
    'exclude-search': document.getElementById('exclude-search').checked,
    'exclude-images': document.getElementById('exclude-images').checked,
    'exclude-photos': document.getElementById('exclude-photos').checked,
    'exclude-translate': document.getElementById('exclude-translate').checked,
    'exclude-blog': document.getElementById('exclude-blog').checked,
    'exclude-books': document.getElementById('exclude-books').checked,
    'exclude-discussions': document.getElementById('exclude-discussions').checked,
    'exclude-news': document.getElementById('exclude-news').checked,
    'exclude-places': document.getElementById('exclude-places').checked,
    'exclude-recipes': document.getElementById('exclude-recipes').checked,
    'exclude-shopping': document.getElementById('exclude-shopping').checked,
    'exclude-video': document.getElementById('exclude-video').checked,
    'exclude-scholar': document.getElementById('exclude-scholar').checked,
    'exclude-messages': document.getElementById('exclude-messages').checked,
    'exclude-calendar': document.getElementById('exclude-calendar').checked,
    'exclude-dark-meta': document.getElementById('exclude-dark-meta').checked
  }, () => {
    toast(chrome.i18n.getMessage('options_saved'));
  });
}

const defaults = {
  'bg-color': '#101111',
  'bg-light-color': '#1d1e1f',
  'link-color': '#9bb6df',
  'visited-color': '#906f51',
  'link-header-color': '#6b886b',
  'selection-color': '#eeeeee',
  'selection-bg': '#404040',
  'front-color': '#aaa6a2',

  'custom-css': '',
  'day-time': '19:00',
  'night-time': '08:00',
  'schedule': false,
  'mode': 'user',
  'faqs': true,
  'exclude-search': false,
  'exclude-images': false,
  'exclude-photos': false,
  'exclude-translate': false,
  'exclude-blog': false,
  'exclude-books': false,
  'exclude-discussions': false,
  'exclude-news': true,
  'exclude-places': false,
  'exclude-recipes': false,
  'exclude-shopping': false,
  'exclude-video': false,
  'exclude-scholar': false,
  'exclude-messages': false,
  'exclude-calendar': false,
  'exclude-dark-meta': true
};

function restore() {
  chrome.storage.local.get(defaults, prefs => {
    Object.keys(prefs).forEach(pref => {
      if (pref === 'mode') {
        document.getElementById('scheme').checked = prefs.mode === 'system';
      }
      else {
        const e = document.getElementById(pref);
        e[e.type === 'checkbox' ? 'checked' : 'value'] = prefs[pref];
      }
    });
    document.getElementById('schedule').dispatchEvent(new Event('change'));
    document.getElementById('scheme').dispatchEvent(new Event('change'));
  });
}
document.addEventListener('DOMContentLoaded', restore);
document.addEventListener('submit', e => {
  e.preventDefault();
  save();
});
document.getElementById('reset').addEventListener('click', () => {
  Object.entries(defaults).forEach(([key, value]) => {
    const e = document.getElementById(key);
    if (e && e.type === 'checkbox') {
      e.checked = value;
    }
    else if (key === 'mode') {
      document.getElementById('scheme').checked = false;
    }
    else {
      e.value = value;
    }
  });
  document.getElementById('schedule').dispatchEvent(new Event('change'));
  document.getElementById('scheme').dispatchEvent(new Event('change'));

  toast(chrome.i18n.getMessage('options_reset_toast'));
});
// support
document.getElementById('support').addEventListener('click', () => chrome.tabs.create({
  url: chrome.runtime.getManifest().homepage_url + '&rd=donate'
}));

document.getElementById('scheme').addEventListener('change', e => {
  if (e.target.checked) {
    if (document.getElementById('schedule').checked) {
      document.getElementById('schedule').click();
    }
    document.getElementById('schedule').disabled = true;
  }
  else {
    document.getElementById('schedule').disabled = false;
  }
});
