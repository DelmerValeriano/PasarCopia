const moment = require("moment-timezone");
const zone_name = moment.tz.guess();
moment.tz.setDefault(zone_name);

import { THEME } from "./../styles";

export const getFormattedImages = (images) => {
  const formattedImages = [];
  images.sort((a, b) => {
    return a.position - b.position;
  });
  images.forEach(({ url, index }) =>
    formattedImages.push({ image: url, format: "url", index })
  );
  return formattedImages;
};

export const itemsTimeLine = (
  order = { status: "", statusHistory: [], orderType: "" }
) => {
  const { status, statusHistory, orderType } = order;
  let data = [
    {
      title: "Pendiente",
      description: "Su pedido está pendiente. ",
      circleColor: THEME.grayColor,
      lineColor: THEME.grayColor,
      icon: false,
    },
    {
      title: "Preparando",
      description: "Estamos preparando su pedido.",
      circleColor: THEME.grayColor,
      lineColor: THEME.grayColor,
      icon: false,
    },
    {
      title: "Preparado",
      description: "Su pedido está finalizado, listo para ser entregado ",
      circleColor: THEME.grayColor,
      lineColor: THEME.grayColor,
      lineColor: THEME.grayColor,
      icon: false,
    },
  ];

  if (orderType == "delivery") {
    data.push({
      title: "En camino",
      description: "El pedido fue entregado con exito",
      circleColor: THEME.grayColor,
    });
  }

  switch (status) {
    case "pendiente":
      data[0].description = "Su pedido está pendiente";
      data[1].description = "";
      data[2].description = "";
      if (orderType == "delivery") {
        data[3].description = "";
      }
      break;
    case "preparando":
      data[0].description = "";
      data[1].description = "Su pedido se está preparando";
      data[2].description = "";
      if (orderType == "delivery") {
        data[3].description = "";
      }
      break;
    case "preparado":
      data[0].description = "";
      data[1].description = "";
      data[2].description = "Su pedido fue preparado con éxito";
      if (orderType == "delivery") {
        data[3].description = "";
      }
      break;
    case "en camino":
      data[0].description = "";
      data[1].description = "";
      data[2].description = "";
      data[3].description = "Su pedido está en camino";
      break;

    default:
      data[0].description = "";
      data[1].description = "";
      data[2].description = "";
      data[3].description = "";
      break;
  }

  if (statusHistory.length) {
    statusHistory.forEach((item, index) => {
      if (item.status == data[index].title.toLowerCase()) {
        data[index].circleColor = THEME.pronto.yellow;
        data[index].lineColor = THEME.pronto.yellow;
        data[index].icon = true;
        if (item.date) {
          data[index].time = `${formatterDateHour(item.date.milliseconds)}.`;
        }
      }
    });
  }

  return data;
};

export const formatterDateHour = (date) => {
  return moment(date).format("h:mm a");
};
