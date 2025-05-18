import PropTypes from 'prop-types';
import NextHead from 'next/head';

export const NextHeadsV1 = ({
  element: Element,
  title,
  links,
  metas,
  scripts,
}) => (
  <Element>
    {title && <title key="title">{title}</title>}

    {metas &&
      metas.map((metaProps, key) => (
        <meta key={`meta-${key}`} {...metaProps} />
      ))}

    {links &&
      links.map((link, key) => (
        <link key={`link-${key}`} {...link} />
      ))}

    {scripts &&
      scripts.map(({ content, ...script }, key) => (
        <script
          key={`script-${key}`}
          dangerouslySetInnerHTML={{ __html: content }}
          {...script}
        />
      ))}
  </Element>
);

NextHeadsV1.defaultProps = {
  element: NextHead,
};

NextHeadsV1.propTypes = {
  element: PropTypes.node,
  links: PropTypes.arrayOf(PropTypes.object),
  metas: PropTypes.arrayOf(PropTypes.object),
  scripts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};
