export interface MailOptions {
    From: {
      Email: string,
      Name: string,
    },
    To: Array<{Email: string}>,
    Subject: string,
    TextPart: string,
    HTMLPart: string,
    CustomID: string
  }
  
  export interface MailjetConfig {
    apiKey: string,
    apiSecret: string
  }
  