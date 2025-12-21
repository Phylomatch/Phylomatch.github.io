import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    RouterLink, 
    MatTooltip,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  flagEspanolOIngles: boolean = false; // FALSO ESPANOL TRUE INGLES

  tituloEsp: string = 'Servicios Bioinformáticos para la identificación molecular de microorganismos y análisis de metagenomas.'
  tituloEng: string = 'Bioinformatic Services for molecular identification of microorgamisms and metagenomic analysis.'

  // Variables para capturar los datos
  nombre: string = '';
  asunto: string = '';
  mail: string = '';
  institucion: string = '';
  mensaje: string = '';

  miCorreoEmpresa: string = 'phylomatch@gmail.com';

  constructor(private snackBar: MatSnackBar) {}

  enviarContacto() {
  // 1. Validación manual (como ya la tenías)
  if (!this.nombre || !this.asunto || !this.mail || !this.mensaje) {
    this.snackBar.open('Completa los campos obligatorios', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-personalizado']
    });
    return;
  }

  // 2. Parámetros para la plantilla de EmailJS
  const templateParams = {
    from_name: this.nombre,
    from_email: this.mail,
    subject: this.asunto,
    institution: this.institucion,
    message: this.mensaje
  };

  // 3. Envío directo
  emailjs.send(
    'service_ct94awl',   // Reemplaza con tu ID
    'template_xsniwcp',  // Reemplaza con tu ID
    templateParams,
    '64J7KRH3-i_rXO6Ou'    // Reemplaza con tu Key
  )
  .then((response) => {
    this.snackBar.open('¡Mensaje enviado con éxito!', 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-personalizado'] // Aquí el botón saldrá café
    });
    this.limpiarCampos();
  })
  .catch((error) => {
    this.snackBar.open('Error al enviar. Inténtalo más tarde.', 'Cerrar', {
      duration: 5000
    });
  });
}

limpiarCampos() {
  this.nombre = '';
  this.asunto = '';
  this.mail = '';
  this.institucion = '';
  this.mensaje = '';
}

}
