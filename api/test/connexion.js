let test = require('unit.js')
let rug = require('random-username-generator')
let jwt_decode = require('jwt-decode')

let apiUrl = 'http://0.0.0.0:3000'
let token
let user 

//Generate random email
rug.setSeperator('_')
let test_name = rug.generate()
let test_email = test_name+ '@gmail.com'

/**
 * Test create user
 */
describe('POST /users', function(){

    it(`Should create a User ${test_name}`, async function(){

        const res = await test
        .httpAgent(apiUrl)
        .post('/users')
        .send({nom: `${test_name}`, prenom: 'Joel', email: `${test_email}`, mdp: 'Motdepasse', mdp1: 'Motdepasse'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        
    })
    
    it('Should not recreate same user as email already used', async function(){

        const res = await test
        .httpAgent(apiUrl)
        .post('/users')
        .send({nom: `${test_name}`, prenom: 'Joel', email: `${test_email}`, mdp: 'Motdepasse', mdp1: 'Motdepasse'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        
    })



})

/**
 * Test user authentification
 */
describe('POST /auth', function(){
    
    it('Answer should be a JSON', async function(){

        const res = await test
        .httpAgent(apiUrl)
        .post('/auth')
        .send({email: `${test_email}`, mdp: 'Motdepasse'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        
        token = res.body
        token.should.be.an.Object()
    })

    it('Object should have an access_token property', function(){

        token.access_token.should.be.ok
        token.access_token.should.be.String()
        token.access_token.length.should.be.above(1)

        const expireAt =  Number(String(jwt_decode(token.access_token).exp) + '000') 
        expireAt.should.be.above(Date.now())

    })

})


/**
* Test GET user informations
*/
describe('GET /users/id', function(){

    it('Should answer user informations', async function(){

        const res = await test
        .httpAgent(apiUrl)
        .get(`/users/${jwt_decode(token.access_token).id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token.access_token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        
        user = res.body
        user.should.be.an.Object()
        
    })

    it('Verify properties of user object', function(){

        /*Verif sur ID*/
        user.Users_Id.should.be.ok
        user.Users_Id.should.be.Number()
        user.Users_Id.should.equals(jwt_decode(token.access_token).id)

        /*Verif sur nom prenom email*/
        user.Users_Nom.should.be.ok
        user.Users_Nom.should.be.String()
        user.Users_Nom.should.equals(test_name)

        user.Users_Prenom.should.be.ok
        user.Users_Prenom.should.be.String()
        user.Users_Prenom.should.equals('Joel')

        user.Users_Email.should.be.ok
        user.Users_Email.should.be.String()
        user.Users_Email.should.equals(test_email)
       
        /*Verif sur la date de création*/
        const currentDate = new Date()
        
        let dateString = currentDate.getFullYear() 
            + "-" + ((String(currentDate.getMonth() + 1).length < 2) ? ('0' + String(currentDate.getMonth() + 1)) : String(currentDate.getMonth() + 1))
            + "-" + ((String(currentDate.getDate()).length < 2) ? ('0' + currentDate.getDate()) : (currentDate.getDate()))
       
        user.Users_Create_Date.should.be.ok
        user.Users_Create_Date.should.be.String()
        user.Users_Create_Date.substring(0,10).should.equals(dateString)

    })

})

