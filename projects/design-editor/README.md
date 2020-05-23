# DesignEditor

This is a sample project illustrating how to embed Customer's Canvas editor through the IFrame API to an Angular application.

It contains: 

- A simple component which wraps the IFrame API. You can find it in **projects\design-editor\src\lib**.
- An example of the component usage. You can find it in **projects\design-editor-test\src\app**.

## Usage

### Insert the editor to the page

The component is embedded to your app as follows: 

```html
<au-design-editor [url]="'https://localhost:44300'"></au-design-editor>
```

You can find an example in **app.component.html** of the test app. 

The URL is a link to your instance of Customer's Canvas. To get the component to work, you need to pass the correct URL. For example, if you are running Customer's Canvas at Aurigma's servers, most likely the URL you need to pass looks like this: 

https://h.customerscanvas.com/Users/%SOME_GUID%/SimplePolygraphy/ 



> **Note:** This address is a base URL of Customer's Canvas instance, and it is used not just to embed it to the page, but also to make REST API calls to the CC server. A list of currently available APIs can be found at https://customerscanvas.com/docs/cc/webapi.htm  



### Initialize the editor

Inserting the component would just load the IFrameAPI.js library and create the `<iframe>` element where the editor is hosted. However, you need to pass the description of a design you want to edit as well as the configuration of the editor. To do it, you need to call the `loadEditor` method - which works in the same way as the [appropriate method of IFrameAPI](https://customerscanvas.com/docs/cc/customerscanvas.iframeapi.loadeditor.htm). Most likely, you want to do it in the `ngAfterViewInit()` of your app. 

The usage example can be found in **app.component.ts** of the test app:

``` ts
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
```



### Use the editor after initialization

If you just call the `loadEditor`, it will open the design and let the user to modify it. However, most likely, you need to interact with the editor - to save the result, to access items in the editor, to handle events, etc. 

Let's modify our code a little bit: 

``` ts
  editor = null;

  async ngAfterViewInit() {
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

    this.editor = await this._deComponent.loadEditor(productDef, config);
  }
```

The `loadEditor` returns an instance of [Editor class](https://customerscanvas.com/docs/cc/customerscanvas.iframeapi.editor.htm) from IFrame API. You can use it to work with the editor after it is being loaded.

 

> **Note:** At this moment, there are no typings for the IFrame API available in npm yet. Sorry for that. Meanwhile, you can use the IFrameAPI documentation to see available methods and properties. 



Now, let's take a look how we can use the Editor instance to save the result and get links to PDF files and preview images. For sake of brevity, we just output the result object with the URLs to PDF files to console.

To do it, let's add a button in **app.component.html**:

```html
<button (click)="saveDesign()">Save (see console)</button>
```

And declare a button click handler in **app.component.ts**:  

``` ts
  async saveDesign() {
    if (this.editor) {
      const result = await this.editor.finishProductDesign();
      console.log(result);
    }
  }
```


## Build and run

You need to work with this project as with a standard Angular project:

1. Once you clone the project from Git, run `npm install` .
2. Use `ng serve` to run it.
3. Use `ng build` to build it. The build artifacts will be stored in the `dist/` directory.
4. Use `ng generate component component-name --project design-editor` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project design-editor`.