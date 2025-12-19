declare module "qrcode" {
  interface QRCodeToDataURLOptions {
    errorCorrectionLevel?: "low" | "medium" | "quartile" | "high";
    type?: "image/png" | "image/jpeg";
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  interface QRCodeToStringOptions {
    type?: "utf8" | "terminal";
  }

  function toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>;
  function toString(text: string, options?: QRCodeToStringOptions): Promise<string>;

  export default {
    toDataURL,
    toString,
  };
}
