import s from "./PostList.module.css"
import { List, Card } from 'antd';

export function PostList() {

    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
    ];


    return (
        <div className={s.postList}>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title}>Card content</Card>
                    </List.Item>
                )}
            />,
        </div>
    )
}