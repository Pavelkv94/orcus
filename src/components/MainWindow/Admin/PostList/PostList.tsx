import s from "./PostList.module.css"
import { List, Card } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getThunk } from "../../../../redux/categoriesReducer";

export function PostList() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getThunk())
	}, [])
	// const data = [{title:"123"}, {title:"123"}, {title:"123"}, {title:"123"}, ]
	const data: any = useSelector<any>(state => state.categories)

	console.log(data)

	return (
		<div className={s.postList}>
			<List
				grid={{ gutter: 16, column: 4 }}
				dataSource={data}
				renderItem={(item: any) => (
					<List.Item>
						<Card title={item.title}>Card content</Card>
					</List.Item>
				)}
			/>,
		</div>
	)
}