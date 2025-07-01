package main

//defer keyword allows you to schedule function calls for execution at the end of the current function, regardless of whether it exits normally or panics.
//panic keyword is used to signal a critical error that stops normal execution.
//recover keyword allows you to regain control from a panic and potentially handle the error within a deferred function.

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"api-service/apiclient"   // Import the apiclient package
	"api-service/localserver" // Import the new localserver package
	"api-service/mymocklocalhttpserver"
	//import the mock http server
)

func main() {
	// Seed the random number generator for jitter (used by apiclient)
	rand.Seed(time.Now().UnixNano())

	// Start the mock external API server in a goroutine
	go mymocklocalhttpserver.StartMockExternalAPIServer()

	// Start the local Express-like server in a goroutine
	// This calls the exported StartLocalServer function from the localserver package.
	go localserver.StartLocalServer()

	// Give servers a moment to start
	time.Sleep(500 * time.Millisecond)

	// --- Demonstrate Client-side API call (to mock external API) ---
	log.Println("\n--- Demonstrating Client-side API Call ---")
	externalAPIURL := fmt.Sprintf("http://localhost%s%s", mymocklocalhttpserver.MockExternalAPIPort, mymocklocalhttpserver.MockExternalAPIPath)

	response, err := apiclient.FetchDataWithBackoff(externalAPIURL)
	if err != nil {
		log.Printf("Error fetching data from external API: %v", err)
	} else {
		log.Printf("Successfully fetched data from external API: %+v", response)
	}

	// --- Demonstrate Local Server API calls ---
	log.Println("\n--- Demonstrating Local Server API Calls ---")

	// 1. POST a new post
	// Using the exported LocalServerPort constant from the localserver package.
	postURL := fmt.Sprintf("http://localhost%s/api/post", localserver.LocalServerPort)
	newPostData := `{"title": "My First Go Post", "content": "This is the content of my first post.", "author": "GoLang Fan"}`
	resp, err := http.Post(postURL, "application/json", strings.NewReader(newPostData))
	if err != nil {
		log.Printf("Error POSTing new post: %v", err)
	} else {
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)
		log.Printf("POST /api/post Response (%d): %s", resp.StatusCode, string(body))
	}

	// Wait a bit to ensure the POST request is processed
	time.Sleep(100 * time.Millisecond)

	// 2. GET the post we just created (assuming ID 1 for the first post)
	getPostURL := fmt.Sprintf("http://localhost%s/api/post/1", localserver.LocalServerPort)
	resp, err = http.Get(getPostURL)
	if err != nil {
		log.Printf("Error GETting post 1: %v", err)
	} else {
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)
		log.Printf("GET /api/post/1 Response (%d): %s", resp.StatusCode, string(body))
	}

	// 2.1 GET the post ID 1 -> from cache layer
	getPostURL2 := fmt.Sprintf("http://localhost%s/api/post/1", localserver.LocalServerPort)
	resp, err = http.Get(getPostURL2)
	if err != nil {
		log.Printf("Error GETting post 1: %v", err)
	} else {
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)
		log.Printf("GET /api/post/1 Response (%d): %s", resp.StatusCode, string(body))
	}

	// 3. GET the post using the new /api/post/json/{id} route
	getPostJsonURL := fmt.Sprintf("http://localhost%s/api/post/json/1", localserver.LocalServerPort)
	resp, err = http.Get(getPostJsonURL)
	if err != nil {
		log.Printf("Error GETting post 1 via /api/post/json/: %v", err)
	} else {
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)

		var result map[string]interface{}
		if err := json.Unmarshal(body, &result); err != nil {
			log.Printf("Error unmarshalling JSON response: %v", err)
			return
		}

		title, ok := result["title"].(string)
		if !ok {
			log.Printf("Title not found or not a string in JSON response")
			return
		}

		log.Printf("GET /api/post/json/1 Response (%d): Title: [%s]", resp.StatusCode, title)
	}

	// 3. Attempt to GET a non-existent post
	getNonExistentPostURL := fmt.Sprintf("http://localhost%s/api/post/999", localserver.LocalServerPort)
	resp, err = http.Get(getNonExistentPostURL)
	if err != nil {
		log.Printf("Error GETting non-existent post: %v", err)
	} else {
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)
		log.Printf("GET /api/post/999 Response (%d): %s", resp.StatusCode, string(body))
	}

	// Keep the main goroutine alive for a while to allow servers to run
	select {} // Block forever
}

/**
If we like to convert our response to JSON like:

func main() {
 p := Person{"rahul", 12}
 jsondata, _ := json.Marshal(p);

 fmt.Println(string(jsondata)) // Json Data:=> {"Name":"rahul","Age":12}
 fmt.Println(jsondata) // Marshal Data:=> [123 34 78 97 109 101 34 58 34 114 97 104 117 108 34 44 34 65 103 101 34 58 49 50 125]

}

*/
