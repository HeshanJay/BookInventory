import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider';
import { ToastService } from '../Service/toast.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.html',
})

export class Home implements OnInit {
  bookList: any[] = [];
  isLoading = false;

  showDeleteModal = false;
  bookToDelete: any = null;

  constructor(
    private router: Router, 
    private httpProvider: HttpProviderService,
    private toast: ToastService 
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.isLoading = true;
    this.httpProvider.getAllBooks().subscribe(
      (res: any) => {
        this.bookList = res?.body ?? [];
        this.isLoading = false;
      },
      (err: any) => {
        this.bookList = [];
        this.isLoading = false;
      }
    );
  }

  AddBook() {
    this.router.navigate(['/AddBook']);
  }

  deleteBook(b: any) {
    this.bookToDelete = b;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.bookToDelete) {
      const deletedTitle = this.bookToDelete.title;

      this.httpProvider.deleteBook(this.bookToDelete.id).subscribe({
        next: () => {
          this.getAllBooks();
          this.closeModal();
          this.toast.showSuccess(`"${deletedTitle}" has been removed from inventory.`);
        },
        error: (err) => {
          this.closeModal();
          this.toast.showError('Failed to delete the book. Please try again.');
          console.error(err);
        }
      });
    }
  }

  closeModal() {
    this.showDeleteModal = false;
    this.bookToDelete = null;
  }
}