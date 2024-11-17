const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Catways Reservation API', () => {
    describe('GET /login', () => {
        it('should render the login page', (done) => {
            chai.request(app)
                .get('/login')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.include('<form');
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should fail login with invalid credentials', (done) => {
            chai.request(app)
                .post('/login')
                .send({ username: 'fakeuser', password: 'fakepassword' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should login successfully with valid credentials', (done) => {
            chai.request(app)
                .post('/login')
                .send({ username: 'validuser', password: 'validpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Login successful');
                    done();
                });
        });
    });

    describe('GET /dashboard', () => {
        it('should deny access without authentication', (done) => {
            chai.request(app)
                .get('/dashboard')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it('should allow access with valid session', (done) => {
            // Simuler une session utilisateur valide
            const agent = chai.request.agent(app);

            agent.post('/login')
                .send({ username: 'validuser', password: 'validpassword' })
                .then(() => {
                    agent.get('/dashboard')
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.text).to.include('Welcome to Dashboard');
                            done();
                        });
                });
        });
    });

    describe('Database Connection', () => {
        it('should connect to MongoDB successfully', async () => {
            try {
                const mongoose = require('mongoose');
                await mongoose.connect(process.env.MONGODB_URI);
                expect(true).to.be.true; // Si la connexion réussit
            } catch (error) {
                expect.fail('Database connection failed');
            }
        });
    });
});
