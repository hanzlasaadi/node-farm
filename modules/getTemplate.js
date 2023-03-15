module.exports = (obj, markup, i, slugs) => {
  obj.productName = slugs[i];

  let output = markup.replace(/{%IMAGE%}/g, obj.image);
  output = output.replace(/{%PRODUCTNAME%}/g, obj.productName);
  output = output.replace(/{%ID%}/g, obj.id);
  output = output.replace(/{%FROM%}/g, obj.from);
  output = output.replace(/{%QUANTITY%}/g, obj.quantity);
  output = output.replace(/{%NUTRIENTS%}/g, obj.nutrients);
  output = output.replace(/{%PRICE%}/g, obj.price);
  output = output.replace(/{%DESCRIPTION%}/g, obj.description);

  if (!obj.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
