import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: async (resp) => {
        if (resp.ok) {
          this.router.navigateByUrl('/home', { replaceUrl: true });
        } else {
          const toast = await this.toastCtrl.create({
            message: resp.message || 'Credenciales inválidas',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Error en el servidor',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  get emailCtrl() { return this.loginForm.get('email'); }
  get passwordCtrl() { return this.loginForm.get('password'); }
}

