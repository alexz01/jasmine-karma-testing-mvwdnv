import { TestScheduler } from 'rxjs/testing';
import { mergeMap } from 'rxjs/operators';

describe('testing rxjs', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('test http get and post', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const get: Function = jasmine
        .createSpy('get')
        .and.returnValue(cold('-a|', { a: 'key' }));

      const post: Function = jasmine.createSpy('post').and.callFake(() => {
        console.log('post called');
        return cold('-a|', { a: { status: 200 } });
      });

      const result = () => get().pipe(mergeMap(() => post()));

      expectObservable(result()).toBe('--a|', { a: { status: 200 } });

      expect(get).toHaveBeenCalledTimes(1);
      expect(post).toHaveBeenCalledTimes(1);
    });
  });
});
