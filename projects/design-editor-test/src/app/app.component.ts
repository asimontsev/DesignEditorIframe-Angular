import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DesignEditorComponent } from 'projects/design-editor/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  title = 'design-editor-test';
  @ViewChild(DesignEditorComponent) private _deComponent: DesignEditorComponent;

  ngAfterViewInit() {
    const productDef = {
      "surfaces": [{
        "printAreas": [{
          "designFile": "samples/test-page"
        }]
      }]
    };

    const config = {
      "initialMode": "Advanced"
    };

    this._deComponent.loadEditor(productDef, config);
  }
}
