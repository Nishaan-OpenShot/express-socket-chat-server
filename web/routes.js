'use strict';
const routeHandler = require('./../handlers/route-handler');

class Routes {

    constructor(app) {
        this.app = app;
    }

    /* creating app Routes start */
    appRoutes() {
        this.app.get('*', routeHandler.routeNotFoundHandler);
    }

    registerRoute() {
        this.app.post('/register', routeHandler.registerRouteHandler);
    }

    userNameCheck() {
        this.app.post('/usernameAvailable', routeHandler.userNameCheckHandler);
    }

    userSessionCheck() {
        this.app.post('/userSessionCheck', routeHandler.userSessionCheckRouteHandler);
    }

    loginRoute() {
        this.app.post('/login', routeHandler.loginRouteHandler);
    }

    routesConfig() {
        this.appRoutes();
        this.registerRoute();
        this.userNameCheck();
        this.userSessionCheck();
    }

}

module.exports = Routes;