pipeline {
    agent any

    
     environment {
        AWS_SERVICE = "sushibyte-portal-customer"
    }
    tools {
        nodejs "NodeJS"
    }
    
    stages {
        stage('Build') {
            steps {
                // Run Node on a Unix agent.
                sh "npm install"
                sh "npm run build"

            }
        }
        stage("S3 Push") {
            steps {
                echo "S3 Build...."
                echo "Sync..."
                sh "aws s3 sync build/ s3://${AWS_SERVICE}"
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
