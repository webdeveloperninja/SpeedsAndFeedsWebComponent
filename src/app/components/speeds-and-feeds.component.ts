import { Component, OnDestroy, OnInit } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { FormsState } from '../models/forms.state';
import { formName, SpeedsAndFeedsService } from '../services/speeds-and-feeds.service';

@Component({
  templateUrl: './speeds-and-feeds.component.html',
  styleUrls: ['./speeds-and-feeds.component.scss'],
  providers: [SpeedsAndFeedsService]
})
export class SpeedsAndFeedsComponent implements OnInit, OnDestroy {
  readonly surfaceFeetPerMinute$ = this.speedsAndFeedsService.surfaceFeetPerMinute$;
  readonly rpm$ = this.speedsAndFeedsService.rpm$;
  readonly chipLoad$ = this.speedsAndFeedsService.chipLoad$;
  readonly speedsAndFeedsLookup = this.speedsAndFeedsService.speedsAndFeeds;
  readonly speedsAndFeedsForm = this.speedsAndFeedsService.getFormGroup();

  constructor(private readonly speedsAndFeedsService: SpeedsAndFeedsService) {}

  ngOnInit() {
    this.speedsAndFeedsService.onInit();
  }

  ngOnDestroy() {
    this.speedsAndFeedsService.onDestroy();
  }
}
