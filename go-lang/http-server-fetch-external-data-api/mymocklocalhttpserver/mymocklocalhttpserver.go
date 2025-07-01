package mymocklocalhttpserver

import (
	"api-service/apiclient"
	"fmt"
	"log"
	"net/http"
	"sync"
)

// --- Mock External API Server (for apiclient to consume) ---
const (
	MockExternalAPIPort = ":8080"
	MockExternalAPIPath = "/data"
)

var (
	externalRequestCount int
	externalMu           sync.Mutex // Mutex to protect externalRequestCount
)

// startMockExternalAPIServer starts a simple HTTP server that simulates an external API.
// It returns a 500 Internal Server Error for the first few requests, then 200 OK.
func StartMockExternalAPIServer() {
	http.HandleFunc(MockExternalAPIPath, func(w http.ResponseWriter, r *http.Request) {
		externalMu.Lock()
		externalRequestCount++
		currentCount := externalRequestCount
		externalMu.Unlock()

		log.Printf("[Mock External API]: Received request #%d", currentCount)

		// Simulate transient errors for the first few requests
		if currentCount <= 3 { // Return error for the first 3 requests
			statusCode := http.StatusInternalServerError
			if currentCount%2 == 0 { // Alternate between 500 and 503
				statusCode = http.StatusServiceUnavailable
			}
			w.WriteHeader(statusCode)
			apiclient.EncodeJSONResponse(w, apiclient.APIResponse{
				Message: fmt.Sprintf("Simulated error %d (request #%d)", statusCode, currentCount),
				Status:  "error",
			})
			log.Printf("[Mock External API]: Responded with %d for request #%d", statusCode, currentCount)
			return
		}

		// After simulated errors, return success
		w.WriteHeader(http.StatusOK)
		apiclient.EncodeJSONResponse(w, apiclient.APIResponse{
			Message: "Data fetched successfully from mock external API!",
			Status:  "success",
		})
		log.Printf("[Mock External API]: Responded with 200 OK for request #%d", currentCount)
	})

	log.Printf("[Mock External API]: Server starting on port %s%s", MockExternalAPIPort, MockExternalAPIPath)
	if err := http.ListenAndServe(MockExternalAPIPort, nil); err != nil && err != http.ErrServerClosed {
		log.Fatalf("[Mock External API]: Server failed to start: %v", err)
	}
}
