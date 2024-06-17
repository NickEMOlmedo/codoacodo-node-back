import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "viaduct.proxy.rlwy.net",
  user: "root",
  password: "oqlVOhWafxdRwJuuwabItmQgveiRbbmO",
  database: "railway",
  port: 46923,
});
