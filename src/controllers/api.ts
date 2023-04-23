import { MessageModel } from "../models/message_model";
import { AdminModel } from "../models/admin_models";


// Message
export const post_message = (values: Record<string, any>) => new MessageModel(values).save().then((mgs) =>mgs.toObject()); 
export const get_messages = () => MessageModel.find();
export const delete_message = (id: string) => MessageModel.findByIdAndDelete({_id: id}) 

// Auth
export const create_admin = (values: Record<string, any>) => new AdminModel(values).save().then((admin) => admin.toObject());
export const auth_by_email = ( email: string) => AdminModel.findOne({ email })
export const auth_by_session_token = (session_token: string) => AdminModel.findOne({
    "authentication.session_token": session_token
})