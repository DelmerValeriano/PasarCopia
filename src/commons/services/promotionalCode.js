import { buildRequest, DOMAIN } from "./index";

import { getLocalUserCountry } from "../../commons/localstorage";

const validateCodePromotional = async (
  code,
  idToken,
  orderType,
  total,
  shippingCost
) => {
  const country = await getLocalUserCountry();
  const paraments = {
    idToken,
    countryId: country,
    code,
    orderType,
    total,
    shippingCost,
  };

  return await fetch(
    DOMAIN.domain + "validatePromotionalCode",
    buildRequest(paraments)
  )
    .then((res) => res.json())
    .then((data) => data);
};

export { validateCodePromotional };
