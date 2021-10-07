import s from "./AdminForm.module.css"
import { Input, Button, Select, Result } from 'antd';
import ReactMde from "react-mde";
import { useParams } from "react-router";
import { useState } from "react";
import { Suggestion } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

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
    const { slug, catg } = useParams<{ catg: string, slug: string }>();
    const [text, setText] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState<any>("write");

    return (
        <div className={s.form}>
            <div className={s.fields}>
                <div className={s.postsFields}>
                    <label htmlFor="slug">{"Slug(Short Title for menu):"}</label>
                    <Input
                        type="text"
                        name="slug"
                        autoComplete="off"
                        value={1}
                        onChange={(e) => { }}
                    />
                    <label htmlFor="title">Title: </label>
                    <Input
                        type="text"
                        name="title"
                        autoComplete="off"
                        value={1}
                        onChange={(e) => { }}
                    />
                    <label htmlFor="dropdown">Categories:</label>
                    <Select defaultValue="lucy" style={{ width: 380 }} onChange={() => { }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className={s.categoryFields}>
                    <label htmlFor="category">Add category:</label>
                    <div className={s.addCategory}>

                        <Input
                            type="text"
                            name="category"
                            autoComplete="off"
                            value={1}
                            onChange={(e) => { }}
                        />
                        <Button type="dashed" >ADD</Button>
                    </div>
                </div>
            </div>
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
                <Button type="primary" size="large">CREATE NEW POST</Button>
            </div>

            <Result status="success"
                title="Successfully Purchased Cloud Server ECS!" />
        </div>
    )
}