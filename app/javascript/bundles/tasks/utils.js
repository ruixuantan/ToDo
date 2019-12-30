import React from 'react';

export const stringifyTags = (tagArray) => {
  return JSON.stringify(tagArray.map(tag => tag.name));
}
