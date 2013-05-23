# Viperfish Release History

v0.4.6 - 23.05.13

* Fixes for server crashes due to 404
* Proper 404 error route

v0.4.5

* Change to vpf.init() API
* Added authentication callbacks

v0.4.4

* Viperfish public API and dev API established - see [wiki](https://github.com/mattstyles/viperfish/wiki "viperfish wiki")
* Mechanism for adding modules to the viperfish core

v0.4.3

* Content delivery mechanism API defined and viperfish now uses it to collect content

v0.4.2

* Content delivery method extracted from viperfish
* Viperfish now requires a content delivery method to be installed alongside it, for now only [Octofish](https://github.com/mattstyles/octofish "Octofish - Github Delivery System for Viperfish") is available

v0.4.1

* Minor bug fix release
* Initial decoupling from content delivery mechanism
* [Grunt](http://gruntjs.com/ "Grunt - The Javascript Task Runner") build - only [linting](http://www.jshint.com/ "JSHint") task

v0.4.0 -- 15.03.13

* Minimal custom theme support
* Content delivery via [github](https://github.com/ "GitHub")
* [Markdown](http://daringfireball.net/projects/markdown/ "Daring Fireball | Markdown") support via [Marked](https://github.com/chjj/marked "Markdown Parser") - including [Github Flavoured Markdown](https://help.github.com/articles/github-flavored-markdown "Github Flavoured Markdown")!
* Usage examples - working example using [Nodejitsu](https://www.nodejitsu.com/ "Nodejitsu")
* Custom configuration options
* Install via [npm](https://npmjs.org/ "Node Package Manager")
* Templating via [Hogan](http://twitter.github.com/hogan.js/ "Hogan.js Templating Engine") and [Consolidate](http://jsdoc.info/visionmedia/consolidate.js/ "Consolidate.js")
* System runs on the [Express](http://expressjs.com/ "Express Web App Framework for Node") framework