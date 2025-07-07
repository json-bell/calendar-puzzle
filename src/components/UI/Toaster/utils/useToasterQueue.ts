import { useContext } from "react";
import ToasterContext from "./toasterContext";

export const useToasterQueue = () => useContext(ToasterContext);
