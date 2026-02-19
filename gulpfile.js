const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compilarSass() {
    return src('src/estilos/**/*.scss') // seleciona todos os arquivos SCSS na pasta src/estilos
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('dist/css'));
    console.log("Ok suas Pastas foram compiladas \n de scss para css.");
}

function copiarHTML() { // funcão para copiar arquivos HTML
    return src('src/*.html') // seleciona todos os arquivos HTML na pasta src
    .pipe(dest('dist')); // copia os arquivos HTML para a pasta dist
    console.log("Ok suas Pastas foram copiadas \n de src para dist."); // mensagem de sucesso
}

// função para observar mudanças nos arquivos
function observar() {
    watch('src/**/*.html', copiarHTML);
    // observar SCSS
    watch('src/estilos/**/*.scss', compilarSass);
}

// tarefa para compilar Sass e copiar HTML
exports.build = series(compilarSass, copiarHTML); 
// tarefa para observar mudanças nos arquivos
exports.default = observar