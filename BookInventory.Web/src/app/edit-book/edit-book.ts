import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider';
import { ToastService } from '../Service/toast.service'; 

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './edit-book.html',
})
export class EditBook implements OnInit {
  editBookForm: any = { id: 0, title: '', author: '', isbn: '', publicationDate: '' };
  isSubmitted = false;
  bookId!: number;

  @ViewChild('bookForm') bookForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService,
    private toast: ToastService 
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.params['id']);
    this.getBookDetailById();
  }

  getBookDetailById() {
    this.httpProvider.getBookById(this.bookId).subscribe({
      next: (res: any) => {
        const b = res?.body;
        if (!b) {
          this.toast.showError('Book not found.');
          this.router.navigate(['/Home']);
          return;
        }

        const dateOnly = b.publicationDate ? String(b.publicationDate).substring(0, 10) : '';

        this.editBookForm = {
          id: b.id,
          title: b.title,
          author: b.author,
          isbn: b.isbn,
          publicationDate: dateOnly,
        };
      },
      error: (err) => {
        this.toast.showError('Error loading book details.');
        console.log(err);
      },
    });
  }

  EditBook(isValid: boolean) {
    this.isSubmitted = true;
    if (!isValid) return;

    this.httpProvider.updateBook(this.bookId, this.editBookForm).subscribe({
      next: () => {
        this.toast.showSuccess('Book updated successfully!');
        this.router.navigate(['/Home']);
      },
      error: (err) => {
        this.toast.showError('Failed to update book.');
        console.log(err);
      },
    });
  }
}