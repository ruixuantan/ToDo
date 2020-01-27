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
  return !tagArray
    ? "no taggings"
    : tagArray.map(tag => " " + tag.name).toString();
}

export const objectifyTags = (tagArray) => {
  console.log(tagArray.map(tag => tag = {name: tag.toLowerCase()}));
  return tagArray && tagArray.length > 0
    ? tagArray.map(tag => tag = {name: tag.toLowerCase()})
    : null;
}
