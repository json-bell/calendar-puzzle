export type WindowSize = "large" | "medium" | "small" | "compact";

export type ViewportLookup<T> = { [K in WindowSize]: T };
