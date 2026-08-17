---
title: "AWS Tagger"
date: "2019-01-20"
category: "Cloud Computing"
tags: ["AWS", "Bulk tagging", "Cloud Computing", "Standard", "Tags"]
excerpt: "Image credits : jdhancock Tagging in AWS is often not considered useful by many users. Tagging of resources in cloud and DC not only helps us..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSkdewqis72w1XkzPA-m8lxPsaI_kyWYWLc4OJOuWbxorWek9ji6RIGq4lsjRQ0S1fvr2YcJg5EgHuXgK0sz7Wlcc9TMwmiTWpcTkuHsLP0vjS94X1ZE-g0u_oxJjvsq7r9-mxub2PS8Q/s1600/3814523970_56b2af4d12_z.jpg)

Image credits : [jdhancock](https://www.flickr.com/photos/jdhancock/)

Tagging in AWS is often not considered useful by many users. Tagging of resources in cloud and DC not only helps us identify resources but it can also do multiple other wonders that one might have never thought about. We don't tag resources in cloud for many reasons, laziness being the topmost reason.

Lets see why tagging is important:

1. Identification and Isolation: Tagging allows identification of resources as to what purpose a specific resource may have been created for. It also allows you to separate resources from each other. e.g. separating different environments.
2. Automation: When you tag resources with certain values you can ensure that your automation scripts only addresses certain intended resources and not all. e.g execute security patches on certain systems that need to be compliant.
3. Costing: You can identify based on tags as to which resource is costly and also make business decisions based on the results received.
4. Define ownership: You can also understand based on proper tags as to who are the stakeholders for a certain resource or group of resources.
5. Versioning: Sometimes when you need certain resources to be preserved based on its state, you may also versionize them based on tagging. Although AWS provides versioning mechanism for a few services, it may not be applicable to all of them.

In many organizations although the importance of tagging is understood a lot later.
Until then its too late to start tagging and it becomes almost always a manual process to tag all the resources.

Or you may need to write complex programs to identify systems and tag them as per your requirement.
Thankfully, [AWS Tagger](https://github.com/washingtonpost/aws-tagger) comes to rescue if you have a requirement to tag your AWS resources.

You may also bulk tag them to avoid a lot of manual work.
So how do we do this.

Its a 3 step process to Bulk tag resources:

1.

Collection : This is a simple process.
Here all you need to do is, collect all the resources in a file.
Hereafter you may process this data.

AWS Tagger heavily depends of resource ID's of all the resources you create.

Resource ID's are further used to implement all the tags.
To get the resource ID's for all the resources, simply login to your AWS account and navigate to https://resources.console.aws.amazon.com/r/tags.

On this page, you are given a field to enter the region for the resource you want to choose and all choose the types of resource.

Choose "All resource types" here and click on "Find Resources" button.
Click on the "Download" button to download the CSV data generated.

2. Identification and filtering: I recommend this step particularly to filter the data so that AWS Tagger can act on individual resources. Here you may use your excel skills to separate data based on resource types.
3. Tagging: Once the resources are separated, you may start executing **AWS Tagger scripts as per the [documentation](https://github.com/washingtonpost/aws-tagger/blob/master/README.md) provided on their **Github page.

## AWS Tagging Best Practices

Getting the tooling right is only half the problem. The other half is agreeing on a tag schema and then actually enforcing it. Without enforcement, you'll have some resources tagged correctly, some tagged inconsistently, and some not tagged at all — which defeats the entire purpose.

**Mandatory tags** — these should be required on every resource, enforced at creation time:

- `Environment`: `prod` / `staging` / `dev` / `sandbox` — the single most important tag for filtering, automation, and access control
- `Owner`: team or individual email — so you know who to call when something breaks or an unexpected bill arrives
- `CostCenter`: for billing allocation to the right business unit or project
- `Project`: the initiative or product this resource belongs to

**Optional but recommended**:

- `ManagedBy`: `terraform` / `ansible` / `cloudformation` / `manual` — invaluable when you need to know whether a resource is safe to modify through the console or must go through a pipeline
- `Version`: for resources tied to a specific deployment or release
- `ExpiresOn`: for temporary resources — especially useful in sandbox accounts where resources routinely get created for testing and then forgotten

The value of mandatory tags only materializes if they're actually enforced. A tag policy document that lives in a wiki but doesn't prevent untagged resources from being created is decoration. [AWS Config managed rules](https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html) can flag untagged or incorrectly tagged resources, and Service Control Policies (SCPs) via AWS Organizations can deny resource creation entirely if required tags are missing.

## Enforcing Tags at Creation Time

The most effective approach is to prevent untagged resources from being created in the first place, rather than trying to clean up after the fact. Here's an SCP that denies EC2 instance creation unless the `Environment` tag is present:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": ["ec2:RunInstances"],
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": {
        "Null": {
          "aws:RequestTag/Environment": "true"
        }
      }
    }
  ]
}
```

Apply this at the Organizational Unit (OU) level in AWS Organizations and it covers every account in that OU automatically. Add similar conditions for your other mandatory tags. The immediate result: engineers get a clear error when they try to launch something without the required tags, rather than a silent success that becomes a compliance problem later.

For resources that already exist without tags, AWS Config with auto-remediation can handle the cleanup — it flags non-compliant resources and can trigger a Lambda function to apply default tags based on resource metadata.

## Modern Alternatives to AWS Tagger

The Washington Post's aws-tagger is useful, especially for bulk remediation of existing untagged resources. But the ecosystem has matured and there are cleaner approaches depending on where you are:

- **AWS Tag Editor** (built into the console): the same resource search page referenced in this post, now with bulk tag editing directly in the browser — no additional tooling required for one-off cleanup tasks
- **AWS CLI**: `aws resourcegroupstaggingapi tag-resources` for scripted bulk operations, scriptable and easy to integrate into existing automation
- **Terraform with `default_tags`**: the cleanest long-term solution — define your standard tags once at the provider level and they're applied to every resource Terraform manages:

```hcl
provider "aws" {
  default_tags {
    tags = {
      Environment = var.environment
      Owner       = var.owner
      ManagedBy   = "terraform"
      Project     = var.project
    }
  }
}
```

This single configuration block applies those four tags to every resource created by the provider without any additional code. When a new engineer creates a new resource, the tags are already there. See the [AWS provider default_tags documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#default_tags) for the full reference.

The honest recommendation: if you're starting fresh or doing a significant Terraform migration, `default_tags` is the right long-term answer. If you're dealing with a legacy account full of untagged resources that predate your tag strategy, aws-tagger or the AWS CLI bulk tagging API is the right remediation tool. Use both — one for the past, one for the future.
