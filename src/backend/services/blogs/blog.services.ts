import BlogsModel from "@/models/Blogs.model";

export const blogService = {
	async findBySlug(slug: string, sendAll: boolean) {
		return BlogsModel.findOne({ slug })
			.populate("tags", sendAll ? "" : "name")
			.lean();
	},
};
