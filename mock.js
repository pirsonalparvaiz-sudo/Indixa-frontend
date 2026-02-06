// core/mock.js
export function mockSendRequest(data) {
  console.log("MOCK REQUEST SENT:", data);
  
  return {
    success: true,
    message: "Request received. Provider will respond shortly.",
  };
}