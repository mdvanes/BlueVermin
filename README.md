# BlueriqCliUI

CLI and/or text-adventure interface

test on http://runnable.com/?


## Installation

* Install Blueriq 9.4.1 Java
* put cli.stg in aquima.home/UI/mvc
* configure aquima.properties to have a theme cli that points to cli.stg.


http://lap-2077:8041/server/start?project=export-Kinderbijslag&flow=Start&version=0.0-Trunk&languageCode=nl-NL&ui=mvc&theme=cli

## Usage

* start Blueriq server
* run index.js
* type ```help``` or ```start```


## Node Readline

* http://nodejs.org/api/readline.html#readline_example_tiny_cli
* https://www.npmjs.com/package/node-menu
* http://runnable.com/U1H42Un5ZlsFdb2x/console-menu-for-your-cool-repl-application-for-shell-and-cli

## Node call URL

* https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request
* https://www.npmjs.com/package/request

## Init session

1.	Eerst een ajax POST request uitvoeren naar de server om een applicatie te starten (via shortcut met mijn eigen implementatie van StartController.java) om een sessionId aan te maken door de applicatie te starten en te in de ajax response alleen een sessionId meesturen. Het belang hier is vooral om de sessionId te verkrijgen, ik had niet kunnen vinden hoe dit anders kan.

2.	Daarna maak ik een subscription met de sessionId als subscription id met een ajax POST request bijv. http://localhost:8080/war/server/session/subscriptionId/api/subscribe (subscription id == sessionId)

3.	Daarna voegt ik een session id in deze subscription (ook met ajax POST) bijv. http://localhost:8080/war/server/session/sessionId/api/subscribe/subscriptionId (nogmaals subscriptionId  == sessionId)

4.	Bij stap 3 stuurt Blueriq de eerste pagina in JSON formaat

5.	En voor event (submit/refresh etc…) wordt de handleEvent aangeroepen ook met ajax POST bijv: http://localhost:8080/war/server/session/sessionId/api/subscription/subscriptionId/handleEvent

Deze REST API is ook te vinden op https://my.blueriq.com/display/BQ93/REST+API > SessionService 

## TODO

* remove stub of model
* refactor to be MVC

## Changelog

* error when the server hasn't started yet
* run start when the application starts
