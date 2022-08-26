import matchAll from "string.prototype.matchall";

const parseXmlToJson = (xml) => {
  const json = {};
  for (const res of matchAll(
    xml,
    /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm
  )) {
    const key = res[1] || res[3];
    const value = res[2] && parseXmlToJson(res[2]);
    json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
  }
  return json;
};

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const GenOrderNum = () => {
  const respOrder = `ProntoApp|${Right(uuidv4().toString(), 18).replace(
    /-/gi,
    ""
  )}`;
  return respOrder;
};

const Right = (value, length) => {
  return value.substring(value.length - length);
};

const AmountFormatted = (amount) => {
  var factor = Math.pow(10, 2);
  return Math.round(amount * Number(factor), 0)
    .toString()
    .padStart(12, "0");
};

const buildRequest = (data) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

const GenerateSignature = async (
  MERCH_ID,
  MERCH_PWD,
  ACQUIRED_ID,
  ordNum,
  amount,
  curr
) => {
  let amountTrim = await AmountFormatted(amount).trim();
  let currTrim = await curr.trim();

  const hashValue = await fetch(
    "https://us-central1-appland-ecommerce.cloudfunctions.net/generateSignature",
    buildRequest({
      MERCH_ID,
      MERCH_PWD,
      ACQUIRED_ID,
      ordNum,
      amount: amountTrim,
      curr: currTrim,
    })
  )
    .then((response) => response.text())
    .then((string) => {
      return string;
    });

  return hashValue;
};

const GetTransactionDetails = async (
  MERCH_ID,
  MERCH_PWD,
  ACQUIRED_ID,
  orderNumber,
  amount,
  currency
) => {
  return {
    Amount: AmountFormatted(amount).trim(),
    Currency: currency,
    CurrencyExponent: 2,
    TransactionCode: 8,
    OrderNumber: orderNumber,
    AcquirerId: ACQUIRED_ID,
    MerchantId: MERCH_ID,
    Signature: await GenerateSignature(
      MERCH_ID,
      MERCH_PWD,
      ACQUIRED_ID,
      orderNumber,
      amount,
      currency
    ),
    SignatureMethod: "SHA1",
    CustomerReference: `This is a test for merchant: ${MERCH_ID}`,
  };
};

const GetCardDetails = (object) => {
  const {
    step2: {
      card: { card },
    },
  } = object;
  return {
    CardNumber: card.cardNumber,
    CardExpiryDate: card.cardDate.replace(/-/gi, ""),
    CardCVV2: card.cardCVC,
  };
};

const GetBillingDetails = (object) => {
  //Cambiar después por datos de facturación
  const { shippingOwner, shippingPlace } = object.step1;
  return {
    BillToFirstName: shippingOwner.name.split(" ")[0],
    BillToLastName: shippingOwner.name.split(" ")[2]
      ? shippingOwner.name.split(" ")[2]
      : shippingOwner.name.split(" ")[1],
    BillToAddress: "", //Cristian: No es necesario este dato,
    BillToAddress2: "", //Brayan: No tenemos estos datos
    BillToCity: "", //Brayan: No tenemos estos datos
    BillToZipPostCode: null,
    BillToState: "", //Brayan: No tenemos estos datos
    BillToCountry: "340",
    BillToTelephone: "", //Brayan: Hay que agregar este dato ya que lo tenemos
    BillToEmail: "", //Brayan: Hay que agregar este dato ya que lo tenemos
  };
};

const GetShippingDetails = (object) => {
  const { shippingOwner, shippingPlace } = object.step1;
  return {
    ShipToFirstName: shippingOwner.name.split(" ")[0],
    ShipToLastName: shippingOwner.name.split(" ")[2]
      ? shippingOwner.name.split(" ")[2]
      : shippingOwner.name.split(" ")[1],
    ShipToAddress: "", //Cristian: No es necesario este dato
    ShipToAddress2: "", //Brayan: No tenemos estos datos
    ShipToCity: "", //Brayan: No tenemos estos datos
    ShipToZipPostCode: "",
    ShipToState: "",
    ShipToCountry: "340",
    ShipToMobile: "",
    ShipToTelephone: "",
    ShipToEmail: shippingOwner.email ? shippingOwner.email : "",
    ShipToCounty: "",
  };
};

const ThreeDS = (request, url) => {
  const {
    // BillingDetails,
    ShippingDetails,
    CardDetails,
    TransactionDetails,
  } = request;
  const threeDS = `<?xml version="1.0" encoding="utf-8"?>
   <Authorize3DSRequest
        xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="http://schemas.firstatlanticcommerce.com/gateway/data">
        <BillingDetails>
          <BillToAddress>${""}</BillToAddress> 
          <BillToAddress2>${""}</BillToAddress2>
          <BillToZipPostCode>${""}</BillToZipPostCode>
          <BillToFirstName>${""}</BillToFirstName>
          <BillToLastName>${""}</BillToLastName> 
          <BillToCity>${""}</BillToCity> 
          <BillToState>${""}</BillToState>
          <BillToCountry>${""}</BillToCountry>
          <BillToEmail>${""}</BillToEmail> 
          <BillToTelephone>${""}</BillToTelephone> 
          <BillToCounty>${""}</BillToCounty>
          <BillToMobile>${""}</BillToMobile>
          <ExtensionData>${""}</ExtensionData>
        </BillingDetails>
        <ShippingDetails>
          <ShipToAddress>${ShippingDetails.ShipToAddress}</ShipToAddress> 
          <ShipToAddress2>${ShippingDetails.ShipToAddress2}</ShipToAddress2> 
          <ShipToZipPostCode>${
            ShippingDetails.ShipToZipPostCode
          }</ShipToZipPostCode> 
          <ShipToFirstName>${ShippingDetails.ShipToFirstName}</ShipToFirstName> 
          <ShipToLastName>${ShippingDetails.ShipToLastName}</ShipToLastName>  
          <ShipToCity>${ShippingDetails.ShipToCity}</ShipToCity> 
          <ShipToState>${ShippingDetails.ShipToState}</ShipToState> 
          <ShipToCountry>${ShippingDetails.ShipToCountry}</ShipToCountry> 
          <ShipToEmail>${ShippingDetails.ShipToEmail}</ShipToEmail> 
          <ShipToTelephone>${ShippingDetails.ShipToTelephone}</ShipToTelephone> 
          <ShipToMobile>${ShippingDetails.ShipToMobile}</ShipToMobile> 
          <ShipToCounty>${ShippingDetails.ShipToCounty}</ShipToCounty>
        </ShippingDetails> 
        <CardDetails>
          <CardCVV2>${CardDetails.CardCVV2}</CardCVV2>
          <CardExpiryDate>${CardDetails.CardExpiryDate}</CardExpiryDate>
          <CardNumber>${CardDetails.CardNumber}</CardNumber>
          <Installments>0</Installments>
        </CardDetails>
        <MerchantResponseURL>${url}</MerchantResponseURL>
        <TransactionDetails>
          <AcquirerId>${TransactionDetails.AcquirerId}</AcquirerId>
          <Amount>${TransactionDetails.Amount}</Amount>
          <Currency>${TransactionDetails.Currency}</Currency>
          <CurrencyExponent>${
            TransactionDetails.CurrencyExponent
          }</CurrencyExponent>
          <CustomData />
          <MerchantId>${TransactionDetails.MerchantId}</MerchantId>
          <OrderNumber>${TransactionDetails.OrderNumber}</OrderNumber>
          <Signature>${TransactionDetails.Signature}</Signature>
          <SignatureMethod>${
            TransactionDetails.SignatureMethod
          }</SignatureMethod>
          <TransactionCode>${
            TransactionDetails.TransactionCode
          }</TransactionCode>
          <CustomerReference>FAC Web Tools FACPG2: ${
            TransactionDetails.MerchantId
          }</CustomerReference>
        </TransactionDetails>
        <FraudDetails>
          <SessionId /> 
          <AuthResponseCode /> 
          <AVSResponseCode /> 
          <CVVResponseCode />
        </FraudDetails> 
    </Authorize3DSRequest>`;
  return threeDS;
};

const TransactionRequest = (request) => {
  const {
    // BillingDetails,
    ShippingDetails,
    CardDetails,
    TransactionDetails,
  } = request;
  const transactionRequest = `<?xml version="1.0" ?>
  <AuthorizeRequest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.firstatlanticcommerce.com/gateway/data">
    <TransactionDetails>
        <AcquirerId>${TransactionDetails.AcquirerId}</AcquirerId>
        <Amount>${TransactionDetails.Amount}</Amount>
        <Currency>${TransactionDetails.Currency}</Currency>
        <CurrencyExponent>${
          TransactionDetails.CurrencyExponent
        }</CurrencyExponent>
        <CustomData />
        <MerchantId>${TransactionDetails.MerchantId}</MerchantId>
        <OrderNumber>${TransactionDetails.OrderNumber}</OrderNumber>
        <Signature>${TransactionDetails.Signature}</Signature>
        <SignatureMethod>${TransactionDetails.SignatureMethod}</SignatureMethod>
        <TransactionCode>${TransactionDetails.TransactionCode}</TransactionCode>
        <CustomerReference>FAC Web Tools FACPG2: ${
          TransactionDetails.MerchantId
        }</CustomerReference>
    </TransactionDetails> 
    <CardDetails>
        <CardCVV2>${CardDetails.CardCVV2}</CardCVV2>
        <CardExpiryDate>${CardDetails.CardExpiryDate}</CardExpiryDate>
        <CardNumber>${CardDetails.CardNumber}</CardNumber>
        <Installments>0</Installments>
    </CardDetails>
    <BillingDetails>
        <BillToAddress>${""}</BillToAddress>
        <BillToAddress2>${""}</BillToAddress2>
        <BillToZipPostCode>${""}</BillToZipPostCode>
        <BillToFirstName>${""}</BillToFirstName>
        <BillToLastName>${""}</BillToLastName>
        <BillToCity>${""}</BillToCity>
        <BillToState>${""}</BillToState>
        <BillToCountry>${""}</BillToCountry>
        <BillToEmail>${""}</BillToEmail>
        <BillToTelephone>${""}</BillToTelephone>
        <BillToCounty>${""}</BillToCounty>
        <BillToMobile>${""}</BillToMobile>
        <ExtensionData>${""}</ExtensionData>
    </BillingDetails>
    <ShippingDetails>
        <ShipToAddress>${ShippingDetails.ShipToAddress}</ShipToAddress> 
        <ShipToAddress2>${ShippingDetails.ShipToAddress2}</ShipToAddress2> 
        <ShipToZipPostCode>${
          ShippingDetails.ShipToZipPostCode
        }</ShipToZipPostCode> 
        <ShipToFirstName>${ShippingDetails.ShipToFirstName}</ShipToFirstName> 
        <ShipToLastName>${ShippingDetails.ShipToLastName}</ShipToLastName>  
        <ShipToCity>${ShippingDetails.ShipToCity}</ShipToCity> 
        <ShipToState>${ShippingDetails.ShipToState}</ShipToState> 
        <ShipToCountry>${ShippingDetails.ShipToCountry}</ShipToCountry> 
        <ShipToEmail>${ShippingDetails.ShipToEmail}</ShipToEmail> 
        <ShipToTelephone>${ShippingDetails.ShipToTelephone}</ShipToTelephone> 
        <ShipToMobile>${ShippingDetails.ShipToMobile}</ShipToMobile> 
        <ShipToCounty>${ShippingDetails.ShipToCounty}</ShipToCounty>
    </ShippingDetails> 
    <ThreeDSecureDetails>
        <ECIIndicator>${""}</ECIIndicator>
        <AuthenticationResult>${""}</AuthenticationResult>
        <TransactionStain>${""}</TransactionStain>
        <CAVV>${""}</CAVV>
    </ThreeDSecureDetails> 
    <RecurringDetails>
        <IsRecurring>${false}</IsRecurring>
        <ExecutionDate>${""}</ExecutionDate>
        <Frequency>${""}</Frequency>
        <NumberOfRecurrences>${0}</NumberOfRecurrences>
    </RecurringDetails>  
    <FraudDetails>
        <SessionId>${""}</SessionId>
        <AuthResponseCode>${""}</AuthResponseCode>
        <AVSResponseCode>${""}</AVSResponseCode>
        <CVVResponseCode>${""}</CVVResponseCode>
    </FraudDetails> 
    <InterfaceCode />
    <TransactionID>${"00000000-0000-0000-0000-000000000000"}</TransactionID> 
    <Version>0</Version> 
    <ExtensionData />
  </AuthorizeRequest>`;
  return transactionRequest;
};

export {
  GenOrderNum,
  GetTransactionDetails,
  GetCardDetails,
  GetBillingDetails,
  GetShippingDetails,
  ThreeDS,
  parseXmlToJson,
  TransactionRequest,
};
