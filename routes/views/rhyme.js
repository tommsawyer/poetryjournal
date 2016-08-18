var keystone = require('keystone');

var getAllRhymes = function(req, res) {
	var view   = new keystone.View(req, res),
	    locals = res.locals,
        Rhyme  = keystone.list('Rhyme').model;
    
    locals.section = 'rhymes';

    view.query('rhymes', Rhyme.find());

    view.render('rhymes/rhymes');
};

var addRhyme = function(req, res) {
	var view   = new keystone.View(req, res),
	    locals = res.locals,
        Rhyme  = keystone.list('Rhyme').model;
    
    locals.section = 'rhymes';

    view.on('post', function(done) {
        var baseWord = req.body.baseWord;
        var rhymeWord = req.body.rhymeWord;

        Rhyme.createRhyme(baseWord, rhymeWord)
            .then(function(rhyme) {
                req.flash('info', 'Рифма ' + baseWord + ' - ' + rhymeWord + ' успешно добавлена!');
                done();
            })
            .catch(function(error) {
                req.flash('error', error.message);
                done();
            });
    });

    view.render('rhymes/add');
}

var getRhyme = function(req, res) {
    var view   = new keystone.View(req, res),
        locals = res.locals,
        Rhyme  = keystone.list('Rhyme').model;

    locals.section = 'rhymes';

    view.on('init', function(done) {
        Rhyme.findOne({baseWord: req.params.baseWord}, function(err, rhyme) {
            if (!rhyme) {
                req.flash('error', 'Рифмы к слову "' + req.params.baseWord + '" не найдено!');
                res.redirect('/rhymes');
                return;
            }

            res.locals.rhyme = rhyme;
            done();
        });
    });

    view.render('rhymes/rhyme');
}

exports = module.exports = {
    getAllRhymes : getAllRhymes,
    addRhyme     : addRhyme,
    getRhyme     : getRhyme
};
