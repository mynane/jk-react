import template from "art-template";
import { JKUtil } from "../libs/Application";

class Template extends JKUtil {
  public template = template;
  constructor() {
    super();
    this.template.defaults.imports.firstCharToUpperCase = this.firstCharToUpperCase;
  }

  /**
   * firstCharToUpperCase
   */
  public firstCharToUpperCase(str = "") {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  }
}

export default Template;
