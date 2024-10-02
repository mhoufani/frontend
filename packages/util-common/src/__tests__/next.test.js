import {
  nextServerSidePipeline,
  nextServerSideCompose,
} from '../next/index.js';

describe('util-common - next', () => {
  describe('nextServerSidePipeline', () => {
    it('should return matched props', async () => {
      const getServerSideProps = nextServerSidePipeline(
        async (next, { test }) => {
          const timer = () =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve('testAsync');
              }, 10);
            });

          const data = await timer();
          next({ data, test });
        },
        next => next({ device: {} }),
        next => next({ user: {} })
      );

      const { props } = await getServerSideProps({ test: true });

      expect(props).toMatchObject(
        expect.objectContaining({ test: true })
      );
    });

    it('should matched prevProps in second middleware', async () => {
      const getServerSideProps = nextServerSidePipeline(
        async next => {
          const timer = () =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve(true);
              }, 2000);
            });

          const data = await timer();

          next({ data });
        },
        (next, ctx, { data }) => {
          expect(data).toBeTruthy();
        }
      );

      await getServerSideProps();
    });
  });

  describe('nextServerSideCompose', () => {
    it('should return matched props', async () => {
      const getServerSideProps = nextServerSideCompose(
        async (next, { ctxVar }) => {
          const timer = () =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve('testAsync');
              }, 10);
            });

          const data = await timer();
          next({ data, ctxVar });
        },
        next => next({ device: {} }),
        next => next({ user: {} })
      );

      const { props } = await getServerSideProps({ ctxVar: true });

      expect(props).toMatchObject(
        expect.objectContaining({
          ctxVar: true,
          data: 'testAsync',
          device: {},
          user: {},
        })
      );
    });

    it('should matched prevProps in second middleware', async () => {
      const getServerSideProps = nextServerSideCompose(
        async next => {
          const timer = () =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve(true);
              }, 2000);
            });

          const data = await timer();

          next({ data });
        },
        (next, ctx, { data }) => {
          expect(data).toBeUndefined();
        }
      );

      await getServerSideProps();
    });
  });
});
