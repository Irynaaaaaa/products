import React from 'react';
import Select, { Props, GroupBase } from 'react-select';

const CustomSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group>
) => {
  return <Select {...props} />;
};

export default CustomSelect;
