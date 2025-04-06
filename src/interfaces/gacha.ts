export interface GachaResponse {
    value: string,
    text: string,
    item: string
}

export const GACHARESULT: GachaResponse[] = [
    {
        value: "大吉",
        text: "今年は常に上り調子！運が良すぎてお裾分けしてもおつりがくるぞ！",
        item: "お気に入りのジーンズ"
    },
    {
        value: "大吉 SR",
        text: "富、名声、力。全てを手に入れちゃうかも！今年は〇〇王だ！",
        item: "果物"
    },
    {
        value: "大吉 SSR",
        text: "とにかくやべぇぞ！創造力の化身！もう一晩で歴史的建造物建てられちゃうよ～！",
        item: "万年筆"
    },
    {
        value: "大吉 HyperSSR",
        text: "全てが視える！宇宙の理に近づいている！ふとした時に新しい概念を生み出しちゃうかも！",
        item: "この世にある全ての事象"
    }
]