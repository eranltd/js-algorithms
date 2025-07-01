package apiclient

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"time"
)

// APIResponse is the data structure for the mock API response.
type APIResponse struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

// FetchDataWithBackoff attempts to fetch data from the given URL with exponential backoff.
// It is now exported (capitalized) to be accessible from other packages.
func FetchDataWithBackoff(url string) (*APIResponse, error) {
	const (
		maxRetries   = 5
		initialDelay = 100 * time.Millisecond
		maxDelay     = 5 * time.Second
		jitterFactor = 0.2 // 20% jitter
	)

	client := &http.Client{
		Timeout: 10 * time.Second, // Global timeout for the HTTP client
	}

	for i := 0; i < maxRetries; i++ {
		log.Printf("Attempt %d/%d: Fetching data from %s...", i+1, maxRetries, url)

		resp, err := client.Get(url)
		if err != nil {
			log.Printf("Attempt %d failed: Network error: %v", i+1, err)
			// Check if it's the last attempt
			if i == maxRetries-1 {
				return nil, fmt.Errorf("failed to fetch data after %d retries: %w", maxRetries, err)
			}
			// Sleep and retry
			sleepForBackoff(i, initialDelay, maxDelay, jitterFactor)
			continue
		}
		defer resp.Body.Close()

		// Check for successful status codes (2xx)
		if resp.StatusCode >= 200 && resp.StatusCode < 300 {
			bodyBytes, err := io.ReadAll(resp.Body)
			if err != nil {
				return nil, fmt.Errorf("failed to read response body: %w", err)
			}

			var apiResponse APIResponse
			if err := json.Unmarshal(bodyBytes, &apiResponse); err != nil {
				return nil, fmt.Errorf("failed to unmarshal JSON response: %w", err)
			}
			log.Printf("Attempt %d successful. Status: %s, Message: %s", i+1, apiResponse.Status, apiResponse.Message)
			return &apiResponse, nil
		}

		// Handle server errors (5xx) which are often transient
		if resp.StatusCode >= 500 && resp.StatusCode < 600 {
			log.Printf("Attempt %d failed: Server error %d %s", i+1, resp.StatusCode, http.StatusText(resp.StatusCode))
			// Check if it's the last attempt
			if i == maxRetries-1 {
				return nil, fmt.Errorf("failed to fetch data after %d retries: last attempt resulted in %d %s", maxRetries, resp.StatusCode, http.StatusText(resp.StatusCode))
			}
			// Sleep and retry
			sleepForBackoff(i, initialDelay, maxDelay, jitterFactor)
			continue
		}

		// Handle other client or unretryable errors (e.g., 4xx)
		bodyBytes, _ := io.ReadAll(resp.Body) // Read body for more context if available
		return nil, fmt.Errorf("unretryable error: received status %d %s, response: %s", resp.StatusCode, http.StatusText(resp.StatusCode), string(bodyBytes))
	}

	return nil, fmt.Errorf("failed to fetch data after %d retries (should not reach here)", maxRetries)
}

// sleepForBackoff calculates the exponential backoff delay with jitter and sleeps.
// It is now a private helper function within the apiclient package.
func sleepForBackoff(attempt int, initialDelay, maxDelay time.Duration, jitterFactor float64) {
	// Calculate base delay: initialDelay * 2^attempt
	delay := initialDelay * time.Duration(1<<attempt)
	if delay > maxDelay {
		delay = maxDelay
	}

	// Add jitter: random +/- jitterFactor percentage of the delay
	jitter := time.Duration(rand.Float64() * jitterFactor * float64(delay))
	if rand.Intn(2) == 0 { // Randomly add or subtract jitter
		delay += jitter
	} else {
		delay -= jitter
	}

	// Ensure delay is not negative
	if delay < 0 {
		delay = 0
	}

	log.Printf("Waiting for %v before next retry...", delay)
	time.Sleep(delay)
}

// EncodeJSONResponse is a helper function for the mock API to encode JSON responses.
// It's placed here because APIResponse is defined in this package.
func EncodeJSONResponse(w http.ResponseWriter, data interface{}) {
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("Error encoding JSON response: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
	}
}
