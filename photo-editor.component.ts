import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

const PhotoEditorSDK = require('./src/PhotoEditorSDK/3.5.0/js/PhotoEditorSDK.js');
const PhotoEditorReactUI = require('./src/PhotoEditorSDK/3.5.0/js/PhotoEditorReactUI.js');

@Component({
    selector: 'photo-editor',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div #host id="photo-host"></div>
        <div class="actions">
            <a class="action-button cancel-button" (click)="cancelClick()">Cancel</a>
            <a class="action-button save-button" (click)="saveClick()">Save</a>
	</div>
    `,
    styleUrls: [
        './src/PhotoEditorSDK/3.5.0/css/PhotoEditorReactUI.css',
        './photo-editor.component.css'
    ],
})
export class PhotoEditorComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('host') host: any;
    el: ElementRef;
    editor: any;
    propagateChange = (_: any) => { };
    @Input() imageSrc: string;
    @Output() saveImageEvent:EventEmitter<Event> = new EventEmitter<any>();
    @Output() cancelEvent:EventEmitter<Event> = new EventEmitter<any>();
    
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngOnInit() {
        //this.createEditor();
    }
    
    ngOnDestroy() {
        if (this.editor) {
            this.editor.dispose();
        }
    }

    ngOnChanges(changes: any) {
//        console.log(changes);
        if (this.editor) {
            this.editor.dispose();
        }
        this.createEditor();
        this.propagateChange(changes);
    }
    
    writeValue(value: any) {
        //console.log(value);
//        if (this.editor) {
//            if (value && value !== '') {

//            }
//        }
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) { }
    
    createEditor() {
        let myImage = new Image();
        myImage.crossOrigin = 'anonymous';
        myImage.setAttribute('crossOrigin', 'anonymous');
        myImage.addEventListener('load', () => {
            this.editor = new PhotoEditorSDK.UI.ReactUI({
                container: this.host.nativeElement,
                showNewButton: false,
                showCloseButton: false,
                editor: {
                    image: myImage,
                    //preferredRenderer: 'canvas',//canvas,webgl
                    export: {
                        showButton: false,
                        download: false
                    }
                },
                //apiKey: 'your-api-key', // <-- Please replace this with your API key
                assets: {
                  baseUrl: '/assets/photoeditor' // <-- This should be the absolute path to your `assets` directory
                },
                title: 'Bfrow Photo Editor',
                enableUpload: false,
                enableWebcam: false,
                showHeader: false
              });
        })
        myImage.src = this.imageSrc;
    }
    
    saveClick() {
        this.editor.export(false)
            .then(result => {
                this.saveImageEvent.emit(result);
            });
    }
    
    cancelClick() {
        this.cancelEvent.emit();
    }
}
