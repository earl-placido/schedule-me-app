# Introduction
Our project will run reactJS inside a docker container. Docker helps to keep the same environments throughout different machines just like Python virtual environment. This helps because different machines/dependencies might have a different way of running code and might causes the automated build/tests to fail. We use docker instead of a virtual machine because docker just creates the minimal requirements for the app instead of having to create different features just to run the operating system. 

A great image explanation between the comparison of VM and docker:

![alt text](https://zdnet2.cbsistatic.com/hub/i/r/2017/05/08/af178c5a-64dd-4900-8447-3abd739757e3/resize/770xauto/78abd09a8d41c182a28118ac0465c914/docker-vm-container.png "docker vs virtual machines")


# Getting Started
When you are first running this web app, you have to build the docker image for your own computer first. In order to build the docker image first, we would need a Dockerfile. A docker-compose.yml has already been created so that we could just run the docker-compose to build our docker images. In order to build our docker image using docker-compose we can run:

```
docker-compose up
```

You should see <b>Compiled successfully! </b> in your command prompt.

You can also run your docker compose using this code:
```
docker-compose up -d
```

The -d argument is to detach the running docker container, so we can write more commands in our current terminal session.

> In our docker-compose.yml we can see:
> 
> ```
> version: '3.7'
>   
> services:
> 
> 
>   web_app_scheduler:
> 
>     container_name: web
> 
>     build:
> 
>       context: .
> 
>       dockerfile: Dockerfile
> 
>     volumes:
> 
>       - '.:/app'
> 
>       - '/app/node_modules'
> 
>     ports:
> 
>       - '3001:3000'
> 
>     environment:
> 
>       - NODE_ENV=development
> 
> ```

calling this docker-compose up is similar to calling:

```
docker run docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm web_web_app_scheduler
```

the -v argument mounts the current working directory to a location in docker. For this example: ```${PWD}:/app``` , we are mounting our current working directory (project web root) to /app location in docker.
The other -v argument does not have ```:```, this means that it is creating a named volume in docker with that directory that is passed into the argument. This means that we do not want docker to delete this directory when docker exits. 
<b> We will always have to ensure that we are installing package dependencies inside our docker image instead of our own computer </b>

the -p exposes ports to the host. For this example, we are exposing ports 3001 and 3000 to our host so we can access the web browser to visualize the changes we made to the app inside the docker.

--rm removes the container after the container exits

# Running project

In order to run our project, run the code:

```
docker-compose up -d
```

Once it is successful, you should be able to see your web app through ```localhost:3001```.

Editing any files in src folder will do a hot-reload.

hot-reload means that any changes made to the source code will get updated instantly to the web app. You will see the updates instantly in your web browser.

# Installing dependencies

NOTE: Always make sure to install dependencies inside your docker container as we created a named volume for node_modules folder.

To get into our docker container virtual environment, run:

```
docker exec -it $(YOUR CONTAINER ID) /bin/sh
```

replace $(YOUR CONTAINER ID) with your docker instance which can be found through:

```
docker ps 
```

Once you get access into the docker container, you can install the node dependencies for the web project.


