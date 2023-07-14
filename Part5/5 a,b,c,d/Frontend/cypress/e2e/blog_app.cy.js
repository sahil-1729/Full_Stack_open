describe('Blog tests', () => {
  beforeEach(function (){
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username : 'testing',
      password : 'testing'
    }
    cy.request('POST',`${Cypress.env('BACKEND')}/users`,user)
    cy.request('POST',`${Cypress.env('BACKEND')}/users`,{
      username : '12345',
      password : '12345'
    })
    cy.visit('')

  })
  it('Login Form exist', () => {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })
  describe('Login check',function(){
    it('for unsuccessful attempt',function(){
      cy.get('.username').type('54321')
      cy.get('.password').type('54321')
      cy.get('.sub').click()
      cy.contains('Invalid username or password')
    })
    it('for successful attempt',function(){
      cy.get('.username').type('testing')
      cy.get('.password').type('testing')
      cy.get('.sub').click()
      cy.contains('testing just logged in')
    })
  })
  describe('When user logs in',function(){
    beforeEach(function(){
      cy.login( {
        username : 'testing',
        password : 'testing'
      })
      cy.get('.username').type('testing')
      cy.get('.password').type('testing')
      cy.get('.sub').click()
      cy.create({
        "title": "A Beginner's Guide to Meditation",
        "author": "Emma Wilson",
        "url": "www.exampleblog.com/beginners-guide-meditation",
        "likes": 76
      })
      cy.create( {
        "title": "The Benefits of Yoga for Mind and Body",
        "author": "Natalie Bennett",
        "url": "www.exampleblog.com/benefits-of-yoga",
        "likes": 124
      })
    }) 
   
    it('save a blog',function(){
      cy.contains('create new blog').click()
      cy.get('#title').type('Top 5 Hiking Trails in the Grand Canyon')
      cy.get('#author').type('Jason Turner')
      cy.get('#url').type('www.exampleblog.com/top-hiking-trails-grand-canyon')
      cy.get('#blogSubmit').click()
    })

     it('blog already exists',function(){
      // cy.contains('logged')
      cy.create({
        title: "Healthy Breakfast Ideas to Start Your Day Right",
        author: "Olivia Collins",
        url: "www.exampleblog.com/healthy-breakfast-ideas",
        likes: 183
      })
      cy.contains('Healthy')
    })

    it('like a blog',function(){
      // cy.create({
      //   "title": "A Beginner's Guide to Meditation",
      //   "author": "Emma Wilson",
      //   "url": "www.exampleblog.com/beginners-guide-meditation",
      //   "likes": 76
      // })
      // cy.create( {
      //   "title": "The Benefits of Yoga for Mind and Body",
      //   "author": "Natalie Bennett",
      //   "url": "www.exampleblog.com/benefits-of-yoga",
      //   "likes": 124
      // })
      cy.contains('The Benefits of Yoga for Mind and Body').parent().find('.show').click()
      cy.contains('The Benefits of Yoga for Mind and Body').parent().find('.likeButton').click()
    })
    it('delete a blog',function(){
      // cy.create({
      //   "title": "A Beginner's Guide to Meditation",
      //   "author": "Emma Wilson",
      //   "url": "www.exampleblog.com/beginners-guide-meditation",
      //   "likes": 76
      // })
      // cy.create( {
      //   "title": "The Benefits of Yoga for Mind and Body",
      //   "author": "Natalie Bennett",
      //   "url": "www.exampleblog.com/benefits-of-yoga",
      //   "likes": 124
      // })
      cy.contains('The Benefits of Yoga for Mind and Body').parent().find('.show').click()
      cy.contains('The Benefits of Yoga for Mind and Body').parent().find('.deleteButton').click()
      cy.contains('The Benefits of Yoga for Mind and Body').should('not.exist')      
    })
    it('blogs are sorted in desc order of likes',function(){
      // cy.create({
      //   "title": "A Beginner's Guide to Meditation",
      //   "author": "Emma Wilson",
      //   "url": "www.exampleblog.com/beginners-guide-meditation",
      //   "likes": 76
      // })
      // cy.create( {
      //   "title": "The Benefits of Yoga for Mind and Body",
      //   "author": "Natalie Bennett",
      //   "url": "www.exampleblog.com/benefits-of-yoga",
      //   "likes": 124
      // })
      cy.get('.blog').eq(0).should('contain','The Benefits of Yoga for Mind and Body')
    })
  })
  it('only creator can see the blog not anyone else',function(){
    cy.login( {
      username : 'testing',
      password : 'testing'
    })
    cy.get('.username').type('testing')
    cy.get('.password').type('testing')
    cy.get('.sub').click()
    cy.create({
      "title": "A Beginner's Guide to Meditation",
      "author": "Emma Wilson",
      "url": "www.exampleblog.com/beginners-guide-meditation",
      "likes": 76
    })
    cy.create( {
      "title": "The Benefits of Yoga for Mind and Body",
      "author": "Natalie Bennett",
      "url": "www.exampleblog.com/benefits-of-yoga",
      "likes": 124
    })
    cy.contains('logout').click()

    cy.login( {
      username : '12345',
      password : '12345'
    })
    cy.get('.username').type('12345')
    cy.get('.password').type('12345')
    cy.get('.sub').click()

    cy.contains('The Benefits of Yoga for Mind and Body').parent().find('.show').click()
    // cy.contains('The Benefits of Yoga for Mind and Body').parent().find('.deleteButton').click()
    // cy.get('.deleteButton').should('have.css','display:none') 
    cy.contains('delete').should('have.css','display','none') 
  })
})