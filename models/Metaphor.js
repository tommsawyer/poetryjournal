var keystone = require('keystone'),
    Types    = keystone.Field.Types;

var Metaphor = new keystone.List('Metaphor', {
    map: {name: 'text'}
});

Metaphor.add({
    text:        { type: String, required: true, initial: true, index: true},
    description: { type: Types.Html, wysiwyg: true, initial: true, height: 400  },
    author:      { type: Types.Relationship, ref: 'User' }
});

Metaphor.defaultColumns = 'text';
Metaphor.register();
