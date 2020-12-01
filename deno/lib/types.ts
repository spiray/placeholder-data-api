import type { RouterContext } from "https://deno.land/x/oak/mod.ts";

export type Post = { userId: number; id: number; title: string; body: string };
export type MyRouterContext = RouterContext<
    Record<string | number, string | undefined>,
    Record<string, any>
>;