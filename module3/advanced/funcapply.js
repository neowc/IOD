// Exercise 2: “Team Meeting” - Passing Arguments with apply
// Goal: Learn how to use apply to invoke a function with a specific context and an array of arguments.
const teamLeader = {
    name: "Iron Man"
};

const teamMembers = ["Captain America", "Thor", "Hulk"];

// Instructions:
// Create an object teamLeader with a name and a method announceMeeting.
// Write a function startMeeting that logs which team members are attending.
function startMeeting(teamMembers) {
    console.log(`${this.name} is starting a meeting with: ${teamMembers.join(", ")}`);
}
// Use apply to invoke startMeeting in the context of teamLeader, passing an array of team members.
startMeeting.apply(teamLeader, [teamMembers]);
// Output: Iron Man is starting a meeting with: Captain America, Thor, Hulk

// Use apply to invoke startMeeting in the context of teamLeader, passing individual arguments.
//startMeeting.apply(teamLeader, teamMembers);

