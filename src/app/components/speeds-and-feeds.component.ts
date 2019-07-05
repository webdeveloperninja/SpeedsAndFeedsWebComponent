import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { formName, SpeedsAndFeedsService } from '../services/speeds-and-feeds.service';
import { CutAggression } from '../models/cut-aggression.enum';
import { FormsState } from '../models/forms.state';

@Component({
  templateUrl: './speeds-and-feeds.component.html',
  providers: [SpeedsAndFeedsService]
})
export class SpeedsAndFeedsComponent implements OnInit, OnDestroy {
  readonly surfaceFeetPerMinute$ = this.speedsAndFeedsService.surfaceFeetPerMinute$;
  readonly chipLoad$ = this.speedsAndFeedsService.chipLoad$;
  readonly speedsAndFeedsLookup = this.speedsAndFeedsService.speedsAndFeeds;

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
    private readonly speedsAndFeedsService: SpeedsAndFeedsService
  ) {}

  ngOnInit() {
    this.formsManager.upsert(formName, this.toolForm);
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }
}
