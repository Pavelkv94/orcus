import s from "./AdminForm.module.css"
import { Input, Button, Select, Result } from 'antd';
import ReactMde from "react-mde";
import { useState } from "react";
import { Suggestion } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { API } from './../../../../api/api'
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../redux/store";
import { createPostsTC } from "../../../../redux/postsReducer";

const { Option } = Select;
const loadSuggestions = async (text: string) => {
	return new Promise<Suggestion[]>((accept, reject) => {
		setTimeout(() => {
			const suggestions: Suggestion[] = [
				{
					preview: "Andre",
					value: "@andre"
				},
				{
					preview: "Angela",
					value: "@angela"
				},
				{
					preview: "David",
					value: "@david"
				},
				{
					preview: "Louise",
					value: "@louise"
				}
			].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
			accept(suggestions);
		}, 250);
	});
};

const converter = new Showdown.Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true
});

export function AdminForm() {
	const categories = useSelector<AppStateType, Array<any>>(state => state.categories);
	const dispatch = useDispatch();

	const [slug, setSlug] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [dropValue, setDropValue] = useState("");
	const [text, setText] = useState<string>("");

	const [selectedTab, setSelectedTab] = useState<"write" | "preview" | undefined>("write");
	const [newCategory, setNewCategory] = useState<string>("");
	const [isSuccess, setSuccess] = useState<boolean>(false);

	if (isSuccess === true) { setTimeout(() => { setSuccess(false) }, 5000) }
	function handleChange(value: any) {
		setDropValue(value)
	}

	const addCategory = () => {
		API.createCategory(newCategory)
		setNewCategory('')
	}

	return (
		<div className={s.form}>
			<div className={s.fields}>
				<div className={s.postsFields}>
					<label htmlFor="slug">{"Slug(Short Title for menu):"}</label>
					<Input
						type="text"
						name="slug"
						autoComplete="off"
						value={slug}
						onChange={(e) => { setSlug(e.currentTarget.value) }}
					/>
					<label htmlFor="title">Title: </label>
					<Input
						type="text"
						name="title"
						autoComplete="off"
						value={title}
						onChange={(e) => { setTitle(e.currentTarget.value) }}
					/>
					<label htmlFor="dropdown">Categories:</label>
					<Select style={{ width: 380 }} onChange={handleChange} value={dropValue}>
						{categories.map(c => <Option key={c._id} value={c.title}>{c.title}</Option>)}
					</Select>
				</div>
				<div className={s.categoryFields}>
					<label htmlFor="category">Add category:</label>
					<div className={s.addCategory}>

						<Input
							type="text"
							name="category"
							autoComplete="off"
							value={newCategory}
							onChange={(e) => { setNewCategory(e.currentTarget.value) }}
						/>
						<Button type="dashed" onClick={addCategory} disabled={newCategory ? false : true}>ADD</Button>
					</div>
				</div>
			</div>
			
			<a href="https://stackedit.io/app#" target="_blank">MarkDown Editor</a>
			
			<div className={s.createArea}>
				<ReactMde
					minEditorHeight={500}
					minPreviewHeight={600}
					value={text}
					onChange={setText}
					selectedTab={selectedTab}
					onTabChange={setSelectedTab}
					generateMarkdownPreview={(markdown) =>
						Promise.resolve(converter.makeHtml(markdown))
					}
					loadSuggestions={loadSuggestions}
					childProps={{
						writeButton: {
							tabIndex: -1,
						},
					}}
				/>
			</div>
			<div className={s.btn}>
				<Button
					type="primary"
					size="large"
					onClick={() => { dispatch(createPostsTC(title, slug, dropValue, text)); setSuccess(true); setSlug(""); setTitle(""); setDropValue(""); setText("") }}
					disabled={slug === "" || title === "" || dropValue === "" || text === "" ? true : false}
				>CREATE NEW POST</Button>
			</div>
			{isSuccess && <Result status="success"
				title="Post Is Created!!!" />}
			<hr />
		</div>
	)
}