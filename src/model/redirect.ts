import { Timestamp } from "@firebase/firestore";

export interface Redirect {
    lURL: string,
    sURL: string,
    timestamp: Timestamp
}