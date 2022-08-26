import { buildRequest, DOMAIN } from "./index";
import { getIdToken } from "./../user";
import { getLocalUserCountry } from "../../commons/localstorage";

const getOrderActive = async () => {
  const country = await getLocalUserCountry();
  const paraments = {
    idToken: await getIdToken(),
    userCountry: country,
    provider:
      country === "honduras"
        ? "ocho"
        : country === "el-salvador"
        ? "urbano-now"
        : null,
  };

  let response = await fetch(
    DOMAIN.domain + "getOrderActive",
    buildRequest(paraments)
  );
  let responseJson = await response.json();
  return responseJson.order;
};

export { getOrderActive };
