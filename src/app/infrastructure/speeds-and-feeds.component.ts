import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { formName, FormsState, SpeedsAndFeedsService } from './speeds-and-feeds.service';
import { CutAggression } from '../core/cut-aggression.enum';

@Component({
  templateUrl: './speeds-and-feeds.component.html',
  providers: [SpeedsAndFeedsService]
})
export class SpeedsAndFeedsComponent implements OnInit, OnDestroy {
  readonly surfaceFeetPerMinute$ = this.speedsAndFeeds.surfaceFeetPerMinute$;
  readonly chipLoad$ = this.speedsAndFeeds.chipLoad$;
  readonly speedsAndFeedsLookup = this.speedsAndFeeds.speedsAndFeeds;

  readonly toolForm = this.formBuilder.group({
    materialToCut: ['', [Validators.required]],
    toolMaterialType: ['', [Validators.required]],
    toolDiameter: ['', [Validators.required]],
    numberOfFlutes: ['', [Validators.required]],
    cutAggression: [CutAggression.aggressive, [Validators.required]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formsManager: AkitaNgFormsManager<FormsState>,
    private readonly speedsAndFeeds: SpeedsAndFeedsService
  ) {}

  ngOnInit() {
    this.formsManager.upsert(formName, this.toolForm);
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }
}
