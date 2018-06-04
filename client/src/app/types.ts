export type Course = {
    id:number;
    title: string;
    author: string;
    desription: string;
    topic: string;
    url: string;
}

export type Query = {
    courses: Course[]
}