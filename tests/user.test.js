const request = require('supertest')
const app = require('../src/app')

test('Test Get Request', () => {
    request(app)
        .get('/test')
        .send()
        .expect(200)
})
