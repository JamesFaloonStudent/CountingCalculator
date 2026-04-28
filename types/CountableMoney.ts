export interface CountableMoney {
    id: number
    name: string
    value: number
    volume: number

}


export const defaultCountableMoney: CountableMoney[] = [
    { id: 1, name: "Coin Rolls / Extras", value: 100, volume: 0 },
    { id: 2, name: "Nickels", value: 5, volume: 0 },
    { id: 3, name: "Dimes", value: 10, volume: 0 },
    { id: 4, name: "Quarters", value: 25, volume: 0 },
    { id: 5, name: "Loonies", value: 100, volume: 0 },
    { id: 6, name: "Toonies", value: 200, volume: 0 },
    { id: 7, name: "$5 Bills", value: 500, volume: 0 },
    { id: 8, name: "$10 Bills", value: 1000, volume: 0 },
    { id: 9, name: "$20 Bills", value: 2000, volume: 0 },
    { id: 10, name: "$50 Bills", value: 5000, volume: 0 },
    { id: 11, name: "$100 Bills", value: 10000, volume: 0 },
];
