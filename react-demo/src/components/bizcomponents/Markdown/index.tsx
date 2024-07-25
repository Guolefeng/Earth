import React, { useState, useEffect } from "react";
import MarkNav from "markdown-navbar";
import { setUrl } from "@/utils/util";
import { marked } from "marked";
import hljs from "highlight.js";

interface IProps {
    query: any;
    replacePath?: string;
    value?: string;
}

marked.setOptions({
    renderer: new marked.Renderer(),
    // highlight: function (code: any) {
    //     return hljs.highlightAuto(code).value;
    // },
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    // sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    // smartLists: true, // 使用比原生markdown更时髦的列表
    // smartypants: true, // 使用更为时髦的标点
});

const MD = (props: IProps) => {
    const { query, replacePath, value = "" } = props;
    const [cont, setCont] = useState("");

    useEffect(() => {
        // setCont(marked.parse(value));
    }, [value]);

    const onHashChange = (dataId: string) => {
        // 覆盖markdown-navbar组件内部修改url的操作, 并且添加锚点滚动
        setTimeout(() => {
            const target = document.querySelector(`[data-id="${dataId}"]`);
            target?.scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
            setUrl(
                `#/${replacePath}${
                    query?.menukey ? `?menukey=${query.menukey}` : ""
                }`
            );
        }, 10);
    };

    return (
        <div className="markdown">
            <div
                className="markdown-value"
                dangerouslySetInnerHTML={{ __html: cont }}
            ></div>
            <div className="markdown-navbar">
                <MarkNav
                    headingTopOffset={80}
                    source={value}
                    ordered={false}
                    onHashChange={onHashChange}
                />
            </div>
        </div>
    );
};

export default MD;
