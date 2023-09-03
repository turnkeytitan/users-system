# User Management App README

## Introduction

The User Management App is a simple web-based application designed to manage user accounts. It allows administrators to perform basic user management tasks, including user login, viewing the list of existing users, deleting user accounts, and creating new user accounts.

## Features

### User Login

The User Management App provides a secure login system where users with administrative privileges can log in to access the app's features. The login process ensures that only authorized individuals can manage user accounts.

### User List

Upon successful login, administrators are presented with a user list page. This page displays a comprehensive list of all existing user accounts, including essential information such as usernames, email addresses, and other relevant details. Administrators can easily browse and search for specific users within this list.

### User Deletion

Administrators have the capability to delete user accounts from the system. To delete a user, an administrator can select the user from the list and initiate the deletion process. A confirmation dialog may appear to ensure that the deletion action is intentional to prevent accidental deletions.

### User Creation

Administrators can create new user accounts through a dedicated user creation form. This form allows administrators to input essential user details such as username, email address, password, and any additional information required for the application. User creation also includes validation checks to ensure data integrity and security.

## Getting Started

### Environment 
- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 12(LTS)

npm i
npm run start:dev