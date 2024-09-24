import {
  ByRoleMatcher,
  ByRoleOptions,
  Matcher,
  SelectorMatcherOptions,
  waitForOptions,
} from '@testing-library/react';

// app types
export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;
};

export type SortOptions = 'name' | 'creationDate';

// tests types
export type findByLabelTextType = (
  id: Matcher,
  options?: SelectorMatcherOptions | undefined,
  waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement>;

export type getByRole = (
  role: ByRoleMatcher,
  options?: ByRoleOptions | undefined
) => HTMLElement;
