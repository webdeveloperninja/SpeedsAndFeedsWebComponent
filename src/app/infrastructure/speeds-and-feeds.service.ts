import { Injectable } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { filter, map } from 'rxjs/operators';
import { CutAggression } from '../core/cut-aggression.enum';
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
  readonly formData$ = this.formsManager.selectForm(formName).pipe(filter(formData => formData.valid));
  readonly materials = materials;

  readonly surfaceFeetPerMinute$ = this.formData$.pipe(
    map(formData => {
      const materialToCut = formData.value.materialToCut;
      const aggression = formData.value.cutAggression;

      return this.toSurfaceFeetPerMinute(materialToCut, aggression);
    })
  );

  readonly chipLoad$ = this.formData$.pipe(
    map(formData => {
      const toolDiameter = formData.value.toolDiameter;
      const materialToCut = formData.value.materialToCut;

      return this.toChipLoad(materialToCut, toolDiameter);
    })
  );

  constructor(private formsManager: AkitaNgFormsManager<FormsState>) {}

  private toSurfaceFeetPerMinute(materialToCut: string, aggression: CutAggression) {
    const aggressiveSurfaceFeetPerMinute = this.materials[materialToCut].sfm.aggressive;
    const conservativeSurfaceFeetPerMinute = this.materials[materialToCut].sfm.conservative;

    return aggression === CutAggression.aggressive ? aggressiveSurfaceFeetPerMinute : conservativeSurfaceFeetPerMinute;
  }

  private toChipLoad(materialToCut: string, toolDiameter: number) {
    const chipLoadMap = this.materials[materialToCut].chipLoad;

    return chipLoadMap[toolDiameter];
  }
}
