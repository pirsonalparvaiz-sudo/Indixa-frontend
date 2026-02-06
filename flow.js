import { STATE } from "./state.js";
import { mockSendRequest } from "./mock.js";

/**
 * REQUEST LIFECYCLE
 * USER → ADMIN CHECK → PARTNER MATCH → ACCEPT / REJECT → COMPLETE
 */

export const FLOW = {
  // STEP 1: USER CREATES REQUEST
  createRequest(query, photo = null) {
    const request = {
      id: crypto.randomUUID(),
      query,
      photo,
      location: STATE.user.location,
      status: "CREATED",
      createdAt: Date.now(),
    };
    
    STATE.request = request;
    return request;
  },
  
  // STEP 2: ADMIN RULE CHECK (ON/OFF, LIMITS)
  adminGate(request, CONFIG) {
    if (!CONFIG.FEATURES.SEARCH) {
      return { allowed: false, reason: "Search disabled by admin" };
    }
    
    if (!CONFIG.FEATURES.PARTNER) {
      return { allowed: false, reason: "Partner system disabled" };
    }
    
    return { allowed: true };
  },
  
  // STEP 3: SEND TO MATCHING (MOCK)
  dispatchToPartners(request) {
    const res = mockSendRequest({
      type: "DISPATCH",
      requestId: request.id,
      query: request.query,
      location: request.location,
    });
    
    request.status = "DISPATCHED";
    return res;
  },
  
  // STEP 4: PARTNER RESPONSE
  partnerResponse(request, action) {
    if (action === "ACCEPT") {
      request.status = "ACCEPTED";
      request.acceptedAt = Date.now();
      return { success: true, message: "Partner accepted the job" };
    }
    
    if (action === "REJECT") {
      request.status = "REJECTED";
      return { success: true, message: "Partner rejected, moving to next" };
    }
    
    return { success: false, message: "Invalid action" };
  },
  
  // STEP 5: COMPLETE
  complete(request) {
    request.status = "COMPLETED";
    request.completedAt = Date.now();
    return { success: true, message: "Service completed successfully" };
  },
};