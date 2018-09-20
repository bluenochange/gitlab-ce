import $ from 'jquery';
import Vue from 'vue';
import Translate from '~/vue_shared/translate';
import { highCountTrim } from '~/lib/utils/text_utility';
import createFlash from '~/flash';
import GfmAutoComplete from '~/gfm_auto_complete';
import EmojiMenu from '~/pages/profiles/show/emoji_menu';
import setStatusModalWrapper from './set_status_modal/set_status_modal_wrapper.vue';

/**
 * Updates todo counter when todos are toggled.
 * When count is 0, we hide the badge.
 *
 * @param {jQuery.Event} e
 * @param {String} count
 */
export default function initTodoToggle() {
  $(document).on('todo:toggle', (e, count) => {
    const parsedCount = parseInt(count, 10);
    const $todoPendingCount = $('.todos-count');

    $todoPendingCount.text(highCountTrim(parsedCount));
    $todoPendingCount.toggleClass('hidden', parsedCount === 0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const setStatusModalWrapperEl = document.querySelector('.js-set-status-modal-wrapper');

  if (setStatusModalWrapperEl) {
    Vue.use(Translate);

    new Vue({
      el: setStatusModalWrapperEl,
      render(createElement) {
        return createElement(setStatusModalWrapper);
      },
    });

    const defaultStatusEmoji = 'speech_balloon';

    const toggleEmojiMenuButtonSelector = '#set-user-status-modal .js-toggle-emoji-menu';
    const toggleEmojiMenuButton = document.querySelector(toggleEmojiMenuButtonSelector);
    const statusEmojiField = document.querySelector(
      '#set-user-status-modal .js-status-emoji-field',
    );
    const statusMessageField = document.querySelector(
      '#set-user-status-modal .js-status-message-field',
    );

    const toggleNoEmojiPlaceholder = isVisible => {
      const placeholderElement = document.querySelector(
        '#set-user-status-modal .js-no-emoji-placeholder',
      );
      placeholderElement.classList.toggle('hidden', !isVisible);
    };

    const findStatusEmoji = () => toggleEmojiMenuButton.querySelector('gl-emoji');
    const removeStatusEmoji = () => {
      const statusEmoji = findStatusEmoji();
      if (statusEmoji) {
        statusEmoji.remove();
      }
    };

    const selectEmojiCallback = (emoji, emojiTag) => {
      statusEmojiField.value = emoji;
      toggleNoEmojiPlaceholder(false);
      removeStatusEmoji();
      toggleEmojiMenuButton.innerHTML += emojiTag;
    };

    const clearEmojiButton = document.querySelector(
      '#set-user-status-modal .js-clear-user-status-button',
    );
    clearEmojiButton.addEventListener('click', () => {
      statusEmojiField.value = '';
      statusMessageField.value = '';
      removeStatusEmoji();
      toggleNoEmojiPlaceholder(true);
    });

    const emojiAutocomplete = new GfmAutoComplete();
    emojiAutocomplete.setup($(statusMessageField), { emojis: true });

    import(/* webpackChunkName: 'emoji' */ '~/emoji')
      .then(Emoji => {
        const emojiMenu = new EmojiMenu(
          Emoji,
          toggleEmojiMenuButtonSelector,
          'js-status-emoji-menu',
          selectEmojiCallback,
        );
        emojiMenu.bindEvents();

        const defaultEmojiTag = Emoji.glEmojiTag(defaultStatusEmoji);
        statusMessageField.addEventListener('input', () => {
          const hasStatusMessage = statusMessageField.value.trim() !== '';
          const statusEmoji = findStatusEmoji();
          if (hasStatusMessage && statusEmoji) {
            return;
          }

          if (hasStatusMessage) {
            toggleNoEmojiPlaceholder(false);
            toggleEmojiMenuButton.innerHTML += defaultEmojiTag;
          } else if (statusEmoji.dataset.name === defaultStatusEmoji) {
            toggleNoEmojiPlaceholder(true);
            removeStatusEmoji();
          }
        });
      })
      .catch(() => createFlash('Failed to load emoji list!'));
  }
});
