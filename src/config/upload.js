const multer = require('multer');

const diretorio = 'public/assets/imgs/profile';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, diretorio) 
  },
  
  filename: (req, file, cb) => {
    const extensaoArquivo = file.originalname.split('.')[1];

    const novoNomeArquivo = require('crypto')
      .randomBytes(4)
      .toString('hex');


    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});

module.exports = multer({ storage });