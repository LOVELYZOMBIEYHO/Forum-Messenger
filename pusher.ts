import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1531131",
  key: "fc0cb6cd169409535f08",
  secret: "289160e39d94e3a6f7e3",
  cluster: "us2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("fc0cb6cd169409535f08", {
  cluster: "us2",
});
