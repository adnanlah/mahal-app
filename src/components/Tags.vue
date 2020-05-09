<template>
	<b-taglist>
		<b-tag
		v-for="(tag, idx) in tags"
		type="is-dark"
		:key="idx"
		@click="this.$emit('click', tag.id)">
			{{tag.name}}
		</b-tag>
	</b-taglist>
</template>

<script>
export default {

  name: 'Tags',
  props: ['tags'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>