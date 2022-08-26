import { buildRequest, DOMAIN } from "./index";

const sendSuggestion = async (idToken, data) => {
  const { currentUser, message, storeDetail } = data;

  const paraments = {
    idToken: idToken,
    currentUser,
    message,
    store: {
      name: storeDetail.name,
      address: storeDetail.address,
      phone: storeDetail.phone,
    },
  };

  let response = await fetch(
    DOMAIN.domain + "setSuggestion",
    buildRequest(paraments)
  );
  return response.json();
};

export { sendSuggestion };
