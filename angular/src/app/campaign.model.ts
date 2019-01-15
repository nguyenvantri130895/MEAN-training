export class Campaign {
  accountId: String;
  name: String;
  created: String;
  createdBy: String;
  modified: String;
  modifiedBy: String;
  statistics: {
    channels: Number,
    emailsRecipients: Number,
    emailsSent: Number,
    smsRecipients: Number,
    smsSent: Number,
  };
}
