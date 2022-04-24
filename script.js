'use strict';

const optionButtons = document.querySelectorAll('.person-card__option');
const hoursCurrent = document.querySelectorAll('.hours-current');
const hoursPrevious = document.querySelectorAll('.hours-previous');

const removeActiveClassFromBtns = () => {
  optionButtons.forEach((optionBtn) => {
    if (optionBtn.classList.contains('person-card__option--active'))
      optionBtn.classList.remove('person-card__option--active');
  });
};

const optionButtonHandler = async function (option) {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();

    removeActiveClassFromBtns();
    this.classList.add('person-card__option--active');

    data.forEach((activity) => {
      let activityTitle = activity.title.toLowerCase();

      if (activityTitle === 'self care') {
        activityTitle = activityTitle.replace(/\s/g, '-');
      }

      const activityElement = document.querySelector(`.card--${activityTitle}`);
      const activityCurrentHours =
        activityElement.querySelector('.hours-current');
      const activityPreviousHours =
        activityElement.querySelector('.hours-previous');

      activityCurrentHours.textContent =
        activity.timeframes[option]?.current ?? '';
      activityPreviousHours.textContent =
        activity.timeframes[option]?.previous ?? '';
    });
  } catch (err) {
    console.error(err);
  }
};

optionButtons.forEach((option) => {
  const selectedOption = option.dataset.option;

  option.addEventListener(
    'click',
    optionButtonHandler.bind(option, selectedOption)
  );
});
