# viperfish

Node/Github Markdown Blogging System

__Early Alpha__

_Use with discretion!_

Viperfish is a simple blogging system that grabs content from a github repo.

It is currently in early alpha and, as such, its not particularly robust but if you follow the rules it'll work, it
just wont be pretty!

Follow the getting started instructions to see it in action (I told you, its not pretty!)

Customising it to point to your own content currently means that the content has to be in a specific format (it'll blow
up if it's not) and that you go poking around in the module to set the path to the content.

To set your content path have a look in `/lib/vpf-config.js` and change `githubapi.contentOpts` to point to
your public repo (keep `path` set to null - viperfish will work this out).

It is currently pointing to some default dummy content - to have a look at the required format for the content go
[here](https://github.com/mattstyles/vpf-def).  Very briefly - the repo root needs a `main.json`, each subfolder
(which forms a category) requires a `category.json` and each subfolder within that (which forms a post) requires
a `page.json` and a `content.md`.

I wouldn't recommend using in situ yet but if you do you'll need to authenticate with github to grab your content.  Set
up `GHusername` and `GHpassword` environment variables for basic authentication.

## Getting Started
Install the module with: `npm install viperfish`

Stick this in your start script (i.e `start.js`)

```javascript
require('viperfish').start();
```

Fire up your start script `node start`

Have a look at it

`curl -i -X GET http://localhost:3001`

or point your browser to

`localhost:3001`

## Customising

_Config_

Have a look in `/lib/vpf-config.js` for various things to set.  To point to your own content you'll want to change the
`githubapi.contentOpts` object to contain your username and the name of the repository.  It's only been tested with
public repos but authorisation occurs so private repos probably will work fine.

_GitHub Authorisation_

Speaking of authorisation - it'll work without but you'll be rate limited by GitHub to 60 requests per hour.  To authorise
you need to set `GHusername` and `GHpassword` environment variables.

_Static Assets_

If a `public` folder exists at the root then Viperfish will serve CSS and JS from there rather than its own defaults.
If you additionally place a `templates` folder into your `public` directory then your templates will come from there
too.  There is currently limited support for templates and a great chance of blowing up - to limit blow-up chances if
you want custom templates then you'll need to create all of them.  Best bet is to copy and paste the entire templates
directory into the project root and then change as needed.

## Documentation
_(Coming soon)_

## Usage Examples
_(Coming soon)_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Matt Styles  
Licensed under the MIT license.
