# Excel is not a database! Sponsored by MongoDB

# Description
It's the first week in your new job, and the VP of sales is already keeping you busy.

From the start of the year, all current sales data has been stored in MongoDB Atlas – allowing us to run operational and analytical workloads on the live data set. Unfortunately, that wasn't always the case – Excel was the "database" choice for past years! At least someone took the initiative to export that data in CSV format and store it in S3.

The sales team now needs your help to analyze that data.

# Learning Outcome
## Summary
Run queries on your legacy data stored in S3.

## Content
##### What you will learn from this challenge:
You'll learn to configiure and use MongoDB Atlas Data Lake to query and analyze data across AWS S3 in-place and in its native format using the MongoDB Query Language (MQL).

You'll create a new Atlas Data Lake, link it to your S3 bucket, and query the CSV data stored there.

##### AWS services that you will learn more about:

- S3 buckets
- IAM roles

##### Cloud Computing Skills that you will gain:

- MongoDB Atlas Data Lake
- Configuring roles to allow application access to data

# Task 1
# Find Your S3 Bucket
## Background
You've been asked to calculate the total number of office supplies that were sold to our Lithuanian customers through offline sales channels. The raw data is buried within a mass of CSV data stored in an S3 bucket. You need to link a new Atlas Data Lake to that data, and then run an aggregation to find the answer.

## Your Task
You've been given access to the AWS account, but not the name of the S3 bucket containing the data. Find the name of the single S3 bucket in your AWS account.

### Getting Started
You'll need to check the S3 bucket details using either the AWS console or the AWS CLI – there are links from the challenge window to acccess them.

### Inventory
An S3 bucket was created and populated as part of the setup for this challenge.

### Services you should use
AWS S3

### Task Validation
Once you've found the S3 bucket, paste its name into the box and submit it to complete this task.

## Clue
### How to find my S3 bucket name
Click the button at the top of the page to open the AWS console. Use the AWS console or CLI to navigate to the account's S3 buckets and take a note of the bucket's name – you need to provide this name as your answer to complete this task.

## Clue
### Step-by-step instructions
- Open the AWS console for this challenge's account using the link in the top-right of this window. If you get an error, then it may mean that you were already logged in to a different account – log out and try again
- Click the **Services** dropdown and then select **S3**
- Click on the only bucket that's shown, and then copy the bucket name
- Paste the bucket name into the challenge window and submit to complete the task

If you prefer to use the AWS CLI then you can get the bucket name using `aws s3 ls`

# Task 2
# Create MongoDB Atlas account and a database user
## Background
You've not yet been given access a company credit card, but the sales department is breathing down your neck to get the data they need. Fortunately, you don't need to provide any payment details to create your MongoDB Atlas account.

## Your Task
Unless you already have an MongoDB Atlas account, you need to create a free Atlas account for your Data Lake. You also need to create a database user in order to connect to the Data Lake and run a query later.

Navigate to <a href="https://www.mongodb.com/cloud/atlas" target="_blank">MongoDB Atlas</a> and create a new account; there's no need to create an Atlas Cluster.

**Note that if you have an existing account and project, you can use that rather than creating a new one.**

!["Skip creating an Atlas cluster"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/no-cluster.png "Skip creating an Atlas cluster")

You'll also need to create the organization and project.

Set up a database user (stick with the default username/password option).

### Inventory
After completing this task, you'll have:
- MongoDB Atlas account
- Atlas database user credentials

### Services you should use
MongoDB Atlas

### Task Validation
After creating the database user, the Atlas UI will display the **Authentication Method** being used for your new user – submit that method to complete this task.

## Clue
### How to create a database user & see authentication method
Navigate to the `Database Access` section of the Atlas UI, click on `ADD NEW DATABASE USER` and provide your username and password.

!["Create an Atlas database user"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/database-user.png "Create an Atlas database user")

## Clue
### Step-by-step instructions
- Navigate to <a href="https://www.mongodb.com/cloud/atlas" target="_blank">MongoDB Atlas</a>
- Click on the button to start the process of creating a new account
- Provide your name, email address, etc. (or use the option to sign up using your Google account)
- On the next screen, you have the option to change the Atlas organization and project names before continuing (you can also indicate your prefered programming language - it doesn't affect this challenge)
- You'll be given the option to create your first Atlas cluster on the next page – you can dismiss that page for this challenge (you can come back and create your free database cluster at any point in the future)
- In the left menu, you'll see an option to control **Database Access** in the security section – select that and then click the button to add a new database user
- Stick with the default authentication method of **Password**, and provide your username and password - you can stick with the default options. Click the button to create the user.
- The next page shows all of the database users, there should be just one entry – the user you just created. Please take a note of the **Authentication** method for this user, and submit it to complete this task.


## Answer
SCRAM

# Task 3
# Allow network access to your data lake from your local machine
## Background
MongoDB Atlas has lots of security features to prevent unauthorized access to your data. You've already created a password-protected database user, but, for additional security, you also need to grant network access for your local machine.
## Your Task
Grant your current IP address network access to your Atlas data using the Atlas UI.

### Inventory
The previous task created:
- MongoDB Atlas account
- Atlas database user

### Services you should use
MongoDB Atlas

### Task Validation
Your IP Address will be added in CIDR form and will look like this in the UI: `XX.XX.XX.XX/YY` - the number shown for the `YY` component is the answer for this task.

## Clue
### How to add your IP address to the approved list for your Atlas project
You'll find the option to edit the **Network Access** settings in the **Security** section on the left of the Atlas UI. From their, add the IP address of your local machine.

## Clue
### Step-by-step instructions
- Navigate to the **Network Access** settings in the **Security** section on the left of the Atlas UI 
- Click on **Add IP Address**, then on **ADD CURRENT IP ADDRESS**, and then **Confirm**.

!["Add IP list to approved list"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/network-access.png "Add IP list to approved list")

- In the list of enabled IP addresses, there should be a single entry
- Note the two digits that follow the `/` in the IP address and use them as the answer to complete this challenge

# Task 4
# Create an Atlas Data Lake & connect to S3 bucket
## Background
It's time to create your Atlas Data Lake to your S3 bucket – once you've done that, you can keep the sales team happy by mining the data at any time, using the rich MongoDB Query Language (MQL).

## Your Task
Create an Atlas Data Lake and connect it to your S3 bucket, allowing you to query your CSV (or JSON, Parquet, Avro, ORC...) files in-place.

From the Atlas UI, follow the instructions to create your data lake – setting up the Atlas <-> S3 permissions as prompted. Read-only access is enough for this challenge.

!["Create a MongoDB Atlas Data Lake"](https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake/data-lake.png "Create a MongoDB Atlas Data Lake")

Don't try connecting to your Data Lake yet – that's your next task!

### Inventory
You already have these resources in place:
- S3 bucket holding your sales data
- MongoDB Atlas account
- Atlas database user
- Network access rules, allowing your local machine to access Atlas services

### Services you should use
MongoDB Atlas Data Lake

### Task Validation
To complete this challenge, submit the name you gave to your Data Lake.

## Clue
### Problems setting up IAM Role with right permissions
It's simplest to create a new IAM Role, using the AWS CLI - the Atlas UI guides you through the process. To follow the process you need to have the AWS CLI installed.

If you need to install the CLI please follow <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html" target="_blank">these instructions</a>. Then, click on the AWS CLI button at the top of the page, copy the commands listed there and run them in your terminal. You should now be ready to follow the instructions in the Atlas UI.

## Clue
### Duplicate role name?
If the Atlas UI warns that the role already exists, change the role name by adding some random characters.

## Clue
### Data Lake still unable to connect to the bucket
If the Altas UI says that your Data Lake can't access the S3 bucket after you've set up the IAM role, then you just need to wait for a second and try again – the time you spent reading this should have been more than enough! What you are seeing are propagation delays.

## Clue
### Step-by-step instructions
- From the Atlas UI, select **Data Lake** from the left-hand menu
- Click the button to configure a new Data Lake
- Give your Data Lake a name and continue
- Stick with the option to authorize an AWS IAM role and continue
- Pick the option to create a **new role**
- At this point, you need to use the AWS CLI from your terminal – if you don't already have it installed, then please follow <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html" target="_blank">these instructions</a>. Click the AWS CLI button in the challenge window and copy the commands. Paste those commands into a terminal window so that the AWS CLI will connect to your challenge environment.
- Create a file named `role-trust-policy.json` and paste in the JSON document that you see in the Atlas UI
- Copy the `aws iam create-role...` command shown in the Atlas UI and paste it into your terminal
- The details of the new IAM role will be displayed in your terminal. Copy the `Arn` value - it's a string starting with `arn:` and ending with the name you gave to the role.
- Paste the ARN value into the Atlas UI and continue
- Add the name of your S3 bucket (you found it in the first challenge - go back to the AWS console if you didn't make a note of it) into the **Read-only** field and continue
- In the next section, you'll see another JSON document that you need to paste into a new local file named `adl-s3-policy.json`
- Copy the `aws iam put-role-policy...` command from UI and run it in your terminal
- Click the button to finish the setup. If it fails, wait for a second and try again (it can take a couple of seconds for things to synchronize)
- Complete the task by submitting the name you gave to your Data Lake into the challenge window

# Task 5
# Connect to your Data Lake and query your sales data
## Background
Finally, you can connect to your sales data (via Atlas Data Lake) and run an aggregation query to find the data you need - and get sales off your back!

## Your Task
Connect to your Data Lake using the `mongo` shell (following the instructions in the UI to install it if you don't already have it). Use your S3 bucket name as the database name and use the username and password you created in Atlas earlier to connect.

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

### Inventory
You already have these resources in place:
- S3 bucket holding your sales data
- MongoDB Atlas account
- Atlas database user
- Network access rules, allowing your local machine to access Atlas services
- Atlas Data Lake

### Services you should use
MongoDB Atlas Data Lake

### Task Validation
To complete this challenge, submit the number of units for the offline channel sales (found in the results from the aggregation you ran in the `mongo` shell)

## Clue
### How do I connect to the right database?
In the MongoDB connection string, replace `dbname` with the name of your S3 bucket

## Clue
### I'm running the aggregation but getting no results
If you are running the aggregation and seeing no results you probably didn't use the bucket name as the database name to connect to. In your terminal window run `show dbs` and then `use <dbname>` inserting the output of the `show dbs` command as the `dbname`.

## Clue
### Step-by-step instructions
- From the Data Lake section of the Atlas UI, click **connect** to get the connection instructions
- Choose the option to connect from the `mongo` shell
- Select whether or not you already have the `mongo` shell installed
- Follow the instructions to install the `mongo` shell if you don't already have it on your machine
- Copy the `mongo "mongodb://...` command and edit it:
    - Replace `dbname` (including the angle brackets) with the name of your S3 bucket
- Run the edited command in your terminal
    - If it fails to connect then check that the password is the same one as you used when creating the database user in the second task
    - If it still fails to connect, go back to the **network access** settings and confirm that your IP address is listed. To troubleshoot, you can temporarily **allow access from anywhere**
- Once inside the connected `mongo` shell, run this command:

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
- Your results should look something like this...

```
{"units" : XXXX, "channel" : "Offline" }
{"units" : YYYY, "channel" : "Online" }
```
- Submit the value of `XXXX` into the challenge window to complete this task and the challenge

# Next Steps & Actions
You now have a <a href="https://cloud.mongodb.com" target="_blank">MongoDB Atlas</a> account - go ahead and create a free (forever) database cluster and experiment.

Some useful resources:
- <a href="https://docs.mongodb.com/datalake/" target="_blank">MongoDB Atlas Data Lake documentation</a>
- Free online training from <a href="https://university.mongodb.com/" target="_blank">MongoDB University</a>
