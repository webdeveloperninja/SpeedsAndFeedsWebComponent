import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { formName, FormsState, SpeedsAndFeedsService } from './speeds-and-feeds.service';

@Component({
  templateUrl: './speeds-and-feeds.component.html',
  providers: [SpeedsAndFeedsService]
})
export class SpeedsAndFeedsComponent implements OnInit, OnDestroy {
  readonly surfaceFeetPerMinute$ = this.speedsAndFeeds.surfaceFeetPerMinute$;
  readonly chipLoad$ = this.speedsAndFeeds.chipLoad$;
  readonly feedsAndSpeeds = this.speedsAndFeeds.materials;
  readonly materials = Object.keys(this.feedsAndSpeeds).map(key => this.feedsAndSpeeds[key]);
  readonly groups: string[];
  readonly formData$ = this.speedsAndFeeds.formData$;

  readonly toolForm = this._formBuilder.group({
    materialToCut: ['', [Validators.required]],
    toolMaterialType: ['', [Validators.required]],
    toolDiameter: ['', [Validators.required]],
    numberOfFlutes: ['', [Validators.required]],
    cutAggression: ['aggressive', [Validators.required]]
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private formsManager: AkitaNgFormsManager<FormsState>,
    private readonly speedsAndFeeds: SpeedsAndFeedsService
  ) {
    const setOfGroups = new Set(Object.keys(this.feedsAndSpeeds).map(key => this.feedsAndSpeeds[key].type));
    this.groups = Array.from(setOfGroups);
  }

  ngOnInit() {
    this.formsManager.upsert(formName, this.toolForm);
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }
}
