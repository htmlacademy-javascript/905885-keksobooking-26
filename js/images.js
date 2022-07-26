const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarField = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const imageField = document.querySelector('.ad-form__upload input[type=file]');
const imagePreview = document.querySelector('.ad-form__photo');

avatarField.addEventListener('change', () => {
  const file = avatarField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imageField.addEventListener('change', () => {
  const file = imageField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {

    if (imagePreview.childNodes.length < 1) {
      const image = document.createElement('img');
      imagePreview.appendChild(image);
      image.src = URL.createObjectURL(file);
      image.width = '70';
      image.height = '70';
    }

    if (imagePreview.childNodes.length > 0) {
      const image = imagePreview.querySelector('img');

      image.src = URL.createObjectURL(file);
    }
  }

});
