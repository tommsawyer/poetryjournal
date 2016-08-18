var keystone = require('keystone'),
    Types    = keystone.Field.Types;

var Rhyme = new keystone.List('Rhyme', {
    map: {name: 'baseWord'}
});

Rhyme.add({
    baseWord: { type: String, required: true, initial: true, index: true},
    rhymes:   { type: Types.TextArray, index: true},
    author:   { type: Types.Relationship, ref: 'User' }
});

Rhyme.schema.statics.createRhyme = function(baseWord, rhymeWord, author) {
    var self = this;

    return new Promise(function(resolve, reject) {
        self.findOne({baseWord: baseWord, author: author._id}, function(err, rhyme) {
            if (err) {
                return reject(err);
            }

            if (!rhyme) {
                rhyme = new Rhyme.model({
                    baseWord : baseWord,
                    rhymes   : [rhymeWord],
                    author   : author._id
                });

                return resolve(rhyme.save());
            }

            if (rhyme.rhymes.indexOf(rhymeWord) !== -1) {
                return reject(new Error('Такая рифма уже есть!'));
            }

            rhyme.rhymes.push(rhymeWord);

            resolve(rhyme.save());
        });
    });
};

Rhyme.defaultColumns = 'baseWord, author';
Rhyme.register();
