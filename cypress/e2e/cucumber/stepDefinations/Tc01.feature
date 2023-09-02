Feature: Login Functionlaity

This is the feature to test the Site login 

Scenario: Login using Valide Credientials
  Given I am on the Login Page
  When I login with Valid Credientials
    And Enter Email
    And Enter Password
    And Click on Login button
  Then Validate url and page after login

 Scenario: Login using InValid Credientials
    Given I am on the Login Page
    When I login with InValid Credientials
    Then There should be an alert wrong credientials

 Scenario: Validate user is able to Filter Product and Add into Cart
    Given User will login with valid Account
    When User will apply filter and validate
    Then Now user will try to add product into cart

 Scenario: Validate user is able to Add and Delete Product to Cart
    Given User will login with valid Account
    When User will add product to cart
    Then User will delete product from cart

 Scenario: Validate user is able to Checkout and Logout
    Given User will login with valid Account
    When User will add product and checkout
    Then User will logout from the portal
    



