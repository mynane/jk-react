/* eslint-disable prefer-const */
import chalk from "chalk";
import { Command, JKModule } from "../libs/Application";

/**
 * 创建
 */
@Command({
  command: "create",
  description: "创建模块",
  alias: "c",
})
export class Module extends JKModule {
  public action = async () => {
    await this.ctx?.Step?.start();
  };
}
