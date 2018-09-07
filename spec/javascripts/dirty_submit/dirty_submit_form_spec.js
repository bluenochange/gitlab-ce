import setTimeoutPromiseHelper from '../helpers/set_timeout_promise_helper';
import DirtySubmitForm from '~/dirty_submit/dirty_submit_form';

function setInput(element, value) {
  element.value = value;

  element.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));

  return setTimeoutPromiseHelper(DirtySubmitForm.THROTTLE_DURATION);
}

function createForm() {
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" value="original" class="js-input" />
    <button type="submit" class="js-dirty-submit"></button>
  `;
  const input = form.querySelector('.js-input');
  const submit = form.querySelector('.js-dirty-submit');

    return {
      form,
      input,
      submit,
    };
}

fdescribe('DirtySubmitForm', () => {
  it('disables submit until there are changes', () => {

    const { form, input, submit } = createForm();

    new DirtySubmitForm(form);

    expect(submit.disabled).toBe(true);

    setInput(input, `${input.value} changes`)
      .then(() => expect(submit.disabled).toBe(false))
      .then(() => setInput(input, input.value))
      .then(() => expect(submit.disabled).toBe(true));
  });
});
