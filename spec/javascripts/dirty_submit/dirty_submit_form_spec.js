
import DirtySubmitForm from '~/dirty_submit/dirty_submit_form';
import { setInput, createForm } from './helper';

describe('DirtySubmitForm', () => {
  it('disables submit until there are changes', done => {

    const { form, input, submit } = createForm();

    new DirtySubmitForm(form); // eslint-disable-line no-new

    expect(submit.disabled).toBe(true);

    setInput(input, `${input.value} changes`)
      .then(() => expect(submit.disabled).toBe(false))
      .then(() => setInput(input, input.value))
      .then(() => expect(submit.disabled).toBe(true))
      .then(done)
      .catch(done.fail);
  });
});
