import Vue from 'vue';
import axios from 'axios';

export default class Match {
  constructor() {
    this.isUpdate = false;

    this.createVue();
  }

  /**
   * Vueインスタンスの作成
   */
  createVue() {
    this.listItem = new Vue({
      el: '#list',
      data: {
        // Jsonデータ格納用
        search_list: [],
        match: null,
        show: [false, false, false, false],
        isUpdate: false
      },

      //jsonからデータを引っ張ってきてsearch_listに格納
      created() {
        axios.get('./json/maches.json').then(response => {
          Vue.set(this, 'match', response.data);
          this.search_list = response.data;
        });
      },

      //日程が今日を超えていれば詳細リンクをつける
      updated: function() {
        if (!this.isUpdate) {
          const daysList = this.$refs.days;
          const today = new Date();
          const todayDate =
            String(today.getFullYear()) +
            String(('0' + (today.getMonth() + 1)).slice(-2)) +
            String(('0' + today.getDate()).slice(-2));
          daysList.forEach((element, index) => {
            const day = element.innerText;
            if (day < todayDate) {
              console.log(index);
              this.show.splice(index, 1, true);
            }
          });
        }
        this.isUpdate = true;
      }
    });
  }
}
