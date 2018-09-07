import DirtySubmitCollection from '~/dirty_submit/dirty_submit_collection';
import { setInput, createForm } from './helper';

describe('DirtySubmitCollection', () => {
  it('disables submits until there are changes', () => {
    const testElementsCollection = [createForm(), createForm()];
    const forms = testElementsCollection.map(testElements => testElements.form);

    new DirtySubmitCollection(forms);

    testElementsCollection.forEach(testElements => {
      const { input, submit } = testElements;

      expect(submit.disabled).toBe(true);

      setInput(input, `${input.value} changes`)
        .then(() => expect(submit.disabled).toBe(false))
        .then(() => setInput(input, input.value))
        .then(() => expect(submit.disabled).toBe(true));
    });
  });
});
