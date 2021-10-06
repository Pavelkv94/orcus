import { useParams } from "react-router";
import s from "./Admin.module.css"
import { List, Card } from 'antd';
import * as Showdown from "showdown";
import { Suggestion } from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMde from "react-mde";
import React, { useEffect, useState } from "react";

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

export function Admin() {
    const { slug, catg } = useParams<{ catg: string, slug: string }>();
    const [text, setText] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState<any>("write");
    return (
        <div className={s.adminContainer}>
            <div>
                <label htmlFor="time">Time for reading:</label>
                <input
                    type="number"
                    name="time"
                    autoComplete="off"
                    value={1}
                    onChange={(e) => {}}
                />

                <ReactMde
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

                add
            </div>
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

        </div>
    )

}