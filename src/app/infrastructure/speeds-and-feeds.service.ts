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
    map(data => data.value),
    filter(data => !!data.materialToCut && !!this.feedsAndSpeeds[data.materialToCut]),
    map(data => {
      const sfm = this.feedsAndSpeeds[data.materialToCut].sfm;

      return data.cutAggression === 'aggressive' ? sfm.aggressive : sfm.conservative;
    })
  );

  // Todo everything from the form is a string fix that
  readonly chipLoad$ = this.formData$.pipe(
    map(data => data.value),
    filter(
      data =>
        !!data.materialToCut &&
        !!this.feedsAndSpeeds[data.materialToCut] &&
        !!this.feedsAndSpeeds[data.materialToCut].chipLoad[+data.toolDiameter]
    ),
    map(data => {
      const material = this.feedsAndSpeeds[data.materialToCut];
      const chipLoad = material.chipLoad[+data.toolDiameter];

      return chipLoad;
    })
  );

  constructor(private formsManager: AkitaNgFormsManager<FormsState>) {}
}
