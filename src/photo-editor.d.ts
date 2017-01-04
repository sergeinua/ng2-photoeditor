// Type definitions for PhotoEditor
// Project: https://www.photoeditorsdk.com
// Definitions by: Sandor Huszar <https://github.com/sandor-huszar>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare namespace LoadPhotoEditor {
}

declare namespace PhotoEditor {}

declare namespace PhotoEditor.Editor {
    export class ImageEditor {}
}

export class BfrowPhotoEditor extends PhotoEditor.Editor.ImageEditor { }

declare namespace PhotoEditor {

    export class ExportedImage {

    }
}

declare namespace PhotoEditor.Actions {

    export class SDKActions {
    }
}

declare namespace PhotoEditor.Globals {

    export var _editorDisposator: () => void;
}

declare namespace PhotoEditor.Handlers{
    /**
    * Use to assign handler for saving the image
    * @param {PhotoEditor.ExportedImage} exportedImage - {image: HTMLImageElement (base64 encoded blob), url: string (url of image original source)}
    */
    export var onSaveHandler: (exportedImage: ExportedImage) => void;

    /**
    * Called when editor is loaded and UI initialized
    * @param {PhotoEditor.Actions.SDKActions} actions - reference to actions of the editor
    */
    export var onEditorLoaded: (actions: Actions.SDKActions) => void;

    /**
    * Called when editor is closed
    * @param {PhotoEditor.Actions.SDKActions} actions - reference to actions of the editor
    */
    export var onEditorClosed: (actions: Actions.SDKActions) => void;
}