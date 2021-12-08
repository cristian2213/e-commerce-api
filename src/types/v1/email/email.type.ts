export interface HTMLOptions {
  confirmationURL: string;
  info: string;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  file: string;
  htmlOptions: HTMLOptions;
  html?: string;
}
