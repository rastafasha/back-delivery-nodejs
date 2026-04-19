const fs = require('fs');
const Usuario = require('../models/usuario');
const Congeneral = require('../models/congeneral');
const Driver = require('../models/driver');
const Delivery = require('../models/delivery');
const TiposVehiculo = require('../models/tipovehiculo');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        // Verificar que sea un archivo y no un directorio
        const stats = fs.lstatSync(path);
        if (stats.isFile()) {
            //borrar la imagen anterior
            fs.unlinkSync(path);
        }
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {

        case 'congenerals':
            const congeneral = await Congeneral.findById(id);
            if (!congeneral) {
                console.log('No es un congenerals por id');
                return false;
            }
            pathViejo = `./uploads/congenerals/${congeneral.img}`;

            borrarImagen(pathViejo);

            congeneral.img = nombreArchivo;
            await congeneral.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;

            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
            
        
            const categoria = await Categoria.findById(id);
            if (!categoria) {
                console.log('No es un categoria por id');
                return false;
            }
            pathViejo = `./uploads/categorias/${categoria.img}`;

            borrarImagen(pathViejo);

            categoria.img = nombreArchivo;
            await categoria.save();
            return true;
            break;

        case 'drivers':
            const driver = await Driver.findById(id);
            if (!driver) {
                console.log('No es un driver por id');
                return false;
            }
            pathViejo = `./uploads/drivers/${driver.img}`;

            borrarImagen(pathViejo);

            driver.img = nombreArchivo;
            await driver.save();
            return true;
            break;

         case 'deliverys':
            const delivery = await Delivery.findById(id);
            if (!delivery) {
                console.log('No es un delivery por id');
                return false;
            }
            pathViejo = `./uploads/deliverys/${delivery.img}`;

            borrarImagen(pathViejo);

            delivery.img = nombreArchivo;
            await delivery.save();
            return true;
            break;

         case 'tipos':
            const tipo = await TiposVehiculo.findById(id);
            if (!tipo) {
                console.log('No es un delivery por id');
                return false;
            }
            pathViejo = `./uploads/tipos/${tipo.img}`;

            borrarImagen(pathViejo);

            tipo.img = nombreArchivo;
            await tipo.save();
            return true;
            break;
        
       


    }

};

module.exports = {
    actualizarImagen,
    borrarImagen
};