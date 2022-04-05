import Compressor from 'compressorjs'

export class DragAndDrop {
  private readonly _filesUri: (
    | { imageName: string; imageSize: number; src: string }
    | ArrayBuffer
  )[]

  private element: HTMLElement
  private inputName: string
  private inputLabel: string
  private multiple: boolean

  constructor(element: HTMLElement, options: any, callback: Function) {
    this.element = element
    this._filesUri = new Array<
      { imageName: string; imageSize: number; src: string } | ArrayBuffer
    >()
    this.inputName = 'file'
    this.inputLabel = 'Je t\u00e9l\u00e9charge mon image'
    this.multiple = false
    this.initVars(options)
    this.init(callback)
  }

  private initVars(options: any) {
    if (options.hasOwnProperty('inputName')) {
      this.inputName = options.inputName
    }

    if (options.hasOwnProperty('inputLabel')) {
      this.inputLabel = options.inputLabel
    }

    if (options.hasOwnProperty('multiple')) {
      this.multiple = options.multiple
    }
  }

  private init(successCallback: Function) {
    this.renderHtml(successCallback)
    const preventDefaults = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      this.element.addEventListener(eventName, preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach((eventName) => {
      this.element.addEventListener(eventName, highlight, false)
    })
    ;['dragleave', 'drop'].forEach((eventName) => {
      this.element.addEventListener(eventName, unHighlight, false)
    })

    const handleDrop = (e: DragEvent) => {
      const dt = e.dataTransfer
      const files = dt.files
      this.handleFile(files, successCallback)
    }

    const highlight = () => {
      this.element.classList.add('highlight')
    }

    const unHighlight = () => {
      this.element.classList.remove('highlight')
    }

    this.element.addEventListener('drop', handleDrop, false)
  }

  private isFileImage(file: File) {
    return file && file.type.split('/')[0] === 'image'
  }

  private formatBlob(blob: Blob, file: File, successCallback: Function) {
    const instance = this
    const reader = new FileReader()

    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const objectImage = {
        imageName: file.name,
        imageSize: file.size,
        src: reader.result.toString()
      }
      instance.filesUri.push(objectImage)
      successCallback(objectImage)
    }
  }

  private handleFile(files: FileList, successCallback: Function) {
    Array.prototype.forEach.call(files, (file: File) => {
      const instance = this
      if (this.isFileImage(file)) {
        new Compressor(file, {
          quality: 0.8,
          success(result: Blob) {
            instance.formatBlob(result, file, successCallback)
          },
          error(err: Error) {
            console.error(err.message)
          },
        })
      } else {
        instance.formatBlob(file, file, successCallback)
      }
    })
  }

  private renderHtml(successCallback: Function) {
    const input = document.createElement('input')
    input.type = 'file'
    input.name = this.inputName
    input.multiple = this.multiple
    input.addEventListener('change', (event) => {
      const filesToSend = (<HTMLInputElement>event.target).files
      this.handleFile(filesToSend, successCallback)
    })
    const p = document.createElement('p')
    p.innerText = ' ou Glissez-d\u00e9posez ici votre image'
    this.element.appendChild(input)
    const label = document.createElement('label')
    label.innerText = this.inputLabel
    this.element.appendChild(label)
    this.element.appendChild(p)
  }

  get filesUri(): (
    | { imageName: string; imageSize: number; src: string }
    | ArrayBuffer
  )[] {
    return this._filesUri
  }
}

Object.defineProperty(Element.prototype, 'nrdrag', {
  value: function (options: any, callback: Function) {
    return new DragAndDrop(this, options, callback)
  },
  enumerable: true,
})
