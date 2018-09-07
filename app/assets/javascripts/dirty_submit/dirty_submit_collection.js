import DirtySubmitForm from './dirty_submit_form';

export default class DirtySubmitCollection {
  constructor(forms) {
    this.forms = forms;

    this.dirtySubmits = [];
    this.forms.forEach(form => this.dirtySubmits.push(new DirtySubmitForm(form)));
  }
}
