export interface CAMERA_CONFIG{  
  facingMode?: "user" | "environment";
  cameraId?: string, //Camera that will be used, if none then use the default camera
  framerate?: number, //Frame rate of the camera, default is 30fps while the ideal is .75 of original
  width?: number, //Width of the camera, default is 1280px for the ideal  but the min is half and max is double
  height?: number, //Height of the camera, default is 720px for the ideal but the min is half and max is double
  hasAudio?: boolean, //If the camera has audio, default is false
}
export class Camera{
  private _videoElement: HTMLVideoElement;
  private _config: CAMERA_CONFIG = {
    facingMode: "user",
    framerate: 30,
    width: 1280,
    height: 720,
    hasAudio: false
  }
  private cameraDirection = {
    horizontalFlip: false,
    verticalFlip: false,
    rotation: 0 //0, 90, 180, 270
  }

  public mediaStream: MediaStream | null = null;

  constructor(videoElement: HTMLVideoElement) {
    this._videoElement = videoElement;
  }

  public init(){
    const config:MediaStreamConstraints = {
      audio: this._config.hasAudio,
      video:{
        facingMode: this._config.facingMode,
        width: {
          ideal: this._config.width,
          min: this._config.width ? this._config.width / 2 : undefined,
          max: this._config.width ? this._config.width * 2 : undefined
        },
        height: {
          ideal: this._config.height,
          min: this._config.height ? this._config.height / 2 : undefined, 
          max: this._config.height ? this._config.height * 2 : undefined
        },
        frameRate: {
          ideal: this._config.framerate,
          max: this._config.framerate ? this._config.framerate * 1.5 : undefined
        }
      }
    };

    if(this._config.cameraId){
      (config.video as any).facingMode = undefined;
      (config.video as any).deviceId = this._config.cameraId;
    }
    
    const camera = navigator.mediaDevices.getUserMedia(config).then((stream) => {
      this._videoElement.srcObject = stream;
      this._videoElement.play();
      this.mediaStream = stream;
    }).catch((error) => {
      console.error("Error accessing camera: ", error);
    });
    return camera;
  }

  public get videoElement(){
    return this._videoElement;
  }

  public set videoElement(value: HTMLVideoElement) {
    this._videoElement = value;
  }

  public get config(){
    return this._config;
  }

  public set config(value: CAMERA_CONFIG) {
    this._config = {
      ...this._config,
      ...value
    };
  }

  public async capture(){
    if(this.mediaStream == null){
      throw new Error("Camera is not initialized. Call init() method first.");
    }

    //For Now Let's use canvas since the new ImageCapture API is not widely supported
    const canvas = document.createElement("canvas");
    canvas.width = this._videoElement.videoWidth;
    canvas.height = this._videoElement.videoHeight; 
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.drawImage(this._videoElement, 0, 0, canvas.width, canvas.height);
    // Apply transformations if any
    if(this.cameraDirection.horizontalFlip){
      context.scale(-1, 1);
      context.drawImage(this._videoElement, -canvas.width, 0, canvas.width, canvas.height);
    }
    if(this.cameraDirection.verticalFlip){
      context.scale(1, -1);
      context.drawImage(this._videoElement, 0, -canvas.height, canvas.width, canvas.height);
    }
    // Rotation
    context.rotate((this.cameraDirection.rotation * Math.PI) / 180);
    context.drawImage(this._videoElement, 0, 0, canvas.width, canvas.height);
    

    return new Promise<{
      file: File,
      url: string,
      blob: Blob,
    }|null>((resolve)=>{
      canvas.toBlob((blob) => {
        if(blob){
          const file = new File([blob], "captured-image.png", { type: "image/png" });
          resolve({ file, url: URL.createObjectURL(file), blob });
        } else {
          resolve(null);
        }
      }, "image/png");
    });
  }

  public openCamera(){
    this.init();
  }

  public closeCamera(){
    if(!this.mediaStream){
      console.log("Camera is not yet initiated");
      return;
    }
    this.mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  public flipHorizontal(){
    if(!this._videoElement.style.transform || this._videoElement.style.transform !== "scaleX(-1)"){
      this.cameraDirection.horizontalFlip = true;
      this._videoElement.style.transform = "scaleX(-1)";
    } else {
      this.cameraDirection.horizontalFlip = false;
      this._videoElement.style.transform = "";
    }
  }

  public flipVertical(){
    if(!this._videoElement.style.transform || this._videoElement.style.transform !== "scaleY(-1)"){
      this.cameraDirection.verticalFlip = true;
      this._videoElement.style.transform = "scaleY(-1)";
    } else {
      this.cameraDirection.verticalFlip = false;
      this._videoElement.style.transform = "";
    }
  }

  public rotateCamera(degrees: number){
    if(degrees % 90 !== 0){
      throw new Error("Rotation degrees must be a multiple of 90");
    }
    this.cameraDirection.rotation = (this.cameraDirection.rotation + degrees) % 360;
    this._videoElement.style.transform = `rotate(${this.cameraDirection.rotation}deg)`;
  }

}