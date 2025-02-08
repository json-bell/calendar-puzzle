import { PanelContent } from "../../panelTypes";

export const formatContent = (content: PanelContent): string | number =>
  typeof content === "string" ? content.toUpperCase() : content;
