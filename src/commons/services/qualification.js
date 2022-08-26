import { buildRequest, DOMAIN } from "./index";
import { getLocalUserCountry } from "../../commons/localstorage";

const updateQualification = async (id, idToken, qualifications) => {
  const country = await getLocalUserCountry();
  const paraments = {
    id,
    idToken,
    qualifications,
    country,
  };

  let response = await fetch(
    DOMAIN.domain + "updateQualification",
    buildRequest(paraments)
  );
  return response.json();
};

export { updateQualification };
