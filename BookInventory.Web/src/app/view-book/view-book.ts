import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './view-book.html',
})
export class ViewBook implements OnInit {
  bookId!: number;
  bookDetail: any = null;

  constructor(private route: ActivatedRoute, private httpProvider: HttpProviderService) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.params['id']);
    this.getBookDetailById();
  }

  getBookDetailById() {
    this.httpProvider.getBookById(this.bookId).subscribe({
      next: (res: any) => (this.bookDetail = res?.body ?? null),
      error: (err) => console.log(err),
    });
  }
}
