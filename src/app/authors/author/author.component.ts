import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Author } from '../model/author';
import { AuthorsService } from '../service/authors.service';
import { Subscription } from 'rxjs';
import { AuthornamesPipe } from '../../pipes/authornames.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [NgIf, AuthornamesPipe],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorsService.getAuthors(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


