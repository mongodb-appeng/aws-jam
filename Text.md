# Excel is not a database!

# Description
It's the first week in your new job, and the VP of sales is already keeping you busy.

From the start of the year, all current sales data has been stored in MongoDB Atlas – allowing us to run operational and analytical workloads on the live data set. Unfortunately, that wasn't always the case – Excel was the "database" choice for past years! At least someone took the initiative to export that data in CSV format and store it in S3.

The sales team now needs your help to analyze that data.

# Learning Outcome
## Summary
Run queries on your legacy data stored in S3.

## Content
MongoDB Atlas Data Lake lets you query and analyze data across AWS S3 and MongoDB Atlas in-place and in its native format using the MongoDB Query Language (MQL).

In this challenge, you'll create a new Atlas Data Lake, link it to your S3 bucket, and query the CSV data stored there.

# Task 1
# Find Your S3 Bucket
# Background
You've been asked to calculate the total number of office supplies that were sold to our Lithuanian customers through offline sales channels. The raw data is buried within a mass of CSV data stored in an S3 bucket. You need to link a new Atlas Data Lake to that data, and then run an aggregation to find the answer.

# Instructions
Find the name of the single S3 bucket in your AWS account – this is the answer for this task (and you'll need it again later).

## Clue
### How to find my S3 bucket name
Click the button at the top of the page to open the AWS console. Use the AWS console or CLI to navigate to the account's S3 buckets and take a note of the bucket's name – you need to provide this name as your answer to complete this task.

# Task 2
# Create MongoDB Atlas account and a database user
# Background
You'll need a free Atlas account to create your Data Lake. You'll also need a database user in order to connect to the Data Lake and run a query.
# Instructions
Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new account; there's no need to create an Atlas Cluster.

!["Skip creating an Atlas cluster"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/no-cluster.png "Skip creating an Atlas cluster")

You'll also need to create the organization and project.

Set up a database user.

To complete this task – what `Authentication Method` is being used for your new user?

## Clue
### How to create a database user & see authentication method
Navigate to the `Database Access` section of the Atlas UI, click on `ADD NEW DATABASE USER` and provide your username and password.

!["Create an Atlas database user"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/database-user.png "Create an Atlas database user")

## Answer
SCRAM

# Task 3
# Allow network access to your data lake from your local machine
# Background
MongoDB Atlas has lots of security features to prevent unauthorized access to your data. You've already created a password-protected database user, but, for additional security, you also need to grant network access for your local machine.
# Instructions
Grant your current IP address network access to your Atlas data.

Your IP Address will be added in CIDR form and will look like this in the UI: `XX.XX.XX.XX/YY` - the number shown for the `YY` component is the answer for this task.

## Clue
### How to add your IP address to the approved list for your Atlas project
Navigate to the `Network Access` section of the Atlas UI, click on `Add IP Address`, then on `ADD CURRENT IP ADDRESS`, and then `Confirm`.

!["Add IP list to approved list"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/network-access.png "Add IP list to approved list")

# Task 4
# Create an Atlas Data Lake & connect to S3 bucket
# Background
The Atlas Data Lake will connect to your S3 bucket, and allow you to query your CSV (or JSON, Parquet, Avro, ORC...) files in-place.
# Instructions
From the Atlas UI, follow the instructions to create your data lake – setting up the Atlas <-> S3 permissions as prompted. Read-only access is enough for this challenge.

!["Create a MongoDB Atlas Data Lake"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/data-lake.png "Create a MongoDB Atlas Data Lake")

Don't try connecting to your Data Lake yet – that's your next task!

To complete this challenge, provide the name you gave to your Data Lake.

## Clue
### Problems setting up IAM Role with right permissions
It's simplest to create a new IAM Role, using the AWS CLI - the Atlas UI guides you through the process. To follow the process you need to have the AWS CLI installed.

If you need to install the CLI please follow [these instructions](https:/zdocs.aws.amazon.com/cli/latest/userguide/install-cliv2.html). Then, click on the AWS CLI button at the top of the page, copy the commands listed there and run them in your terminal. You should now be ready to follow the instructions in the Atlas UI.


## Clue
### Duplicate role name?
If the Atlas UI warns that the role already exists, change the role name by adding some random characters.

## Clue
### Data Lake still unable to connect to the bucket
If the Altas UI says that your Data Lake can't access the S3 bucket after you've set up the IAM role, then you just need to wait for a second and try again – the time you spent reading this should have been more than enough! What you are seeing are propagation delays.

# Task5
# Connect to your Data Lake and query your sales data
# Introduction
Finally, you can connect to your sales data (via Atlas Data Lake) and run an aggregation query to find the data you need.
# Instructions
Connect to the data lake using the `mongo` shell (following the instructions in the UI to install it if you don't already have it). Use your S3 bucket name as the database name and use the username and password you created in Atlas earlier to connect.

From the `mongo` shell, run this query:
```
db.SalesData.aggregate(
    [
        {
        '$match': {
            'Country': 'Lithuania',
            'Item Type': 'Office Supplies'
        }
        }, {
        '$group': {
            '_id': {
            'channel': '$Sales Channel'
            },
            'units': {
            '$sum': {$toInt: '$Units Sold'}
            }
        }
        }, {
        '$project': {
            'channel': '$_id.channel',
            '_id': 0,
            'units': 1
        }
        }
    ]
)
```

The number of units for the offline channel sales is the answer for this challenge.

## Clue: How do I connect to the right database?
In the MongoDB connection string, replace `dbname` with the name of your S3 bucket

# Next Steps & Actions
You now have a [MongoDB Atlas](https://cloud.mongodb.com) account - go ahead and create a free (forever) database cluster and experiment.
