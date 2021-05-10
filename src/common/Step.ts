import { JKUtil } from "../libs/Application";
import fs from "fs-extra";
import path from "path";
const { Worker } = require("worker_threads");

class Step extends JKUtil {
  public readonly formTypes = ["confirm", "input", "list", "edit"];
  /**
   * Lists
   */
  public async lists() {
    try {
      const { data = [] } = await this.ctx?.Api?.fragments();
      return data;
    } catch (err) {
      return [];
    }
  }

  /**
   * start
   */
  public async start() {
    const lists = await this.lists();
    const name = await this.ctx?.Form?.list({ choices: lists.map((l: any) => l.name) });
    const current = lists.filter((l: any) => l.name === name);

    this.exectorStep(current[0]);
  }

  /**
   * exectorStep
   */
  public async exectorStep(current: any) {
    if (!current) {
      return;
    }
    const res: any = {};
    for (let j = 0; j < current.steps.length; j++) {
      const step: any = current.steps[j];
      if (this.formTypes.includes(step.type)) {
        const name = await (this.ctx?.Form as any)[step.type]({ message: step.describe });
        res[step.field] = name;
      } else if (step.type === "create") {
        step?.files.map(async (file: any) => {
          const a: string = this.ctx?.Template?.template?.render(file.name, res) ?? "";
          const source: string = this.ctx?.Template?.template?.render(file.source, res) ?? "";

          fs.ensureFileSync(path.join(process.cwd(), a));
          fs.writeFileSync(path.join(process.cwd(), a), source);
        });
      } else if (step.type === "eval") {
        const worker = new Worker(step.code, { workerData: { num: 5 }, eval: true });
        worker.once("message", (result: any) => {
          console.log("square of 5 is :", result);
        });
      }
    }
  }
}

export default Step;
