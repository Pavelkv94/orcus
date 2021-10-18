import s from "./PostList.module.css"
import { List, Card } from 'antd';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

export const PostList = React.memo(() => {

	const posts: any = useSelector<any>(state => state.posts)
	const reversedData = [...posts].reverse();

	return (
		<div className={s.postList}>
			<List
				grid={{ gutter: 20, column: 3 }}
				dataSource={reversedData}

				renderItem={(item: any) => (
					<List.Item style={{ boxShadow: "10px 10px 10px gray" }}>
						<Link to={`/${item.category}/${item.slug}`}><Card title={item.title} style={{ height: "400px", overflow: "hidden" }}>{item.text}</Card></Link>
					</List.Item>
				)}
			/>,
		</div>
	)
})