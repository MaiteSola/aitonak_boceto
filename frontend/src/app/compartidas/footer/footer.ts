import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  ts = inject(TranslationService);
  lang = this.ts.lang;

  t(key: string): string {
    return this.ts.t(key);
  }
}
