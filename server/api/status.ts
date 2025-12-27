export interface IStatusResponse {
  ip: string;
}

export default defineEventHandler((event): IStatusResponse => {
  return {
    ip: getRequestIP(event, { xForwardedFor: true }) ?? "127.0.0.1",
  };
});
