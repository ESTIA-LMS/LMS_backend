# Jenkins for CICD

## 1 - Build jenkins image from jenkins Dockerfile

docker build -t myjenkins ./cicd

## 2 - Start Jenkins using docker

You can start jenkins container using the script in the /cicd/bin directory
sh ./cicd/bin/start_jenkins.sh

## 3 - Set up Jenkins config

### 3.1 - Unlock jenkins

Browse to <http://localhost:8080> and wait until the Unlock Jenkins page appears.

To unlock jekins copy the intial admin password that can be find in the container using the following command:
docker container exec -it jenkins bash 'sudo cat /var/lib/jenkins/secrets/initialAdminPassword'

### 3.2 - Customize Jenkins with plugins

After unlocking Jenkins, the Customize Jenkins page appears. Here you can install any number of useful plugins as part of your initial setup.
Choose the "Install suggested plugins" option.

### 3.3 - Create the first administrator user

Finally, after customizing Jenkins with plugins, Jenkins asks you to create your first administrator user.
When the Create First Admin User page appears, specify the details for your administrator user in the respective fields and click Save and Finish.
When the Jenkins is ready page appears, click Start using Jenkins.

Notes:
This page may indicate Jenkins is almost ready! instead and if so, click Restart.
If the page does not automatically refresh after a minute, use your web browser to refresh the page manually.
If required, log in to Jenkins with the credentials of the user you just created and you are ready to start using Jenkins!

### 3.4 - Add your GitHub credentials

Prerequisite : You should have a Github account which part of the 'ESTIA-LMS' organization.

From the Jenkins home page click "Manage Jenkins > Manage Credentials".
Under System, click the Global credentials (unrestricted) link to access this default domain.
Click Add Credentials on the left.

From the Kind field, choose "User name and password".
From the Scope field, choose "Global"
Specify your GitHub name as the user name and your github access token as password (<https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token>)
Finally the ID of your user should be "my-github-account" !

## 4 - Create a pipeline project

### 4.1 Innitialize project

Go back to Jenkins home and click "create new jobs" under Welcome to Jenkins!
In the Enter an item name field, specify the name for your new Pipeline project (e.g. simple-node-js-react-npm-app).
Select "MultiBranches Pipeline" and click OK at the end of the page.
( Optional ) On the next page, specify a brief description for your Pipeline in the Description field.

### 4.2 Create a pipeline

Choose a display name (ex: main_pipeline)

In branch source click "add source" and select GitHub.
In the credential dropdown select the credentials you just created in step 3.4.
In the "Repository HTTPS URL" put the url of the github repository <https://github.com/ESTIA-LMS/LMS_backend>

In the "Build Configuration" section, select "Jenkinsfile" on mode field and type "cicd/Jenkinsfile" under Script path.

In the "Scan Pipeline Multibranches Triggers" section you can choose a periodical interval to run your builds if not run manually.

Click save, if the scan is successfull and the Jenkinsfile is found on your remote repository you are done and can launch your first automated build.

## 5 - Using jenkins

Once you have completed all previous all you have to do to restart jenkins is executing the start_jenkins script
sh ./cicd/bin/start_jenkins.sh

You can then enter the jenkins container where the build / deploy happen using
docker exec -it jenkins /bin/bash
