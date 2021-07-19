var cover = document.querySelector('img');
var title = document.querySelector('h2');
var firstDescriptor = document.querySelector('.tagline-1');
var secondDescriptor = document.querySelector('.tagline-2');
var savedCoversSection = document.querySelector('.saved-covers-section');
var randomButton = document.querySelector('.random-cover-button');
var homeButton = document.querySelector('.home-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var viewSavedCoversButton = document.querySelector('.view-saved-button');
var makeNewCoverButton = document.querySelector('.make-new-button');
var makeMyBookButton = document.querySelector('.create-new-book-button');
var homeView = document.querySelector('.home-view');
var savedCoverView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');

var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

document.addEventListener("DOMContentLoaded", randomizeCover);

randomButton.addEventListener("click", randomizeCover);

homeButton.addEventListener('click', homePage);

saveCoverButton.addEventListener('click', function() {
  saveCover(currentCover);
});

viewSavedCoversButton.addEventListener('click', savedPage);

makeNewCoverButton.addEventListener('click', makePage);

makeMyBookButton.addEventListener('click', function() {
  createBook();
  homePage();
});

savedCoversSection.addEventListener("dblclick", deleteCovers);

function randomizeCover() {
  currentCover = new Cover(covers[getRandomIndex(covers)], titles[getRandomIndex(titles)], descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)]);
  cover.src = currentCover.cover;
  title.innerText = currentCover.title;
  firstDescriptor.innerText = currentCover.tagline1;
  secondDescriptor.innerText = currentCover.tagline2;
}

function homePage() {
  homeView.classList.remove('hidden');
  homeButton.classList.add('hidden');
  randomButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  formView.classList.add('hidden');
  savedCoverView.classList.add('hidden');
}

function saveCover(currentCover) {
  if (savedCovers.includes(currentCover)) {
    alert('That cover already exists!');
  } else {
    savedCovers.push(currentCover);
  }
}

function savedPage() {
  savedCoverView.classList.remove('hidden');
  homeView.classList.add('hidden');
  formView.classList.add('hidden');
  homeButton.classList.remove('hidden');
  randomButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  showSavedCovers();
}

function makePage() {
  formView.classList.remove('hidden');
  homeView.classList.add('hidden');
  homeButton.classList.remove('hidden');
  randomButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  savedCoverView.classList.add('hidden');
}

function createBook() {
  event.preventDefault();

  var userCover = document.querySelector('#cover').value;
  var userTitle = document.querySelector('#title').value;
  var userDescriptor1 = document.querySelector('#descriptor1').value;
  var userDescriptor2 = document.querySelector('#descriptor2').value;

  currentCover = new Cover(userCover, userTitle, userDescriptor1, userDescriptor2);

  cover.src = currentCover.cover;
  title.innerText = currentCover.title;
  firstDescriptor.innerText = currentCover.tagline1;
  secondDescriptor.innerText = currentCover.tagline2;
}

function showSavedCovers() {
  savedCoversSection.innerHTML = "";
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoversSection.innerHTML += `
      <section class="mini-cover">
        <img class="cover-image" src="${savedCovers[i].cover}">
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
      </section>`;
  }
}

function deleteCovers() {
  for (var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id.toString() === event.target.parentNode.id) {
      savedCovers.splice(i, 1);
    }
  }
  showSavedCovers();
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
