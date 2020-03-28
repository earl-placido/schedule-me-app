# Environments

### Server

We use AWS EC2 to deploy/host a Node.js server with Express.js.

**Technologies within AWS develop and production environments**

* EC2: run-time environment for our server
* S3 bucket: where our code is stored in AWS
* RDS: our MySQL database instance


### Web

We are using Surge to host our web client as it integrates into our project and allows us to publish for free.


# CI/CD

### Travis

We use Travis for our CI/CD. Travis would detect push to GitHub from our project and then execute the scripts that are defined in the travis configuration that is located in our root folder called ".travis.yml".

We would have to manually specify how to run our test scripts inside Travis configuration. If all scripts specified in Travis configuration ran without any error code, then the build would pass and we could see a checkmark next to our project in GitHub. (CI)

In our Travis configuration, if build succeeded in Travis either in develop or master branch, then Travis would automatically deploy the webpage to Surge as a Continuous Deployment. The server is deployed to AWS. It does not deploy to mobile automatically. (CD)


# Server Technologies

### AWS EC2, Node.js, Express.js

We use AWS EC2 to deploy/host a Node.js server with Express.js.

- **Node.js**
  - Node.js allows you to run JavaScript outside of a browser, allowing you to use JavaScript to perform actions on your local machine. Things that you would have otherwise needed languages like Python, C++, or Java to do since JavaScript is no longer bound to the browser.
  - Allows us to use JavaScript to write server-side code
  - Simplifies our project and unifies our stack (by only having to write JavaScript code)
  - Lots of open source modules

We chose Node.js as it has a large and active community which is a huge advantage for support. Additionally, we will be using React for our web application and therefore, it makes sense for us to build our backend with JavaScript as well. 

- **Express** 
  - Web framework for Node.js for building web apps and API; makes things like routing easier.
  - Difference between Node.js and Express?
    - Node.js = server runtime environment
    - Express = Framework we use on top of Node.js
  - Express simplifies writing server-side code and organizes and cleans up a lot of stuff for us

We chose Express because it has a lot of open-source libraries for common tasks (routing, authentication, and so on) which would be at our disposal. Express is also easy to learn and has a large community around it. Some of our group members also have experience with Express, which will help us get started.

Because of the popularity of Node.js and Express there is an abundance of learning material, from documentation to tutorials, that we can take advantage of.

### Swagger

We are using swagger as a documentation and testing tool for our RESTful API. This eases mobile and web development in connecting to our server, without having to use more external tools.




# Data Storage

### MySQL

A relational database fits our app well as there are relatively clear relationships in our app - a rigid design will not impair our development. Additionally, relational databases are fast performing, which is important for the time-saving vision of our app. 

We chose MySQL because it is open source, it is easy to use, and it has a large community, so finding solutions to problems will be fairly easy. Integrating MySQL with our Node server is also straightforward due to the many modules available.

# Environment Management

### Docker

We are using a virtual machine with Linux OS which has a docker container within it. 
We are also using docker as a container platform for web development for project isolation.

# Targeted Platforms

### Web and Android 

A web app is essential as it is versatile and can be used by anyone regardless of whether they are on a PC, a laptop, an Android phone or an iPhone. We decided to build an Android app as well since most of us use or own an Android phone.


# Client-side Frameworks

### Web: React

We decided on React due to its popularity and marketability as a skill. A couple of points in favour of using React:

- On Stack Overflow’s developer survey, React was the most loved framework for 2019. 
- Gaining knowledge in React would also mean we have a basis for writing applications in React Native, another marketable skill. 
- React has lots of documentation and a few people on the team have some experience using React - they can get us started and help the rest of us if need be.
- React encourages easy to create and reusable components, a pattern that those of us who have used React or similar frameworks find valuable.

### Mobile: React Native

We chose React Native so that we can keep more consistency between our mobile and web versions.


### Redux (web and mobile)

We will use redux for both web and mobile clients to manage global state in a scalable way.


# UI Frameworks

### Web: [Ant Design](https://ant.design/)

### Mobile: [NativeBase](https://nativebase.io/)

These component libraries should keep enough visual consistency between our front-ends.


# Code formatting 

### ESLint: we are using this to run through code and analyze it for potential errors

### Prettier: we are using this as a linter/code formatting rules


# Programming Languages

JavaScript, ReactJS


# Project Board

### Trello

[Link to the project board ](https://trello.com/invite/b/ZWdpiKU1/c081ab4b426b4d953ce995e8a5feee37/4350-scheduler)

