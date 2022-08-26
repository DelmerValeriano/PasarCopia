const getProducts = () => [
  {
    id: 0,
    name: "Frijoles",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    images: [
      {
        url:
          "https://d1mrtjpezxphht.cloudfront.net/wp-content/uploads/2020/04/NO-VENDE-FRIJOL.jpg",
      },
    ],
    price: 15,
    priceDetail: "Precio por libra",
    quantity: 3,
  },
  {
    id: 1,
    name: "Tomates",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    images: [
      {
        url:
          "https://static3.abc.es/media/sociedad/2019/05/14/tomate-kbhE--620x349@abc.jpg",
      },
    ],
    price: 15,
    priceDetail: "Precio por unidad",
    quantity: 4,
  },
  {
    id: 2,
    name: "Embutidos",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    images: [
      {
        url:
          "https://i.pinimg.com/originals/21/57/43/2157437849ff6d52a29f1b60c25b305f.jpg",
      },
    ],
    price: 15,
    priceDetail: "Precio por libra",
    quantity: 6,
  },
];

const textFormat = (value) => {
  let text = value.toLowerCase();
  text = text.replace(new RegExp(/\s/g), "");
  text = text.replace(new RegExp(/[àáâãäå]/g), "a");
  text = text.replace(new RegExp(/[èéêë]/g), "e");
  text = text.replace(new RegExp(/[ìíîï]/g), "i");
  text = text.replace(new RegExp(/[òóôõö]/g), "o");
  text = text.replace(new RegExp(/[ùúûü]/g), "u");
  return text;
};

export { getProducts, textFormat };
