describe("user registration", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Register's users", () => {
    cy.get('[href="/register"] > .menuItem').click();
    cy.get(":nth-child(1) > input").type("Anderson");
    cy.get(":nth-child(2) > input").type("anderson@gmail.com");
    cy.get(":nth-child(3) > input").type("43421");
    cy.get(".registerButton").click();
  });
});

describe("user login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Log's in user", () => {
    cy.get(":nth-child(1) > input").type("anderson@gmail.com");
    cy.get(":nth-child(2) > input").type("43421");
    cy.get(".loginButton").click();
  });
});

describe("Day-to-day-user-Interaction", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("login and interacts with the application", () => {
    cy.get(":nth-child(1) > input").type("anderson@gmail.com");
    cy.get(":nth-child(2) > input").type("43421");
    cy.get(".loginButton").click();
    //Read a post
    cy.wait(15000);
    cy.get(
      '[href="/post/61be1cf630f7c5c9af124ead"] > .post > .postImage'
    ).click();
    //click and display post by categories
    cy.wait(10000);
    cy.get('[href="/?cat=Tech"] > .listItem').click();
    //click and display a post
    cy.wait(10000);
    cy.get(
      '[href="/post/61bd489defbd63f908c8cf79"] > .post > .postImage'
    ).click();
    //Comment on a post
    cy.wait(10000);
    cy.get(".mainCommentTextArea").type("thanks for this tutorial");
    cy.get(".submitComment").click();
  });

  it("Updates a users profilePicture", () => {
    //login
    cy.get(":nth-child(1) > input").type("anderson@gmail.com");
    cy.get(":nth-child(2) > input").type("43421");
    cy.get(".loginButton").click();
    cy.wait(2000);
    //Visit settings page
    cy.findByTestId("SettingsIcon").click();
    //Update Users Info
    //Basic Details
    cy.get(":nth-child(2) > .profileListItems").click();
    cy.get(":nth-child(1) > .inputItem").type("Joseph");
    cy.get(":nth-child(2) > .inputItem").type("joseph@gmail.com");
    cy.get(":nth-child(3) > .inputItem").type("43421");
    cy.get(".update").click();
    //Social Profiles
    cy.wait(5000);
    cy.get(":nth-child(3) > .profileListItems > .ListTitles").click();
    cy.get(":nth-child(1) > .inputItem").type("test");
    cy.get(":nth-child(2) > .inputItem").type("test");
    cy.get(":nth-child(3) > .inputItem").type("test");
    cy.get(":nth-child(4) > .inputItem").type("test");
    cy.get(".update").click();
    //About me
    cy.wait(5000);
    cy.get(":nth-child(4) > .profileListItems").click();
    cy.get(".about").type("I love writing");
    cy.get(".update").click();
  });

  it("Writes a blog post and publish it", () => {
    //login with updated Info
    cy.get(":nth-child(1) > input").type("joseph@gmail.com");
    cy.get(":nth-child(2) > input").type("43421");
    cy.get(".loginButton").click();
    //visit write page
    cy.get('[href="/write"] > .menuItem').click();
    cy.wait(5000);
    //input category
    cy.get(".cat").type("TestCat");
    //input title
    cy.get("#title").type("testing ttle");
    //type description
    cy.get(".publish").click();
  });

  //Updating and deleting test post
  it("deletes test post", () => {
    //login with updated Info
    cy.get(":nth-child(1) > input").type("joseph@gmail.com");
    cy.get(":nth-child(2) > input").type("43421");
    cy.get(".loginButton").click();
    cy.wait(10000);
    //visit test post
    cy.get('[href="/post/61c1db930876f86afea10a50"]').click();
    //I should see an update and delete Icons if I was the writer of that post
    //Update post
    cy.wait(5000);
    cy.get('[data-testid="EditIcon"] > path').click();
    cy.wait(5000);
    //update Title
    cy.get(".updateTitlee").type("Updated test title");
    //publish update
    cy.get(".publishUpdate").click();
    //deleting post
    cy.wait(5000);
    cy.findByTestId("DeleteForeverOutlinedIcon").click();
  });

  //Testing Logout functionality
  it("Logout", () => {
    //login with updated Info
    cy.get(":nth-child(1) > input").type("joseph@gmail.com");
    cy.get(":nth-child(2) > input").type("43421");
    cy.get(".loginButton").click();
    cy.wait(3000);
    //logout
    cy.get(".logoutButton").click();
  });

  //Delete User
  it("Deletes a user", () => {
    //login with updated Info
    cy.get(":nth-child(1) > input").type("joseph@gmail.com");
    cy.get(":nth-child(2) > input").type("43421");
    cy.get(".loginButton").click();
    cy.wait(2000);
    //Visit settings page
    cy.findByTestId("SettingsIcon").click();
    cy.get(".DeletUser").click();
  });
});
