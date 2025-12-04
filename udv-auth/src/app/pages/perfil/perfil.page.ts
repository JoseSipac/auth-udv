import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class PerfilPage {

  perfilForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    console.log('Valores del formulario de perfil:', this.perfilForm.value);
    // NO se envía a backend, solo consola.
  }

  get nombreCtrl() { return this.perfilForm.get('nombre'); }
  get apellidoCtrl() { return this.perfilForm.get('apellido'); }
  get correoCtrl() { return this.perfilForm.get('correo'); }
}
