import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ConfiguracionPage {

  notificaciones = true;
  modoOscuro = false;

  constructor() {}

}
