var keystone     = require('keystone'),
    middleware   = require('./middleware'),
    importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

var routes = {
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {
	app.get('/', routes.views.index);

    // Metaphors
    app.get('/metaphors',    routes.views.metaphor.getAllMetaphors);
    app.get('/metaphor/:id', routes.views.metaphor.getMetaphor);

    // Rhymes
    app.get('/rhymes', routes.views.rhyme.getAllRhymes);
    app.route('/rhyme/add')
        .get(routes.views.rhyme.addRhyme)
        .post(routes.views.rhyme.addRhyme);
    app.get('/rhyme/:baseWord', routes.views.rhyme.getRhyme);
};
