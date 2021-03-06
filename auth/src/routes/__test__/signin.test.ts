import request from 'supertest';
import {app} from '../../app';


it('fails when e email that does not is supplied', async () => {
  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test3.com',
    password: 'passwordw'
  })
  .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
  .post('./api/users/signup')
  .send({
      email: "test@test.com",
      password: "password"
  })
  .expect(201)

  await request(app)
  .post('./api/users/signin')
  .send({
      email: "test@test.com",
      password: "passwo"
  })
  .expect(400)
})

it('respond with a cookie when given valid credentials', async () => {
    await request(app)
    .post('./api/users/signup')
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201)
  
    const response = await request(app)
    .post('./api/users/signin')
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();

})
