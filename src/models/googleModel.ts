import { model } from 'mongoose';
import googleUser, { GUserSchema } from '../schema/googleUserSchema';

const GoogleModel = model<GUserSchema>('GUser', googleUser);

export default GoogleModel;
