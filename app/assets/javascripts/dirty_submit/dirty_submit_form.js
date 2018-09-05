import _ from 'underscore';

export default class DirtySubmitForm {
  constructor(form) {
    this.form = form;
    this.dirtyInputs = [];
    this.isDisabled = true;
  }

  init() {
    this.inputs = this.form.querySelectorAll('input, textarea, select');
    this.submits = this.form.querySelectorAll('input[type=submit], button[type=submit]');

    this.inputs.forEach(DirtySubmitForm.initInput);
    this.toggleSubmission();

    this.registerListeners();
  }

  registerListeners() {
    const throttledUpdateDirtyInput = _.throttle(event => this.updateDirtyInput(event), 400);
    this.form.addEventListener('input', throttledUpdateDirtyInput);
    this.form.addEventListener('submit', event => this.formSubmit(event));
  }

  updateDirtyInput(event) {
    const input = event.target;

    if (!input.dataset.dirtySubmitOriginalValue) return;

    this.updateDirtyInputs(input);
    this.toggleSubmission();
  }

  updateDirtyInputs(input) {
    const { name } = input;
    const isDirty = input.dataset.dirtySubmitOriginalValue !== DirtySubmitForm.inputCurrentValue(input);
    const indexOfInputName = this.dirtyInputs.indexOf(name);
    const isExisting = indexOfInputName !== -1;

    if (isDirty && !isExisting) this.dirtyInputs.push(name);
    if (!isDirty && isExisting) this.dirtyInputs.splice(indexOfInputName, 1);
  }

  toggleSubmission() {
    this.isDisabled = this.dirtyInputs.length === 0;
    this.submits.forEach(submit => {
      submit.disabled = this.isDisabled; // eslint-disable-line no-param-reassign
    });
  }

  formSubmit(event) {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    return !this.isDisabled;
  }

  static initInput(input) {
    // eslint-disable-next-line no-param-reassign
    input.dataset.dirtySubmitOriginalValue = DirtySubmitForm.inputCurrentValue(input);
  }

  static isInputCheckable(input) {
    return input.type === 'checkbox' || input.type === 'radio';
  }

  static inputCurrentValue(input) {
    return DirtySubmitForm.isInputCheckable(input) ? input.checked.toString() : input.value;
  }
}
