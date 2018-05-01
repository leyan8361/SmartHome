<template lang="pug">
el-form-item(label="验证码" prop="code")
		el-input(type="text" v-model.trim="vCode")
		img(:src="getCode" alt="Captcha")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {}
</script>

<style lang="stylus">

</style>
