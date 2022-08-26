import { buildRequest, DOMAIN } from "./index";

const getMyPoints = async (idToken, country) => {
  const paraments = {
    idToken,
    country,
  };
  let items = {};
  await fetch(DOMAIN.domain + "getMyPoints", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => (items = data));

  return items;
};
export { getMyPoints };
