import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<Toast | null>(null);

  showSuccess(message: string) {
    this.toast.set({ message, type: 'success' });
    this.clearAfterDelay();
  }

  showError(message: string) {
    this.toast.set({ message, type: 'error' });
    this.clearAfterDelay();
  }

  private clearAfterDelay() {
    setTimeout(() => {
      this.toast.set(null);
    }, 3000); 
  }
}