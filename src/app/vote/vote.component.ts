import { Component, OnInit } from '@angular/core';
import { VotesService } from '../services/votes.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  voted = null;

  constructor(private votesService: VotesService) {}

  ngOnInit(): void {
    this.votesService
      .getCurrentVote()
      .subscribe((result) => (this.voted = result.vote));
  }

  get votedFormatted() {
    switch (this.voted) {
      case 'allintech':
        return 'pour All-intech';
      case 'toutankhatech':
        return 'pour Toutank(h)atech';
      case 'blanc':
        return 'blanc'
      default:
        return '';
    }
  }

  vote(name: string) {
    const previous = this.voted;

    if (this.voted === name) {
      this.voted = null;
    } else {
      this.voted = name;
    }

    this.votesService.vote(this.voted).subscribe(
      () => {},
      () => (this.voted = previous)
    );
  }
}
