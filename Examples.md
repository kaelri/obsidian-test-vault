# Examples

---

## Hello World

A simple view:

```dataviewjs

let projects = dv.pages().where( p => p.type === 'project' ).sort( p => p.title );

dv.view( 'hello-world', projects );

```

---

### Project Cards

A more complex view:

```dataviewjs

let projects = dv.pages().where( p => p.type === 'project' );

dv.view( 'project-cards', { projects: projects, order: 'asc' } );

```
