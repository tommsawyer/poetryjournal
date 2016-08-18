var keystone = require('keystone');

var getAllMetaphors = function(req, res) {
	var view   = new keystone.View(req, res),
	    locals = res.locals,
        Metaphor  = keystone.list('Metaphor').model;
    
    locals.section = 'metaphors';

    view.query('metaphors', Metaphor.find());

    view.render('metaphors');
};

var getMetaphor = function(req, res) {
    var view   = new keystone.View(req, res),
        locals = res.locals,
        Metaphor  = keystone.list('Metaphor').model;

    locals.section = 'metaphors';

    view.on('init', function(done) {
        Metaphor.findOne({_id: req.params.id}, function(err, metaphor) {
            if (!metaphor) {
                req.flash('error', 'Не найдено такой метафоры');
                res.redirect('/metaphors');
                return;
            }

            res.locals.metaphor = metaphor;
            done();
        });
    });

    view.render('metaphor');
}

module.exports = {
    getAllMetaphors: getAllMetaphors,
    getMetaphor    : getMetaphor
};
