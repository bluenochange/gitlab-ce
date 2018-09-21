import Vue from 'vue';
import mountComponent from 'spec/helpers/vue_mount_component_helper';
import CommitWidget from '~/diffs/components/commit_widget.vue';
import getDiffWithCommit from '../mock_data/diff_with_commit';

describe('diffs/components/commit_widget', () => {
  const Component = Vue.extend(CommitWidget);
  const { commit } = getDiffWithCommit();

  let vm;

  beforeEach(() => {
    // why: get fresh fixture so that changes to vm do not persist
    vm = mountComponent(Component, {
      commit: getDiffWithCommit().commit,
    });
  });

  it('renders commit item', () => {
    const commitElement = vm.$el.querySelector('li.commit');

    expect(commitElement).not.toBeNull();
    expect(commitElement).toContainText(commit.shortId);
  });
});
