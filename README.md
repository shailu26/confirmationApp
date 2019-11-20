# LogikApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.2.
This is a simple project where all the existing users do get email every half an hour till user confirm their information to the website

## Dependencies

create mysql configuration and add it to .env file in the folder and also gmail email and password to send confirmation email link

## Test server

Use these commands -

1. npm install
2. ng build --prod

then You need to create a table name called user and create 6 fields
1. user_id(int) primary key AI
2. first_name(string)
3. last_name(string)
4. email(string)
5. address(string)
6. confirmed_email(tinyint(1)) default 0

After that create 5 random users using sql insert query so when you run node server.js it will send email link to existing user

Run `node server.js` for a running server. Navigate to `http://localhost:8001/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
