import { Injectable } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { map, filter } from 'rxjs/operators';
import { feedsAndSpeeds } from './speeds-and-feeds.data';

// Todo think about where to put form related stuff doesnt seem like core
export const formName = 'cutData';

export interface FormsState {
  cutData: {
    materialToCut: string;
    toolMaterialType: number;
    toolDiameter: string;
    numberOfFlutes: string;
  };
}

@Injectable()
export class SpeedsAndFeedsService {
  readonly formData$ = this.formsManager.selectForm(formName);
  readonly feedsAndSpeeds = feedsAndSpeeds;

  // Todo create custom operator for logic
  readonly sfm$ = this.formData$.pipe(
    map(data => data.value),
    filter(data => !!this.feedsAndSpeeds[0].materials.find(m => m.name === data.materialToCut)),
    map(data => this.feedsAndSpeeds[0].materials.find(m => m.name === data.materialToCut).sfm.conservative)
  );

  // Todo core references infrasturcture for Forms State Fix
  constructor(private formsManager: AkitaNgFormsManager<FormsState>) {}
}
