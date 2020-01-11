export const dateToString = (date) => {
  if (date == undefined) {
    return "dateline error";
  } else {
    //convert date which is a string to JS datetime object
    const d = new Date(date);
    return d.toLocaleDateString();
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
