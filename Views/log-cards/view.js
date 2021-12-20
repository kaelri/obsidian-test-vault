let pages = input;

// RENDER
let html = `<section class="log-cards">`;

for (let i = 0; i < pages.length; i++) {
	const page = pages[i];

	html += `<a href="${page.file.name}" data-href="${page.file.name}" class="internal-link log-card-link"><article class="log-card">`;

	let date     = moment(page.file.name);
	let title    = date.format('D MMMM, YYYY');
	let subtitle = date.format('dddd');
	
	html += `<h1 class="log-card-title">${title}</h1>`;
	html += `<div class="log-card-meta">${subtitle}</div>`;
	
	html += `</article></a>`;

}

html += `</section>`;

return html;
