import { useParams } from "react-router";
import { Admin } from "./Admin/Admin";
import s from "./MainWindow.module.css"
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/store";
import { PostType } from "../../redux/postsReducer";
import ReactMarkdown from 'react-markdown'
import { BackTop } from "antd";

export function MainWindow() {
	const { slug, catg } = useParams<{ catg: string, slug: string }>();
	const posts = useSelector<AppStateType, Array<PostType>>(state => state.posts);
	const filterData = posts.filter((p: PostType) => p.category === catg && p.slug === slug)[0];

	console.log(`CATEGORY--> ${catg} SLUG-->${slug}`)
	if (catg === "admin") {
		return <Admin />
	} else
		return (
			<div className={s.mainWindow}>
				<h2>{filterData?.title}</h2>
				<ReactMarkdown>{filterData?.text}</ReactMarkdown>
				<BackTop>
					<div className={s.backTop}>UP</div>
				</BackTop>
			</div>
		)
}