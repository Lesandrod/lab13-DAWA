const Producto = require("../models/Producto");
const User = require("../models/User");
const PDFDocument = require('pdfkit');
const fs = require('fs')




exports.generarPDf = async(req,res) =>{
    try {
        const user =  await User.find().lean();
        const productos = await Producto.find().lean();

        // const datas = [...user, ...producto];

        const doc = new PDFDocument();

        res.setHeader('Content-Disposition', 'attachment; filename="Datos.pdf"');

        const writeStream = fs.createWriteStream('Datos.pdf');
        doc.pipe(writeStream);

        doc.text(`Usuarios :  ${user.length}`)
        user.forEach(usuario=>{
            
            doc.text('--------------------------------')
            doc.text(`Usuario: ${usuario.username}`)
            doc.text(`Email: ${usuario.email}`)
            doc.text('--------------------------------')
        })
        doc.text('');

        doc.text(`Productos :  ${productos.length}`)

        productos.forEach(producto=>{
            doc.text('--------------------------------')
            doc.text(`Producto: ${producto.producto}`)
            doc.text(`Categoria: ${producto.categoria}`)
            doc.text(`Categoria: ${producto.ubicacion}`)
            doc.text(`Categoria: ${producto.precio}`)
            doc.text(`Categoria: ${producto.fechaCreacion}`)
            doc.text('--------------------------------')
            doc.text('');
            
        })

        doc.end();
        writeStream.on('finish', () => {
            const fileStream = fs.createReadStream('Datos.pdf');
        fileStream.pipe(res);
        });
 


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}
