const currentYear = new Date().getFullYear();
const yearEl = document.querySelector('.year');
yearEl.textContent = currentYear;

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
btnNavEl.addEventListener('click', () => {
  headerEl.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Fixing smooth scroll property missing in some Safari versions
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach((link) => link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');

    if (href === '#') window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({behavior: 'smooth'})
    }

    if(headerEl.classList.contains('nav-open')) headerEl.classList.remove('nav-open')
  }
));

const sectionHeroEl = document.querySelector('.section-hero');
const observer = new IntersectionObserver((entries) => {
  const [ent] = entries;
  
  if (!ent.isIntersecting) {
    document.body.classList.add('sticky')
  }

  if (ent.isIntersecting) {
    document.body.classList.remove('sticky')
  }
}, {
  root: null,
  threshold: 0,
  rootMargin: '-80px'
});
observer.observe(sectionHeroEl);
// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

