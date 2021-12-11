export interface HTMLOptions {
  userName: string;
  confirmationURL: string;
  info: string | boolean;
  year: number;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  file: string;
  htmlOptions: HTMLOptions;
  html?: string;
}
