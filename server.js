const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[SERVER] Sierra webhook listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Sierra Webhook!");
});

app.post("/webhook", express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add(`Welcome to Sierra!`);
  }

  function demo(agent) {
    agent.add("Sending response from webhook server as Sierra v1");
  }

  function arrangeMeeting(agent) {
    const a = 1;
    const b = 2;
    const c = 3;
    var payloadData = {
      richContent: [
        [
          {
            type: "info",
            title: "Available Dates",
            subtitle:
              "Your Academic Director is Available on these dates. Please choose one:",
          },
          {
            type: "divider",
          },
          {
            type: "list",
            title: "31/05/2022",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: a,
              },
            },
          },
          {
            type: "list",
            title: "02/06/2022",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: b,
              },
            },
          },
          {
            type: "list",
            title: "03/06/2022",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: c,
              },
            },
          },
        ],
      ],
    };

    agent.add(
      new Payload(agent.UNSPECIFIED, payloadData, {
        sendAsMessage: true,
        rawPayload: true,
      })
    );
  }

  let intentMap = new Map();

  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("demo", demo);
  intentMap.set("arrangeMeeting", arrangeMeeting);

  agent.handleRequest(intentMap);
});
