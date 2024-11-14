declare module "./load.cjs" {
    function hello(): string;
}
export type Greeting = {
    message: string;
};
export declare function greeting(): Greeting;
