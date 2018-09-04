import DirtySubmitForm from './dirty_submit_form';

export default class DirtySubmitCollection {
  constructor(formOrForms) {
    const isCollection = formOrForms instanceof NodeList || formOrForms instanceof Array;
    this.forms = isCollection ? formOrForms : new Array(formOrForms);

    this.dirtySubmits = [];
    this.forms.forEach(form => this.dirtySubmits.push(new DirtySubmitForm(form)));
  }

  init() {
    this.dirtySubmits.forEach(dirtySubmit => dirtySubmit.init());
  }
}
