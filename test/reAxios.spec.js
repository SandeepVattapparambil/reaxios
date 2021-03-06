/**
 * reAxios test spec file 
 * Written by: Sandeep Vattapparambil
 */

/**
 * Nockjs - A standin dummy server
 */
import nock from 'nock';

/**
 * Get build distributable
 */
import reAxios from '../dist/reAxios.min';

/**
 * Describe the tests
 */
describe('Given an instance of reAxios', () => {

    let reAxiosInstance;

    afterEach(() => {
        reAxiosInstance = null;
    });

    it('reAxiosInstance should be an instance of reAxios()', () => {
        reAxiosInstance = new reAxios({
            baseURL: 'http://reaxios.com',
        });
        expect(reAxiosInstance).toBeInstanceOf(reAxios);
    });

    it('reAxiosInstance makes an Invalid request -> an error is thrown', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'http://reaxios.com',
        });

        expect(() => reAxiosInstance.makeRequest('HEAD')).toThrowError();
    });

    it('reAxiosInstance makes a successful GET request', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'http://reaxios.com',
        });

        const expected = {
            id: 1,
            title: 'Hello reAxios!',
            author: 'Sandeep Vattapparambil'
        };

        /**
         * Create a server stub
         */
        const mockServer = nock('http://reaxios.com').persist();

        mockServer.get('/posts/1').reply(200, expected);

        const promise = new Promise((resolve, reject) => {
            reAxiosInstance.get('/posts/1').subscribe(
                resp => {
                    resolve(resp.data);
                },
                err => {
                    reject(err);
                }
            );
        });
        await expect(promise).resolves.toEqual(expected);
    });

    it('reAxiosInstance makes a successful POST request', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'http://reaxios.com',
        });

        const body = {
            id: 1,
            title: 'Hello reAxios!',
            author: 'Sandeep Vattapparambil'
        };

        const response = {
            msg: 'success'
        }

        /**
         * Create a server stub
         */
        const mockServer = nock('http://reaxios.com').persist();

        mockServer.post('/', body).reply(200, response);

        const promise = new Promise((resolve, reject) => {
            reAxiosInstance.post('/', body).subscribe(
                resp => {
                    resolve(resp.data);
                },
                err => {
                    reject(err);
                }
            );
        });
        await expect(promise).resolves.toEqual(response);
    });

    it('reAxiosInstance makes a successful PUT request', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'http://reaxios.com',
        });

        const body = {
            id: 1,
            title: 'Hello reAxios!',
            author: 'Sandeep Vattapparambil'
        };

        const response = {
            msg: 'success'
        }

        /**
         * Create a server stub
         */
        const mockServer = nock('http://reaxios.com').persist();

        mockServer.put('/', body).reply(200, response);

        const promise = new Promise((resolve, reject) => {
            reAxiosInstance.put('/', body).subscribe(
                resp => {
                    resolve(resp.data);
                },
                err => {
                    reject(err);
                }
            );
        });
        await expect(promise).resolves.toEqual(response);
    });

    it('reAxiosInstance makes a successful PATCH request', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'http://reaxios.com',
        });

        const body = {
            id: 1,
            title: 'Hello reAxios!',
            author: 'Sandeep Vattapparambil'
        };

        const response = {
            msg: 'success'
        }

        /**
         * Create a server stub
         */
        const mockServer = nock('http://reaxios.com').persist();

        mockServer.patch('/', body).reply(200, response);

        const promise = new Promise((resolve, reject) => {
            reAxiosInstance.patch('/', body).subscribe(
                resp => {
                    resolve(resp.data);
                },
                err => {
                    reject(err);
                }
            );
        });
        await expect(promise).resolves.toEqual(response);
    });

    it('reAxiosInstance makes a successful DELETE request', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'http://reaxios.com',
        });

        /**
         * Create a server stub
         */
        const mockServer = nock('http://reaxios.com').persist();

        mockServer.delete('/post').reply(200);

        const promise = new Promise((resolve, reject) => {
            reAxiosInstance.delete('/post').subscribe(
                resp => {
                    resolve(resp.status);
                },
                err => {
                    reject(err);
                }
            );
        });
        await expect(promise).resolves.toEqual(200);
    });

    it('reAxiosInstance makes a successful GET request to JSON API', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });

        const promise = new Promise((resolve, reject) => {
            reAxiosInstance.get('/todos/1').subscribe(
                resp => {
                    resolve(resp.status);
                },
                err => {
                    reject(err);
                }
            );
        });
        await expect(promise).resolves.toEqual(200);
    });

    it('reAxiosInstance makes a successful GET request to JSON API and retreives data', async () => {

        reAxiosInstance = new reAxios({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });

        const response = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };

        const promise = new Promise((resolve, reject) => {
            reAxiosInstance.get('/todos/1').subscribe(
                resp => {
                    resolve(resp.data);
                },
                err => {
                    reject(err);
                }
            );
        });
        await expect(promise).resolves.toEqual(response);
    });
});