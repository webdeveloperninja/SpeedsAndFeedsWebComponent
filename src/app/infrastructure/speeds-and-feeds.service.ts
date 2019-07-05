import { Injectable } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { map, filter } from 'rxjs/operators';
import { materials } from '../core/speeds-and-feeds.data';

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
  readonly formData$ = this.formsManager.selectForm(formName);
  readonly feedsAndSpeeds = materials;

  // Todo clean up hardcoded strings
  readonly surfaceFeetPerMinute = this.formData$.pipe(
    filter(data => data.valid),
    map(data => {
      const sfm = this.feedsAndSpeeds[data.value.materialToCut].sfm;

      return data.value.cutAggression === 'aggressive' ? sfm.aggressive : sfm.conservative;
    })
  );

  // Todo everything from the form is a string fix that
  readonly chipLoad$ = this.formData$.pipe(
    filter(data => data.valid),
    map(data => {
      const material = this.feedsAndSpeeds[data.value.materialToCut];
      return material.chipLoad[data.value.toolDiameter];
    })
  );

  constructor(private formsManager: AkitaNgFormsManager<FormsState>) {}
}
