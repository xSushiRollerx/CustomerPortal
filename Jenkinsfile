pipeline {
    agent any

    
     environment {
        AWS_SERVICE = credentials('portal-customer')
    }
    tools {
        nodejs "NodeJS"
    }
    
    stages {

        stage('Install') {
            steps {
                // Run Node on a Unix agent.
                sh "npm install"

            }
        }

//        stage('Test') {
//            steps {
//                echo 'Beginning Tests'
//                sh 'CI=true npm test'
//            }
//        }

        stage('Build') {
            steps {
                // Run Node on a Unix agent.
                sh "npm run build"

            }
        }
        stage("S3 Push") {
            steps {
                echo "S3 Build...."
                echo "Sync..."
                sh "aws s3 sync build/ s3://${AWS_SERVICE} --delete"
            }
        }
    }
    post {
        always {
            echo "cleanup"
            sh 'rm -rf *'
        }
    }
}
