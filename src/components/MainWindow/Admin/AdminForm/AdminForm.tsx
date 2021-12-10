import s from "./AdminForm.module.css"
import { Input, Button, Select, Result, Collapse } from 'antd';
import ReactMde from "react-mde";
import React, { useEffect, useState } from "react";
import { Suggestion } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { API } from './../../../../api/api'
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../redux/store";
import { createPostsTC, getShortPostsTC, PostType, ShortPostType } from "../../../../redux/postsReducer";
import { getPostTC } from "../../../../redux/filterReducer";

const { Panel } = Collapse;

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

export const AdminForm = React.memo(() => {
	const categories = useSelector<AppStateType, Array<any>>(state => state.categories);
	const posts = useSelector<AppStateType, Array<ShortPostType>>(state => state.posts.shortPosts);
	const post = useSelector<AppStateType, PostType>(state => state.filter);
	const dispatch = useDispatch();

	const [title, setTitle] = useState<string>("");
	const [dropValue, setDropValue] = useState("");
	const [text, setText] = useState<string>("");
	const [allPosts, setAllPosts] = useState<boolean>(false);
	const [editMode, setEditMode] = useState<boolean>(false);

	const [selectedTab, setSelectedTab] = useState<"write" | "preview" | undefined>("write");
	const [newCategory, setNewCategory] = useState<string>("");
	const [isSuccess, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		allPosts && dispatch(getShortPostsTC());
	}, [allPosts]);

	if (isSuccess === true) { setTimeout(() => { setSuccess(false) }, 5000) }
	function handleChange(value: any) {
		setDropValue(value)
	};

	const addCategory = () => {
		API.createCategory(newCategory)
		setNewCategory('')
	};

	const createPost = () => { dispatch(createPostsTC(title, dropValue, text)); setSuccess(true); setTitle(""); setDropValue(""); setText("") };

	const editPost = (id: string) => { setEditMode(true); dispatch(getPostTC(id)); setTitle(post.title); setDropValue(post.category); setText(post.text)};

	const deletePost = (id: string) => { console.log(id) };

	const saveChanges = () => {};

	return (
		<div className={s.form}>
			<div className={s.fields}>
				<div className={s.postsFields}>
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

			<a href="https://stackedit.io/app#" target="_blank" rel="noreferrer" style={{ width: "200px" }}><Button shape='round' danger> MarkDown Editor</Button></a>

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
				{editMode && <Button type="default" size="large" danger onClick={() => { setEditMode(false); setTitle(""); setDropValue(""); setText("") }}>Cancel</Button>}
				<Button
					type="primary"
					size="large"
					onClick={!editMode ? createPost : saveChanges}
					disabled={title === "" || dropValue === "" || text === "" ? true : false}
				>{!editMode ? 'CREATE NEW POST' : 'SAVE CHANGES'}</Button>

			</div>
			
			{isSuccess && <Result status="success"
				title="Post Is Created!!!" />}
			<hr />

			{!allPosts ? <Button type="primary" ghost onClick={() => setAllPosts(true)}>All Posts</Button>
				: <Button type="primary" ghost onClick={() => setAllPosts(false)}>Close Posts List</Button>}

			{allPosts &&
				<Collapse defaultActiveKey={['1']} onChange={() => { }}>
					{categories.map(cat =>
						<Panel header={cat.title} key={cat._id}>
							{posts.map(post => post.category === cat.title &&
								<p>{post.title}
									<Button type="dashed" style={{ color: 'green', margin: '0px 4px', float: 'right' }} onClick={() => editPost(post._id)}>Edit</Button>
									<Button type="dashed" style={{ color: 'red', margin: '0px 4px', float: 'right' }} onClick={() => deletePost(post._id)}>Delete</Button>
								</p>
							)}
						</Panel>)}
				</Collapse>}
		</div>
	)
})