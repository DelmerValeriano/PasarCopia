export const getSocialMedia = (country = "") => {
  switch (country) {
    case "honduras":
      return {
        facebook: {
          app: "fb://page/289457444545165",
          url: "https://www.facebook.com/TiendasPronto/",
        },
        gmail: {
          url: "https://mail.google.com/",
        },
        whatsapp: {
          app: "whatsapp://send?phone=+50431924524", //Cristian: Pendiente de cambiar al número proporcionado por Pronto, el mensaje también.
          url: "https://www.whatsapp.com/",
        },
        instagram: {
          app: "instagram://user?username=tiendaspronto.hn",
          url: "https://www.instagram.com/tiendaspronto.hn/?hl=es-la",
        },
        youtube: {
          app: "https://www.youtube.com/channel/UCC4R7_8alWvV0k1Y6Mmv6wA",
          url: "https://www.youtube.com/channel/UCC4R7_8alWvV0k1Y6Mmv6wA",
        },
        tiktok: {
          app: "https://vm.tiktok.com/ZMJAjoU4S/",
          url: "https://vm.tiktok.com/ZMJAjoU4S/",
        },
      };
    case "el-salvador":
      return {
        facebook: {
          app: "fb://page/289457444545165",
          url: "https://www.facebook.com/TiendasPronto/",
        },
        gmail: {
          url: "https://mail.google.com/",
        },
        whatsapp: {
          app: "whatsapp://send?phone=+50431924524", //Cristian: Pendiente de cambiar al número proporcionado por Pronto, el mensaje también.
          url: "https://www.whatsapp.com/",
        },
        instagram: {
          app: "instagram://user?username=tiendaspronto.sv",
          url: "https://www.instagram.com/tiendaspronto.sv/?hl=es-la",
        },
        youtube: {
          app: "https://www.youtube.com/channel/UCC4R7_8alWvV0k1Y6Mmv6wA",
          url: "https://www.youtube.com/channel/UCC4R7_8alWvV0k1Y6Mmv6wA",
        },
        tiktok: {
          app: "https://vm.tiktok.com/ZMJAjoU4S/",
          url: "https://vm.tiktok.com/ZMJAjoU4S/",
        },
      };

    default:
      return {};
  }
};
