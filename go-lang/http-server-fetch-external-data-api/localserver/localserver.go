package localserver

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"
)

// LocalServerPort is the port for the local Express-like server.
const LocalServerPort = ":8081" // Exported constant

// Post represents a single blog post or similar content.
type Post struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"author"`
	Created string `json:"created"`
}

// cacheEntry holds a Post and its expiration time.
type cacheEntry struct {
	data      Post
	expiresAt time.Time
}

const (
	// CacheTimeoutSeconds defines how long an item stays in cache (3600 seconds = 1 hour).
	CacheTimeoutSeconds = 3600
)

var (
	posts      = make(map[int]Post) // In-memory storage for posts
	nextPostID = 1
	postsMu    sync.Mutex // Mutex to protect posts map and nextPostID

	postCache = make(map[int]cacheEntry) // Cache for posts
	cacheMu   sync.Mutex                 // Mutex to protect postCache
)

// createPost handles POST /api/post requests to upload a new post.
func createPost(w http.ResponseWriter, r *http.Request) {
	var newPost Post
	err := json.NewDecoder(r.Body).Decode(&newPost)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Printf("[Local Server]: Error decoding new post: %v", err)
		return
	}

	postsMu.Lock()
	newPost.ID = nextPostID
	nextPostID++
	newPost.Created = time.Now().Format(time.RFC3339) // Add creation timestamp
	posts[newPost.ID] = newPost
	postsMu.Unlock()

	// Invalidate cache for this specific post if it was previously cached
	// This ensures that if a post is updated (or re-created with same ID logic, though here it's new ID)
	// the cache doesn't serve stale data.
	cacheMu.Lock()
	delete(postCache, newPost.ID)
	cacheMu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Post created successfully",
		"id":      newPost.ID,
		"post":    newPost,
	})
	log.Printf("[Local Server]: Created new post with ID: %d", newPost.ID)
}

// getPost handles GET /api/post/{id} requests to retrieve a post by ID.
// This function is designed to work with paths where the ID is the 4th segment (e.g., /api/post/1).
func getPost(w http.ResponseWriter, r *http.Request) {
	// Extract ID from the URL path. Expected format: /api/post/{id}
	pathSegments := strings.Split(r.URL.Path, "/")
	// pathSegments will be ["", "api", "post", "{id}"]
	if len(pathSegments) < 4 || pathSegments[3] == "" {
		http.Error(w, "Post ID missing in URL", http.StatusBadRequest)
		return
	}

	idStr := pathSegments[3]
	retrievePostAndRespond(w, r, idStr)
}

// getPostJson handles GET /api/post/json/{id} requests to retrieve a post by ID.
// This function is designed to work with paths where the ID is the 5th segment (e.g., /api/post/json/1).
func getPostJson(w http.ResponseWriter, r *http.Request) {
	// Extract ID from the URL path. Expected format: /api/post/json/{id}
	pathSegments := strings.Split(r.URL.Path, "/")
	// pathSegments will be ["", "api", "post", "json", "{id}"]
	if len(pathSegments) < 5 || pathSegments[4] == "" {
		http.Error(w, "Post ID missing in URL", http.StatusBadRequest)
		return
	}

	idStr := pathSegments[4]
	retrievePostAndRespond(w, r, idStr)
}

// retrievePostAndRespond contains the core logic for fetching a post and responding,
// used by both getPost and getPostJson.
func retrievePostAndRespond(w http.ResponseWriter, r *http.Request, idStr string) {
	postID, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid post ID format", http.StatusBadRequest)
		return
	}

	// --- Cache Layer ---
	cacheMu.Lock()
	cachedEntry, foundInCache := postCache[postID]
	cacheMu.Unlock()

	if foundInCache && time.Now().Before(cachedEntry.expiresAt) {
		// Cache hit and not expired
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(cachedEntry.data)
		log.Printf("[Local Server]: Retrieved post with ID: %d from cache", postID)
		return
	}

	// Cache miss or expired, fetch from main storage
	log.Printf("[Local Server]: Cache miss or expired for post ID: %d. Fetching from storage.", postID)

	postsMu.Lock()
	post, found := posts[postID]
	postsMu.Unlock()

	if !found {
		http.Error(w, "Post not found", http.StatusNotFound)
		log.Printf("[Local Server]: Post with ID %d not found in storage", postID)
		return
	}

	// Store in cache
	cacheMu.Lock()
	postCache[postID] = cacheEntry{
		data:      post,
		expiresAt: time.Now().Add(CacheTimeoutSeconds * time.Second),
	}
	cacheMu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
	log.Printf("[Local Server]: Retrieved post with ID: %d from storage and cached", postID)
}

// StartLocalServer sets up the routes for the Express-like server and starts it.
// This function is exported (capitalized) so it can be called from main.
func StartLocalServer() {
	// Handler for POST /api/post
	http.HandleFunc("/api/post", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			createPost(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	// Handler for GET /api/post/{id}
	http.HandleFunc("/api/post/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			getPost(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	// New Handler for GET /api/post/json/{id}
	http.HandleFunc("/api/post/json/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			getPostJson(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	log.Printf("[Local Server]: Starting on port %s", LocalServerPort)
	if err := http.ListenAndServe(LocalServerPort, nil); err != nil && err != http.ErrServerClosed {
		log.Fatalf("[Local Server]: Server failed to start: %v", err)
	}
}
