import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  private mediaQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mediaQueryListener = () => changeDetectorRef.detectChanges();

    /* Using addListener instead of addEventListener because Safari does no support it */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mediaQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    /* Using removeListener instead of removeEventListener because Safari does no support it */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mediaQueryListener);
  }

}
