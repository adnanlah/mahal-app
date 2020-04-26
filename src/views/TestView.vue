<template>
  
    <PDFViewer v-bind="{url}"></PDFViewer>
  
</template>

<script>
import PDFViewer from '@/components/PDFViewer/PDFViewer.vue'

export default {
  name: 'app',

  components: {
    PDFViewer,
  },

  data() {
    return {
      url: 'C:\\Users\\ADNAN\\Desktop\\a.pdf',
      scale: 1,
    };
  },
};
</script>

<style>

</style>
