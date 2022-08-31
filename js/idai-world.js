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

            const setLocaleURL = "";

            languageDropDown.innerHTML =
                "<ul>" +
                "    <li><a href='https://publications.test.dainst.org/journals/index/user/setLocale/en_US?source=" + window.location.pathname + "'>Deutsch</a></li>" +
                "    <li><a href='https://publications.test.dainst.org/journals/index//user/setLocale/en_US?source=" + window.location.pathname + "'>English</a></li>" +
                "    <li><a href='https://publications.test.dainst.org/journals/index//user/setLocale/es_ES?source=" + window.location.pathname + "'>Español (España)</a></li>" +
                "    <li><a href='https://publications.test.dainst.org/journals/index//user/setLocale/fr_FR?source=" + window.location.pathname + "'>Français (France)</a></li>" +
                "    <li><a href='https://publications.test.dainst.org/journals/index//user/setLocale/it_IT?source=" + window.location.pathname + "'>Italiano</a></li>" +
                "    <li><a href='https://publications.test.dainst.org/journals/index//user/setLocale/pt_PT?source=" + window.location.pathname + "'>Português (Portugal)</a></li>" +
                "</ul>";

            const langGlobeImage = document.createElement('img');
            langGlobeImage.id = 'header-lang-globe';
            langGlobeImage.src =
                relativePath + '/plugins/themes/publications-theme/images/language-icon.png';

            languageDropDown.appendChild(langGlobeImage);
            navigationUserElement.appendChild(languageDropDown);

            document.getElementById('header-lang-globe').src =
                relativePath + '/plugins/themes/publications-theme/images/language-icon.png';

            document.getElementById('idai.publications-logo').src =
                relativePath + '/plugins/themes/publications-theme/images/idai.publications-logo.png';
        });
}

attachHeaderClass();
loadDropdown();




