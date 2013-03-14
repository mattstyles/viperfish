# viperfish

Node/Github Database-less Markdown Blogging System

__Alpha v0.4.0__

_Use with discretion!_

Viperfish is a simple blogging system that grabs content from a github repo.

It is currently in early alpha and, as such, its not particularly robust but if you follow the rules it'll work just
fine, as demonstrated by the [examples](#usage-examples "Viperfish in the wild").

Follow the getting started instructions to see it in action (I warn you though, the vanilla version won't be pretty, see
the [customisation](#customisation "Customising Viperfish") section).

To get started see the [getting started](#getting-started "Installing Viperfish") section of course!


## Getting Started

Install viperfish with npm,

```javascript
npm install viperfish
```

Create a start script to spark up viperfish,

```
touch index.js
```

Stick this in your start script,

```javascript
require('viperfish').start();
```

That's all you need to get started with viperfish!!  Simple no?

To see it in action (remember what I said early about prettiness?), use node to fire up the server,

```
node index
```

Then have a look at it with (default port is `3001`),

```
curl -X GET http://localhost:3001
```

or point your browser to

```
localhost:3001
```

Whilst this is all very functional the default content and theme is pretty boring, you'll be wanting to improve upon
that with some customisations.


## Customisation

### Pre-requisites

Viperfish works by grabbing content from a github repo, passing it through a theme to style it and displaying it in
the browser.  In order to make viperfish work for you you'll need to create some content and you'll need to create
a theme to display that content.

When viperfish is started there are a number of steps that it will perform to transparently initialise itself:

* [Github Authorisation](#github-authorisation)

* [Register custom configuration file](#custom-configuration-file)

* [Register custom templates](#custom-templates)

* [Register custom static files](#custom-static-files)

* [Register custom favicon](#custom-favicon)

### Github Authorisation

If you followed through the [Getting Started](#getting-started "Installing Viperfish") section then you probably noticed
that viperfish threw this log at you,

```
No github credentials in environment vars --- Unauthorised access to github --- max rate limit of 60 reqs per hour
```

Basic github authorisation is not required for public repositories and the default repo that viperfish pulls dummy
content from is public so it'll connect to github and get the content for you with no problems.  However, basic authorisation
is limited to 60 requests per hour.

In order to lift the 60 requests per hour limit you can register 2 environment variables that viperfish will use to
authenticate properly with github.

`GHusername` - the owner of the content repo

`GHpassword` - the password of the repo owner

(For an example of setting environment variables have a look at how to setup a [nodejitsu app](#using-nodejitsu))

### Custom Configuration File

The config file is an object that holds a number of different configuration options that Viperfish uses.

For the sake of completeness this is an example config file that sets all of the config options (these are actually the
default options, any of these options can be omitted from your config file and viperfish will use the defaults),

```javascript
var hljs = require( 'highlight.js' );
module.exports = {
    // Module Options
    moduleOpts: {
        nav         : [],
        port        : 3001,
        customPath  : '/public/',
        favicon     : 'favicon.png',
        logo        : 'logo.png'
    },

    // Template Options
    tmplOpts: {
        engine  : 'hogan',
        path    : './default/'
    },

    // GithubApi Config Options
    githubapi : {
        apiOpts : {
            version     : '3.0.0',
            timeout     : 5000
        },
        contentOpts : {
            user        : 'mattstyles',
            repo        : 'vpf-def',
            path        : null
        }
    },

    // Marked Config Options
    markedOpts : {
        gfm         : true,
        tables      : true,
        breaks      : false,
        pedantic    : false,
        sanitize    : false,
        smartLists  : true,
        langPrefix  : 'language-',
        highlight   : function ( code, lang ) {
            // Javascript highlighting
            if ( lang === 'javascript' ) {
              return hljs.highlight(lang, code).value;
            }
            return code;
        }
    }
};
```

### Custom Templates

### Custom Static Files

### Custom Favicon

## Usage Examples
_(Coming soon)_

## Using Nodejitsu
_(Coming soon)_

## Documentation
_(Coming soon)_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Matt Styles  
Licensed under the MIT license.
