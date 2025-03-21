exports.handler = async (event) => {
  const authHeader = event.headers.authorization || "";
  const encodedCreds = Buffer.from("userX7Q9:PAssw0rd!A9Z").toString("base64");
  const expectedAuth = `Basic ${encodedCreds}`;

  if (authHeader !== expectedAuth) {
      return {
          statusCode: 401,
          headers: {
              "WWW-Authenticate": 'Basic realm="Restricted Area"',
              "Cache-Control": "no-cache, no-store, must-revalidate",
              "Pragma": "no-cache",
              "Expires": "0"
          },
          body: "Unauthorized",
      };
  }

  return {
      statusCode: 200,
      headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
      },
      body: "Authorized",
  };
};
