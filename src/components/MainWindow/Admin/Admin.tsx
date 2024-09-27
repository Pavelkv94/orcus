import s from "./Admin.module.css";
import { Input, Button, Select, Collapse, Popover } from "antd";
import ReactMde from "react-mde";
import React, { useEffect, useState } from "react";
import { Suggestion } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { API } from "./../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../../redux/store";
import { createPostsTC, deletePostsTC, editPostsTC, getPostTC, getShortPostsTC, PostType, resetPostAC, ShortPostType } from "../../../redux/postsReducer";
import { CategoryType } from "../../../redux/categoriesReducer";
import { CloseModal } from "./Modal";

const { Panel } = Collapse;

const { Option } = Select;

const loadSuggestions = async (text: string) => {
  return new Promise<Suggestion[]>((accept) => {
    setTimeout(() => {
      const suggestions: Suggestion[] = [
        {
          preview: "Andre",
          value: "@andre",
        },
        {
          preview: "Angela",
          value: "@angela",
        },
        {
          preview: "David",
          value: "@david",
        },
        {
          preview: "Louise",
          value: "@louise",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Admin = React.memo(() => {
  const categories = useSelector<AppStateType, Array<CategoryType>>((state) => state.categories);
  const posts = useSelector<AppStateType, Array<ShortPostType>>((state) => state.posts.shortPosts);
  const post = useSelector<AppStateType, PostType>((state) => state.posts.post);
  const username = useSelector<AppStateType, string>((state) => state.app.user.username);
  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [dropValue, setDropValue] = useState("");
  const [text, setText] = useState<string>("");
  const [allPosts, setAllPosts] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [tempId, setTempId] = React.useState<{ id: string; title: string } | null>(null);

  const [selectedTab, setSelectedTab] = useState<"write" | "preview" | undefined>("write");
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    allPosts && dispatch(getShortPostsTC());
  }, [dispatch, allPosts]);

  useEffect(() => {
    post && setTitle(post.title);
    post && setDropValue(post.category);
    post && setText(post.text);
  }, [post]);

  function handleChange(value: string) {
    setDropValue(value);
  }

  const addCategory = () => {
    API.createCategory(newCategory);
    setNewCategory("");
  };

  const createPost = () => {
    dispatch(createPostsTC(title, dropValue, text));
    setTitle("");
    setDropValue("");
    setText("");
  };

  const editPost = (id: string) => {
    setEditMode(true);
    dispatch(getPostTC(id));
    setTitle(post.title);
    setDropValue(post.category);
    setText(post.text);
  };

  const deletePostModal = (id: string, title: string) => {
    setVisible(true);
    setTempId({ id: id, title: title });
  };

  const deletePost = () => {
    dispatch(deletePostsTC(tempId!.id));
  };

  const saveChanges = (id: string) => {
    dispatch(editPostsTC(title, dropValue, text, id));
    setTitle("");
    setDropValue("");
    setText("");
  };

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
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            placeholder="Enter title"
          />
          <label htmlFor="dropdown">Categories:</label>
          <Select style={{ width: 380 }} onChange={handleChange} value={dropValue}>
            {categories.map((c) => (
              <Option key={c._id} value={c.title}>
                {c.title}
              </Option>
            ))}
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
              onChange={(e) => {
                setNewCategory(e.currentTarget.value);
              }}
              placeholder="Enter category "
            />
            <Button type="dashed" onClick={addCategory} disabled={!newCategory || username !== "pavelkv94"}>
              ADD
            </Button>
          </div>
        </div>
      </div>
      <div className={s.warn}>Actions disabled for demo stand.</div>
      <div className={s.topActions}>
        <a href="https://stackedit.io/app#" target="_blank" rel="noreferrer" style={{ width: "200px" }}>
          <Button shape="round" danger>
            MarkDown Editor
          </Button>
        </a>
        <Popover content="Copied!" trigger="click">
          <Button shape="round" style={{ color: "orange", borderColor: "orange" }} onClick={() => navigator.clipboard.writeText(text)}>
            COPY ALL TEXT
          </Button>
        </Popover>
      </div>
      <div className={s.createArea}>
        <ReactMde
          minEditorHeight={500}
          minPreviewHeight={600}
          value={text}
          onChange={setText}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
          loadSuggestions={loadSuggestions}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        />
      </div>
      <div className={s.btn}>
        {editMode && (
          <Button
            type="default"
            size="large"
            danger
            onClick={() => {
              setEditMode(false);
              setTitle("");
              setDropValue("");
              setText("");
              dispatch(resetPostAC());
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          type="primary"
          size="large"
          onClick={!editMode ? createPost : () => saveChanges(post._id)}
          disabled={!title || !dropValue || !text || username !== "pavelkv94"}
        >
          {!editMode ? "CREATE NEW POST" : "SAVE CHANGES"}
        </Button>
      </div>
      <hr />

      {!allPosts ? (
        <Button type="primary" ghost onClick={() => setAllPosts(true)}>
          All Posts
        </Button>
      ) : (
        <Button type="primary" ghost onClick={() => setAllPosts(false)}>
          Close Posts List
        </Button>
      )}

      {allPosts && (
        <Collapse>
          {categories.map((cat) => (
            <Panel header={cat.title} key={cat._id}>
              {posts.map(
                (post) =>
                  post.category === cat.title && (
                    <p key={post._id}>
                      {post.title}
                      <Button
                        type="dashed"
                        style={{ color: "green", margin: "0px 4px", float: "right" }}
                        onClick={() => editPost(post._id)}
                        disabled={username !== "pavelkv94"}
                      >
                        Edit
                      </Button>
                      <Button
                        type="dashed"
                        style={{ color: "red", margin: "0px 4px", float: "right" }}
                        onClick={() => deletePostModal(post._id, post.title)}
                        disabled={username !== "pavelkv94"}
                      >
                        Delete
                      </Button>
                    </p>
                  )
              )}
            </Panel>
          ))}
        </Collapse>
      )}
      <CloseModal visible={visible} setVisible={setVisible} callback={deletePost} title={tempId!.title} />
    </div>
  );
});

export default Admin;
