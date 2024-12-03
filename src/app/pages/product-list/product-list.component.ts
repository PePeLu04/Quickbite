import { HttpClientModule } from '@angular/common/http';
import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { APIResponseModel} from '../../core/model/Model';
import { LazyImageDirective } from '../../shared/directive/lazy-image.directive';
import { AsyncPipe, CommonModule } from '@angular/common';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Producto} from "../../core/model/Producto";
import {FormsModule, NgForm} from "@angular/forms";
import {EmpresaService} from "../../core/services/empresa.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, LazyImageDirective, CommonModule, AsyncPipe, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{


productList: Producto [] = [];

productService = inject(ProductService);
destroyRef = inject(DestroyRef)


  constructor(private companyService: EmpresaService) {
  }

ngOnInit(): void {
  this.companyService.selectCompany(this.companyService.idEmpresa.id);
  this.companyService.getCompanyId();

  if(!this.companyService.idEmpresa) return alert("No hay id de empresa");   //show a message or something

  this.productService.getProductByCompanyId(this.companyService.idEmpresa.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: APIResponseModel)=>{
    console.log(res)
    this.productList =  res as any;
  })
}

getProductsByType(type: string) {
  this.productService.getProductByType(type).subscribe((res: APIResponseModel)=>{
    this.productList =  res.data;
  },error=> {
    alert("Error From API product type")
  })
}

  crearProducto(form: NgForm) {
    const productData = { ...form.value, idEmpresa: this.companyService.idEmpresa };
    this.productService.addProduct(productData).subscribe((response) => {
      console.log('Producto guardado exitosamente', response);
    });
  }

}
