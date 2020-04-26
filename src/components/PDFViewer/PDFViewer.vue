<template>
  <div id="modal-template">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Apercu</p>
      </header>
      <section class="modal-card-body">
        <div class="pdf-viewer">
          <PDFData
            class="pdf-viewer__main"
            :pdfFile="pdfFile"
            @page-count="updatePageCount"
            @page-focus="updateCurrentPage"
            @document-rendered="onDocumentRendered"
            @document-errored="onDocumentErrored"
            >

            <!-- <PDFPreview
              class="pdf-viewer__preview"
              slot="preview"
              slot-scope="{pages}"
              v-bind="{pages, scale, currentPage, pageCount}"
              /> -->

            <PDFDocument
              class="pdf-viewer__document"
              slot="document"
              slot-scope="{pages}"
              v-bind="{pages, scale, currentPage, pageCount}"
              @scale-change="updateScale"
              />
          </PDFData>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close();">Fermer</button>
        <button class="button is-success" @click="printCanvas">Imprimer</button>
      </footer>
    </div>
  </div>
</template>

<script>
import PDFDocument from '@/components/PDFViewer/PDFDocument';
// import PDFPreview from '@/components/PDFViewer/PDFPreview';
import PDFData from '@/components/PDFViewer/PDFData';

function floor(value, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.floor(value * multiplier) / multiplier;
}

export default {
  name: 'PDFViewer',

  components: {
    PDFDocument,
    // PDFPreview,
    PDFData,
  },

  props: {
    pdfFile: Uint8Array,
  },

  data() {
    return {
      scale: undefined,
      currentPage: 1,
      pageCount: undefined,
    };
  },

  methods: {
    onDocumentRendered() {
      this.$emit('document-errored', this.pdfFile);
    },

    onDocumentErrored(e) {
      this.$emit('document-errored', e);
    },

    updateScale(scale) {
      this.scale = floor(scale, 2);
    },

    updatePageCount(pageCount) {
      this.pageCount = pageCount;
    },

    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },

    printCanvas() {
      window.open();
    }
  },

  watch: {
    pdfFile() {
      this.currentPage = undefined;
    },
  },

  mounted() {
    document.body.classList.add('overflow-hidden');
  },
};
</script>
<style scoped>

.pdf-viewer__document {
  width: 100%;
  
}
</style>
