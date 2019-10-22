<template>

</template>

<script>

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    props: {
      type: {
        type: String,
        default: 'person_info'
      }
    },
    data() {
      return {

      }
    },
    created() {
    },
    methods: {}
  }
</script>

