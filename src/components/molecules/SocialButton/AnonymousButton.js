import React from "react";
import SocialButton from "./index";

const AnonymousButton = ({ anonymousSignin }) => {
  return (
    <SocialButton
      image={require("./../../../imgs/socialMedia/incognito.png")}
      event={anonymousSignin}
      title="Ingresa como invitado"
    />
  );
};

export default AnonymousButton;
