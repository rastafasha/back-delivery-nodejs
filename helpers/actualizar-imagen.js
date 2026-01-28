const fs = require('fs');
const Usuario = require('../models/usuario');
const Congeneral = require('../models/congeneral');
const Promocion = require('../models/promocion');
const Ingreso = require('../models/ingreso');
const Blog = require('../models/blog');
const Page = require('../models/page');
const Slider = require('../models/slider');
const Categoria = require('../models/categoria');
const Driver = require('../models/driver');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
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


        case 'locaciones':
                const tienda = await Tienda.findById(id);
                if (!tienda) {
                    console.log('No es un tienda por id');
                    return false;
                }
                pathViejo = `./uploads/locaciones/${tienda.img}`;
    
                borrarImagen(pathViejo);
    
                tienda.img = nombreArchivo;
                await tienda.save();
                return true;
                break;

        case 'usuarios':
            
        case 'ingresos':
            const ingreso = await Ingreso.findById(id);
            if (!ingreso) {
                console.log('No es un ingreso por id');
                return false;
            }
            pathViejo = `./uploads/ingresos/${ingreso.img}`;

            borrarImagen(pathViejo);

            ingreso.img = nombreArchivo;
            await ingreso.save();
            return true;
            break;

        case 'blogs':
            const blog = await Blog.findById(id);
            if (!blog) {
                console.log('No es un blog por id');
                return false;
            }
            pathViejo = `./uploads/blogs/${blog.img}`;

            borrarImagen(pathViejo);

            blog.img = nombreArchivo;
            await blog.save();
            return true;
            break;

        case 'pages':
            const page = await Page.findById(id);
            if (!page) {
                console.log('No es un page por id');
                return false;
            }
            pathViejo = `./uploads/pages/${page.img}`;

            borrarImagen(pathViejo);

            page.img = nombreArchivo;
            await page.save();
            return true;
            break;

        case 'promocions':
            const promocion = await Promocion.findById(id);
            if (!promocion) {
                console.log('No es un promocion por id');
                return false;
            }
            pathViejo = `./uploads/promocions/${promocion.img}`;

            borrarImagen(pathViejo);

            promocion.img = nombreArchivo;
            await promocion.save();
            return true;
            break;

        case 'sliders':
            const slider = await Slider.findById(id);
            if (!slider) {
                console.log('No es un slider por id');
                return false;
            }
            pathViejo = `./uploads/sliders/${slider.img}`;

            borrarImagen(pathViejo);

            slider.img = nombreArchivo;
            await slider.save();
            return true;
            break;

        case 'categorias':
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
        
       


    }

};

module.exports = {
    actualizarImagen,
    borrarImagen
};