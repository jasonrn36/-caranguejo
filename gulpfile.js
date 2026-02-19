const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compilarSass() {
    return src('src/estilos/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(dest('dist/estilos'));
}

function copiarHTML() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

function comprimirImagens(done) {
    require('./src/js/compress_image.js');
    done();
}


function observar() {
    watch('src/**/*.html', copiarHTML);
    watch('src/estilos/**/*.scss', compilarSass);
    watch('src/imagens/**/*', comprimirImagens);
}

exports.build = series(compilarSass, copiarHTML, comprimirImagens);
exports.default = observar;
