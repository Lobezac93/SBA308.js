
const CourseInfo = {
  id: 452,
  name: "Introduction to Biology"
};

// Updated Assignment Group
const AssignmentGroup = {
  id: 14346,
  name: "Fundamentals of Biology",
  course_id: 652,
  group_weight: 30,
  assignments: [
    {
      id: 1,
      name: "Basic Cell Structure",
      due_at: "2023-02-16",
      points_possible: 50
    },
    {
      id: 2,
      name: "Genetic Variation",
      due_at: "2023-03-30",
      points_possible: 100
    },
    {
      id: 3,
      name: "Human Anatomy Overview",
      due_at: "2023-04-30",
      points_possible: 200
    }
  ]
};
  //=== creating a function that accepts getLearnerData that takes courseinfo, assignment group and learner submission
  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    try {
      // Validate Course and Assignment Group
      if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw new Error('Invalid course ID in AssignmentGroup');
      }
  
      // Create a map of assignment IDs to points possible
      const assignmentPoints = {};
      AssignmentGroup.assignments.forEach(assignment => {
        if (typeof assignment.points_possible !== 'number' || assignment.points_possible <= 0) {
          throw new Error(`Invalid points_possible for assignment ID ${assignment.id}`);
        }
        assignmentPoints[assignment.id] = assignment.points_possible;
      });
  
      // Create a map to store learner data
      const learnerData = {};
  
      LearnerSubmissions.forEach(submission => {
        const { learner_id, assignment_id, submission: { submitted_at, score } } = submission;
  
        if (typeof learner_id !== 'number' || typeof assignment_id !== 'number' || typeof score !== 'number') {
          throw new Error('Invalid data type in LearnerSubmissions');
        }
  
        const assignmentPointsPossible = assignmentPoints[assignment_id];
        if (!assignmentPointsPossible) {
          // Skip if assignment ID is not found
          return;
        }
  
        // Record the score for each assignment
        if (!learnerData[learner_id]) {
          learnerData[learner_id] = {
            id: learner_id,
            avg: 0,
            assignments: {}
          };
        }
  
        learnerData[learner_id].assignments[assignment_id] = (score / assignmentPointsPossible) * 100;
      });
  
      // Calculate the weighted average for each learner
      Object.values(learnerData).forEach(learner => {
        let totalPointsPossible = 0;
        let totalPointsEarned = 0;
  
        AssignmentGroup.assignments.forEach(assignment => {
          const pointsPossible = assignment.points_possible;
          if (pointsPossible <= 0) return; // Skip if points_possible is invalid
  
          if (learner.assignments[assignment.id] !== undefined) {
            totalPointsPossible += pointsPossible;
            totalPointsEarned += (learner.assignments[assignment.id] / 100) * pointsPossible;
          }
        });
  
        if (totalPointsPossible > 0) {
          learner.avg = (totalPointsEarned / totalPointsPossible) * 100;
        } else {
          learner.avg = 0;
        }
      });
  
      // Convert learnerData object to an array
      return Object.values(learnerData).map(learner => ({
        id: learner.id,
        avg: parseFloat(learner.avg.toFixed(2)), // Round to 2 decimal places
        ...learner.assignments
      }));
    } catch (error) {
      console.error('Error:', error.message);
      return [];
    }
  }
  
  // Example usage
  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
  
  


  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  




