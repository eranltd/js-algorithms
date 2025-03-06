# JS Algorithms

This project is dedicated to sharing solutions to JavaScript interview questions from various sources. Each problem contains a description and a solution.

## Table of Contents

- [Introduction](#introduction)
- [Problems and Solutions](#problems-and-solutions)
- [Main Algorithms to Know and Remember](#main-algorithms-to-know-and-remember)

- [Contributing](#contributing)
- [License](#license)

## Introduction

In this repository, you will find a collection of JavaScript interview questions \ algorithms along with their solutions. The goal is to help developers prepare for technical interviews by providing clear and concise explanations and code examples.

## Problems and Solutions

Each problem in this repository includes:
- A detailed description of the problem
- A step-by-step solution in JavaScript

## Main Algorithms to Know and Remember

- [Sliding Window Pattern](#sliding-window-pattern)
- [Two Pointers Pattern](#two-pointers-pattern)
- [Frequency Counter Pattern](#frequency-counter-pattern)
- [Divide and Conquer Pattern](#divide-and-conquer-pattern)
- [Dynamic Programming Pattern](#dynamic-programming-pattern)
- [Greedy Algorithm Pattern](#greedy-algorithm-pattern)
- [Backtracking Pattern](#backtracking-pattern)
- [Bit Manipulation Pattern](#bit-manipulation-pattern)
- [Topological Sort Pattern](#topological-sort-pattern)
- [Breadth First Search Pattern](#breadth-first-search-pattern)
- [Depth First Search Pattern](#depth-first-search-pattern)
- [Graph Pattern](#graph-pattern)
- [Tree Pattern](#tree-pattern)
- [Trie Pattern](#trie-pattern)
- [Segment Tree Pattern](#segment-tree-pattern)
- [Binary Search Pattern](#binary-search-pattern)
- [Union Find Pattern](#union-find-pattern)
- [Minimax Pattern](#minimax-pattern)
- [KMP Pattern](#kmp-pattern)
- [Rabin-Karp Pattern](#rabin-karp-pattern)
- [Aho-Corasick Pattern](#aho-corasick-pattern)
- [Boyer-Moore Pattern](#boyer-moore-pattern)
- [Z Algorithm Pattern](#z-algorithm-pattern)
- [Suffix Array Pattern](#suffix-array-pattern)
- [Suffix Tree Pattern](#suffix-tree-pattern)
- [Manacher](#manacher)
- [Floyd's Tortoise and Hare (Cycle Detection)](#floyds-tortoise-and-hare-cycle-detection)
- [Kadane's Algorithm](#kadanes-algorithm)
- [Dijkstra's Algorithm](#dijkstras-algorithm)
- [Bellman-Ford Algorithm](#bellman-ford-algorithm)
- [Prim's Algorithm](#prims-algorithm)
- [Kruskal's Algorithm](#kruskals-algorithm)
- [A* Algorithm](#a-algorithm)
- [Floyd-Warshall Algorithm](#floyd-warshall-algorithm)
- [Johnson's Algorithm](#johnsons-algorithm)
- [Edmonds-Karp Algorithm](#edmonds-karp-algorithm)
- [Hopcroft-Karp Algorithm](#hopcroft-karp-algorithm)
- [Hungarian Algorithm](#hungarian-algorithm)

### Sliding Window Pattern
The sliding window pattern involves creating a window which can either be an array or number from one position to another. Depending on a certain condition, the window either increases or closes (and a new window is created). Very useful for keeping track of a subset of data in an array/string etc.

### Two Pointers Pattern

The two pointers pattern involves creating two pointers that move towards each other or in the same direction. Depending on a certain condition, the pointers either move closer or farther apart. Very useful for finding pairs of elements in a sorted array or string.

### Frequency Counter Pattern

The frequency counter pattern uses objects or sets to collect values/frequencies of values. This can often avoid the need for nested loops or O(n^2) operations with arrays/strings.

### Divide and Conquer Pattern

The divide and conquer pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data. This pattern can tremendously reduce time complexity.

### Dynamic Programming Pattern

Dynamic programming is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.

### Greedy Algorithm Pattern

A greedy algorithm is an algorithmic paradigm that follows the problem-solving heuristic of making the locally optimal choice at each stage with the intent of finding a global optimum.

### Backtracking Pattern

Backtracking is a general algorithm for finding all (or some) solutions to some computational problems, notably constraint satisfaction problems, that incrementally builds candidates to the solutions, and abandons a candidate as soon as it determines that the candidate cannot possibly be completed to a valid solution.

### Bit Manipulation Pattern

Bit manipulation is the act of algorithmically manipulating bits or binary digits. Computational problems that require bit manipulation include those that ask you to find the number of bits set to 1 in a binary representation of a number, or the number of bits that need to be flipped to convert one number to another.

### Topological Sort Pattern

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u v, vertex u comes before v in the ordering. Topological Sorting for a graph is not possible if the graph is not a DAG.

### Breadth First Search Pattern

Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

### Depth First Search Pattern

Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.

### Graph Pattern

A graph is a data structure that consists of the following two components:

1. A finite set of vertices also called as nodes.
2. A finite set of ordered pair of the form (u, v) called as edge. The pair is ordered because (u, v) is not the same as (v, u) in case of a directed graph(di-graph). The pair of the form (u, v) indicates that there is an edge from vertex u to vertex v. The edges may contain weight/value/cost.

### Tree Pattern

A tree is a widely used data structure that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes.

### Trie Pattern

A trie, also called digital tree or prefix tree, is a kind of search tree—an ordered tree data structure used to store a dynamic set or associative array where the keys are usually strings.

### Segment Tree Pattern

A segment tree is a tree data structure for storing intervals or segments. It allows querying which of the stored segments contain a given point.

### Binary Search Pattern

Binary search is a fast search algorithm with run-time complexity of O(log n). This search algorithm works on the principle of divide and conquer. For this algorithm to work properly, the data collection should be in the sorted form.

### Union Find Pattern

A disjoint-set data structure, also called a union–find data structure or merge–find set, is a data structure that tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets.

### Minimax Pattern

Minimax (sometimes MinMax, MM or saddle point) is a decision rule used in decision theory, game theory, statistics, philosophy, and artificial intelligence. It is a method used for minimizing the possible loss for a worst-case scenario.

### KMP Pattern

The Knuth–Morris–Pratt string-searching algorithm (or KMP algorithm) searches for occurrences of a "word" W within a main "text string" S by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin, thus bypassing re-examination of previously matched characters.

### Rabin-Karp Pattern

The Rabin–Karp algorithm is a string-searching algorithm created by Richard M. Karp and Michael O. Rabin (1987) that uses hashing to find any one of a set of pattern strings in a text. It is particularly effective for larger texts and multiple patterns.

### Aho-Corasick Pattern

The Aho–Corasick algorithm is a string-searching algorithm invented by Alfred V. Aho and Margaret J. Corasick. It is a kind of dictionary-matching algorithm that locates elements of a finite set of strings (the "dictionary") within an input text.

### Boyer-Moore Pattern

The Boyer–Moore string-search algorithm is an efficient string-searching algorithm that is the standard benchmark for practical string-search literature. It was developed by Robert S. Boyer and J Strother Moore in 1977.

### Z Algorithm Pattern

The Z algorithm is an algorithm that solves the problem of finding all occurrences of a pattern in a text in linear time. It was conceived by computer scientist Dan Gusfield in 1992.

### Suffix Array Pattern

A suffix array is a sorted array of all suffixes of a given string. It is a data structure used, among others, in full-text indices, data compression algorithms, and within the field of bioinformatics.

### Suffix Tree Pattern

A suffix tree is a compressed trie containing all the suffixes of the given text as their keys and positions in the text as their values. Suffix trees allow particularly fast implementations of many important string

### Manacher

Manacher's algorithm is a linear time algorithm used to find the longest palindromic substring of a string.

### Floyd's Tortoise and Hare (Cycle Detection)

Floyd's cycle-finding algorithm is a pointer algorithm that uses only two pointers, which move through the sequence at different speeds. It is also called the "tortoise and the hare algorithm".

### Kadane's Algorithm

Kadane's algorithm is used to find the maximum subarray sum in an array of integers.

### Dijkstra's Algorithm

Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.

### Bellman-Ford Algorithm

The Bellman–Ford algorithm is an algorithm that computes shortest paths from a single source vertex to all of the other vertices in a weighted graph. It is slower than Dijkstra's algorithm for the same problem, but more versatile, as it is capable of handling graphs in which some of the edge weights are negative numbers.

### Prim's Algorithm

Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.

### Kruskal's Algorithm

Kruskal's algorithm is a minimum-spanning-tree algorithm that finds an edge of the least possible weight that connects any two trees in the forest. It is a greedy algorithm in graph theory as it finds a minimum spanning tree for a connected weighted graph adding increasing cost arcs at each step.

### A* Algorithm

A* is a computer algorithm that is widely used in pathfinding and graph traversal, which is the process of plotting an efficiently directed path between multiple points, called nodes.

### Floyd-Warshall Algorithm

The Floyd–Warshall algorithm is an algorithm for finding the shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles). A single execution of the algorithm will find the lengths (summed weights) of the shortest paths between all pairs of vertices.

### Johnson's Algorithm

Johnson's algorithm is a way to find the shortest paths between all pairs of vertices in a sparse, directed graph. It allows some of the edge weights to be negative numbers, but no negative-weight cycles may exist.

### Edmonds-Karp Algorithm

The Edmonds–Karp algorithm is an implementation of the Ford–Fulkerson method for computing the maximum flow in a flow network in graph theory. It is notable for its ability to efficiently find the maximum flow in a network.

### Hopcroft-Karp Algorithm

The Hopcroft–Karp algorithm is an algorithm that takes an undirected graph and produces a maximum cardinality matching, it is also called the Kuhn–Munkres algorithm.

### Hungarian Algorithm

The Hungarian algorithm is a combinatorial optimization algorithm that solves the assignment problem in polynomial time and which anticipated later primal-dual methods. It was developed and published in 1955 by Harold Kuhn, who gave the name "Hungarian method" because the algorithm was largely based on the earlier works of two Hungarian mathematicians: Dénes Kőnig and Jenő Egerváry.


## Contributing

We welcome contributions from the community. If you have a new problem and solution to share, please follow these steps:
1. Fork the repository
2. Create a new branch
3. Add your problem and solution
4. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.