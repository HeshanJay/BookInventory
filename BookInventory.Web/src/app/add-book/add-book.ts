import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider';
import { ToastService } from '../Service/toast.service'; 

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './add-book.html',
})
export class AddBook {
  addBookForm: any = { title: '', author: '', isbn: '', publicationDate: '' };
  isSubmitted = false;

  @ViewChild('bookForm') bookForm!: NgForm;

  constructor(
    private router: Router, 
    private httpProvider: HttpProviderService,
    private toast: ToastService 
  ) {}

  AddBook(isValid: boolean | null) {
    this.isSubmitted = true;
    if (!isValid) return;

    this.httpProvider.addBook(this.addBookForm).subscribe({
      next: () => {
        this.toast.showSuccess('Book added successfully!');
        this.router.navigate(['/Home']);
      },
      error: (err) => {
        this.toast.showError('Failed to add book. Please check your connection.');
        console.error(err);
      },
    });
  }
}