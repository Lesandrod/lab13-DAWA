import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{
  
  listProductos: Producto[] = [];
  elementos: number = 0;
  
  
  constructor(private _productoService: ProductoService) {

  }
  
  ngOnInit(): void {
    
    this.obtenerProductos();

  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
      this.elementos = this.listProductos.length;
    })
  }
  generarPDF(){
    console.log('funciona');
    
    this._productoService.getPDF().subscribe(response => {
      const file = new Blob([response], { type: 'application/pdf' });

      const url = URL.createObjectURL(file);
      window.open(url)

      const a = document.createElement('a');
      a.href = url;
      a.download = 'Lab13.pdf';

      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);

    },)
    
  }

  eliminarProducto(id: any){
    this._productoService.deleteProducto(id).subscribe(data => {

      Swal.fire({
        title: 'Eliminacion de Producto',
        text: "¿Desea eliminar el producto?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(data);
          this.obtenerProductos();
          this.elementos = this.listProductos.length;
        }
      })
    })
  }

}
