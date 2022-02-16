'use strict';

const translate = async id => {
  const lang = navigator.language.split('-')[0];
  translate.objects = translate.objects || await Promise.all([
    fetch('_locales/' + lang + '/messages.json').then(r => r.json()).catch(() => ({})),
    fetch('_locales/en/messages.json').then(r => r.json())
  ]);
  return translate.objects[0][id]?.message || translate.objects[1][id]?.message || id;
};

// System Color Preference
const scheme = matches => {
  chrome.storage.local.get({
    enabled: true,
    mode: 'user'
  }, prefs => {
    if (prefs.mode === 'system') {
      if (prefs.enabled && matches === false) {
        chrome.storage.local.set({
          enabled: false
        });
      }
      if (prefs.enabled === false && matches) {
        chrome.storage.local.set({
          enabled: true
        });
      }
    }
  });
};

try {
  matchMedia('(prefers-color-scheme: dark)').addListener(e => scheme(e.matches));
}
catch (e) {}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.method === 'excluded') {
    update('/excluded/', 'excluded', sender.tab.id);
  }
  else if (request.method === 'fetch') {
    fetch(request.href).then(r => r.text()).then(response).catch(e => {
      console.warn('cannot fetch', request.href, e.message);
    });
    return true;
  }
  else if (request.method === 'prefers-color-scheme') {
    scheme(request.matches);
  }
});

function update(loc, mode = 'enabled', tabId) {
  const o = {
    path: {
      '16': 'data/icons' + loc + '16.png',
      '32': 'data/icons' + loc + '32.png'
    }
  };
  if (tabId) {
    o.tabId = tabId;
  }
  chrome.action.setIcon(o);

  translate('name').then(name => chrome.action.setTitle({
    title: name + ` (${mode})`
  }));
}

chrome.action.onClicked.addListener(() => chrome.storage.local.get({
  enabled: true
}, prefs => {
  prefs.enabled = !prefs.enabled;
  chrome.storage.local.set(prefs);
}));

// Schedule
const alarm = (id, val) => {
  val = val.split(':');
  const d = new Date();
  d.setSeconds(0);
  d.setHours(val[0]);
  d.setMinutes(val[1]);

  const now = Date.now();
  const when = d.getTime();

  chrome.alarms.create(id, {
    when: when <= now ? when + 24 * 60 * 60 * 1000 : when,
    periodInMinutes: 24 * 60
  });
};
const idle = state => state === 'active' && configure();

chrome.storage.onChanged.addListener(prefs => {
  if (prefs['day-time'] || prefs['night-time'] || prefs['schedule']) {
    chrome.storage.local.get({
      'day-time': '19:00',
      'night-time': '08:00',
      'schedule': false
    }, prefs => {
      if (prefs.schedule) {
        alarm('day-time', prefs['day-time']);
        alarm('night-time', prefs['night-time']);
        chrome.idle.onStateChanged.removeListener(idle);
        chrome.idle.onStateChanged.addListener(idle);
        configure();
      }
      else {
        chrome.alarms.clear('day-time');
        chrome.alarms.clear('night-time');
        chrome.idle.onStateChanged.removeListener(idle);
      }
    });
  }
  if (prefs.enabled) {
    update(prefs.enabled.newValue ? '/' : '/disabled/', prefs.enabled.newValue ? 'enabled' : 'disabled');
  }
  if (prefs.mode && prefs.mode.newValue === 'system') {
    scheme(matchMedia('(prefers-color-scheme: dark)').matches);
  }
});

// status
const configure = () => chrome.storage.local.get({
  'day-time': '19:00',
  'night-time': '08:00'
}, prefs => {
  const day = prefs['day-time'].split(':').map((s, i) => s * (i === 0 ? 60 : 1)).reduce((p, c) => p + c, 0);
  let night = prefs['night-time'].split(':').map((s, i) => s * (i === 0 ? 60 : 1)).reduce((p, c) => p + c, 0);

  if (night <= day) {
    night += 24 * 60;
  }
  const d = new Date();
  const now = d.getMinutes() + d.getHours() * 60;

  chrome.storage.local.set({
    enabled: now >= day && now < night
  });
});
chrome.alarms.onAlarm.addListener(configure);

// start-up
{
  const once = () => chrome.storage.local.get({
    'enabled': true,
    'day-time': '19:00',
    'night-time': '08:00',
    'schedule': false
  }, prefs => {
    update(prefs.enabled ? '/' : '/disabled/', prefs.enabled ? 'enabled' : 'disabled');
    if (prefs.schedule) {
      alarm('day-time', prefs['day-time']);
      alarm('night-time', prefs['night-time']);
      chrome.idle.onStateChanged.removeListener(idle);
      chrome.idle.onStateChanged.addListener(idle);
      configure();
    }
  });
  // chrome.runtime.onInstalled.addListener(once);
  // chrome.runtime.onStartup.addListener(once);
  once(); // disable and re-enable the extension and test idle listener
}

/* FAQs & Feedback */
{
  const {management, runtime: {onInstalled, setUninstallURL, getManifest}, storage, tabs} = chrome;
  if (navigator.webdriver !== true) {
    const page = getManifest().homepage_url;
    const {name, version} = getManifest();
    onInstalled.addListener(({reason, previousVersion}) => {
      management.getSelf(({installType}) => installType === 'normal' && storage.local.get({
        'faqs': true,
        'last-update': 0
      }, prefs => {
        if (reason === 'install' || (prefs.faqs && reason === 'update')) {
          const doUpdate = (Date.now() - prefs['last-update']) / 1000 / 60 / 60 / 24 > 45;
          if (doUpdate && previousVersion !== version) {
            tabs.query({active: true, currentWindow: true}, tbs => tabs.create({
              url: page + '&version=' + version + (previousVersion ? '&p=' + previousVersion : '') + '&type=' + reason,
              active: reason === 'install',
              ...(tbs && tbs.length && {index: tbs[0].index + 1})
            }));
            storage.local.set({'last-update': Date.now()});
          }
        }
      }));
    });
    setUninstallURL(page + '&rd=feedback&name=' + encodeURIComponent(name) + '&version=' + version);
  }
}
