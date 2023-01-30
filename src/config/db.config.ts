import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
   type: "mysql",
    host: "sql7.freemysqlhosting.net",
    port: 3306,
    username: "sql7594440",
    password: "5pdNLpnVKV",
    database: "sql7594440",
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: false,
    connectTimeout:100000
})
