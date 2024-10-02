import remarkDirectve from 'remark-directive';
import remarkSanitize, { defaultSchema } from 'rehype-sanitize';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export const remarkDirectiveResolver = () => tree => {
  visit(tree, function (node) {
    if (
      node.type === 'containerDirective' ||
      node.type === 'leafDirective' ||
      node.type === 'textDirective'
    ) {
      const data = node.data || (node.data = {});
      const hast = h(node.name, node.attributes || {});
      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    }
  });
};

export const remarkDirectives = [
  remarkDirectve,
  remarkDirectiveResolver,
];

export const customRehypeSanitize = ({
  allowedTags,
  disallowedTags,
  customAttributes,
  customTagNames,
} = {}) => {
  const allTagNames = [...defaultSchema.tagNames, ...customTagNames];

  const attributes = {
    ...defaultSchema.attributes,
    ...customAttributes,
    '*': [
      ...defaultSchema.attributes['*'],
      ...(customAttributes['*'] || []),
    ],
  };
  const tagNames =
    allowedTags ||
    (disallowedTags
      ? allTagNames.filter(tag => !disallowedTags.includes(tag))
      : allTagNames);

  return [remarkSanitize, { attributes, tagNames }];
};
