---
title: How to publish the lambda version once the lambda layer is updated
description: >-
  Last month, my team got a problem. When the lambda layer is updated but lambda
  which is linked with the lambda layer hasn't updated any parts in code, AWS
  CDK won't publish a new version of the lambda. As the result, when the lambda
  is executed, it will use an old version of the lambda layer.
tags:
  - Software Development
  - English
coverImage: /public/images/default.png
featured: false
createdDate: 2021-10-12T00:00:00.000Z
author:
  profileImage: /public/images/8769240.png
  name: Thatchakon Jom-ud
---

Last month, my team got a problem. When the lambda layer is updated but lambda which is linked with the lambda layer hasn't updated any parts in code, AWS CDK won't publish a new version of the lambda. As the result, when the lambda is executed, it will use an old version of the lambda layer.

***

# Cause

In my opinion, to avoid unnecessary publishing, AWS handles this with conditions, For example,

* Changing some part of the lambda
* Changing of the lambda description
* and etc.

If there meet some conditions above, AWS will publish a new version. In my case, I updated only the lambda layer, and that doesn't meet any conditions above, hence AWS CDK didn't publish any versions.

# How I solved

Following the conditions, description of lambda, we can insert some value that relates with the lambda layer and the value which is updated every time the lambda layer changed is version.

> *arn:aws:lambda:\[region]:\[aws\_account]:layer:\[layer\_name]:\[version]*

But if I use a version arn from CDK (based on CloudFormation), it will be a temporary value or reference value that will be solved afterward. and CDK won't acknowledge changing of lambda version due to a reference value. and when I want to delete the resource (In this case, Lambda Layer), they can't be deleted due to a reference value too.

All of the reasons above, I solve like these.

1. Run a stack that contain with a lambda layer resouce to deploy a new version.
2. Use AWS CLI to get actual arn and store in environment variables.
3. Run other stacks, retrieve the arn from environment variables and insert the arn to lambda description.
4. (Optional) Hash text to reduce length of description

I tried for the below cases and this is the result.

| Lambda Updated | Lambda Layer Updated | Lambda Version Published |
| -------------- | -------------------- | ------------------------ |
| Yes            | Yes                  | Yes                      |
| Yes            | No                   | Yes                      |
| No             | Yes                  | Yes                      |
| No             | No                   | No                       |

***

# Conclusion

Lambda Version will update when some things that relate to Lambda (except Lambda Layer Version) change. You can insert some things that are mutable to trigger new version publishing (In my case, a version arn of Lambda Layer)

Although this solution is a little bit hack, I want to share how I dealt with it. I hope this will help you. And thanks for reading. See ya! 😉
