const Producto = require("../models/Producto");
const User = require("../models/User");
const { jsPDF } = require('jspdf')
require('jspdf-autotable');

exports.generarPDf = async(req,res) =>{
    try {
        const user =  await User.find().lean();
        const productos = await Producto.find().lean();
        const nombreArchivo = 'Lab13.pdf';
        const doc = new jsPDF();

        //tabla usuarios
        doc.setFontSize(15);   
        doc.autoTable({
        theme: 'grid',
        startY: 30,
        head: [[`Usuarios (${user.length})`, 'Email']],
        body: user.map(user => [user.username, user.email])
        });

      
        // Tabla de productos
        doc.setFontSize(15);
        doc.autoTable({
        theme: 'grid',
        startY: 90,
        head: [[`Productos (${productos.length})`, 'Categoría','Precio','Ubicacion','Fecha de Creacion'],],
        body: productos.map(producto => [producto.producto, producto.categoria, producto.precio,producto.ubicacion,producto.fechaCreacion])
        });

        

        res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.contentType('application/pdf');
        res.send(Buffer.from(doc.output('arraybuffer')));


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }

   
}
