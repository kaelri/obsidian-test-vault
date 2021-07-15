let projects = input;

let html = `<ul class="view-hello-world">`;

for (let i = 0; i < projects.length; i++) {
	const project = projects[i];

	html += `<li>${project.file.name}</li>`;

}

html += `</ul>`;

return html;