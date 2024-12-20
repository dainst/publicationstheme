const ojsPattern = /http.*(\/journals)(.*)/;
const ompPattern = /http.*(\/books)(.*)/;

let relativePath = '';
let match = window.location.href.match(ojsPattern);
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
    fetch(relativePath + '/plugins/themes/publicationstheme/js/idai-world-header.html')
        .then(response => response.text())
        .then(text => {
            const navigationUserElement = document.getElementById('navigationUser');

            const idaiWorldNavDropdown = document.createElement('li');
            idaiWorldNavDropdown.id = 'idai-world-dropdown';
            idaiWorldNavDropdown.class = 'dropdown-menu';
            idaiWorldNavDropdown.innerHTML = text;

            const iDAIpublicationsLogo = document.createElement('img');
            iDAIpublicationsLogo.id = 'idai-publications-logo';
            iDAIpublicationsLogo.src =
                relativePath + '/plugins/themes/publicationstheme/images/idai-publications-logo.png';

            idaiWorldNavDropdown.appendChild(iDAIpublicationsLogo);
            navigationUserElement.appendChild(idaiWorldNavDropdown);

            document.getElementById('idai-publications-logo').src =
                relativePath + '/plugins/themes/publicationstheme/images/idai-publications-logo.png';

            /* add DAI-Logo to pkp_site_name-Header
            * --------------------------------------*/
            const pkpSiteNameHeader = document.getElementsByClassName('pkp_site_name');

            const DaiLogo = document.createElement('a');
            DaiLogo.id = "dai-logo"
            DaiLogo.href = "https://www.dainst.org/";

            const DaiLogoImage = document.createElement('img');
            DaiLogoImage.id = 'dai-logo-img';
            DaiLogoImage.src =
                relativePath + '/plugins/themes/publicationstheme/images/dai-logo-weiß.png';

            DaiLogo.appendChild(DaiLogoImage);
            pkpSiteNameHeader[0].appendChild(DaiLogo);
        });
}

function attachFooter() {
    fetch(relativePath + '/plugins/themes/publicationstheme/js/idai-world-footer.html')
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
                "   <a href=\"https://www.dainst.org/en/data-protection\" target=\"_blank\">Data Protection Regulation</a>" +
                "</span>" +
                "<span class=\"links\">" +
                "   <a href=\"https://publications.dainst.org/journals/index/termsOfUse\" target=\"_blank\">Legal notice</a>" +
                "</span>" +
                "<span>" +
                "   <a href=\"https://pkp.sfu.ca\" target=\"_blank\">" +
                "   About Publishing System</a>" +
                "<span>" +
                "<p>";

            const footerLogo = document.createElement('img');
            footerLogo.id = 'idai-footer-logo';
            footerLogo.src =
                relativePath + '/plugins/themes/publicationstheme/images/idai_footer.png';

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




