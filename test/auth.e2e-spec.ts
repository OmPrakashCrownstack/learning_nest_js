import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', () => {
    const newUserCredentials = {
      email: 'qwerty@example.com',
      password: 'qwerty',
    };

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUserCredentials)
      .expect(201)
      .then((response) => {
        const { id, email } = response.body;
        expect(id).toBeDefined();
        expect(email).toEqual(newUserCredentials.email);
      });
  });

  it('Sign up as a new user and then check current user', async () => {
    const newUserCredentials = {
      email: 'qwerty@example.com',
      password: 'qwerty',
    };

    const createUserRes = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUserCredentials)
      .expect(201);

    const cookie = createUserRes.get('Set-Cookie')!;
    const { body } = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(newUserCredentials.email);
  });
});
