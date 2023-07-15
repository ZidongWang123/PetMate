const CLIENT_ID =
  "Ad8WcNeM12p5gnrqaZUIKL-5x9mP9JpRaNSulzlMFkcDcPI3xSwU013KEXgvPwyiDUslvp2rWIttfjOa";
const APP_SECRET =
  "EKzui9wz6FtzjyqErFMoqBUSRg-qVeMvLmWH5B1lCeTRil9N8Zu8LM_kD1lxK0DfBo6ptdhvsGlXrws7";

const base = "https://api-m.sandbox.paypal.com";

export async function createOrder(data) {
  console.log("create a order now");
  const accessToken = await generateAccessToken();
  console.log("accessToken", accessToken);
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: data.product.cost,
          },
        },
      ],
    }),
  });
  const createData = response.json();
  //db update
  console.log("create order response", response.status);
  return createData;
}

export async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // db update
  console.log("capture payment ");
  return handleResponse(response);
}

export async function generateAccessToken() {
  console.log("cid", CLIENT_ID);
  console.log("sdk", APP_SECRET);
  const auth = Buffer.from(
    "Ad8WcNeM12p5gnrqaZUIKL-5x9mP9JpRaNSulzlMFkcDcPI3xSwU013KEXgvPwyiDUslvp2rWIttfjOa:EKzui9wz6FtzjyqErFMoqBUSRg-qVeMvLmWH5B1lCeTRil9N8Zu8LM_kD1lxK0DfBo6ptdhvsGlXrws7"
  ).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  console.log("jsonData", jsonData);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
