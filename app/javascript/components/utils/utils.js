import React from 'react';

export const dateToString = (date) => {
  if (date == undefined) {
    return "dateline error";
  } else {
    return JSON.stringify(date).substr(1, 10);
  }
}

export const stringifyTags = (tagArray) => {
  if (tagArray == undefined) {
    return "no taggings detected";
  } else {
    return tagArray.map(tag => " " + tag.name).toString();
  }
}

export const arrayifyTags = (tagString) => {
  const arr = tagString.toLowerCase().replace(/\s+/g, '').split(",");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = {name: arr[i]}
  }
  return arr;
}
