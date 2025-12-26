export default defineEventHandler((event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "127.0.0.1";
  return {
    ip: ip,
  };
});
