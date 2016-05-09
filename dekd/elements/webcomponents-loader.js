/*  This will setup Polymer for the page

    Use by add this following line to code:
        <script>
            $.getScript('https://krerkkiat.github.io/dekd/elements/webcomponents-loader.js', function () {
                importElement("put element's name here");
            });
        </script>
 */
// Refer back to the elements folder in google drive.
var baseURL = 'https://krerkkiat.github.io/dekd/elements';

// Load webcomponentsjs
$.getScript(baseURL + "bower_components/webcomponentsjs/webcomponents.min.js");

var importElement = function (elementName, callback, customBaseURL) {
    var url = customBaseURL || baseURL;
    
    if (url[url.length - 1] !== '/') {
        url += '/';
    }
    
    var importElement = document.createElement('link');
    importElement.setAttribute('rel', 'import');
    importElement.setAttribute('href', url + "bower_components/" + elementName + "/" + elementName + ".html");
    document.querySelector('head').appendChild(importElement);
    
    if (callback) {
        // need a better way to determine that the importing is finish.
        window.setTimeout(function () {
            callback();
        }, 5000);
    }
};

// Function that will load element to the page.
var importCustomElement = function (elementName, callback, customBaseURL) {
    var url = customBaseURL || baseURL;
    
    if (url[url.length - 1] !== '/') {
        url += '/';
    }
    
    var importElement = document.createElement('link');
    importElement.setAttribute('rel', 'import');
    importElement.setAttribute('href', url  + elementName + "/" + elementName + ".html");
    document.querySelector('head').appendChild(importElement);
    
    if (callback) {
        window.setTimeout(function () {
            callback();
        }, 5000);
    }
};