import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { register } from 'swiper/element/bundle';

register(); // Esto registra el carrusel globalmente

interface Slide {
  image: string;
  alt: string;
}

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
    MatSnackBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // <--- ESTO ES CLAVE
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  flagEspanolOIngles: boolean = false; // FALSO ESPANOL TRUE INGLES

  tituloEsp: string = 'Servicios Bioinformáticos para el análisis de secuencias.'
  tituloEng: string = 'Bioinformatic Services for nucleotide sequences analysis.'

  // Variables para capturar los datos
  nombre: string = '';
  asunto: string = '';
  mail: string = '';
  institucion: string = '';
  mensaje: string = '';

  miCorreoEmpresa: string = 'phylomatch@gmail.com';

  slides: Slide[] = [
    { image: 'assets/1.jpg', alt: 'Descripción de la imagen 1' },
    { image: 'assets/2.jpg', alt: 'Descripción de la imagen 2' },
    { image: 'assets/3.jpg', alt: 'Descripción de la imagen 3' }
  ];

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
