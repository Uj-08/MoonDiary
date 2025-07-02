import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from "next/head";

function BlogPost() {
	return (
		<>
			<NextHead>
				<title>New Post | MoonDiary</title>
				<meta name="robots" content="noindex, nofollow" />
			</NextHead>
			<EditorComponent />
		</>
	);
}

export default BlogPost;
