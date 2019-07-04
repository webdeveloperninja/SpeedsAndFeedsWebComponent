import { Injectable } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { map, filter } from 'rxjs/operators';
import { materials } from '../core/speeds-and-feeds.data';

// Todo think about where to put form related stuff doesnt seem like core
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

  readonly sfm$ = this.formData$.pipe(
    map(data => data.value),
    filter(data => !!data.materialToCut && !!this.feedsAndSpeeds[data.materialToCut]),
    map(data => {
      const sfm = this.feedsAndSpeeds[data.materialToCut].sfm;

      return data.cutAggression === 'Aggressive' ? sfm.aggressive : sfm.conservative;
    })
  );

  // Todo core references infrasturcture for Forms State Fix
  constructor(private formsManager: AkitaNgFormsManager<FormsState>) {}
}
