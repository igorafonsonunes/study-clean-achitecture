import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
    constructor(public erros: NotificationErrorProps[]) {
        super(erros.map(error => `${error.context}: ${error.message}`).join(","));
    }
}