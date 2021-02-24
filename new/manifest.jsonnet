// Use this command to generate an up to date list:
// curl -s https://www.google.com/supported_domains | sed -E -e 's/^\.google//' | awk '{printf "'"'"'%s'"'"', ", $1}'
local countries = ['.com', '.ad', '.ae', '.com.af', '.com.ag', '.com.ai', '.al', '.am', '.co.ao', '.com.ar', '.as', '.at', '.com.au', '.az', '.ba', '.com.bd', '.be', '.bf', '.bg', '.com.bh', '.bi', '.bj', '.com.bn', '.com.bo', '.com.br', '.bs', '.bt', '.co.bw', '.by', '.com.bz', '.ca', '.cd', '.cf', '.cg', '.ch', '.ci', '.co.ck', '.cl', '.cm', '.cn', '.com.co', '.co.cr', '.com.cu', '.cv', '.com.cy', '.cz', '.de', '.dj', '.dk', '.dm', '.com.do', '.dz', '.com.ec', '.ee', '.com.eg', '.es', '.com.et', '.fi', '.com.fj', '.fm', '.fr', '.ga', '.ge', '.gg', '.com.gh', '.com.gi', '.gl', '.gm', '.gr', '.com.gt', '.gy', '.com.hk', '.hn', '.hr', '.ht', '.hu', '.co.id', '.ie', '.co.il', '.im', '.co.in', '.iq', '.is', '.it', '.je', '.com.jm', '.jo', '.co.jp', '.co.ke', '.com.kh', '.ki', '.kg', '.co.kr', '.com.kw', '.kz', '.la', '.com.lb', '.li', '.lk', '.co.ls', '.lt', '.lu', '.lv', '.com.ly', '.co.ma', '.md', '.me', '.mg', '.mk', '.ml', '.com.mm', '.mn', '.ms', '.com.mt', '.mu', '.mv', '.mw', '.com.mx', '.com.my', '.co.mz', '.com.na', '.com.ng', '.com.ni', '.ne', '.nl', '.no', '.com.np', '.nr', '.nu', '.co.nz', '.com.om', '.com.pa', '.com.pe', '.com.pg', '.com.ph', '.com.pk', '.pl', '.pn', '.com.pr', '.ps', '.pt', '.com.py', '.com.qa', '.ro', '.ru', '.rw', '.com.sa', '.com.sb', '.sc', '.se', '.com.sg', '.sh', '.si', '.sk', '.com.sl', '.sn', '.so', '.sm', '.sr', '.st', '.com.sv', '.td', '.tg', '.co.th', '.com.tj', '.tl', '.tm', '.tn', '.to', '.com.tr', '.tt', '.com.tw', '.co.tz', '.com.ua', '.co.ug', '.co.uk', '.com.uy', '.co.uz', '.com.vc', '.co.ve', '.vg', '.co.vi', '.com.vn', '.vu', '.ws', '.rs', '.co.za', '.co.zm', '.co.zw', '.cat'];
local domains = [
      "www.google",
      "scholar.google",
      "images.google",
      "news.google",
      "encrypted.google",
      "accounts.google",
      "myaccount.google",
      "translate.google"
];
local match_list = [
  '*://' + domain + country + '/*'
  for domain in domains
  for country in countries
];
{
  "manifest_version": 2,
  "version": "0.4.7",
  "name": "Dark Theme for Google™",
  "description": "__MSG_app_description__",
  "default_locale": "en",
  "permissions": [
    "storage",
    "alarms",
    "idle",
    "*://www.gstatic.com/*"
  ],
  "content_scripts": [{
    "matches": match_list,
    "include_globs": [
      "*://www.google.*/",
      "*://www.google.*/*",
      "*://scholar.google.*/*",
      "*://images.google.*/*",
      "*://news.google.*/*",
      "*://encrypted.google.*/*",
      "*://accounts.google.*/*",
      "*://myaccount.google.*/*",
      "*://translate.google.*/*"
    ],
    "exclude_globs": [
      "*://www.google.*/recaptcha/*",
      "*://www.google.*/maps*"
    ],
    "js": ["data/inject.js"],
    "css": ["data/styles/common.css"],
    "run_at": "document_start"
  }, {
    "matches": match_list,
    "include_globs": [
      "*://www.google.*/?*",
      "*://www.google.*/",
      "*://www.google.*/search?*",
      "*://www.google.*/webhp?*"
    ],
    "css": ["data/styles/search.css"],
    "run_at": "document_start"
  }, {
    "matches": match_list,
    "include_globs": ["*://translate.google.*/*"],
    "css": ["data/styles/translate.css"],
    "run_at": "document_start"
  }, {
    "matches": match_list,
    "include_globs": [
      "*://scholar.google.*/*"
    ],
    "css": ["data/styles/scholar.css"],
    "run_at": "document_start"
  }, {
    "matches": match_list,
    "include_globs": [
      "*://www.google.*/doodles"
    ],
    "css": ["data/styles/doodles.css"],
    "run_at": "document_start"
  }, {
    "matches": match_list,
    "include_globs": [
      "*://*.google.*/widget/app/*",
      "*://*.google.*/u/*/widget/app*"
    ],
    "js": ["data/inject.js"],
    "css": ["data/styles/common.css"],
    "run_at": "document_start",
    "all_frames": true
  }],
  "background": {
    "persistent": false,
    "scripts": [
      "background.js"
    ]
  },
  "icons": {
    "16": "data/icons/16.png",
    "32": "data/icons/32.png",
    "48": "data/icons/48.png",
    "64": "data/icons/64.png",
    "128": "data/icons/128.png",
    "256": "data/icons/256.png",
    "512": "data/icons/512.png"
  },
  "homepage_url": "https://add0n.com/dark-theme.html?from=google",
  "options_ui": {
    "page": "data/options/index.html",
    "chrome_style": true
  },
  "browser_action": {}
}
