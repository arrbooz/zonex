// select

const customSelect = document.querySelectorAll('.custom-select');

customSelect.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('custom-select--open');

    if (e.target.classList.contains('custom-select__item')) {
      let text = e.target.textContent;
      e.currentTarget.querySelector('.custom-select__top').textContent = text; 
    }
  });

  el.addEventListener('focus', (e) => {
    e.currentTarget.classList.add('custom-select--open');
  });

  el.addEventListener('blur', (e) => {
    e.currentTarget.classList.remove('custom-select--open');
  });
});


// mobile filters

const mobileFiltersOpen = document.querySelector('.catalog-mobile-filters');
const catalogFilters = document.querySelector('.catalog-filters');


if (mobileFiltersOpen) {
  let openFilters = false;
    mobileFiltersOpen.addEventListener('click', (e) => {
    if (!openFilters) {
      mobileFiltersOpen.querySelector('span').textContent = 'Закрыть';
      catalogFilters.classList.add('catalog-filters--open');
      openFilters = true;
    } else {
      mobileFiltersOpen.querySelector('span').textContent = 'Фильтры';
      catalogFilters.classList.remove('catalog-filters--open');
      openFilters = false;
    }
  });
}





// catalog filter

if (document.querySelector('.catalog')) {

  const catalogFiltersTop = document.querySelectorAll('.catalog-filter__top');
  const hideFilters = document.querySelector('.hide-filters');

  catalogFiltersTop.forEach(el => {
    el.addEventListener('click', (e) => {
      e.currentTarget.closest('.catalog-filter').classList.toggle('catalog-filter--open');
    });
  });

  hideFilters.addEventListener('click', (e) => {
    catalogFiltersTop.forEach(el => {
        el.closest('.catalog-filter').classList.remove('catalog-filter--open');
    });
  });

  const catalogFilterItems = document.querySelectorAll('.catalog-filter__item');
const catalogChoise = document.querySelector('.catalog-choice');

const createChoiceItem = (text) => {
  return (
    `
    <button class="catalog-choice__item" data-choice-text="${text}">
      ${text}
			<svg  id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
		</button>
    `
  );
};

catalogFilterItems.forEach(el => {
  el.querySelector('input').addEventListener('change', (e) => {
    let checked = el.querySelector('input').checked;

    if (checked) {
      el.querySelector('.custom-checkbox').classList.add('custom-checkbox--active'); 
      let text = el.querySelector('.custom-checkbox__text').textContent;

      catalogChoise.insertAdjacentHTML('afterbegin', createChoiceItem(text));

    } else {
      el.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active'); 

      let text = el.querySelector('.custom-checkbox').dataset.text;

      document.querySelector(`[data-choice-text="${text}"]`).remove();
    }

    let activeCheckboxes = document.querySelectorAll('.custom-checkbox--active');

    if (activeCheckboxes.length > 0) {
      catalogChoise.style.display = 'block';
    } else {
      catalogChoise.style.display = 'none';
    }
  });
});

catalogChoise.addEventListener('click', (e) => {
  if (e.target.classList.contains('catalog-choice__item')) {
    e.target.remove();

    let text = e.target.textContent.trimLeft().trimRight();

    document.querySelector(`[data-text="${text}"]`).querySelector('input').checked = false;
    document.querySelector(`[data-text="${text}"]`).classList.remove('custom-checkbox--active');

  }

  if (e.target.classList.contains('catalog-choice__clear')) {
    Array.from(e.currentTarget.children).forEach(el => {
      if (!el.classList.contains('catalog-choice__clear')) {
        el.remove();
      }

      catalogFilterItems.forEach(el => {
        el.querySelector('input').checked = false;
        el.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active');

      })
    });

    e.currentTarget.style.display = 'none';
  }

  if (e.currentTarget.children.length === 1) {
    e.currentTarget.style.display = 'none';
  }
});

}


// burger

const burger = document.querySelector('.burger');
const navClose = document.querySelector('.nav__close');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  nav.classList.add('nav--visible');
})

navClose.addEventListener('click', () => {
  nav.classList.remove('nav--visible');
})

nav.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')) {
    nav.classList.remove('nav--visible');
  }
});



// marketing window

const marketing = document.querySelector('.marketing');

if (marketing) {
  let counter = 0;
  let delay = 4000;

const data = [
  {
    title: 'Title of product 1',
    where: 'Moscow, Russia',
  },
  {
    title: 'Title of product 2',
    where: 'Kiev, Ukraine',
  },
  {
    title: 'Title of product 3',
    where: 'Rome, Italy',
  },
];

const closeMarketing = () => {
  marketing.classList.remove('marketing--visible')
}

const changeMarketingData = () => {
  marketing.classList.remove('marketing--visible');

  setTimeout(() => {
    marketing.classList.add('marketing--visible');
  }, delay - 2000);

  const stringTitle = `${data[counter].title}`;
  const stringWhere = `15 minutes ago ${data[counter].where}`;

  marketing.querySelector('.marketing__title').textContent = stringTitle;
  marketing.querySelector('.marketing__from').textContent = stringWhere;

  counter++;

  if (counter === data.length) {
    counter = 0;
  }
}

changeMarketingData();

setInterval(changeMarketingData, 4000);

marketing.addEventListener('click', (e) => {
  if (e.target.classList.contains('marketing__close')) {
    closeMarketing();
  }
})
}


// sliders

const bannerSlider = new Swiper('.banner-slider', {

  loop: true,

  pagination: {
    el: '.banner-pag',
    type: 'bullets',
    clickable: true,
  },
});

const catalogSlider = new Swiper('.hero-catalog__slider', {

loop: true,

navigation: {
  nextEl: '.hero-next-btn',
  prevEl: '.hero-prev-btn',
},
pagination: {
  el: '.hero-pag',
  type: 'bullets',
  clickable: true,
},
});

const relatedSlider = new Swiper('.card-related__slider', {

  loop: true,
  slidesPerView: 2,
  spaceBetween: 30,

  pagination: {
    el: '.related-pag',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 4,
    }
  }
});



//  catalog columns

const catalogColumns = document.querySelector('.catalog-columns__list');
const catalogGridContent = document.querySelector('.catalog-grid__content');
const freeDeliveryBtn = document.querySelector('.free-delivery__btn');

if (document.querySelector('.catalog')) {

  freeDeliveryBtn.addEventListener('click', (e) => {
    e.currentTarget.closest('.free-delivery').style.display = 'none';
  });

  catalogColumns.addEventListener('click', (e) => {
    if (e.target.classList.contains('.catalog-columns__btn') || e.target.closest('.catalog-columns__item')) {
      let columns = e.target.dataset.columns;
      let $columnsBtn = document.querySelectorAll('.catalog-columns__btn');

      $columnsBtn.forEach(el => {
        el.classList.remove('catalog-columns__btn--current');
      });

      e.target.classList.add('catalog-columns__btn--current');

      catalogGridContent.dataset.gridColumns = columns;
  };
  });
}

// simplebar кастомный скролл

new SimpleBar(document.querySelector('.card-description__navigation'));

const cardDesrcLink = document.querySelectorAll('.card-description__link');
 
cardDesrcLink.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.currentTarget.getAttribute('href');
    console.log(target);

    cardDesrcLink.forEach(el => el.classList.remove('card-description__link--active'));
    document.querySelectorAll('.card-description__content').forEach(el => el.classList.remove('card-description__content--active'));

    e.currentTarget.classList.add('card-description__link--active');
    document.querySelector(`[data-target="${target}"]`).classList.add('card-description__content--active');
  });
});


// stepper

const stepper = document.querySelector('.stepper');

if (stepper) {

const stepperInput = document.querySelector('.stepper__input');
const stepperMinus = document.querySelector('.stepper__btn--minus');
const stepperPlus = document.querySelector('.stepper__btn--plus');

stepperInput.addEventListener('keydown', (e) => {
  if (e.currentTarget.value <= 1) {
    stepperMinus.classList.add('stepper__btn--disabled');
    stepperPlus.classList.remove('stepper__btn--disabled');
  } else {
    stepperMinus.classList.remove('stepper__btn--disabled');
  }

  if (e.currentTarget.value > 99998) {
    stepperMinus.classList.remove('stepper__btn--disabled');
    stepperPlus.classList.add('stepper__btn--disabled');
  } else {
    stepperPlus.classList.remove('stepper__btn--disabled');
  }
});

stepperPlus.addEventListener('click', (e) => {
  let currentValue = parseInt(stepperInput.value);
  currentValue++;
  stepperInput.value = currentValue;

  stepperMinus.classList.remove('stepper__btn--disabled');

  if (stepperInput.value > 99998) {
    stepperInput.value = 99999; 
    stepperPlus.classList.add('stepper__btn--disabled');
  } else {
    stepperPlus.classList.remove('stepper__btn--disabled');
  }
});

stepperMinus.addEventListener('click', (e) => {
  let currentValue = parseInt(stepperInput.value);
  currentValue--;
  stepperInput.value = currentValue;

  stepperPlus.classList.remove('stepper__btn--disabled');

  if (stepperInput.value <= 1) {
    stepperInput.value = 1;
    stepperMinus.classList.add('stepper__btn--disabled');
  } else {
    stepperMinus.classList.remove('stepper__btn--disabled');
  }
});
}








// size select

// if (sizeSelect) {
//   let size = '';

// const sizeSelect = document.querySelector('.size-select');

// sizeSelect.addEventListener('click', (e) => {
//   if (e.target.classList.contains('size-select__btn')) {

//     e.currentTarget.querySelector('.size-select__clear').style.display = 'inline-flex';

//     let size = e.target.dataset.size;

//     e.currentTarget.querySelector('.size-select__selected span').textContent = size;

//     e.target.classList.toggle('size-select__btn--active');

//     if (e.target.classList.contains('size-select__btn--active')) {
//       let currentSize = e.target.textContent;

//       size += currentSize + ', ';
//     } else {
//       let currentSize = e.target.textContent + ', ';

//       size = size.replace(currentSize, '');
//     }

//     e.currentTarget.querySelector('.size-select__selected span').textContent = size;

//     if (!size) {
//       e.currentTarget.querySelector('.size-select__selected span').textContent = 'select a size';
//     }
//   }

//   if (e.target.classList.contains('size-select__clear')) {
//     e.currentTarget.querySelector('.size-select__selected span').textContent = 'select a size';
//     document.querySelectorAll('.size-select__btn').forEach(el => el.classList.remove('size-select__btn--active'));
//     e.target.style.display = 'none';
//     size = '';
//   }
// });
// }

// // color select

// if (colorSelect) {
//   const colorSelect = document.querySelector('.color-select');

//   colorSelect.addEventListener('click', (e) => {
//     if (e.target.classList.contains('color-select__btn')) {

//       document.querySelectorAll('.color-select__btn').forEach(el => el.classList.remove('color-select__btn--active'));

//       let color = e.target.dataset.color;

//       e.currentTarget.querySelector('.color-select__selected span').textContent = color;

//       e.target.classList.add('color-select__btn--active');
//     }
//   });
// }


