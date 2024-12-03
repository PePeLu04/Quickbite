import {Component, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import {ProductService} from "../../../core/services/product.service";
import {Producto} from "../../../core/model/Producto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Prodcut_Request_Update} from "../../../core/model/DTO/Product_Request_Update";

@Component({
  selector: 'app-hello-modal',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule
  ],
  templateUrl: './hello-modal.component.html',
  styleUrl: './hello-modal.component.css'
})
export class HelloModalComponent {
  @ViewChild('f') f!: NgForm;


  constructor( private productService: ProductService, public dialogRef: MatDialogRef<HelloModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngAfterViewInit() {
    console.log(this.f)
    setTimeout(() => {
    this.f.setValue({
      nombre: this.data.product?.nombre,
      precio: this.data.product?.precio
    })}, );



  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onSubmit(f:NgForm): void {
    if(!f.valid) return;


     try{
      // Llama al servicio de productos para guardar los cambios en el servidor
      this.productService.updateProduct({productoId:this.data.product.id, ...f.value}).subscribe(
        (updatedProduct: any) => {
          this.closeModal();
          console.log('Producto actualizado en el servidor:', updatedProduct);
        }
      );
    }catch (error) {
       console.error('Error al actualizar el producto:', error);
    }

  }



}
