/* eslint-disable class-methods-use-this */

import $ from 'jquery';
import axios from '~/lib/utils/axios_utils';

export default class TopActivities {
  constructor(options = {}) {
    this.container = options.container;
    this.url = options.url;
    this.limit = options.limit || 20;

    this.loadActivities();
  }

  loadActivities() {
    const $loading = $(`${this.container} .fa-spinner`).first();

    $loading.show();
    axios
      .get(this.url, {
        params: {
          limit: this.limit,
        },
      })
      .then(({ data }) => {
        const { html } = data;
        $(`${this.container} .activity_list`).append(html);
        $loading.hide();
      })
      .catch(() => $loading.hide());
  }
}
