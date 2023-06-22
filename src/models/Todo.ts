import "reflect-metadata";

import { v4 } from 'uuid';
import './index';
import { prop as Property, ModelOptions as Options,  getModelForClass, ReturnModelType } from '@typegoose/typegoose';

@Options({ schemaOptions: { versionKey: false }, options: { automaticName: false, customName: 'todos' }})
export class TodoClass {
  @Property({ type: () => String, default: () => v4().toString() })
  public _id!: string;

  @Property({ type: () => String })
  public title?: string;

  @Property({ type: () => Boolean })
  public done?: boolean;

  public static async fetchAll(this: ReturnModelType<typeof TodoModel>) {
    const results = await this.find();
    return results.map(el => el.toObject());
  }
}

export const TodoModel = getModelForClass(TodoClass);
