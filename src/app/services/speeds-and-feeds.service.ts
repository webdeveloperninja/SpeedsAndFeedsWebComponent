import { Injectable } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { filter, map } from 'rxjs/operators';
import { CutAggression } from '../models/cut-aggression.enum';
import { speedsAndFeedsLookup, LookupEntry as SpeedsAndFeedsLookupEntry, LookupEntry } from '../speeds-and-feeds.data';
import { FormsState } from '../models/forms.state';

export const formName = 'cutForm';

@Injectable()
export class SpeedsAndFeedsService {
  readonly formData$ = this.formsManager.selectForm(formName).pipe(filter(formData => formData.valid));
  readonly speedsAndFeeds = Object.keys(speedsAndFeedsLookup).map(key => speedsAndFeedsLookup[key]);

  readonly surfaceFeetPerMinute$ = this.formData$.pipe(
    map(formData => {
      const materialToCut = formData.value.materialToCut;
      const aggression = formData.value.cutAggression;

      const lookupEntry = this.getLookupEntry(materialToCut);

      return this.toSurfaceFeetPerMinute(lookupEntry, aggression);
    })
  );

  readonly chipLoad$ = this.formData$.pipe(
    map(formData => {
      const toolDiameter = formData.value.toolDiameter;
      const materialToCut = formData.value.materialToCut;

      const lookupEntry = this.getLookupEntry(materialToCut);

      return this.toChipLoad(lookupEntry, toolDiameter);
    })
  );

  constructor(private formsManager: AkitaNgFormsManager<FormsState>) {}

  private toSurfaceFeetPerMinute(lookupEntry: SpeedsAndFeedsLookupEntry, aggression: CutAggression) {
    const aggressiveSurfaceFeetPerMinute = lookupEntry.surfaceFeetPerMinute.aggressive;
    const conservativeSurfaceFeetPerMinute = lookupEntry.surfaceFeetPerMinute.conservative;

    return aggression === CutAggression.aggressive ? aggressiveSurfaceFeetPerMinute : conservativeSurfaceFeetPerMinute;
  }

  private toChipLoad(lookupEntry: SpeedsAndFeedsLookupEntry, toolDiameter: number) {
    return lookupEntry.chipLoad[toolDiameter];
  }

  private getLookupEntry(materialToCut: string): LookupEntry {
    return speedsAndFeedsLookup[materialToCut];
  }
}
