let projects = input;

// SORT
projects.sort( function(project) {
	
	let statusPriorities = {
		important: 4,
		today:     3,
		todo:      2,
		wait:      1,
	}
	
	let priority = statusPriorities[ project.status ] || 0;
	
	
	if ( project.notes && Object.keys(project.notes).length ) {
		var date = moment( Object.keys(project.notes)[0] );
	} else {
		var date = moment();
	}
	
	let sortValue = `${priority}-${date.format()}`;
	
	return sortValue;
	
}, 'asc');

// RENDER
let html = `<section class="project-cards">`;

for (let i = 0; i < projects.length; i++) {

	const project = projects[i];
	
	html += `<article class="project">`;
		
	// ICON
	if ( project.status ) html += `<span class="project-status" data-status="${project.status}">&nbsp;</span>`;

	// TITLE
	let title = project.title || project.file.name;
	html += `<h1 class="project-title"><a href="${project.file.name}" data-href="${project.file.name}" class="internal-link">${title}</a></h1>`;

	// LINE 1
	html += `<div class="project-meta">`;

	if ( project.code ) html += `<span class="project-code">${project.code}</span>`;

	if ( project.links && Object.keys(project.links).length ) { for (let l = 0; l < Object.keys(project.links).length; l++) {
		const linkText = Object.keys(project.links)[l];
		const linkURL  = project.links[ linkText ];
		html += ` <span class="project-sep">•</span> <a class="project-link" href="${linkURL}">${linkText}</a>`;
			
	}}

	html += '</div>';

	if ( project.notes && Object.keys(project.notes).length ) { for (let l = 0; l < Object.keys(project.notes).length; l++) {
		const noteDate = Object.keys(project.notes)[l];
		const noteText  = project.notes[ noteDate ];

		html += `<div class="project-note">
			<span class="project-note-date">${moment(noteDate).calendar()}</span>
			<span class="project-note-text">${noteText}</span>
		</div>`;
			
	}}

	html += '</div>';

	html += '</article>';

}

html += `</section>`;

return html;
