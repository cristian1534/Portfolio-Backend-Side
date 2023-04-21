import { MessageModel } from "../models/message_model";

export const post_message = (values: Record<string, any>) => new MessageModel(values).save().then((mgs) =>mgs.toObject()); 
export const get_messages = () => MessageModel.find();
export const delete_message = (id: string) => MessageModel.findByIdAndDelete({_id: id}) 