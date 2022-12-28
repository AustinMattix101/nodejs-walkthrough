import * as express from "express";

export const register = ( app: express.Application ) => {
    const oidc = app.locals.oidc;

    // define a route handler for the default home page
    app.get( "/", ( _req: any, res ) => {
        res.render( "index" );
    } );

    // define a secure route handler for the login page that redirects to /guitars
    app.get( "/login", oidc.ensureAuthenticated(), ( _req, res ) => {
        res.redirect( "/guitars" );
    } );

    // define a route to handle logout
    app.get( "/logout", ( req: any, res ) => {
        req.logout();
        res.redirect( "/" );
    } );

    // define a secure route handler for the guitars page
    app.get( "/guitars", oidc.ensureAuthenticated(), ( _req: any, res ) => {
        res.render( "guitars" );
    } );
};