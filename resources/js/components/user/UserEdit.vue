<template>
	<el-dialog
		title="Edit User"
		:visible.sync="show_edit_dialog"
		width="40%"
		:before-close="handleClose"
	>
		<el-form :model="user" :rules="rules" ref="user" label-width="120px">
			<el-form-item
				v-for="(input, index) in inputs"
				:key="index"
				:label="input.key.toUpperCase()"
				:prop="input.key"
			>
				<el-input v-model="user[input.key]"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('user')">Update</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script>
export default {
	props: ["user", "show_edit_dialog"],
	data() {
		return {
			rules: {
				name: [
					{
						required: true,
						message: "Please input  name",
						trigger: "blur",
					},
					{
						min: 3,
						message: "Length should be 3 to 5",
						trigger: "blur",
					},
				],
			},
		};
	},

	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$emit("update");
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		handleClose(done) {
			this.$emit("close");
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
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