import React, { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement>;

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export function Thing({
  children = 'the snozzberries taste like snozzberries',
}: Props) {
  return <div>{children}</div>;
}
