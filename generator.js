const form = document.getElementById('form');
const srcUrl = document.getElementById('url');
const resultUrl = document.getElementById('result_url');
const replaceDomainInput = document.getElementById("replace");

// settings boilerplate
let settings = {
    "autoCopy": false,
    "autoRedirect": true,
    "replaceDomain": 'https://nitter.ca/'
};

replaceDomainInput.oninput = function () {
    settings.replaceDomain = this.value;
    saveSetting();
};

[...document.querySelectorAll(".settings")].forEach(a => {
    a.onchange = function() {
        settings[this.id] = this.checked;
        saveSetting();
    }
});
function saveSetting() {
    localStorage.setItem("settings", JSON.stringify(settings))
}

function init() {
    const storage = localStorage.getItem("settings");

    storage && (settings = JSON.parse(storage));

    [...document.querySelectorAll(".settings")].forEach(input => {
        input.checked = settings[input.id];
    });
    replaceDomainInput.value = settings.replaceDomain;
}

init();

//core

form.onsubmit = function (e) {
    e.preventDefault();
    resultUrl.value = getRedirectUrl(srcUrl.value);
    if (settings.autoCopy) {
        copyUrl();
    }
    if (settings.autoRedirect) {
        window.location = resultUrl.value;
    }
};
function getRedirectUrl(twitterUrl) {
    return twitterUrl.replace(/(.*?twitter.com\/)/g, settings.replaceDomain);
}

function copyUrl() {
    resultUrl.select();
    resultUrl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(resultUrl.value);
}