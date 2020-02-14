function Gallery(gallery) {
  if (!gallery) {
    return;
  }
  const modal = document.querySelector('.modal');
  const images = gallery.querySelectorAll('img');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  function openModal() {
    if (modal.matches('.open')) {
      return;
    }
    modal.classList.add('open');
    window.addEventListener('keyup', handleKeys);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeys);
    prevButton.removeEventListener('click', showPrevImage);
    nextButton.removeEventListener('click', showNextImage);
  }

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleKeys(event) {
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowRight') showNextImage();
    if (event.key === 'ArrowLeft') showPrevImage();
  }

  function showImage(el) {
    if (!el) {
      return;
    }
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }
  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
  images.forEach(image =>
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    })
  );
  modal.addEventListener('click', handleClickOutside);
}

const galleryOne = Gallery(document.querySelector('.gallery-one'));
const galleryTwo = Gallery(document.querySelector('.gallery-two'));
