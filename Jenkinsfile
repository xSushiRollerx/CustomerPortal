pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // Run Node on a Unix agent.
                sh "npm install"
                sh "npm run build"

            }
        }
        // stage('Code Analysis: Sonarqube') {
        //     steps {
        //         withSonarQubeEnv('SonarQube') {
        //             sh 'mvn sonar:sonar'
        //         }
        //     }
        // }
        // stage('Await Quality Gateway') {
        //     steps {
        //         waitForQualityGate abortPipeline: true
        //     }
        // }
        stage("S3 Build") {
            steps {
                echo "S3e S3 Build...."
                sh "aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 635496629433.dkr.ecr.us-west-1.amazonaws.com"
                echo "Push..."
                sh "npm run build && aws s3 sync build/ s3://sushibyte-portal-customer"
            }
        }
//         stage("Deploy") {
//             steps {
//                 echo "Deploying cloudformation.."
//                 sh "aws cloudformation deploy --stack-name UserMsStack --template-file ./ecs.yaml --parameter-overrides 
//                 PortNumber=8080 ListenerArn=arn:aws:elasticloadbalancing:us-east-2:170505770705:listener/app/Aline-Private-LB/38a8e6d26b981100/a4866b14508da3b5 
//                 ApplicationName=${IMG_NAME} CommitHash=${COMMIT_HASH} ApplicationEnvironment=dev 
//                 --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --region us-west-1"
//             }
//         }
    }
    post {
        always {
            sh "docker system prune -f"
        }
    }
}