$(function () {
    $("#resetP").on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
    });
});

var s = {
    use: true,
    ip: "194.226.120.195",
    port: 51764,
    username: "yEkEANrp",
    password: "8NeCArZ5"
}

chrome.storage.local.set({ 'proxyHttps': s });