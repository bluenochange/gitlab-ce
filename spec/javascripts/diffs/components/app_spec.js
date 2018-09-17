import Vue from 'vue';
import { mountComponentWithStore } from 'spec/helpers/vue_mount_component_helper';
import { TEST_HOST } from 'spec/test_constants';
import { convertObjectPropsToCamelCase } from '~/lib/utils/common_utils';
import App from '~/diffs/components/app.vue';
import createDiffsStore from '../create_diffs_store';

const DIFF_JSON_FIXTURE = 'merge_request_diffs/with_commit.json';

preloadFixtures(DIFF_JSON_FIXTURE);

const getDiffData = () => convertObjectPropsToCamelCase(
  getJSONFixture(DIFF_JSON_FIXTURE),
  { deep: true },
);

describe('diffs/components/app', () => {
  const oldMrTabs = window.mrTabs;
  const Component = Vue.extend(App);

  let vm;

  beforeEach(() => {
    // setup globals (needed for component to mount :/)
    window.mrTabs = jasmine.createSpyObj('mrTabs', ['resetViewContainer']);

    // setup component
    const store = createDiffsStore();
    store.state.diffs.isLoading = false;

    vm = mountComponentWithStore(Component, {
      store,
      props: {
        endpoint: `${TEST_HOST}/diff/endpoint`,
        projectPath: 'namespace/project',
        currentUser: {},
      },
    });
  });

  afterEach(() => {
    // reset globals
    window.mrTabs = oldMrTabs;

    // reset component
    vm.$destroy();
  });

  it('does not show commit info', () => {
    expect(vm.$el).not.toContainElement('.blob-commit-info');
  });

  it('shows comments message, with commit', done => {
    vm.$store.state.diffs.commit = getDiffData().commit;

    vm.$nextTick()
      .then(() => {
        expect(vm.$el).toContainText('Only comments from the following commit are shown below');
        expect(vm.$el).toContainElement('.blob-commit-info');
      })
      .then(done)
      .catch(done.fail);
  });

  it('shows comments message, with old mergeRequestDiff', done => {
    vm.$store.state.diffs.mergeRequestDiff = { latest: false };

    vm.$nextTick()
      .then(() => {
        expect(vm.$el).toContainText("Not all comments are displayed because you're viewing an old version of the diff.");
      })
      .then(done)
      .catch(done.fail);
  });

  it('shows comments message, with startVersion', done => {
    vm.$store.state.diffs.startVersion = 'test';

    vm.$nextTick()
      .then(() => {
        expect(vm.$el).toContainText("Not all comments are displayed because you're comparing two versions of the diff.");
      })
      .then(done)
      .catch(done.fail);
  });
});
