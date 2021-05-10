import WebSocket from "ws";
import Constant from "../config/constant";
import { JKModule } from "../libs/Application";

class Websocket extends JKModule {
  public wss?: Websocket;

  public connected = false;

  /**
   * server
   */
  public server(success: any, close: any, port = Constant.AUTH_PORT) {
    this.wss = new WebSocket.Server({ port }, () => {
      console.log("socket server start.");
    });

    this.on("connection", (ws: any) => {
      this.connected = true;

      ws.on("message", () => success(ws));

      ws.on("close", close);
    });
  }

  /**
   * on
   */
  public on(event: string, callback: any) {
    this.wss?.on(event, callback);
  }

  /**
   * send
   */
  public send(data: any) {
    if (!this.connected) {
      return;
    }
    this.wss?.send(data);
  }
}

export default Websocket;
