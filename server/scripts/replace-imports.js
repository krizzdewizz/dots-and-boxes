const replace = require('replace-in-file');

replace.sync({
    files: `${__dirname}/../out/server/src/**/*.js`,
    from: /\@shared\//g,
    to: '../../dots-and-boxes/src/shared/',
});

