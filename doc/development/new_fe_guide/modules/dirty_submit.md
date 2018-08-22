# Dirty Submit

> [Introduced][ce-21115] in GitLab 11.3.  
> [dirty_submit][dirty-submit]

## Summary

Prevent submitting forms with no changes.

## Usage

```js
import DirtySubmit from './dirty_submit/dirty_submit';

document.addEventListener('DOMContentLoaded', () => {
  const dirtySubmit = new DirtySubmit(document.querySelector('form'));
  dirtySubmit.init();
});
```

### Multiple form elements

Use the `DirtySubmitCollection` class to instantiate `DirtySubmit` for multiple forms by passing it's constructor a collection of forms _(`NodeList` or `Array`)_.

It has a handy `DirtySubmitCollection.prototype.init` method that calls `DirtySubmit.prototype.init` for every object in the collection.

```js
import DirtySubmitCollection from './dirty_submit/dirty_submit_collection';

document.addEventListener('DOMContentLoaded', () => {
  const dirtySubmitCollection = new DirtySubmitCollection(document.querySelectorAll('form'));
  dirtySubmitCollection.init();
});
```

## Technical overview

DirtySubmit.prototype.init stores the original value of each form input as a data attribute. It also prevents submission and registers an `input` event listener to handle input element value updates.

Currently handles `input`, `textarea` and `select` elements.

Note: The values of `radio` and `checkbox` inputs are read from their `checked` attribute rather than their `value` attribute.

[ce-21115]: https://gitlab.com/gitlab-org/gitlab-ce/merge_requests/21115
[dirty-submit]: https://gitlab.com/gitlab-org/gitlab-ce/blob/master/app/assets/javascripts/dirty_submit/