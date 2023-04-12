pipeline {
    agent any

    tools {
        // Install the nodejs version
        nodejs "19.8.1"
    }

    stages {
        stage('Build') {
            steps {
                // node install
                sh 'npm version'

                // Get some code from a GitHub repository
                git 'https://github.com/olybuy/task2a1qa.git'

                script {
                    // The below will clone your repo and will be checked out to master branch by default.
                    git credentialsId: 'jenkins-integration', url: 'https://github.com/olybuy/task2a1qa.git'
                    // Do a ls -lart to view all the files are cloned.
                     sh "ls -lart ./*"
                    // List all branches in your repo.
                    sh "git branch -a"
                    // Checkout to a specific branch in your repo.
                    sh "git checkout jenkins"

                    sh "ls"

                    sh "npm install"

                    sh "npm run test"
                }
            }
        }
    }
}
