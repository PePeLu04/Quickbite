import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {Login_Request} from "../../core/model/DTO/Login_Request";
import {FormsModule} from "@angular/forms";
import {EmpresaService} from "../../core/services/empresa.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private es: EmpresaService) {}

  username = this.authService.admin.username;
  password = this.authService.admin.password;
  dni = this.authService.admin.dni;

  login() {
    this.authService.login(this.username, this.password, this.dni).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);  // Verifica la respuesta aquí
        const id_empresa = response.empresaId;
        if (id_empresa) {
          this.es.selectCompany(id_empresa);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'ID de empresa no encontrado en la respuesta.';
        }
      },
      error => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}
