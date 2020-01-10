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

export const objectifyTags = (tagArray) => {
  return tagArray.map( tag => tag = {name: tag.toLowerCase()} );
}
