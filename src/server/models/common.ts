interface BaseObject {
  _id?: string;
  __v?: string;
}

export const defaultSchemaOptions = {
  toObject: {
    transform: function (doc: unknown, ret: BaseObject) {
      delete ret._id;
      delete ret.__v;
    }
  },
  toJSON: {
    transform: function (doc: unknown, ret: BaseObject) {
      delete ret._id;
      delete ret.__v;
    }
  }
} as const;
