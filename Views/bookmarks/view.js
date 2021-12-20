const bookmarks = input;

// RENDER
let html = `<section class="bookmarks">`;

for (let i = 0; i < bookmarks.length; i++) {
	
	const bookmark = bookmarks[i];

	const url  = String( bookmark['url']  || bookmark[1] || ''  );
	const text = String( bookmark['text'] || bookmark[0] || url );
	const note = String( bookmark['note'] || bookmark[2] || ''  );

	if ( !url.length ) continue;

	html += `<a class="bookmark" href="${url}">`;
	html += `<span class="bookmark-text">${text}</span>`;

	// Parse domain
	// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
	const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	const domain  = matches && matches[1];  // domain will be null if no match is found
	html += `<span class="bookmark-domain">${domain}</span>`;

	if ( note.length ) {
		html += `<span class="bookmark-note">${note}</span>`;
	}

	html += `</a>`;
			
}

html += `</section>`;

return html;
