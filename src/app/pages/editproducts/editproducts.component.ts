
import {Component, DestroyRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../core/services/product.service";
import {FormsModule} from "@angular/forms";
import {Producto} from "../../core/model/Producto";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ModalService} from "../../modal/modal.service";
import {HelloModalComponent} from "../../modal/components/hello-modal/hello-modal.component";
import {debounce, fromEvent, debounceTime, Observable, mergeMap, tap, catchError, map, of, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EmpresaService} from "../../core/services/empresa.service";
@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    AsyncPipe
  ],
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent  {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  $search:Observable<any[]> = of([]);
  errorMessage: string = '';

  constructor(private productService: ProductService,
              private empresaService: EmpresaService,
              private modalService: ModalService,
              private  destroyRef?: DestroyRef) { }

  ngAfterViewInit(): void {
    this.$search = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(500),
      mergeMap(() => {
        const searchTerm = this.searchInput.nativeElement.value.trim();
        if (searchTerm === '') {
          return of([]);
        }
        return this.productService.getProductsByNameAndCompanyId(searchTerm, this.empresaService.idEmpresa.id);
      }),
      map((res: any) => {
        if (!res || res.length === 0) {
          this.errorMessage = 'No se encontraron productos.';
          return [];
        } else {
          this.errorMessage = ''; // Limpiar mensaje de error si se encuentran productos
          return Array.isArray(res) ? res : [res];
        }
      }),
      catchError((err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error durante la búsqueda.';
        return of([]);
      }),
      tap((res) => console.log(res))
    ) as any;
  }

  // Método para editar un producto
  editProduct(product: any): void {
    console.log(product)
    const modalRef = this.modalService.openDialog(HelloModalComponent, {
      product: product
    });
  }

  deleteProduct(product: Producto): void {
    if (product.id !== undefined) {
      this.productService.deleteProductById(product.id).subscribe(response => {
        console.log('Producto eliminado exitosamente');
        // Puedes realizar más acciones después de eliminar el producto
      }, error => {
        console.error('Error al eliminar el producto:', error);
      });
    } else {
      console.error('El identificador del producto es undefined');
    }
  }
}
