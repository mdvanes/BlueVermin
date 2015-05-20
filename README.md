# BlueVermin

> CLI and text-adventure interface for Blueriq.

```
()-().----.          .
 \"/` ___  ;________.'
  ` ^^   ^^
```
[logo source](http://www.chris.com/ascii/index.php?art=animals/rodents/mice)

![Screencast of Serious Business](https://raw.githubusercontent.com/mdvanes/BlueVermin/master/img/screencast.gif)

## Installation

Future versions will be installable through NPM, but will always require a configured and licensed Blueriq server.

Required:

* [Node/NPM](https://nodejs.org)
* A configured and licensed [Blueriq](http://www.blueriq.com) server (tested with Blueriq 9.4.1 Java)
* A game export in <BlueriqServer>/aquima.home/exports/

Installing:

* Run ```npm install bluevermin``` 
* Copy node_modules/bluevermin/UI/mvc/cli.stg to <BlueriqServer>/aquima.home/UI/mvc
* Configure aquima.properties to have a theme "cli" that points to cli.stg
* Go to node_modules/bluevermin and run ```npm start```


## Usage

* start Blueriq server
* run: ```node index.js```
* type ```help```


## TODO

* fix order of text items on last page
* show error if an unknown command is entered
* clean up State/Bsession/commands
* improve debugz or find out-of-the box tool for debug instrumentation (toggle debugging with a param, like this: node index.js --debug)
* add code analysis
* views for different types of questions: domains, booleans etc.
* parametrize config.host/port/project etc.
* refactor to be MVC? what is a backend MVC framework? Express? Sailsjs, KoaJs, HapiJs.
  Flatiron JS actually has a generator for CLI. Example app: https://github.com/vesln/todo
  But flatiron assumes you will run from the OS CLI and call it like: todo add bla, so no interactive console.
* serverside typescript? (problems: how to use test framework; maybe Node supports ES6 features natively, with harmony flag)


## Changelog

* add screenshots to the readme
* release NPM package
* handle refresh/page submits (handle event is called with ajax POSTs: e.g.: http://localhost:8080/war/server/session/sessionId/api/subscription/subscriptionId/handleEvent ). For more info see REST API documentation at https://my.blueriq.com/display/BQ93/REST+API > SessionService
* added logo (the origin of the logo is: http://www.chris.com/ascii/index.php?art=animals/rodents/mice)
* add grunt/jshint/lintspaces
* Removed model stub: load model from Blueriq Server (maintain the session)
* Display error when the server hasn't started yet
* Run start when the application starts


## Release History

* 2015-05-20    v0.1.1      first alpha release