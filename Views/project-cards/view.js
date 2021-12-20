let projects = input.projects;
let order    = input.order || 'asc';

// SORT
projects = projects.sort( project => {

	// DATE
	let date = moment( ( project.notes && Object.keys(project.notes).length ) ? Object.keys(project.notes)[0] : null ).unix();
	
	// PRIORITY
	let priority = project.priority || 9;

	// TITLE
	let title = project.title || project.file.name;
	
	return `${date}-${priority}-${title}`; // default
	
}, order);

// RENDER
let html = `<section class="project-cards">`;

for (let i = 0; i < projects.length; i++) {

	const project = projects[i];

	// Jump ahead to get the most relevant date.
	let now = moment();

	if ( project.status == 'todo' && project.notes && Object.keys(project.notes).length ) {
		projectTimestamp = Object.keys(project.notes)[0];
		let projectDate  = moment( projectTimestamp );

		if ( projectDate.format('YYYY MM DD') == now.format('YYYY MM DD') || projectDate.unix() <= now.unix() ) {
			project.status = 'today';
		}
	}
	
	html += `<article class="project-card">`;
		
	// ICON
	if ( project.status ) html += `<span class="project-card-status" data-status="${project.status}">&nbsp;</span>`;

	// TITLE
	let title = project.title || project.file.name;
	html += `<h1 class="project-card-title"><a href="${project.file.name}" data-href="${project.file.name}" class="internal-link">${title}</a></h1>`;

	// CODE
	html += `<div class="project-card-meta">`;

	if ( project.code ) html += `<span class="project-card-code">${project.code}</span>`;

	html += '</div>';

	// NOTES
	if ( project.notes && Object.keys(project.notes).length ) { for (let l = 0; l < Object.keys(project.notes).length; l++) {
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
			displayDate += ' <span class="project-card-sep">•</span> ' + noteDate.format( 'h:mm a' );
		}

		html += `<div class="project-card-note">
			<span class="project-card-note-date" title="${noteDate}">${displayDate}</span>
			<span class="project-card-note-text" title="${noteDate}">${noteText}</span>
		</div>`;
			
	}}

	// LINKS
	html += `<div class="project-card-meta">`;

	if ( project.links && Object.keys(project.links).length ) { for (let l = 0; l < Object.keys(project.links).length; l++) {
		let linkText = Object.keys(project.links)[l];
		let linkURL  = project.links[ linkText ];
		html += `<a class="project-card-link" href="${linkURL}">${linkText}</a>`;
			
	}}

	html += '</div>';

	html += '</div>';

	html += '</article>';

}

html += `</section>`;

return html;
