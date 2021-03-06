![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)
<a href="#badge"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
### Serverless API for Contact Forms
Simply send your form data on the request body and have it emailed to yourself.

* Lambda
* API Gateway
* Simple Email Service

Accepts a `POST` request to `/email`:
```json
{
  "name": "string",
  "email": "string",
  "content": "string"
}
```

#### Setup
* You must [configure](https://serverless.com/framework/docs/providers/aws/guide/credentials) the serverless framework with your AWS credentials
* Run `yarn install`
* Add `env.json` to the root folder:
    ```json
      {
        "STAGE":"dev",
        "EMAIL":"email you want SES to use to send emails"
      }
    ```
* In your AWS management console verify the sender email in SES
* Run `sls delploy`
    * This will create your app stack in AWS and provide you with the API endpoint.

