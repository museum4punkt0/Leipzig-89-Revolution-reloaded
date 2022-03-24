/**
 * image preloader
 */
class ImagePreloading {

  /**
   * constructor
   * @param imagePath
   * @param callback
   */
  constructor(imagePath, callback) {
    const img = new Image()
    img.src = imagePath
    img.onload = () => callback(img);
    img.onerror = () => callback(img);
  }

}

export default ImagePreloading;