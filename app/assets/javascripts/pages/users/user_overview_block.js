/* eslint-disable class-methods-use-this */

import $ from 'jquery';
import axios from '~/lib/utils/axios_utils';

export default class UserOverviewBlock {
  constructor(options = {}) {
    this.container = options.container;
    this.url = options.url;
    this.limit = options.limit || 20;
    this.$loading = $(`${this.container} .fa-spinner`).first();
    this.loadData();
  }

  loadData() {
    this.$loading.show();
    axios
      .get(this.url, {
        params: {
          limit: this.limit,
        },
      })
      .then(({ data }) => this.render(data))
      .catch(() => this.$loading.hide());
  }

  render(data) {
    const { html, count } = data;
    console.log('SummaryBlock :: ', data);
    $(`${this.container} .overview_content_list`).append(html);

    if (count && count > 0) {
      $(`${this.container} .js-view-all`).removeClass('hide');
    }

    this.$loading.hide();
  }
}
