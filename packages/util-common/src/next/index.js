export const nextServerSidePipeline =
  (...middlewares) =>
  async (ctx = {}) => {
    let prevIndex = -1;

    const serverSideProps = { props: {} };
    const runner = async index => {
      if (index === prevIndex)
        throw new Error('next() called multiple times');

      prevIndex = index;

      if (middlewares[index]) {
        const next = ({ redirect, ...middlewareProps } = {}) => {
          serverSideProps.notFound = !!middlewareProps.notFound;
          serverSideProps.redirect = redirect;
          serverSideProps.props = {
            ...serverSideProps.props,
            ...middlewareProps,
          };

          return runner(++index);
        };

        await middlewares[index](next, ctx, serverSideProps.props);
      }
    };

    await runner(0);

    return serverSideProps;
  };

export const nextServerSideCompose =
  (...middlewares) =>
  async ctx => {
    const serversideProps = { props: {} };
    const promises = middlewares.map(middleware =>
      middleware(
        data => {
          if (data)
            serversideProps.props = {
              ...serversideProps.props,
              ...data,
            };
        },
        ctx,
        serversideProps.props
      )
    );
    await Promise.all(promises);
    return serversideProps;
  };
