# Database

## How to setup

While inside `/server`, run:
```
npm install
npm run db:init
```

---

## Troubleshooting

- `Client does not support authentication protocol requested by server; consider upgrading MySQL client`

  - https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

    ```
      Execute the following query in MYSQL Workbench
    
      ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
    
      Where root as your user localhost as your URL and password as your password
    
      Then run this query to refresh privileges:
    
      flush privileges;
    
      Try connecting using node after you do so.
    
      If that doesn't work, try it without @'localhost' part.
    ```

  - If the error shows up right after trying to initialize the database

    ![image-20200229130205078](https://i.imgur.com/qtAV3WE.png)
    
    - Run: 
      - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'`
      - Then run: `FLUSH PRIVILEGES`
    
  - If the error shows up right after creating the user
  
    ![image-20200229130449826](https://i.imgur.com/cymKi2o.png)
  
    - Run:
      - `ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password'`
  
    