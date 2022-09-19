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

function enrichHeader() {
    fetch(relativePath + '/plugins/themes/publications-theme/js/idai-world-header.html')
        .then(response => response.text())
        .then(text => {
            const navigationUserElement = document.getElementById('navigationUser');

            const idaiWorldNavDropdown = document.createElement('li');
            idaiWorldNavDropdown.id = 'idai-world-dropdown';
            idaiWorldNavDropdown.class = 'dropdown-menu';
            idaiWorldNavDropdown.innerHTML = text;

            const languageDropDown = document.createElement('li');
            languageDropDown.id = 'language-dropdown';
            languageDropDown.class = 'dropdown-menu';
            languageDropDown.ariaHasPopup = 'true';

            const iDAIpublicationsLogo = document.createElement('img');
            iDAIpublicationsLogo.id = 'idai-publications-logo';
            iDAIpublicationsLogo.src =
                relativePath + '/plugins/themes/publications-theme/images/idai-publications-logo.png';

            idaiWorldNavDropdown.appendChild(iDAIpublicationsLogo);
            navigationUserElement.appendChild(idaiWorldNavDropdown);

            /* add LanguageDropdown to dai-header
            * --------------------------------------*/
            languageDropDown.innerHTML =
                "<ul>" +
                "    <li><a href='" + relativePath + "/index/user/setLocale/de_DE?source=" + window.location.pathname + "'>Deutsch</a></li>" +
                "    <li><a href='" + relativePath + "/index/user/setLocale/en_US?source=" + window.location.pathname + "'>English</a></li>" +
                "    <li><a href='" + relativePath + "/index/user/setLocale/es_ES?source=" + window.location.pathname + "'>Español</a></li>" +
                "    <li><a href='" + relativePath + "/index/user/setLocale/fr_FR?source=" + window.location.pathname + "'>Français</a></li>" +
                "    <li><a href='" + relativePath + "/index/user/setLocale/it_IT?source=" + window.location.pathname + "'>Italiano</a></li>" +
                "    <li><a href='" + relativePath + "/index/user/setLocale/pt_PT?source=" + window.location.pathname + "'>Português</a></li>" +
                "</ul>";

            const langGlobeImage = document.createElement('img');
            langGlobeImage.id = 'header-lang-globe';
            langGlobeImage.src =
                relativePath + '/plugins/themes/publications-theme/images/language-icon.png';

            languageDropDown.appendChild(langGlobeImage);
            navigationUserElement.appendChild(languageDropDown);

            document.getElementById('header-lang-globe').src =
                relativePath + '/plugins/themes/publications-theme/images/language-icon.png';

            document.getElementById('idai-publications-logo').src =
                relativePath + '/plugins/themes/publications-theme/images/idai-publications-logo.png';

            /* add DAI-Logo to pkp_site_name-Header
            * --------------------------------------*/
            const pkpSiteNameHeader = document.getElementsByClassName('pkp_site_name');

            const DaiLogo = document.createElement('a');
            DaiLogo.id = "dai-logo"
            DaiLogo.href = "https://www.dainst.org/";

            const DaiLogoImage = document.createElement('img');
            DaiLogoImage.id = 'dai-logo-img';
            DaiLogoImage.src =
                relativePath + '/plugins/themes/publications-theme/images/dai-logo-weiß.png';

            DaiLogo.appendChild(DaiLogoImage);
            pkpSiteNameHeader[0].appendChild(DaiLogo);
        });
}

function attachFooter() {
    fetch(relativePath + '/plugins/themes/publications-theme/js/idai-world-footer.html')
        .then(response => response.text())
        .then(text => {
            const pkpStructurePage = document.getElementsByClassName('pkp_structure_page');

            const idaiWorldFooter = document.createElement('footer');
            idaiWorldFooter.id = 'idai-world-footer';

            const footerContainer = document.createElement('div');
            footerContainer.id = 'footer-container';
            footerContainer.innerHTML = "" +
                "<p>" +
                "<span id=\"contact\">Contact: " +
                "       <a href=\"mailto:idai.publications@dainst.de\">idai.publications@dainst.de</a>" +
                "</span>" +
                "</p>";

            const footerAdditionalRow = document.createElement('div');
            footerAdditionalRow.id = 'footer-additional-row';
            footerAdditionalRow.innerHTML = "" +
                "<p>" +
                "<span class=\"slogan\">iDAI.publications is a service of the German Archaeological Institute.</span>" +
                "<span class=\"links\">" +
                "   <a href=\"https://www.dainst.org/en/datenschutz\" target=\"_blank\">Data Protection Regulation</a>" +
                "</span>" +
                "<span class=\"links\">" +
                "   <a href=\"index.php/index/about/privacy\" target=\"_blank\">Legal notice</a>" +
                "</span>" +
                "<span>" +
                "   <a href=\"index/about/aboutThisPublishingSystem\" target=\"_blank\">" +
                "   About Publishing System</a>" +
                "<span>" +
                "<p>";

            const footerLogo = document.createElement('img');
            footerLogo.id = 'idai-footer-logo';
            footerLogo.src =
                relativePath + '/plugins/themes/publications-theme/images/idai_footer.png';

            idaiWorldFooter.appendChild(footerContainer);
            idaiWorldFooter.appendChild(footerAdditionalRow);
            footerContainer.appendChild(footerLogo);
            pkpStructurePage[0].appendChild(idaiWorldFooter);

        });
}

/** attach "has_site_logo" class to body by default:
 * ---------------------------------------------------
  *  .has_site_logo is defined in default-theme
  *  attaching it to the body-element simplifies some style issues for pages,
     which have no text-logo-img (e.g. journal and books index page and certain journals)
 * ---------------------------------------------------
**/

function attachSiteLogoClassToBody() {
    document.body.classList.add('has_site_logo');
}

attachSiteLogoClassToBody();
attachHeaderClass();
attachFooter();
enrichHeader();




