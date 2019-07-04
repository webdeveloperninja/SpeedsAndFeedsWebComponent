import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { feedsAndSpeeds } from './speeds-and-feeds';

export const formName = 'cutData';

export interface FormsState {
  cutData: {
    materialToCut: string;
    toolMaterialType: number;
    toolDiameter: string;
    numberOfFlutes: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly formData$ = this.formsManager.selectForm(formName);
  readonly feedsAndSpeeds = feedsAndSpeeds;

  toolForm = this._formBuilder.group({
    materialToCut: [''],
    toolMaterialType: [''],
    toolDiameter: [''],
    numberOfFlutes: ['']
  });

  constructor(private readonly _formBuilder: FormBuilder, private formsManager: AkitaNgFormsManager<FormsState>) {}

  ngOnInit() {
    this.formsManager.upsert(formName, this.toolForm);
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }
}
