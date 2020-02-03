# Server

## Endpoints

| Environment | URL                                                          |
| ----------- | ------------------------------------------------------------ |
| [Production](http://schedule-me-up-prod.aufeskudeq.us-east-2.elasticbeanstalk.com/api/)  | [schedule-me-up-prod.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1](http://schedule-me-up-prod.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1) |
| [Develop](http://schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/api/)     | [schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1](http://schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1) |

---


## How to run
1. Create an `.env` file inside `/server`:

   - Example:
        ```
        NODE_ENV=development
        SERVER_PORT=8000
        
        RDS_DB_NAME=schedulemeup
        
        ### hostname and port of your MySQL instance
        RDS_HOSTNAME=localhost
        RDS_PORT=3306
        
        ### Root credentials from your MySQL instance
        RDS_USERNAME=root
        RDS_PASSWORD=password
        
        ### can be anything, this user will be created during db initialization
        DB_USER=user
        DB_PASSWORD=password
        ```

2. Install all required dependencies:
   -  `npm install`

3. Initialize database
   - `npm run db:init`
4. To runlocally:
   - `npm run dev`