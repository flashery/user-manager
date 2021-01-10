<template>
	<div>
		<el-table :data="users" style="width: 100%">
			<el-table-column label="Name" width="180"
				><template slot-scope="scope">
					<a href="#" @click="handleEdit(scope.row)" style="color: blue">{{
						scope.row.name
					}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="email" label="Email" width="180">
			</el-table-column>
			<el-table-column prop="address" label="Address"> </el-table-column>
			<el-table-column prop="phone" label="Phone"> </el-table-column>
			<el-table-column prop="country" label="Country"> </el-table-column>
			<el-table-column label="Actions"
				><template slot-scope="scope">
					<a href="#" @click="handleView(scope.row)"
						><i style="color: blue" class="el-icon-view"></i
					></a>
					<a href="#" @click="handleDelete(scope.row)"
						><i style="color: red" class="el-icon-delete"></i
					></a>
				</template>
			</el-table-column>
		</el-table>
		<UserEdit
			@close="handleClose"
			@update="handleUpdate"
			:show_edit_dialog="show_edit_dialog"
			:user="current_user"
		></UserEdit>
		<UserView
			@close="handleClose"
			:show_view_dialog="show_view_dialog"
			:user="current_user"
		></UserView>
	</div>
</template>
<script>
import axios from "axios";
import UserEdit from "./user/UserEdit";
import UserView from "./user/UserView";
export default {
	components: { UserEdit, UserView },
	data() {
		return {
			users: [],
			show_edit_dialog: false,
			show_view_dialog: false,
			current_user: {},
		};
	},
	mounted() {
		this.getUsers();
	},

	methods: {
		async getUsers() {
			const { data } = await axios.get("/user");
			this.users = data;
		},
		async handleUpdate() {
			this.show_edit_dialog = false;
			const { data } = await axios.put(
				`/user/${this.current_user.id}`,
				this.current_user
			);
		},
		async handleDelete(user) {
			const { data } = await axios.delete(`/user/${this.current_user.id}`);
		},
		handleEdit(user) {
			this.show_edit_dialog = true;
			this.current_user = user;
		},
		async handleView(user) {
			const { data } = await axios.get(`/user/${user.id}`);
			this.current_user = data;
			this.show_view_dialog = true;
		},
		handleClose() {
			this.show_edit_dialog = false;
			this.show_view_dialog = false;
		},
	},
};
</script>