<template>
	<el-dialog
		title="Edit User"
		:visible.sync="show_view_dialog"
		width="40%"
		:before-close="handleClose"
	>
		<div v-for="(input, index) in inputs" :key="index" :prop="input.key">
			<label>{{ input.key.toUpperCase() + ":" }}</label
			><span>{{ input.value }}</span>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: ["user", "show_view_dialog"],
	data() {
		return {};
	},

	methods: {
		handleClose(done) {
			this.$emit("close");
		},
	},
	computed: {
		inputs() {
			const data = this.user;
			const donts = ["id", "created_at", "updated_at", "email_verified_at"];
			const fields = [];
			Object.entries(data).map(([key, value]) => {
				if (donts.includes(key)) return;
				fields.push({ key, value });
			});
			return fields;
		},
	},
};
</script>
<style scoped>
label {
	margin-right: 10px;
}
</style>