// db_flow_2: facade. initialize stores to be used in controllers

import { usersJsonStore } from "./json/users-json-store.js";

export const db = {
    usersStore: null,

    async init() {
        this.usersStore = usersJsonStore;
    }
};  