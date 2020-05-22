import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DesignEditorModule } from 'projects/design-editor/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DesignEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
