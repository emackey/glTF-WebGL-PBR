import { HDRImage } from '../libs/hdrpng.js';
import { fromKeys } from './utils.js';

const ImageMimeType = {JPEG: "image/jpeg", HDR: "image/vnd.radiance"};

class gltfImage
{
    constructor(uri = undefined, type = gl.TEXTURE_2D, miplevel = 0, bufferView = undefined, name = undefined, mimeType = ImageMimeType.JPEG, image = undefined)
    {
        this.uri = uri;
        this.bufferView = bufferView;
        this.mimeType = mimeType;
        this.image = image; // javascript image
        if (this.image !== undefined)
        {
            this.image.crossOrigin = "";
        }
        this.name = name;
        this.type = type; // nonstandard
        this.miplevel = miplevel; // nonstandard
    }

    fromJson(jsonImage, path = "")
    {
        fromKeys(this, jsonImage);

        if(this.uri !== undefined)
        {
            this.uri = path + this.uri;
        }
    }

    load(gltf, additionalFiles = undefined)
    {
        if (this.image !== undefined)
        {
            console.error("image has already been loaded");
            return;
        }

        this.image = this.mimeType === ImageMimeType.HDR ? new HDRImage() : new Image();
        this.image.crossOrigin = "";
        const self = this;
        const promise = new Promise(function(resolve, reject)
        {
            self.image.onload = resolve;
            self.image.onerror = resolve;

            if (!self.setImageFromBufferView(gltf) &&
                !self.setImageFromFiles(additionalFiles) &&
                !self.setImageFromUri())
            {
                console.error("Was not able to resolve image with uri '%s'", self.uri);
                resolve();
            }
        });

        return promise;
    }

    setImageFromUri()
    {
        if (this.uri === undefined)
        {
            return false;
        }

        this.image.src = this.uri;
        return true;
    }

    setImageFromBufferView(gltf)
    {
        const view = gltf.bufferViews[this.bufferView];
        if (view === undefined)
        {
            return false;
        }

        const buffer = gltf.buffers[view.buffer].buffer;
        const array = new Uint8Array(buffer, view.byteOffset, view.byteLength);
        const blob = new Blob([array], { "type": this.mimeType });
        this.image.src = URL.createObjectURL(blob);
        return true;
    }

    setImageFromFiles(files)
    {
        if (this.uri === undefined || files === undefined)
        {
            return false;
        }

        let bufferFile;
        for (bufferFile of files)
        {
            if (bufferFile.name === this.uri)
            {
                break;
            }
        }

        if (bufferFile.name !== this.uri)
        {
            return false;
        }

        const reader = new FileReader();
        const self = this;
        reader.onloadend = function(event)
        {
            self.image.src = event.target.result;
        }
        reader.readAsDataURL(bufferFile);

        return true;
    }
};

export { gltfImage, ImageMimeType };
