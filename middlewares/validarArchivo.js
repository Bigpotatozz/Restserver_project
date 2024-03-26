

const validarArchivo = (req, res, next) => {

    
    if (!req.files || Object.keys(req.files).length === 0  ) {
        return res.status(400).send('No se subio ningun archivo.');
      }

      if(!req.files.archivo){
        return res.status(400).send('No files were uploaded.'); 
    }

      next();

}

export {validarArchivo}