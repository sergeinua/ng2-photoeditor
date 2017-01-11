import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild, OnChanges, OnInit, OnDestroy } from '@angular/core';

const PhotoEditorSDK = require('./src/PhotoEditorSDK/3.5.0/js/PhotoEditorSDK.js');
const PhotoEditorReactUI = require('./src/PhotoEditorSDK/3.5.0/js/PhotoEditorReactUI.js');

@Component({
    selector: 'photo-editor',
    template: `<div #host class="host"></div><div class="buttons"><button (click)="saveClick()">Save</button></div>`,
    styleUrls: [
        './src/PhotoEditorSDK/3.5.0/css/PhotoEditorReactUI.min.css'
    ],
})
export class PhotoEditorComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('host') host: any;
    el: ElementRef;
    editor: any;
    propagateChange = (_: any) => { };
    @Input() imageSrc: string;
    @Output() saveImageEvent:EventEmitter<Event> = new EventEmitter<any>();
    
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
        if (this.editor) {
            if (value && value !== '') {
                this.editor.setContent(value);
            }
        }
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) { }
    
    createEditor() {
        let myImage = new Image();
        myImage.crossOrigin = 'anonymous';
        myImage.addEventListener('load', () => {
            this.editor = new PhotoEditorSDK.UI.ReactUI({
                container: this.host.nativeElement,
                showNewButton: false,
                showCloseButton: false,
                editor: {
                    image: myImage,
                    //preferredRenderer: 'webgl'
                  },
                //apiKey: 'your-api-key', // <-- Please replace this with your API key
                assets: {
                  baseUrl: '/assets/photoeditor' // <-- This should be the absolute path to your `assets` directory
                }
              });
        })
        myImage.src = this.imageSrc;
    }
    
    saveClick() {
        this.editor.export(PhotoEditorSDK.RenderType.BUFFER,PhotoEditorSDK.ImageFormat.PNG,1)
            .then(result => {
                //console.log(result);
                this.saveImageEvent.emit(result);
            });
    }
}
