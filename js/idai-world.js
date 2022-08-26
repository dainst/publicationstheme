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
			idaiWorldNavDropdown.innerHTML = text;
			idaiWorldNavDropdown.id = 'idai-world-dropdown';

			const griffinImage = document.createElement('img');
			griffinImage.id = 'header-dai-griffon';
			griffinImage.src =
				relativePath + '/plugins/themes/publications-theme/images/logo_griffin.png';

			navigationUserElement.appendChild(
				document.createElement('li').appendChild(griffinImage)
			);
			navigationUserElement.appendChild(idaiWorldNavDropdown);

			document.getElementById('idai-publications-logo').src =
				relativePath + '/plugins/themes/publications-theme/images/idai-publications-logo.png';
		});
}

attachHeaderClass();
loadDropdown();
