---
title: "Kubernetes Cost Optimization Strategies"
date: "2025-01-10"
category: "Cloud"
tags: ["Kubernetes", "Cloud", "Cost Optimization"]
excerpt: "Discover practical techniques to reduce your Kubernetes infrastructure costs without compromising performance or reliability."
author: "Roshan Nagekar"
---

# Kubernetes Cost Optimization Strategies

Running Kubernetes in production can become expensive quickly. In this comprehensive guide, I'll share battle-tested strategies to optimize your Kubernetes costs based on years of managing large-scale clusters across AWS, GCP, and Azure.

## Understanding Kubernetes Costs

Before optimizing, understand where your money goes:

1. **Compute Resources**: Nodes (EC2/GCE/AKS instances)
2. **Storage**: Persistent volumes and snapshots
3. **Network**: Data transfer and load balancers
4. **Control Plane**: Managed Kubernetes service fees (EKS/GKE/AKS)

## Right-Sizing Resources

### 1. Set Proper Resource Requests and Limits

One of the biggest cost drivers is over-provisioning. Every pod should have appropriate requests and limits:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"
```

**Pro Tips**:
- Start with conservative limits based on actual usage
- Use Vertical Pod Autoscaler (VPA) for recommendations
- Monitor resource utilization with Prometheus/Grafana

### 2. Use Vertical Pod Autoscaler (VPA)

VPA automatically adjusts CPU and memory requests:

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: myapp-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: myapp
  updatePolicy:
    updateMode: "Auto"
```

### 3. Implement Horizontal Pod Autoscaler (HPA)

Scale pods based on metrics:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Node Optimization

### 1. Use Spot/Preemptible Instances

Save 60-90% on compute costs:

**AWS EKS with Spot Instances**:
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: my-cluster
nodeGroups:
  - name: spot-workers
    instancesDistribution:
      instanceTypes: ["t3.medium", "t3a.medium", "t2.medium"]
      onDemandBaseCapacity: 0
      onDemandPercentageAboveBaseCapacity: 0
      spotAllocationStrategy: "capacity-optimized"
    minSize: 2
    maxSize: 10
```

**Best Practices**:
- Mix spot and on-demand for critical workloads
- Use multiple instance types for better spot availability
- Implement graceful shutdown handlers

### 2. Cluster Autoscaler

Automatically adjust cluster size:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - name: cluster-autoscaler
        image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.27.0
        command:
          - ./cluster-autoscaler
          - --v=4
          - --cloud-provider=aws
          - --skip-nodes-with-local-storage=false
          - --expander=least-waste
          - --balance-similar-node-groups
          - --skip-nodes-with-system-pods=false
```

### 3. Node Affinity and Taints/Tolerations

Place workloads strategically:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cost-optimized-pod
spec:
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        preference:
          matchExpressions:
          - key: node.kubernetes.io/instance-type
            operator: In
            values:
            - t3.medium
            - t3a.medium
  tolerations:
  - key: "spot"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
```

## Storage Optimization

### 1. Use Appropriate Storage Classes

Different workloads need different storage:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: slow-storage
provisioner: kubernetes.io/aws-ebs
parameters:
  type: sc1  # Cold HDD - much cheaper
```

### 2. Implement PVC Cleanup

Automate deletion of unused persistent volume claims to avoid abandoned storage costs.

### 3. Use Dynamic Provisioning

Avoid pre-provisioned volumes sitting idle:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-data
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 10Gi
```

## Network Cost Reduction

### 1. Use ClusterIP Instead of LoadBalancer

For internal services, use ClusterIP:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: internal-service
spec:
  type: ClusterIP  # Instead of LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: myapp
```

### 2. Implement Ingress Controller

Use a single LoadBalancer with Ingress:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: consolidated-ingress
spec:
  ingressClassName: nginx
  rules:
  - host: app1.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app1
            port:
              number: 80
  - host: app2.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app2
            port:
              number: 80
```

### 3. Minimize Cross-AZ Traffic

Place related pods in the same availability zone using topology spread constraints.

## Monitoring and Governance

### 1. Use Cost Monitoring Tools

- **Kubecost**: Real-time cost allocation and optimization
- **OpenCost**: Open-source cost monitoring
- **Cloud Provider Tools**: AWS Cost Explorer, GCP Cost Management

### 2. Implement Resource Quotas

Prevent cost overruns:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: team-namespace
spec:
  hard:
    requests.cpu: "100"
    requests.memory: 200Gi
    persistentvolumeclaims: "10"
    services.loadbalancers: "2"
```

### 3. Set Up Budget Alerts

Configure alerts before costs spiral:

```yaml
# Example using AWS Budget
aws budgets create-budget \
  --account-id 123456789012 \
  --budget file://budget.json \
  --notifications-with-subscribers file://notifications.json
```

## Namespace and Workload Optimization

### 1. Use Pod Disruption Budgets

Prevent over-provisioning for availability:

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: myapp
```

### 2. Implement Sleep Schedules

For non-production environments:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: scale-down-dev
spec:
  schedule: "0 18 * * 1-5"  # 6 PM weekdays
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: kubectl
            image: bitnami/kubectl:latest
            command:
            - kubectl
            - scale
            - deployment/myapp
            - --replicas=0
            - -n
            - dev
```

### 3. Optimize Container Images

Smaller images = faster pulls = lower costs:

```dockerfile
# Before: 1.2GB
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3

# After: 50MB
FROM python:3.11-alpine
```

## Advanced Strategies

### 1. Multi-Tenancy with Namespace Isolation

Share clusters across teams:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: team-a
  labels:
    team: team-a
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-from-other-namespaces
  namespace: team-a
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector: {}
```

### 2. Use Kubernetes Federation

Distribute workloads across cheaper regions.

### 3. Implement GitOps

Infrastructure as code prevents configuration drift and waste:

```yaml
# ArgoCD Application
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
spec:
  source:
    repoURL: https://github.com/myorg/myapp
    path: kubernetes
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## Real-World Results

From my experience implementing these strategies:

- **60% cost reduction** by switching to spot instances with proper fallback
- **40% savings** through right-sizing and HPA implementation
- **30% network cost reduction** by consolidating LoadBalancers
- **25% storage savings** by cleaning up unused PVCs

## Cost Optimization Checklist

- [ ] Resource requests and limits defined for all pods
- [ ] HPA configured for scalable workloads
- [ ] Cluster Autoscaler enabled
- [ ] Using spot/preemptible instances where appropriate
- [ ] Single Ingress Controller instead of multiple LoadBalancers
- [ ] Storage class optimization implemented
- [ ] Resource quotas and limit ranges in place
- [ ] Cost monitoring dashboard set up
- [ ] Budget alerts configured
- [ ] Development environment sleep schedules
- [ ] Container images optimized for size
- [ ] Unused resources cleanup automation

## Conclusion

Kubernetes cost optimization is an ongoing process. Start with the quick wins (spot instances, right-sizing), then gradually implement advanced strategies. Monitor continuously and adjust based on your specific workload patterns.

Remember: The goal isn't just to reduce costs, but to optimize the cost-to-value ratio of your infrastructure.

---

**Want to discuss Kubernetes cost optimization for your organization? Connect with me on [LinkedIn](https://linkedin.com/in/roshannagekar).**
