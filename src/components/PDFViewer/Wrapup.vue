<PDFViewer>
	<PDFData
		class="pdf-viewer__main"
		:pdfFile="pdfFile"
		@page-count="updatePageCount"
		@page-focus="updateCurrentPage"
		@document-rendered="onDocumentRendered"
		@document-errored="onDocumentErrored"
		>
		<PDFPreview
			class="pdf-viewer__preview"
			slot="preview"
			slot-scope="{pages}"
			v-bind="{pages, scale, currentPage, pageCount}">
			<ScrollingDocument
				class="pdf-preview"
				@pages-fetch="onPagesFetch"
				v-bind="{pages, pageCount, currentPage}"
				>
				<PDFThumbnail
					slot-scope="{page, isElementVisible, isPageFocused, isElementFocused}"
					v-bind="{scale, page, isElementVisible, isPageFocused, isElementFocused}"
					@thumbnail-rendered="onThumbnailRendered"
					@thumbnail-errored="onThumbnailErrored"
					@page-focus="onPageFocused"
					/>
			</ScrollingDocument>
		</PDFPreview>

		<PDFDocument
			class="pdf-viewer__document"
			slot="document"
			slot-scope="{pages}"
			v-bind="{pages, scale, currentPage, pageCount}"
			@scale-change="updateScale">
			<ScrollingDocument
				class="pdf-document"
				v-bind="{pages, pageCount, currentPage, defaultViewport}"
				:enable-page-jump="true"
				@page-jump="onPageJump"
				@pages-fetch="onPagesFetch"
				@pages-reset="fitWidth"
				>
				<PDFPage
					slot-scope="{page, isElementVisible, isPageFocused, isElementFocused}"
					v-bind="{scale, page, isElementVisible, isPageFocused, isElementFocused}"
					@page-rendered="onPageRendered"
					@page-errored="onPageErrored"
					@page-focus="onPageFocused"
				/>
			</ScrollingDocument>
		</PDFDocument>
	</PDFData>
</PDFViewer>
