[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic Tac Toe Game


### Overview

This is my first attempt creating a **Tic Tac Toe**, game and my first attempt at building an unaided project.

##High-level project goals:

* **Build a web application from scratch**, without a starter codebase
* Use programming skills to **map out the game logic for a simple game like Tic Tac Toe**
* **Separate HTML, CSS, and JavaScript files** in the application
* Build an application **to a spec provided by another party**
* **Build a dynamic game that allows two players to compete** (bonus: compete from separate devices)
* **Craft a ``readme.md`` file that explains this app** to the world
* **Communicate with a provided back-end** to store game state.

##Wireframe
* The initial wireframe mockup of a potential site design is located [here.](http://i.imgur.com/TEmXIRp.jpg)

## User Stories
* As a user, I would like to have a bug free experience when playing my first or fiftieth game.
* As a user, I expect that I will not have to reload to interact with the came.
* As a user, I expect that for me to signup for a game account, I expect added benefits like the tracking of my historical play information.

## Approach
* My initial approached involved designing my wireframe in HTML and CSS and using that as my starting point.
* I did limited to no user stories at the outset but composed them as I worked through the project.
* I had a general plan of what order I would work on things and how I would commit them. Once I finished a branch, I would commit a branch, merge the branch back into master and then recommited changes.
* I worked on HTML/CSS , game logic, authorization , game logic rebuild, and game API in that order.  In retrospect, I should have worked on the AJAX functions first, then game logic, followed by design.
* I built a "dumb" AI using a random number genrator but halfway through I decided to rebuild my entire system to create a more challenging opponent. It was a large time commitment that derailed my project.
* At the end, I tries to incorporate bootstrap elements in my front end. I believe this helped with its performance on smaller screens.

## Challenges
* One of major challenges involved figuring out the data structure of the API and how to use the data.
* Another problem I had with the API was how I would be able to post and access information considering the delay in the server and the fact that Javascript runs asynchronously compared to the AJAX requests. I mitigated the effect of this to a degree but I am still not satisfied with the end result.
* A huge challenge was the update to the game engine for the AI. It was slow and incremental progress.
* Additional challenges included linking the Game API back into my new engine.
* Additionally, I had to refactor and revaluate the flow of my program various times throughout the process

## Future features
* In the future, I would add functionality for custom icons. I believe I have an idea on how to approach this.
* I would also try to work on a better mobile design of this program.

## Dependencies

Install with `npm install`.
Start with `grunt serve`.

-   [Webpack](https://webpack.github.io)
-   [Bootstrap](http://getbootstrap.com)
-   [Handlebars.js](http://handlebarsjs.com)

## Dependencies
* Extremely challenging first project but I really enjoyed the process.  I learned **A LOT** about the importance in planning to help avoid headaches.  I still need a lot of work on finding a place to do incremental commits as I felt wrong about commiting without finishing a feature.

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
