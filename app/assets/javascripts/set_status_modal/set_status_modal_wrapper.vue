<script>
import GlModal from '~/vue_shared/components/gl_modal.vue';
import { s__, sprintf } from '~/locale';
import tooltip from '~/vue_shared/directives/tooltip';
import LoadingButton from '~/vue_shared/components/loading_button.vue';

export default {
  id: 'set-user-status-modal',
  name: 'SetUserStatusModal',

  components: {
    GlModal,
    LoadingButton,
  },
  computed: {
    modalId() {
      return 'set-status-modal';
    },
  },
  methods: {
    onSubmit() {
      console.log('Do something');
    },
  },
};
</script>

<template>
  <gl-modal
    :id="$options.id"
    :header-title-text="s__('SetStatusModal|Set status')"
    modal-size="sm"
    @submit="onSubmit"
  >
    <form
      ref="form"
      action="deleteWikiUrl"
      method="post"
      class="js-requires-input"
    >
      <input class="js-status-emoji-field" type="hidden" value="coffee" name="user[status][emoji]" />
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-btn">
            <button name="button" type="button" class="js-toggle-emoji-menu emoji-menu-toggle-button btn has-tooltip js-no-emoji-placeholder" title="" data-original-title="Add status emoji">
              <span class="hidden no-emoji-placeholder" ></span>
            </button>
          </span>
        <input class="form-control form-control input-lg js-status-message-field" placeholder="What's your status?" type="text" value="" name="user[status][message]" />
          <span class="input-group-btn">
            <button name="button" type="button" class="js-clear-user-status-button clear-user-status btn has-tooltip" title="Clear status"><svg><use xlink:href="/assets/icons-8887803ae40f1ee57a8952b5e3b080213a686e327d4d971d8e532c862b79990b.svg#close"></use></svg>
            </button>
          </span>
        </div>
      </div>
    </form>
    <template slot="footer">
      <button
        type="button"
        class="btn js-modal-cancel-action"
        data-dismiss="modal"
        @click="emitCancel($event)"
      >
        {{ s__('SetStatusModal|Clear status') }}
      </button>
      <button
        type="button"
        class="btn btn-success js-modal-primary-action"
        data-dismiss="modal"
        @click="emitSubmit($event)"
      >
        {{ s__('SetStatusModal|Set status') }}
      </button>
    </template>
  </gl-modal>
</template>
