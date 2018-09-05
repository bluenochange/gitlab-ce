# Dirty Submit

> [Introduced][ce-21115] in GitLab 11.3.  
> [dirty_submit][dirty-submit]

## Summary

Prevent submitting forms with no changes.

Currently handles `input`, `textarea` and `select` elements.

## Usage

```js
import DirtySubmitForm from './dirty_submit/dirty_submit_form';

new DirtySubmitForm(document.querySelector('form'));
```

### Multiple form elements

Use the `DirtySubmitCollection` class to instantiate `DirtySubmit` for multiple forms by passing it's constructor a collection of forms _(`NodeList` or `Array`)_.

```js
import DirtySubmitCollection from './dirty_submit/dirty_submit_collection';

new DirtySubmitCollection(document.querySelectorAll('form'));
```

#### Factory method

Instantiate a `DirtySubmit*` class based on the arguments provided to `dirtySubmitFactory`. An `Array` or `NodeList` will return a `DirtySubmitCollection`, a single form element will return a `DirtySubmitForm`.

```js
import dirtySubmitFactory from './dirty_submit/dirty_submit_factory';

dirtySubmitFactory(document.querySelector('form'));
dirtySubmitFactory(document.querySelectorAll('form'));
```

[ce-21115]: https://gitlab.com/gitlab-org/gitlab-ce/merge_requests/21115
[dirty-submit]: https://gitlab.com/gitlab-org/gitlab-ce/blob/master/app/assets/javascripts/dirty_submit/