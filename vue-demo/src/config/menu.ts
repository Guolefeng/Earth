export const menu = [
    {
        index: "/home",
        name: "首页",
    },
    {
        name: "测试1",
        index: "/test1",
    },
    {
        name: "测试2",
        index: "test2",
        children: [
            {
                index: "/test2",
                name: "2-1",
            },
        ],
    },
    {
        name: "测试3",
        index: "test3",
        children: [
            {
                index: "/test3",
                name: "3-1",
            },
        ],
    },
];
