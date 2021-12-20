let project = dv.current();

// RENDER
html = `<header class="project-header">
<div class="project-header-inner">`;

// Jump ahead to get the most relevant date.
let now = moment();

if ( project.status == 'todo' && project.notes && Object.keys(project.notes).length ) {
	projectTimestamp = Object.keys(project.notes)[0];
	let projectDate  = moment( projectTimestamp );

	if ( projectDate.format('YYYY MM DD') == now.format('YYYY MM DD') || projectDate.unix() <= now.unix() ) {
		project.status = 'today';
	}
}

// ICON
if ( project.status ) html += `<span class="project-header-status" data-status="${project.status}">&nbsp;</span>`;

// TITLE
let title = project.title || project.file.name;
html += `<h1 class="project-header-title">${title}</h1>`;

// CODE
if ( project.code ) {
	html += `<div class="project-header-meta-title">Code</div>
	<div class="project-header-meta-text">${project.code}</div>`;
}

// NOTES
if ( project.notes && Object.keys(project.notes).length ) { 

	html += `<div class="project-header-meta-title">Dates</div>
	
	<table class="project-header-notes">`;
	
	for (let l = 0; l < Object.keys(project.notes).length; l++) {
		const noteTimestamp = Object.keys(project.notes)[l];
		const noteText      = project.notes[ noteTimestamp ];

		let noteDate        = moment( noteTimestamp );
		let noteHasTime     = ( noteTimestamp.split(' ').length > 1 );
		
		let sameYear        = ( now.format('YYYY') == noteDate.format('YYYY') );

		let displayDate     = noteDate.calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: ( sameYear ? 'D MMMM' : 'D MMMM YYYY' ),
		});

		if ( noteHasTime ) {
			displayDate += ' <span class="project-header-sep">•</span> ' + noteDate.format( 'h:mm a' );
		}

		html += `<tr class="project-header-note">
			<td class="project-header-note-date" title="${noteDate}">${displayDate}</td>
			<td class="project-header-note-text" title="${noteDate}">${noteText}</td>
		</tr>`;
			
	}

	html += `</table>`;

}

// LINKS
html += `<div class="project-header-meta">`;

if ( project.links && Object.keys(project.links).length ) {

	html += `<div class="project-header-meta-title">Links</div>`;
	
	for (let l = 0; l < Object.keys(project.links).length; l++) {
		let linkText = Object.keys(project.links)[l];
		let linkURL  = project.links[ linkText ];
		html += `<a class="project-header-link" href="${linkURL}"><span class="project-header-link-text">${linkText}</span><br><span class="project-header-link-url">${linkURL}</span></a>`;
			
	}

	html += `</div>`;

}

html += `</div>
</header>`;

return html;
