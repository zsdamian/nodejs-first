export interface Book {
    id: number,
    authors: string[],
    title: string,
}

export const BOOKS: Book[] = [
    {
        id: 1,
        authors: ['Jonathan Haidt'],
        title: 'Coddling of the American Mind',
    },
    {
        id: 2,
        authors: ['Dan Heath', 'Chip Heath'],
        title: 'Switch: How to change when change is hard',
    },
    {
        id: 3,
        authors: ['Kathy Sierra'],
        title: 'Badass: Making users awesome'
    },
    {
        id: 4,
        authors: ['Daniel Kahneman'],
        title: 'Thinking fast, thinking slow',
    },
    {
        id: 5,
        authors: ['Caroline Dweck'],
        title: 'Mindset'
    },
    {
        id: 6,
        authors:[ 'Michael Walker'],
        title: 'Why we sleep?'
    },
];