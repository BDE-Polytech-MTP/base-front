import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { mergeMap } from 'rxjs/operators';
import { Event } from '../../models';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {

  event: Event;

  constructor(private route: ActivatedRoute, private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap(params => this.eventsService.getEvent(params.get('event_id')))
    ).subscribe(
      event => this.event = event,
      () => this.router.navigateByUrl('/')
    );
  }

}
