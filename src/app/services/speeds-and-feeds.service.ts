import { Injectable } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { filter, map } from 'rxjs/operators';
import { CutAggression } from '../core/cut-aggression.enum';
import { speedsAndFeedsLookup, LookupEntry as SpeedsAndFeedsLookupEntry, LookupEntry } from '../core/speeds-and-feeds.data';

export const formName = 'cutData';

export interface FormsState {
  cutData: {
    materialToCut: string;
    toolMaterialType: number;
    toolDiameter: string;
    numberOfFlutes: string;
    cutAggression: string;
  };
}

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
    const aggressiveSurfaceFeetPerMinute = lookupEntry.sfm.aggressive;
    const conservativeSurfaceFeetPerMinute = lookupEntry.sfm.conservative;

    return aggression === CutAggression.aggressive ? aggressiveSurfaceFeetPerMinute : conservativeSurfaceFeetPerMinute;
  }

  private toChipLoad(lookupEntry: SpeedsAndFeedsLookupEntry, toolDiameter: number) {
    return lookupEntry.chipLoad[toolDiameter];
  }

  private getLookupEntry(materialToCut: string): LookupEntry {
    return speedsAndFeedsLookup[materialToCut];
  }
}
