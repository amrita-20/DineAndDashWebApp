# Dine And Dash Web Application

A web application for clients to order food online or in-store and managers to manage orders.

https://dine-dash.up.railway.app/

## Table of Contents
- [Dine And Dash Web Application](#dine-and-dash-web-application)
  - [Table of Contents](#table-of-contents)
- [About the App](#about-the-app)
  - [Features](#features)
    - [Client-side](#client-side)
    - [Manager-side](#manager-side)
- [Architecture](#architecture)
  - [Services](#services)
- [Technical Stacks](#technical-stacks)
  - [Backend - Services](#backend---services)
  - [Database](#database)
  - [Frontend](#frontend)
  - [Build and Deployment Process](#build-and-deployment-process)
    - [First Phase: Deployment on Render](#first-phase-deployment-on-render)
    - [Second Phase: Deployment on AWS](#second-phase-deployment-on-aws)

# About the App
## Features
### Client-side
    - log in/out 
    - view menu
    - filter menu by types of dish
    - search dish in a search bar
    - add dishes to cart
    - remove dishes from cart
    - pay the bill
    - review order history
    - edit profile

### Manager-side
    - get notification of incoming orders
    - view orders
    - handle orders

# Architecture
![diagram drawio](https://github.com/amrita-20/DineAndDashWebApp/assets/116283847/6cbd5b18-c275-4c5e-8e15-78354f3b0ccc)

## Services
    - Auth0: sign up/log in/log out generate JWT for follow-up requests
    - Menu: view/filter/search dishes
    - Cart: add/remove dishes
    - Orders: view/handle orders
    - Payment Gateway - Stripe: Handles debit/credit card payments. Cancel orders if payment fails,
    complete if payment succeeds

# Technical Stacks
## Backend - Services
- Node.js
- TypeScript
- Express

## Database
- MongoDB

## Frontend
- React.js
- JavaScript
- HTML
- CSS
- MUI
- ReactQuery

## Build and Deployment Process
### First Phase: Deployment on Render
In the initial phase, the application was deployed using Render, a cloud platform that simplifies hosting and scaling web applications. This enabled rapid development and initial testing with minimal configuration overhead.

### Second Phase: Deployment on AWS
For the production-ready deployment, the application was deployed on AWS to leverage its robust infrastructure and scalability. This phase included the following steps and technologies:

1. Infrastructure as Code with Terraform
Used Terraform to define and provision the infrastructure.
Modularized the configuration for better reusability and maintainability.

1. Containerization with Docker
Packaged the application into a Docker container for portability and ease of deployment.
Ensured consistent runtime environments across development and production.

1. AWS Services Utilized
   
EC2 Instances with AMI:
Created and utilized a custom Amazon Machine Image (AMI) to quickly provision EC2 instances with the necessary software stack pre-configured.
Automated instance setup using Terraform for scaling up the application as needed.

Auto Scaling and Load Balancing:
Configured an Auto Scaling Group (ASG) to maintain application availability and handle fluctuating traffic demands dynamically.
Deployed an Application Load Balancer (ALB) to distribute incoming traffic evenly across instances and ensure fault tolerance.

VPC and Security Groups:
Configured a Virtual Private Cloud (VPC) to logically isolate and secure the application infrastructure.
Set up security groups to control inbound and outbound traffic, ensuring adherence to the principle of least privilege.

DNS with Route 53:
Integrated AWS Route 53 for DNS management to provide a custom domain and streamline application access.
Configured health checks and routing policies to ensure high availability.
1. Key Benefits
Scalability: Enabled by auto-scaling and load balancing.
Security: Achieved through fine-grained VPC and security group configurations.
Reliability: Ensured with health checks, AMI-based instances, and distributed infrastructure.

