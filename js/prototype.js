function Gallery(gallery) {
  if (!gallery) {
    return;
  }
  this.gallery = gallery;
  this.modal = document.querySelector('.modal');
  this.images = gallery.querySelectorAll('img');
  this.prevButton = document.querySelector('.prev');
  this.nextButton = document.querySelector('.next');

  //bind our methods to the instance when we need them
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeys = this.handleKeys.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  this.images.forEach(image => image.addEventListener('click', e => this.showImage(e.currentTarget)));
  this.images.forEach(image =>
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    })
  );
  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function() {
  if (this.modal.matches('.open')) {
    return;
  }
  this.modal.classList.add('open');
  window.addEventListener('keyup', this.handleKeys);
  this.prevButton.addEventListener('click', this.showPrevImage);
  this.nextButton.addEventListener('click', this.showNextImage);
};

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  window.removeEventListener('keyup', this.handleKeys);
  this.prevButton.removeEventListener('click', this.showPrevImage);
  this.nextButton.removeEventListener('click', this.showNextImage);
};

Gallery.prototype.handleClickOutside = function(event) {
  if (event.target === event.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.handleKeys = function(event) {
  if (event.key === 'Escape') this.closeModal();
  if (event.key === 'ArrowRight') this.showNextImage();
  if (event.key === 'ArrowLeft') this.showPrevImage();
};

Gallery.prototype.showImage = function(el) {
  if (!el) {
    return;
  }
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

Gallery.prototype.showPrevImage = function() {
  this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
};
Gallery.prototype.showNextImage = function() {
  this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
};

const galleryOne = new Gallery(document.querySelector('.gallery-one'));
const galleryTwo = new Gallery(document.querySelector('.gallery-two'));

console.log(galleryOne, galleryTwo);
