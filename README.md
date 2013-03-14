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

### How Viperfish Works

Viperfish works by grabbing content from a github repo, passing it through a theme to style it and displaying it in
the browser.  In order to make viperfish work for you you'll need to create some [content](#creating-content "How to create content")
and you'll need to create a theme to display that content.

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

You can see an example of a config file in the [github repo](https://github.com/mattstyles/viperfish/blob/master/config.js "config").

####_highlight.js_

The first line to require highlight.js is only required if you alter the markdown parser options later in the config
file.

####_Module Options_

This object holds the options for setting up the viperfish module.

`nav` - Array of navigation menu options if, for some reason, you want your navigation menu to differ from the options
found in your content repository's main.json (see [creating content](#creating-content "How to Create Content")).

`port` - The port to use when sparking up viperfish locally.

`customPath` - This is the directory that holds the theme files (such as css, js & templates).

`favicon` - The filename of the favicon to use, contained in the `/customPath/`.

`logo` - The logo that is associated with the website, some themes will require it, others not.

####_Template Options_

Viperfish uses the [Express](http://expressjs.com/ "Express") web application framework and supports templates to create
it's themes.

`engine` - The templating engine to use, currently only [hogan.js](http://twitter.github.com/hogan.js/ "Hulkamania Is Running Wild")
is supported.  Behind the scenes viperfish uses [consolidate.js](http://jsdoc.info/visionmedia/consolidate.js/ "Consolidate.js")
to push templates to the express view engine.

`path` - This is the path location of the templates, found within `moduleOpts.customPath/templates/`.

####_GithubApi Options_

To grab content from github repositories to use as content Viperfish uses [node-github](https://github.com/mikedeboer/node-github "Javascript GitHub API")
as a wrapper around the [Github API v3](http://developer.github.com/v3/ "GitHub API v3").

`apiOpts` - This contains the version of the api to wrap and a timer in milliseconds before the call to the api fails.

`contentOpts` - This is primary means of pointing Viperfish to your content, enter the username and repository name and,
very importantly, leave `path` as `null` (it'll be over-written anyway but, to be sure, leave it in the config for now).

####_Marked Options_

Viperfish uses [Marked](https://github.com/chjj/marked "Markdown Parser") to parse the raw markdown data because Marked
is just so awesome!

There are various options and if you want to fiddle with them its best to read the info from the [Marked](https://github.com/chjj/marked "Markdown Parser") github repo.

### Custom Templates

This is where customising Viperfish gets really interesting.  Viperfish currently only supports [hogan.js](http://twitter.github.com/hogan.js/ "Hulkamania Is Running Wild")
templates but hogan is a versatile and powerful templating engine, if you haven't used hogan yet then read the hogan docs
for more info on how to use partials and the other features of the templating engine.  Templating is powerful, get using
it and get creative!

At the moment Viperfish isn't particularly sophisticated in it's template structure so when you create your own custom
template folder you'll need to create (or copy) each template into the folder (unlike the config options, viperfish won't
yet fall back to use default templates when it can't find one although this functionality is planned for the near
future).

Viperfish requires 7 basic templates but the content of those templates is not static so you can define how each template
works how you like - be aware though that Vipefish will be making calls to the templates but it is mostly just including
them so you could use them in different ways.  To see how they are included in Viperfish have a poke around in `lib/routes`.
I'll outline the basic functionality of each template in the default scheme, also check out the [examples](#usage-examples "Viperfish in the wild")
to see how other themes use the template system.

####_error.hjs_

The error template to display when an error occurs (usually this is an error collected content from github but it will
potentially be other things).  It's due to be changed for a 404 template pretty soon.

####_main.hjs_

This is the main template that is called when displaying the opening page or a category page.  It is used to call in the
other partials - first the `header`, then the main body of the category listing from `listpost` and finally the `footer`.

####_header.hjs_

Sets up the opening HTML5 `<html>` tag, sorts out the `<head>` section, calls the `nav` template after opening the `<body>`.

####_nav.hjs_

Creates the main navigation menu.

####_listpost.hjs_

This template loops through items contained within the content meta file (see the [creating content](#creating-content "How to Create Content")
section) and displays them.

####_footer.hjs_

Displays the footer.

####_post.hjs_

The post template functions similarly to the main template in that it calls in partials for the `header` and `footer` but
in between it displays the main content of the post/page that has been grabbed from Github and parsed using Marked.

### Custom Static Files

The other half of customising Viperfish - those lovingly crafted CSS files that define the look and feel of your project
should be included in here.  Any images that your theme uses can also be included here, as should any javascript that
you want to use in your theme.

### Custom Favicon

Viperfish isn't limited to it's own favicon, place yours in the custom directory you set in `config.moduleOpts.customPath`
and Viperfish will use that.

## Creating Content

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
