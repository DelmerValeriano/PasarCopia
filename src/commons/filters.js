export const filterItemsByAtributes = (items, terms, filters) => {
  if (!items) return [];
  if (!terms) return items;
  terms = terms.toLowerCase();
  const allItems = [...items];
  return allItems.filter((it) => {
    let allFilters = "";
    for (let i = 0; i < filters.length; i++) allFilters += it[filters[i]] + " ";
    it.customFilter = allFilters;
    return it.customFilter.toLowerCase().includes(terms);
  });
};
