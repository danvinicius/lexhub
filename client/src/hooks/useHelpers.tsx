export const useHelpers = () => {
  const slugify = (str: string) => {
    str = str.trim(); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens

    return str;
  };

  return {
    slugify,
  };
};
