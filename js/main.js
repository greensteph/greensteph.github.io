document.getElementById('copyright').innerHTML = '&copy; ' + new Date().getFullYear() + ' Stephanie Green';

(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const closeBtn = document.getElementById('lightbox-close');

  let images = [];
  let title = '';
  let index = 0;

  function render() {
    lightboxImg.src = images[index];
    lightboxImg.alt = title;
    lightboxCaption.textContent = images.length > 1
      ? title + ': ' + (index + 1) + ' / ' + images.length
      : title;
    const multi = images.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
  }

  function open(imgList, startTitle, startIndex) {
    images = imgList;
    title = startTitle;
    index = startIndex;
    render();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function step(delta) {
    index = (index + delta + images.length) % images.length;
    render();
  }

  document.querySelectorAll('.project-shots[data-images]').forEach(function (el) {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    const imgList = JSON.parse(el.getAttribute('data-images'));
    const shotTitle = el.getAttribute('data-title') || '';
    el.addEventListener('click', function () {
      open(imgList, shotTitle, 0);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(imgList, shotTitle, 0);
      }
    });
  });

  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
