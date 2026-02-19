const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// caminhos
const inputFolder = path.resolve(__dirname, "../images");
const outputFolder = path.resolve(__dirname, "../../dist/images");

// cria pasta se não existir
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

console.log("Entrada:", inputFolder);
console.log("Saída:", outputFolder);

// percorre arquivos
fs.readdirSync(inputFolder).forEach(file => {

    if (!file.match(/\.(png)$/i)) return;

    const inputPath = path.join(inputFolder, file);

    // mantém o mesmo nome
    const outputPath = path.join(outputFolder, file);

    sharp(inputPath)
        .resize(1200) // opcional
        .png({
            quality: 80,      // compressão
            compressionLevel: 9, // máximo (0–9)
            palette: true     // reduz tamanho drasticamente
        })
        .toFile(outputPath)
        .then(() => console.log("PNG otimizado:", file))
        .catch(err => console.error(err));

});
