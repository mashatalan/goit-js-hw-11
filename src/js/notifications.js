import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class Notifications {

  constructor() {
    this.options = {
      position: 'bottom-right',
      timeout: 1000,
      clickToClose: true,
      cssAnimationStyle: 'from-bottom',
      showOnlyTheLastOne: true,
    };
  }

  showSuccessMessage(message) {
    Notify.success(message, this.options);
  }

  showFailureMessage(message) {
    Notify.failure(message, this.options);
  }

  showWarningMessage(message) {
    Notify.warning(message, this.options);
  }
}

