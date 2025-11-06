---
title: "Terraform Best Practices for Multi-Cloud Deployments"
date: "2024-12-20"
category: "Infrastructure"
tags: ["Terraform", "IaC", "Multi-Cloud"]
excerpt: "Master Terraform configurations for managing infrastructure across AWS, GCP, and Azure with reusable modules and state management."
author: "Roshan Nagekar"
---

# Terraform Best Practices for Multi-Cloud Deployments

As organizations adopt multi-cloud strategies, managing infrastructure across AWS, GCP, and Azure becomes complex. Terraform, with its cloud-agnostic approach, is the perfect tool for the job. In this comprehensive guide, I'll share battle-tested practices for multi-cloud Terraform deployments.

## Why Multi-Cloud?

Before diving into Terraform, understand why organizations go multi-cloud:

- **Avoid Vendor Lock-in**: Flexibility to switch or combine providers
- **Best-of-Breed Services**: Use the best services from each cloud
- **Geographic Distribution**: Different clouds have different regional presence
- **Disaster Recovery**: True high availability across cloud providers
- **Cost Optimization**: Leverage pricing differences and committed use discounts

## Project Structure

A well-organized Terraform project is crucial for multi-cloud deployments:

```
terraform/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── staging/
│   └── production/
├── modules/
│   ├── aws/
│   │   ├── vpc/
│   │   ├── eks/
│   │   └── rds/
│   ├── gcp/
│   │   ├── vpc/
│   │   ├── gke/
│   │   └── cloudsql/
│   ├── azure/
│   │   ├── vnet/
│   │   ├── aks/
│   │   └── sql/
│   └── common/
│       ├── monitoring/
│       └── security/
├── policies/
│   └── sentinel/
└── README.md
```

## Provider Configuration

### Multi-Provider Setup

```hcl
# providers.tf
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

# AWS Provider
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
      Project     = var.project_name
    }
  }
}

# GCP Provider
provider "google" {
  project = var.gcp_project
  region  = var.gcp_region

  labels = {
    environment = var.environment
    managed_by  = "terraform"
    project     = var.project_name
  }
}

# Azure Provider
provider "azurerm" {
  features {}

  subscription_id = var.azure_subscription_id
}
```

### Backend Configuration

Use separate backends for each environment:

```hcl
# environments/production/backend.tf
terraform {
  backend "s3" {
    bucket         = "mycompany-terraform-state-prod"
    key            = "multicloud/production/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
```

For GCP:

```hcl
terraform {
  backend "gcs" {
    bucket = "mycompany-terraform-state-prod"
    prefix = "multicloud/production"
  }
}
```

## Creating Reusable Modules

### AWS VPC Module

```hcl
# modules/aws/vpc/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-vpc"
    }
  )
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-private-subnet-${count.index + 1}"
      Type = "Private"
    }
  )
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-public-subnet-${count.index + 1}"
      Type = "Public"
    }
  )
}

# modules/aws/vpc/variables.tf
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "tags" {
  description = "Additional tags"
  type        = map(string)
  default     = {}
}

# modules/aws/vpc/outputs.tf
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}
```

### GCP VPC Module

```hcl
# modules/gcp/vpc/main.tf
resource "google_compute_network" "main" {
  name                    = "${var.environment}-network"
  auto_create_subnetworks = false
  project                 = var.project_id
}

resource "google_compute_subnetwork" "private" {
  count         = length(var.private_subnets)
  name          = "${var.environment}-private-subnet-${count.index + 1}"
  ip_cidr_range = var.private_subnets[count.index]
  region        = var.region
  network       = google_compute_network.main.id

  private_ip_google_access = true

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = var.pod_ip_ranges[count.index]
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = var.service_ip_ranges[count.index]
  }
}

# modules/gcp/vpc/outputs.tf
output "network_id" {
  description = "Network ID"
  value       = google_compute_network.main.id
}

output "network_name" {
  description = "Network name"
  value       = google_compute_network.main.name
}

output "subnet_ids" {
  description = "Subnet IDs"
  value       = google_compute_subnetwork.private[*].id
}
```

## Using Modules

```hcl
# environments/production/main.tf

# AWS Infrastructure
module "aws_vpc" {
  source = "../../modules/aws/vpc"

  vpc_cidr             = "10.0.0.0/16"
  private_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnet_cidrs  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  availability_zones   = ["us-east-1a", "us-east-1b", "us-east-1c"]
  environment          = "production"

  tags = {
    Team        = "Platform"
    CostCenter  = "Engineering"
  }
}

module "aws_eks" {
  source = "../../modules/aws/eks"

  cluster_name    = "production-eks"
  cluster_version = "1.28"
  vpc_id          = module.aws_vpc.vpc_id
  subnet_ids      = module.aws_vpc.private_subnet_ids

  node_groups = {
    general = {
      desired_size = 3
      min_size     = 2
      max_size     = 10
      instance_types = ["t3.large"]
    }
    spot = {
      desired_size = 5
      min_size     = 2
      max_size     = 20
      instance_types = ["t3.large", "t3a.large"]
      capacity_type = "SPOT"
    }
  }
}

# GCP Infrastructure
module "gcp_vpc" {
  source = "../../modules/gcp/vpc"

  project_id       = var.gcp_project
  environment      = "production"
  region           = "us-central1"
  private_subnets  = ["10.1.0.0/24", "10.1.1.0/24"]
  pod_ip_ranges    = ["10.1.128.0/17", "10.1.160.0/17"]
  service_ip_ranges = ["10.1.192.0/20", "10.1.208.0/20"]
}

module "gcp_gke" {
  source = "../../modules/gcp/gke"

  project_id   = var.gcp_project
  cluster_name = "production-gke"
  region       = "us-central1"
  network      = module.gcp_vpc.network_name
  subnetwork   = module.gcp_vpc.subnet_ids[0]

  node_pools = {
    general = {
      machine_type = "e2-standard-4"
      min_count    = 2
      max_count    = 10
    }
    preemptible = {
      machine_type = "e2-standard-4"
      min_count    = 2
      max_count    = 20
      preemptible  = true
    }
  }
}

# Azure Infrastructure
module "azure_vnet" {
  source = "../../modules/azure/vnet"

  resource_group_name = "production-rg"
  location            = "eastus"
  vnet_cidr           = "10.2.0.0/16"
  subnet_cidrs = {
    aks     = "10.2.1.0/24"
    data    = "10.2.2.0/24"
    gateway = "10.2.3.0/24"
  }
}

module "azure_aks" {
  source = "../../modules/azure/aks"

  cluster_name        = "production-aks"
  resource_group_name = module.azure_vnet.resource_group_name
  location            = "eastus"
  vnet_subnet_id      = module.azure_vnet.subnet_ids["aks"]

  default_node_pool = {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D4s_v3"
  }
}
```

## State Management Best Practices

### Remote State with Locking

```hcl
# Create state bucket (one-time setup)
resource "aws_s3_bucket" "terraform_state" {
  bucket = "mycompany-terraform-state-${var.environment}"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-state-lock-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
```

### State Import for Existing Resources

```bash
# Import existing AWS VPC
terraform import module.aws_vpc.aws_vpc.main vpc-abc123

# Import existing GCP network
terraform import module.gcp_vpc.google_compute_network.main projects/my-project/global/networks/my-network

# Import existing Azure resource group
terraform import module.azure_vnet.azurerm_resource_group.main /subscriptions/abc-123/resourceGroups/my-rg
```

## Workspace Management

Use workspaces for environment separation:

```bash
# Create workspaces
terraform workspace new dev
terraform workspace new staging
terraform workspace new production

# List workspaces
terraform workspace list

# Switch workspace
terraform workspace select production

# Use workspace in configuration
locals {
  environment = terraform.workspace

  instance_count = {
    dev        = 1
    staging    = 2
    production = 5
  }

  nodes = local.instance_count[local.environment]
}
```

## Variables and Secrets Management

### Variable Hierarchy

```hcl
# variables.tf - Define variables
variable "environment" {
  description = "Environment name"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

# terraform.tfvars - Set values (not committed)
environment = "production"
aws_region  = "us-east-1"
gcp_region  = "us-central1"
azure_location = "eastus"

# production.tfvars - Environment-specific values
db_instance_class = "db.r5.2xlarge"
node_count        = 10
```

### Secrets Management

Never commit secrets! Use one of these approaches:

**Environment Variables**:

```bash
export TF_VAR_db_password="secret123"
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
```

**AWS Secrets Manager**:

```hcl
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = "production/db/password"
}

resource "aws_db_instance" "main" {
  password = data.aws_secretsmanager_secret_version.db_password.secret_string
  # ... other config
}
```

**HashiCorp Vault**:

```hcl
data "vault_generic_secret" "db_creds" {
  path = "secret/production/database"
}

resource "aws_db_instance" "main" {
  username = data.vault_generic_secret.db_creds.data["username"]
  password = data.vault_generic_secret.db_creds.data["password"]
}
```

## Testing Terraform Code

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.83.0
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_docs
      - id: terraform_tflint
      - id: terraform_tfsec
```

### Automated Testing with Terratest

```go
// test/terraform_test.go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestTerraformAwsVpc(t *testing.T) {
    terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
        TerraformDir: "../modules/aws/vpc",

        Vars: map[string]interface{}{
            "vpc_cidr":             "10.0.0.0/16",
            "private_subnet_cidrs": []string{"10.0.1.0/24", "10.0.2.0/24"},
            "public_subnet_cidrs":  []string{"10.0.101.0/24", "10.0.102.0/24"},
            "availability_zones":   []string{"us-east-1a", "us-east-1b"},
            "environment":          "test",
        },
    })

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    vpcId := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcId)
}
```

## CI/CD Pipeline

```yaml
# .github/workflows/terraform.yml
name: Terraform Multi-Cloud

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [dev, staging, production]

    steps:
    - uses: actions/checkout@v3

    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: 1.5.0

    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: Terraform Format
      run: terraform fmt -check -recursive

    - name: Terraform Init
      run: |
        cd environments/${{ matrix.environment }}
        terraform init

    - name: Terraform Validate
      run: |
        cd environments/${{ matrix.environment }}
        terraform validate

    - name: Terraform Plan
      run: |
        cd environments/${{ matrix.environment }}
        terraform plan -out=tfplan

    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && matrix.environment == 'production'
      run: |
        cd environments/${{ matrix.environment }}
        terraform apply -auto-approve tfplan
```

## Cost Management

### Cost Estimation with Infracost

```yaml
# .github/workflows/infracost.yml
- name: Setup Infracost
  uses: infracost/actions/setup@v2
  with:
    api-key: ${{ secrets.INFRACOST_API_KEY }}

- name: Generate Infracost diff
  run: |
    infracost breakdown --path=environments/production \
                        --format=json \
                        --out-file=/tmp/infracost.json

    infracost comment github --path=/tmp/infracost.json \
                              --repo=$GITHUB_REPOSITORY \
                              --github-token=${{ github.token }} \
                              --pull-request=${{ github.event.pull_request.number }}
```

## Monitoring and Observability

```hcl
# modules/common/monitoring/main.tf
resource "datadog_monitor" "terraform_state" {
  name    = "Terraform State File Modified"
  type    = "metric alert"
  message = "Terraform state file was modified outside of CI/CD pipeline @ops-team"

  query = "avg(last_5m):avg:aws.s3.object.last_modified{bucket:terraform-state} > 300"

  thresholds = {
    critical = 300
  }
}
```

## Conclusion

Multi-cloud Terraform deployments require careful planning and disciplined practices. Key takeaways:

1. **Modularize**: Create reusable, cloud-specific modules
2. **Standardize**: Use consistent naming and tagging
3. **Automate**: Implement CI/CD for all changes
4. **Secure**: Never commit secrets, use remote state
5. **Test**: Validate changes before applying
6. **Monitor**: Track costs and state changes

Start small with one cloud provider, establish patterns, then expand to multi-cloud. The investment in proper Terraform architecture pays dividends in maintainability and reliability.

---

**Questions about Terraform or multi-cloud strategies? Let's connect on [LinkedIn](https://linkedin.com/in/roshannagekar).**
