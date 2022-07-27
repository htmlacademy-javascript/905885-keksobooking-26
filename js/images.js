const MAX_PHOTOS_COUNT = 1;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ImageSize = {
  WIDTH: '70',
  HEIGHT: '70'
};

const avatarField = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const imageField = document.querySelector('.ad-form__upload input[type=file]');
const imagePreview = document.querySelector('.ad-form__photo');

avatarField.addEventListener('change', () => {
  const file = avatarField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imageField.addEventListener('change', () => {
  const file = imageField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {

    if (imagePreview.childNodes.length < MAX_PHOTOS_COUNT) {
      const image = document.createElement('img');
      image.width = ImageSize.WIDTH;
      image.height = ImageSize.HEIGHT;
      image.src = URL.createObjectURL(file);
      imagePreview.appendChild(image);
    }

    if (imagePreview.childNodes.length > 0) {
      const image = imagePreview.querySelector('img');

      image.src = URL.createObjectURL(file);
    }
  }

});
