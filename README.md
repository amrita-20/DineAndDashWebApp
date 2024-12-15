# Dine And Dash Web Application

A web application for clients to order food online or in-store and managers to manage orders.

https://dine-dash.net/

## Table of Contents
- [About the App](#about-the-app)
    - Features
- [Architecture](#architecture)
    - Services
- [Technical Stacks](#technical-stacks)
    - Backend
    - Frontend
    - Database
    - Build And Deploy

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

## Build and Deploy
- Railway (First phase)
- AWS EC2 in auto-scaling group in a private VPC, connecting to AWS DynamoDB (Second phase)
