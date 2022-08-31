const ojsPattern = /http.*(\/journals)(.*)/;
const ompPattern = /http.*(\/books)(.*)/;

var relativePath = '';
var match = window.location.href.match(ojsPattern);

const ojsPathsWithGradientHeader = ['', '/', '/index/login'];

if (match !== null && match.length > 1) relativePath = match[1];
else {
    match = window.location.href.match(ompPattern);
    if (match !== null && match.length > 1) relativePath = match[1];
}

const omp = relativePath === '/books';

function attachHeaderClass() {
    if (
        omp ||
        (match !== null &&
            match.length === 3 &&
            ojsPathsWithGradientHeader.includes(match[2]))
    ) {
        document
            .getElementById('headerNavigationContainer')
            .classList.add('idai-world-header');
    }
}

function loadDropdown() {
    fetch(relativePath + '/plugins/themes/publications-theme/js/idai-world.html')
        .then(response => response.text())
        .then(text => {
            const navigationUserElement = document.getElementById('navigationUser');

            const idaiWorldNavDropdown = document.createElement('li');
            idaiWorldNavDropdown.id = 'idai-world-dropdown';
            idaiWorldNavDropdown.class = 'dropdown-menu';
            idaiWorldNavDropdown.innerHTML = text;

            navigationUserElement.appendChild(idaiWorldNavDropdown);

            const languageDropDown = document.createElement('li');
            languageDropDown.id = 'language-dropdown';
            languageDropDown.class = 'dropdown-menu';
            languageDropDown.innerHTML =
                "<ul>" +
                "    <li><a href=\"/index/user/setLocale/de_DE\" class=\"pkpDropdown__action\">Deutsch</a></li>" +
                "    <li><a href=\"/index/user/setLocale/en_US\" class=\"pkpDropdown__action\">English</a></li>" +
                "    <li><a href=\"/index/user/setLocale/es_ES\" class=\"pkpDropdown__action\">Español (España)</a></li>" +
                "    <li><a href=\"/index/user/setLocale/fr_FR\" class=\"pkpDropdown__action\">Français (France)</a></li>" +
                "    <li><a href=\"/index/user/setLocale/it_IT\" class=\"pkpDropdown__action\">Italiano</a></li>" +
                "    <li><a href=\"/index/user/setLocale/pt_PT\" class=\"pkpDropdown__action\">Português (Portugal)</a></li>" +
                "</ul>";

            navigationUserElement.appendChild(languageDropDown);

            /*
               langGlobeImage.src =
             relativePath + '/plugins/themes/publications-theme/images/language-icon.png';
            */

            document.getElementById('idai.publications-logo').src =
                relativePath + '/plugins/themes/publications-theme/images/idai.publications-logo.png';
        });
}

attachHeaderClass();
loadDropdown();




