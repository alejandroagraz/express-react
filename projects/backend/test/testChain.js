'use stricts'

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3900';

describe('Authenticate a user error send data: ',()=>{
    it('Should error send data', (done) => {
        chai.request(url)
            .post('/login')
            .send({username: 'adminuser', password: 'password-user'})
            .end( function(err,res){
                console.log(res.body.message)
                expect(res).to.have.status(401);
                done();
            });
    });
});

describe('get all files error not send token:',()=>{
    it('Should get all files error not send token', (done) => {
        chai.request(url)
            .get('/secret/files')
            .end( function(err,res){
                console.log(res.body.message)
                expect(res).to.have.status(401);
                done();
            });
    });
});

describe('get file error not send token: ',()=>{
    it('Should get file error not send token', (done) => {
        chai.request(url)
            .get('/secret/file/test2.csv')
            .end( function(err,res){
                console.log(res.body.message)
                expect(res).to.have.status(401);
                done();
            });
    });
});
