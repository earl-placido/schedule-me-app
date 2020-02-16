# Server

## Endpoints

| Environment | URL                                                          |
| ----------- | ------------------------------------------------------------ |
| [Production](http://schedule-me-up-prod.aufeskudeq.us-east-2.elasticbeanstalk.com/api/)  | [schedule-me-up-prod.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1](http://schedule-me-up-prod.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1) |
| [Develop](http://schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/api/)     | [schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1](http://schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/api/v1) |

---
## Server Architecture
The server will handle all of the functionality that relates to persistence and preprocessing / postprocessing of the data. Most of the processing should happen in the server so that the front end of the web and mobile app contains the same logic. Within the **api** folder are three main folders:
* **routes** - Contains all routes/endpoints required for the application to access the server side
* **model** - Contains all the logic required to make calls to the database and process the data
* **util** - Contains all the logic that might be utilized between files in the server

Tests for the database can be created within the **tests** folder. There should be **one test file per corresponding file in model**. 

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
