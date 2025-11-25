import type { Dispatch, SetStateAction } from "react";

export type Page = "menu" | "game" | "learn";

export type SetPage = Dispatch<SetStateAction<Page>>;
