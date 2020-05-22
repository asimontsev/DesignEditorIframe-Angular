import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'au-design-editor',
  templateUrl: "./design-editor.component.html",
  styleUrls: ["./design-editor.component.less"]
})
export class DesignEditorComponent implements OnInit {
  @Input() url: string;
  @ViewChild("editorFrame") iframeElement: ElementRef;

  constructor() {}

  private _resolvePromise: () => void;
  private _scriptLoadedPromise = new Promise(resolve => {
    this._resolvePromise = resolve;
  });

  ngOnInit() {
    if (this.url == null)
      throw "url can't be null";

    this._addCcScript();
  }

  private _addCcScript() {
    const scriptElement = document.createElement("script");
    scriptElement.src = `${this.url}/Resources/Generated/IframeApi.js`;
    scriptElement.id = "CcIframeApiScript";
    document.head.appendChild(scriptElement);
    scriptElement.onload = () => {
      this._resolvePromise();
    };
  }

  async loadEditor(productDefition: Object, config: Object) {
    await this._scriptLoadedPromise;
    (window as any).CustomersCanvas.IframeApi.loadEditor(this.iframeElement.nativeElement, productDefition, config);
  }
}
