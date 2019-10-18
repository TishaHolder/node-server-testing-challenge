module.exports = {

  development: {
    client: 'sqlite3', //dbms driver
    connection: {
      filename: './data/node-testing-challenge.db3'
    },
    useNullAsDefault: true,
  },

  migrations: {
    directory: './data/migrations'
  },

  seeds: {
    directory: './data.seeds'
  },
  
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  //needed when using foreign keys
  //to prevent users from entering bad data into a FK column
  pool: {
    afterCreate: (conn, done) => {
     //runs after a connection is made to the sqlite engine
     //turn on FK enforcement
     //enforces foreign key constraints on SQLite, not needed for other DBMSs
     conn.run('PRAGMA foreign_keys = ON', done);    
    }

  },
  

};