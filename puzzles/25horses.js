/*
    There are 25 horses among which you need to find out the fastest 3 horses.
    You can conduct a race among at most 5 to find out their relative speed.
    At no point, you can find out the actual speed of the horse in a race.
    Find out the minimum no. of races which are required to get the top 3 horses.
*/

/* Answer */
/*

You're asking to label the horses differently to represent the groups in Round 1, which is a good way to keep track! Yes, we can definitely do that. It makes the initial organization clearer.

Let's re-label the horses for the 5 initial groups and then proceed through the rounds.

The Setup
We have 25 horses. We'll divide them into 5 groups, and label them as follows:

Group A: A1, A2, A3, A4, A5

Group B: B1, B2, B3, B4, B5

Group C: C1, C2, C3, C4, C5

Group D: D1, D2, D3, D4, D5

Group E: E1, E2, E3, E4, E5

Round 1: Initial Races (5 Races)
In this round, we race each group. We note the order, with the lowest number indicating the fastest horse within that group (e.g., A1 is the fastest in Group A, A2 is second fastest, etc.).

Race Group A: A1 > A2 > A3 > A4 > A5

Race Group B: B1 > B2 > B3 > B4 > B5

Race Group C: C1 > C2 > C3 > C4 > C5

Race Group D: D1 > D2 > D3 > D4 > D5

Race Group E: E1 > E2 > E3 > E4 > E5

After Round 1, we know the fastest horse from each group: A1, B1, C1, D1, E1.

Round 2: Race of Winners (1 Race)
Now we take the fastest horse from each of the 5 groups and race them against each other.

Race the Group Winners: A1, B1, C1, D1, E1

Record Results: Let's assume the result of this race is:
A1 > B1 > C1 > D1 > E1

Based on this race:

A1 is definitely the fastest horse overall. (The 1st fastest horse)

Round 3: The Deciding Race (1 Race)
We now need to find the 2nd and 3rd fastest horses. We select 5 potential contenders for these spots.

From Round 2, we know A1 is the fastest. We consider horses that could be the second or third fastest based on their performance in the previous rounds.

Here are the horses to include in this final race:

The 2nd and 3rd place horses from the winner's race (Round 2):

B1 (finished 2nd in the winner's race)

C1 (finished 3rd in the winner's race)

The 2nd and 3rd fastest horses from the group of the overall winner (A1's group):

A2 (2nd fastest in Group A)

A3 (3rd fastest in Group A)

The 2nd fastest horse from the group of the horse that placed 2nd in the winner's race (B1's group):

B2 (2nd fastest in Group B)

So, the horses in the final race are:
B1, C1, A2, A3, B2

Why these specific horses?

Any horse that finished 4th or 5th in their initial group (e.g., A4, A5, B4, B5, etc.) cannot be in the top 3 overall. They were already beaten by at least three horses within their own group.

Any horse from a group whose winner finished 4th or 5th in the winner's race (e.g., D1's group or E1's group) cannot be among the top 3 overall. For example, if D1 was beaten by A1, B1, and C1, then D2, D3, D4, D5 are even slower.

Run the final race: Race these 5 horses (B1, C1, A2, A3, B2).

Let's assume the final race results in:
B1 > A2 > C1 > B2 > A3

Therefore, the three fastest horses overall are:

A1 (from Round 2 - the undisputed fastest)

B1 (1st in Round 3)

A2 (2nd in Round 3)

This approach, with the A1, B1, C1, etc., labeling, makes it easier to trace which horses are being referred to from which initial group. The logic remains the same, ensuring you find the top 3 in 7 races.

*/