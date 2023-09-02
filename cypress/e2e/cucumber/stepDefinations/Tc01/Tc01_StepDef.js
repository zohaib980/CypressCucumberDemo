/// <reference types = 'cypress' />

import {Given, When, And, Then} from 'cypress-cucumber-preprocessor/steps'

Given('I am on the Login Page', () => {
    cy.visit('https://www.saucedemo.com', { timeout: 1000000 }, {failOnStatusCode: false})
})

When('I login with Valid Credientials', () => {
    cy.get('.login_logo').should('have.text', 'Swag Labs')
})

And('Enter Email', () => {
    cy.get('#user-name')
        .should('have.attr', 'placeholder', 'Username')
    cy.get('#user-name').type('standard_user')
})

And('Enter Password', () => {
    cy.get('#password')
        .should('have.attr', 'placeholder', 'Password')
        .type('secret_sauce')
   
})

And('Click on Login button', () => {
    cy.get('#login-button')
        .contains('Login')
        .click()
})

Then('Validate url and page after login', () => {
    cy.url().should('include', 'inventory.html')
    cy.get('.title').should('have.text', 'Products')
})

// User will try to Login using Invalid Credientials
Given('I am on the Login Page', () => {
    cy.visit('https://www.saucedemo.com', { timeout: 1000000 }, {failOnStatusCode: false})
})
When('I login with InValid Credientials', () => {
    cy.get('.login_logo').should('have.text', 'Swag Labs')
    cy.get('#user-name')
        .should('have.attr', 'placeholder', 'Username')
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password')
        .should('have.attr', 'placeholder', 'Password')
        .type('secret_sauce')
    cy.get('#login-button')
        .contains('Login')
        .click()
})
Then('There should be an alert wrong credientials', () => {
    cy.get("h3[data-test='error']")
        .should('have.text', "Epic sadface: Sorry, this user has been locked out.")
})

// Validate user is able to Filter Product and Add into Cart
Given('User will login with valid Account', () => {
    cy.visit('https://www.saucedemo.com', { timeout: 1000000 }, {failOnStatusCode: false})
    cy.get('#user-name').type('standard_user')
    cy.get('#password')
        .type('secret_sauce')
    cy.get('#login-button')
        .click()
})
When('User will apply filter and validate', () => {
    cy.get('.product_sort_container')
      .select('Name (Z to A)')
    cy.get('#item_3_title_link').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
})
Then('Now user will try to add product into cart', () => {
    cy.get('#add-to-cart-sauce-labs-onesie').click()
    cy.get('.shopping_cart_badge').click()
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Onesie')
})

//Validate user is able to Add and Delete Product to Cart
Given('User will login with valid Account', () => {
    cy.visit('https://www.saucedemo.com', { timeout: 1000000 }, {failOnStatusCode: false})
    cy.get('#user-name').type('standard_user')
    cy.get('#password')
        .type('secret_sauce')
    cy.get('#login-button')
        .click()
})
When('User will add product to cart', () => {
    cy.get('.product_sort_container')
    .select('Name (Z to A)')
  cy.get('#item_3_title_link').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
  cy.get('#add-to-cart-sauce-labs-onesie').click()
  cy.get('.shopping_cart_badge').click()
  cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Onesie') 
})  
Then('User will delete product from cart', () => {
    cy.get('#remove-sauce-labs-onesie')
    .contains('Remove')
    .click()
  // There is no toast message like Product removed to Cart or Text => There is no product into Cart  so, I can't able to add Assertion here.
})  

//Validate user is able to Checkout and Logout
Given('User will login with valid Account', () => {
    cy.visit('https://www.saucedemo.com', { timeout: 1000000 }, {failOnStatusCode: false})
    cy.get('#user-name').type('standard_user')
    cy.get('#password')
        .type('secret_sauce')
    cy.get('#login-button')
        .click()
})
When('User will add product and checkout', () => {
    cy.get('.product_sort_container')
      .select('Name (Z to A)')
    cy.get('#item_3_title_link').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
    cy.get('#add-to-cart-sauce-labs-onesie').click()
    cy.get('.shopping_cart_badge').click()
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Onesie')
    cy.get('#checkout')
      .contains('Checkout')
      .click()
    cy.get('#first-name')
      .should('have.attr', 'placeholder', 'First Name')
      .type('Zohaib')
    cy.get('#last-name')
      .should('have.attr', 'placeholder', 'Last Name')
      .type('Hassan')
    cy.get('#postal-code')
      .should('have.attr', 'placeholder', 'Zip/Postal Code')
      .type('54000')
    cy.get('#continue')
      .contains('Continue')
      .click()
    cy.get('.summary_total_label')
      .should('have.text', 'Total: $8.63')
    cy.get('#finish')
      .contains('Finish')
      .click()
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
})
When('User will logout from the portal', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link')
      .should('have.text', 'Logout')
      .click()
    cy.url().should('include', 'https://www.saucedemo.com/')
})