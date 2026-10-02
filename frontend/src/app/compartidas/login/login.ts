import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  @Output() loginSuccess = new EventEmitter<string>();

  username = signal('');
  password = signal('');
  error = signal(false);

  onSubmit() {
    // Apaño manual temporal para entrar con admin/123
    if (this.username() === 'admin' && this.password() === '123') {
      this.error.set(false);
      this.loginSuccess.emit(this.username());
    } else {
      this.error.set(true);
    }
  }
}
