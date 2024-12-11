import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import { ProductService } from './core/services/product.service';
import {EmpresaService} from "./core/services/empresa.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  empresaId=this.companyService.idEmpresa;

  constructor(private productSr:ProductService, private router:Router, private companyService: EmpresaService) {}

  ngOnInit(): void {

  }
  toProducts() {
    this.router.navigate([`products`]);
  }

  toEditProducts() {
    this.router.navigate(['editproducts'])
  }

  toAbout() {
    this.router.navigate(['About'])
  }

  toContactUs() {
    this.router.navigate(['ContactUs'])
  }
}
