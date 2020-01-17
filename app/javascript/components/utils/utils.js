export const dateToString = (date) => {
  if (date == undefined) {
    return "NIL";
  } else {
    //convert date which is a string to JS datetime object
    const d = new Date(date);
    return d.toLocaleDateString();
  }
}

export const stringifyTags = (tagArray) => {
  return tagArray == undefined
    ? "no taggings"
    : tagArray.map(tag => " " + tag.name).toString();
}

export const objectifyTags = (tagArray) => {
  return tagArray && tagArray.length
    ? tagArray.map( tag => tag = {name: tag.toLowerCase()})
    : null;
}
