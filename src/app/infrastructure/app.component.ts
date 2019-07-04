import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { formName, FormsState, SpeedsAndFeedsService } from '../core/speeds-and-feeds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SpeedsAndFeedsService]
})
export class AppComponent implements OnInit, OnDestroy {
  readonly sfm$ = this.speedsAndFeeds.sfm$;
  readonly feedsAndSpeeds = this.speedsAndFeeds.feedsAndSpeeds;
  readonly formData$ = this.speedsAndFeeds.formData$;

  readonly toolForm = this._formBuilder.group({
    materialToCut: [''],
    toolMaterialType: [''],
    toolDiameter: [''],
    numberOfFlutes: ['']
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private formsManager: AkitaNgFormsManager<FormsState>,
    private readonly speedsAndFeeds: SpeedsAndFeedsService
  ) {}

  ngOnInit() {
    this.formsManager.upsert(formName, this.toolForm);
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }
}
