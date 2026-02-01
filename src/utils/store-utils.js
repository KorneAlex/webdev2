// db_flow_1: if db.json doesn't exist creates it, else uses the existing file

import { JSONFilePreset } from "lowdb/node";

export const db = await JSONFilePreset("./src/models/json/db.json", {
  users: [],
});