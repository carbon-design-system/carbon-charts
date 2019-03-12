<script>
  export default {
    name: 'CcvBaseChart',

    data() {
      return {
        coreChart: null
      };
    },

    props: {
      data: {type: Object, required: true},
      options: {type: Object, required: true}
    },

    watch: {
      data: {
        handler: function(newData) {
          this.coreChart.setData(newData);
        },
        deep: true
      },
    }
  };
</script>
