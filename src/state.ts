import { v1 } from "uuid";
type Art = {
    shotTitle: string
    title: string
    text: string
}
type ItemType = {
    title: string
    createdDate: string
    id: string
    articles: Art[] | []
}
type StateType = ItemType[]
export const state: StateType = [
    {
        title: "Linux",
        createdDate: "12-12-21",
        id: v1(),
        articles: [
            {
                shotTitle: "linux1",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            },
            {
                shotTitle: "linux2",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            },
            {
                shotTitle: "linux3",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            },
            {
                shotTitle: "linux4",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            }
        ]
    }, {
        title: "Windows",
        createdDate: "12-12-21",
        id: v1(),
        articles: [
            {
                shotTitle: "win1",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            },
            {
                shotTitle: "win2",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            },
            {
                shotTitle: "win3",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            },
            {
                shotTitle: "win4",
                title: "article title",
                text: "Nulla porttitor accumsan tinciduntd as Donec rutrum congue leo eget malesuada.Sed porttitor lectus nibh.Vivamus magna justo,"
            },
        ]
    }, {
        title: "category3",
        createdDate: "12-12-21",
        id: v1(),
        articles: []
    }, {
        title: "category4",
        createdDate: "12-12-21",
        id: v1(),
        articles: []
    },
]

