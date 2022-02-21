/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role, User } from '../../src/users/entities';
import { UserServiceMock } from './users.service.mock';
import { RoleServiceMock } from './role.service.mock';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    const usersInDatabase = [
        {
            createdAt: '2022-02-20T01:43:49.951Z',
            dni: '123',
            lastname: 'Ricardo',
            name: 'Juan',
            password: 'carlos12345',
            phone: '3124325678',
            email: 'andres@gmail.com',
            role: { id: 1, role: 'COORDINADOR DE TRANSPORTE' },
            updatedAt: '2022-02-20T01:43:49.951Z',
        },
        {
            createdAt: '2022-02-20T01:43:49.951Z',
            dni: '567',
            email: 'roberto@gmail.com',
            lastname: 'Gutierrez',
            name: 'Roberto',
            password: 'roberto12345',
            phone: '3124325678',
            role: { id: 1, role: 'COORDINADOR DE PROCESOS' },
            updatedAt: '2022-02-20T01:43:49.951Z',
        },
    ];

    const createUserDto = [
        {
            dni: '589',
            name: 'Juan',
            lastname: 'Ricardo',
            role: 'COORDINADOR DE TRANSPORTE',
            password: 'carlos12345',
            phone: '3124325678',
            email: 'andres@gmail.com',
        },

        {
            dni: '123',
            name: 'Juan',
            lastname: 'Ricardo',
            role: 'COORDINADOR DE TRANSPORTE',
            password: 'carlos12345',
            phone: '3124325678',
            email: 'andres@gmail.com',
        },
        {
            name: 'Rigoberto',
            lastname: 'Urán',
            phone: '3245678909',
        },
    ];

    const responseRequest = [
        {
            statusCode: 404,
            message: "User doesn't exists",
            error: 'Not Found',
        },
        {
            message: 'User created',
            userCreated: {
                dni: '589',
                name: 'Juan',
                lastname: 'Ricardo',
                role: { id: 1, role: 'COORDINADOR DE TRANSPORTE' },
                phone: '3124325678',
                email: 'andres@gmail.com',
                createdAt: '2022-02-20T01:43:49.951Z',
                updatedAt: '2022-02-20T01:43:49.951Z',
            },
        },
        {
            statusCode: 400,
            message: [
                'dni must be a string',
                'name must be a string',
                'lastname must be a string',
                'role must be a string',
                'role invalido. Opciones válidas para rol son COORDINADOR DE TRANSPORTE,COORDINADOR DE PROCESOS,PORTERO,COORDINADOR DE FINCA',
                'password must be shorter than or equal to 128 characters',
                'password must be longer than or equal to 8 characters',
                'password must be a string',
                'phone must be a string',
                'email must be an email',
                'email must be a string',
            ],
            error: 'Bad Request',
        },
        {
            statusCode: 400,
            message: 'Already exits one user with that dni',
            error: 'Bad Request',
        },
        {
            message: 'User deleted',
            userDeleted: {
                dni: '123',
                name: 'Juan',
                lastname: 'Ricardo',
                role: { id: 1, role: 'COORDINADOR DE TRANSPORTE' },
                phone: '3124325678',
                email: 'andres@gmail.com',
                createdAt: '2022-02-20T01:43:49.951Z',
                updatedAt: '2022-02-20T01:43:49.951Z',
            },
        },
        {
            message: 'User updated',
            userUpdated: {
                dni: '123',
                name: 'Rigoberto',
                lastname: 'Urán',
                role: { id: 1, role: 'COORDINADOR DE TRANSPORTE' },
                phone: '3245678909',
                email: 'andres@gmail.com',
                createdAt: '2022-02-20T01:43:49.951Z',
                updatedAt: '2022-02-20T01:43:49.951Z',
            },
        },
        {
            statusCode: 400,
            message: [
                'role invalido. Opciones válidas para rol son COORDINADOR DE TRANSPORTE,COORDINADOR DE PROCESOS,PORTERO,COORDINADOR DE FINCA',
            ],
            error: 'Bad Request',
        },
        {
            message: 'User updated',
            userRoleUpdated: {
                dni: '123',
                name: 'Juan',
                lastname: 'Ricardo',
                role: { id: 1, role: 'PORTERO' },
                phone: '3124325678',
                email: 'andres@gmail.com',
                createdAt: '2022-02-20T01:43:49.951Z',
                updatedAt: '2022-02-20T01:43:49.951Z',
            },
        },
    ];

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UsersModule],
        })
            .overrideProvider(getRepositoryToken(User))
            .useClass(UserServiceMock)
            .overrideProvider(getRepositoryToken(Role))
            .useClass(RoleServiceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/users (GET all users)', async () => {
        const res = await request(app.getHttpServer()).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            message: 'All users',
            users: usersInDatabase,
        });
    });

    it('/users/id (GET one user)', async () => {
        const id = 123;
        const res = await request(app.getHttpServer()).get(`/users/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            message: 'User',
            user: usersInDatabase[0],
        });
    });

    it('/users/id (GET one user, Exception user does not exists) ', async () => {
        const id = 678;
        const res = await request(app.getHttpServer()).get(`/users/${id}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(responseRequest[0]);
    });

    it('/users (POST create one user)', async () => {
        const res = await request(app.getHttpServer()).post(`/users`).send(createUserDto[0]);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(responseRequest[1]);
    });

    it('/users (POST create one user, Exception in body )', async () => {
        const res = await request(app.getHttpServer()).post(`/users`).send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(responseRequest[2]);
    });

    it('/users (POST create one user, Exception in dni user)', async () => {
        const res = await request(app.getHttpServer()).post(`/users`).send(createUserDto[1]);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(responseRequest[3]);
    });

    it('/users (POST create one user, Exception in role)', async () => {
        createUserDto[0].role = 'FUTBOLISTA';
        const res = await request(app.getHttpServer()).post(`/users`).send(createUserDto[0]);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(responseRequest[6]);
    });

    it(`/user (UPDATE  one user's information )`, async () => {
        const dni = 123;
        const res = await request(app.getHttpServer()).put(`/users/${dni}`).send(createUserDto[2]);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(responseRequest[5]);
    });

    it(`/users (UPDATE  one user's information, Exception user does not exists)`, async () => {
        const dni = 890;
        const res = await request(app.getHttpServer()).put(`/users/${dni}`).send(createUserDto[2]);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(responseRequest[0]);
    });

    it('/users (DELETE  one user)', async () => {
        const dni = 123;
        const res = await request(app.getHttpServer()).delete(`/users/${dni}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(responseRequest[4]);
    });

    it('/users (DELETE  one user, Exception user does not exists)', async () => {
        const dni = 908;
        const res = await request(app.getHttpServer()).delete(`/users/${dni}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(responseRequest[0]);
    });

    it('/users/roles/id (UPDATE one user role, Exception user does not exists)', async () => {
        const dni = 123;
        const res = await request(app.getHttpServer()).put(`/users/roles/${dni}`).send({ role: 'PORTERO' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(responseRequest[7]);
    });

    it('/users/roles/id (UPDATE one user role, Exception role does not exists)', async () => {
        const dni = 123;
        const res = await request(app.getHttpServer()).put(`/users/roles/${dni}`).send({ role: 'FUTBOLISTA' });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(responseRequest[6]);
    });

    it('/users/roles/id (UPDATE one user role, Exception user does not exists)', async () => {
        const dni = 908;
        const res = await request(app.getHttpServer()).put(`/users/roles/${dni}`).send({ role: 'PORTERO' });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(responseRequest[0]);
    });
});
