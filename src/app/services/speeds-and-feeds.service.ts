import { Injectable } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { CutAggression } from '../models/cut-aggression.enum';
import { speedsAndFeedsLookup, LookupEntry as SpeedsAndFeedsLookupEntry, LookupEntry } from '../speeds-and-feeds.data';
import { FormsState } from '../models/forms.state';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';

export const formName = 'cutForm';

@Injectable()
export class SpeedsAndFeedsService {
  readonly speedsAndFeeds = Object.keys(speedsAndFeedsLookup).map(key => speedsAndFeedsLookup[key]);
  readonly formData$ = this.formsManager.selectForm(formName).pipe(filter(formData => formData.valid));
  readonly materialToCut$ = this.formData$.pipe(map(formData => formData.value.materialToCut));
  readonly cutAggression$ = this.formData$.pipe(map(formData => formData.value.cutAggression));
  readonly toolDiameter$ = this.formData$.pipe(map(formData => formData.value.toolDiameter));
  readonly speedsAndFeedsLookupEntry$ = this.materialToCut$.pipe(map(this.getLookupEntry));

  readonly surfaceFeetPerMinute$ = combineLatest(this.speedsAndFeedsLookupEntry$, this.cutAggression$).pipe(
    map(([lookupEntry, cutAggression]) => this.toSurfaceFeetPerMinute(lookupEntry, cutAggression))
  );

  readonly chipLoad$ = combineLatest(this.speedsAndFeedsLookupEntry$, this.toolDiameter$).pipe(
    map(([lookupEntry, toolDiameter]) => this.toChipLoad(lookupEntry, toolDiameter))
  );

  readonly rpm$ = combineLatest(this.surfaceFeetPerMinute$, this.toolDiameter$).pipe(
    map(([surfaceFeetPerMinute, toolDiameter]) => this.toRpm(surfaceFeetPerMinute, toolDiameter))
  );

  constructor(private formsManager: AkitaNgFormsManager<FormsState>, private readonly formBuilder: FormBuilder) {}

  getFormGroup(): FormGroup {
    return this.formBuilder.group({
      materialToCut: ['', [Validators.required]],
      toolMaterialType: ['', [Validators.required]],
      toolDiameter: ['', [Validators.required]],
      numberOfFlutes: ['', [Validators.required]],
      cutAggression: [CutAggression.aggressive, [Validators.required]]
    });
  }

  private toSurfaceFeetPerMinute(lookupEntry: SpeedsAndFeedsLookupEntry, aggression: CutAggression) {
    const aggressiveSurfaceFeetPerMinute = lookupEntry.surfaceFeetPerMinute.aggressive;
    const conservativeSurfaceFeetPerMinute = lookupEntry.surfaceFeetPerMinute.conservative;

    return aggression === CutAggression.aggressive ? aggressiveSurfaceFeetPerMinute : conservativeSurfaceFeetPerMinute;
  }

  private toChipLoad(lookupEntry: SpeedsAndFeedsLookupEntry, toolDiameter: number) {
    return lookupEntry.chipLoad[toolDiameter];
  }

  private toRpm(surfaceFeetPerMinute: number, toolDiameter: number) {
    return (surfaceFeetPerMinute * (12 / 3.14)) / toolDiameter;
  }

  private getLookupEntry(materialToCut: string): LookupEntry {
    return speedsAndFeedsLookup[materialToCut];
  }
}
