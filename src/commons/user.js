let currentUser = null;
let phoneToken = null;

const setCurrentUser = (user) => {
  currentUser = user;
};

const getUid = () => {
  if (currentUser) return currentUser.uid;
  else return null;
};

const getPersonalInfo = () => {
  let info = {
    ...JSON.parse(currentUser.displayName),
    email: currentUser.email,
  };
  return info;
};

const getIdToken = async () => {
  if (currentUser.uid) {
    const idToken = await currentUser.getIdToken(true);
    return idToken;
  }
  return null;
};

const getProviderData = () => {
  if (currentUser !== null && currentUser.providerData) {
    return currentUser.providerData[0].providerId;
  }

  return null;
};
const getIsAnonymous = () => {
  if (currentUser.isAnonymous) {
    return currentUser.isAnonymous;
  }
  return null;
};

const setPhoneToken = async (token) => {
  phoneToken = token;
};
const getPhoneToken = () => {
  return phoneToken;
};

export {
  getUid,
  getIdToken,
  setCurrentUser,
  getPersonalInfo,
  setPhoneToken,
  getPhoneToken,
  getProviderData,
  getIsAnonymous,
};
