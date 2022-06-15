// @ts-nocheck

import { Search } from '../src/core/usecases/businessSearch';
import searchRepositoryRedis from '../src/core/repositories/searchRepositoryRedis';

describe('Business Search Params', () => {
  it('should be possible to search', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    const parameters = { term: 'Test' };
    const result = search.execute(parameters);

    expect(result[0]['title']).toBe('Post Test');
  });

  it('should receive not found message', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    const parameters = { term: 'Some inexistent term' };
    const result = search.execute(parameters);

    expect(result).toBe('Not found');
  });

  it('should not be possible search without term', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    expect.assertions(2);

    try {
      const parameters = { term: '' };
      search.execute(parameters);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Search term cannot be empty');
    }
  });

  it('should not be possible use a non-existent search parameter', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    expect.assertions(2);

    try {
      const parameters = { term: 'Test', inexistent: 'parameter' };
      search.execute(parameters);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Invalid search parameter');
    }
  });

  it('should be possible to search with categories', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    const parameters = { term: 'Test', categories: 'A, B' };
    const result = search.execute(parameters);

    expect(result[0]['title']).toBe('Post Test');
    expect(result[0]['categories']).toEqual(['A', 'B']);
  });

  it('should be possible to search with latitude and longitude', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    const parameters = { term: 'Test', latitude: '-23.5', longitude: '-46.6' };
    const result = search.execute(parameters);

    expect(result[0]['title']).toBe('Post Test');
  });

  it('should not be possible to exceed radius maximum value', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    expect.assertions(2);

    try {
      const parameters = { term: 'Test', radius: 10000 };
      search.execute(parameters);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Radius cannot be greater than 50km'
      );
    }
  });

  it('should only be possible to specify sortBy as "best_match", "distance" or "price"', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    expect.assertions(2);

    try {
      const parameters = { term: 'Test', sortBy: 'inexistent' };
      search.execute(parameters);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Invalid sortBy value');
    }
  });

  it('should only be possible specify sortBy "distance" if lat and lng are specified', async () => {
    const searchRepository = new searchRepositoryRedis();
    const search = new Search(searchRepository);

    const parameters = { term: 'Test', sortBy: 'distance' };
    expect(() => search.execute(parameters)).toThrow(
      new Error('Must specify lat and lng')
    );
  });
});
