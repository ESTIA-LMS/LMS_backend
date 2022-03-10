let test = require('unit.js')
let rug = require('random-username-generator')

let apiUrl = 'http://0.0.0.0:3000'
let token = ''

//Generate random email
rug.setSeperator('_')
let test_name = rug.generate()
let test_email = test_name+ '@gmail.com'

/**
 * Test create user
 */
describe('POST /users', function(){

    it('Should create a User', async function(){

        const res = await test
        .httpAgent(apiUrl)
        .post('/users')
        .send({nom: `${test_name}`, prenom: 'Joel', email: `${test_email}`, mdp: 'Motdepasse', mdp1: 'Motdepasse'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        
        let user = res.body
        user.should.be.an.Object()

        //console.log(user)
    })
    
    it('Should not create if email already exists', async function(){

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

    it('Object should have an access_token property string', function(){

        token.access_token.should.be.ok
        token.access_token.should.be.String()
        token.access_token.length.should.be.above(1)

    })

})

