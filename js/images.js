const MAX_PHOTOS_COUNT = 1;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ImageSize = {
  WIDTH: '70',
  HEIGHT: '70'
};

const avatarField = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const imageField = document.querySelector('.ad-form__upload input[type=file]');
const imagePreviewArea = document.querySelector('.ad-form__photo');

const addImageUploadListener = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    if (evt.target === imageField) {
      if (imagePreviewArea.childNodes.length < MAX_PHOTOS_COUNT) {
        const image = document.createElement('img');
        image.width = ImageSize.WIDTH;
        image.height = ImageSize.HEIGHT;
        image.src = URL.createObjectURL(file);
        imagePreviewArea.appendChild(image);
      }

      if (imagePreviewArea.childNodes.length > 0) {
        const image = imagePreviewArea.querySelector('img');

        image.src = URL.createObjectURL(file);
      }
    } else {
      avatarPreview.src = URL.createObjectURL(file);
    }
  }
};

export {addImageUploadListener, avatarField, imageField, avatarPreview, imagePreviewArea};
