
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

test('esperamos un json de retorno, todos los moves', async() =>{
    const response = await api.get('moves/').expect(200);
});

afterAll(() => {
    mongoose.connection.close();
    server
});


// describe('Get all moves /', () =>{

//     it('todos los moves', (res)=>{
//         request(app)
//         .get('/moves')
//         .expect(200,res);
//     });
// });