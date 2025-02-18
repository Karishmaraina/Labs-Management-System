const BATCHES_PER_PAGE = 4;
let currentPage = 1;
let currentBatches = [];

// Mock data
const labs = [
  {
    id: 1,
    name: "Lab 1 - Development Lab",
    floor: "3rd Floor",
    incharge: "Anju Malhotra",
    status: "active",
    batches: [
      {
        id: 1,
        name: "FSD-2025",
        time: "11:00 AM - 12:00 PM",
        course: "Full Stack Development",
        trainer: "Amritpal Singh",
        trainees: 24,
        presentTrainees: 18,
        absentTrainees: 6,
      },
      {
        id: 2,
        name: "JD-2025",
        time: "2:00 PM - 4:00 PM",
        course: "Java Development",
        trainer: "Mohit Kumar",
        trainees: 15,
        presentTrainees: 12,
        absentTrainees: 3,
      },
      {
        id: 3,
        name: "WD-2025",
        time: "4:00 PM - 6:00 PM",
        course: "Web Development",
        trainer: "Rohit Sharma",
        trainees: 25,
        presentTrainees: 20,
        absentTrainees: 5,
      },
      {
        id: 4,
        name: "PD-2025",
        time: "6:00 PM - 8:00 PM",
        course: "Python Programming",
        trainer: "Bob Marley",
        trainees: 30,
        presentTrainees: 25,
        absentTrainees: 5,
      },
      {
        id: 5,
        name: "JD-2025",
        time: "8:00 PM - 10:00 PM",
        course: "Java Programming",
        trainer: "Charlie",
        trainees: 25,
        presentTrainees: 20,
        absentTrainees: 5,
      },
    ],
  },
  {
    id: 2,
    name: "Lab 2 - Research Lab",
    floor: "3rd Floor",
    incharge: "Tamanna Sharma",
    status: "active",
    batches: [
      {
        id: 1,
        name: "ML-2025",
        time: "11:00 AM - 12:00 PM",
        course: "Machine Learning",
        trainer: "Ankit Sharma",
        trainees: 29,
        presentTrainees: 18,
        absentTrainees: 11,
      },
      {
        id: 2,
        name: "DS-2025",
        time: "2:00 PM - 4:00 PM",
        course: "Data Science",
        trainer: "Alice",
        trainees: 38,
        presentTrainees: 12,
        absentTrainees: 26,
      },
    ],
  },
  {
    id: 3,
    name: "Lab 3 - Digital Marketing Lab",
    floor: "1st Floor",
    incharge: "Harsh Gupta",
    status: "active",
    batches: [
      {
        id: 1,
        name: "DM-2025",
        time: "11:00 AM - 12:00 PM",
        course: "Digital Marketing",
        trainer: "Rohan",
        trainees: 29,
        presentTrainees: 18,
        absentTrainees: 11,
      },
      {
        id: 2,
        name: "DS-2025",
        time: "2:00 PM - 4:00 PM",
        course: "Data Science",
        trainer: "Alice",
        trainees: 38,
        presentTrainees: 12,
        absentTrainees: 26,
      },
    ],
  },
  {
    id: 4,
    name: "Lab 4 - Web Designing Lab",
    floor: "3rd Floor",
    incharge: "Hina",
    status: "active",
    batches: [
      {
        id: 1,
        name: "WD-2025",
        time: "11:00 AM - 12:00 PM",
        course: "Web Designing",
        trainer: "Ankit Sharma",
        trainees: 29,
        presentTrainees: 18,
        absentTrainees: 11,
      },
    ],
  },
  {
    id: 2,
    name: "Lab 2 - Research Lab",
    floor: "3rd Floor",
    incharge: "Tamanna Sharma",
    status: "active",
    batches: [
      {
        id: 1,
        name: "ML-2025",
        time: "11:00 AM - 12:00 PM",
        course: "Machine Learning",
        trainer: "Ankit Sharma",
        trainees: 29,
        presentTrainees: 18,
        absentTrainees: 11,
      },
      {
        id: 2,
        name: "DS-2025",
        time: "2:00 PM - 4:00 PM",
        course: "Data Science",
        trainer: "Alice",
        trainees: 38,
        presentTrainees: 12,
        absentTrainees: 26,
      },
    ],
  },
  {
    id: 2,
    name: "Lab 2 - Research Lab",
    floor: "3rd Floor",
    incharge: "Tamanna Sharma",
    status: "active",
    batches: [
      {
        id: 1,
        name: "ML-2025",
        time: "11:00 AM - 12:00 PM",
        course: "Machine Learning",
        trainer: "Ankit Sharma",
        trainees: 29,
        presentTrainees: 18,
        absentTrainees: 11,
      },
      {
        id: 2,
        name: "DS-2025",
        time: "2:00 PM - 4:00 PM",
        course: "Data Science",
        trainer: "Alice",
        trainees: 38,
        presentTrainees: 12,
        absentTrainees: 26,
      },
    ],
  },
  {
    id: 2,
    name: "Lab 2 - Research Lab",
    floor: "3rd Floor",
    incharge: "Tamanna Sharma",
    status: "active",
    batches: [
      {
        id: 1,
        name: "ML-2025",
        time: "11:00 AM - 12:00 PM",
        course: "Machine Learning",
        trainer: "Ankit Sharma",
        trainees: 29,
        presentTrainees: 18,
        absentTrainees: 11,
      },
      {
        id: 2,
        name: "DS-2025",
        time: "2:00 PM - 4:00 PM",
        course: "Data Science",
        trainer: "Alice",
        trainees: 38,
        presentTrainees: 12,
        absentTrainees: 26,
      },
    ],
  },
];

localStorage.setItem("labs", JSON.stringify(labs));

// Labs Table
const labsList = document.getElementById("labs-list");
labs.forEach((lab) => {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${lab.name}</td>
        <td>${lab.floor}</td>
        <td>${lab.incharge}</td>
        <td>
            <span class="status-indicator ${lab.status === "active" ? "active" : "inactive"}"></span>
            ${lab.status.charAt(0).toUpperCase() + lab.status.slice(1)}
        </td>
        <td>${lab.batches.length}</td>
    `;
  row.addEventListener("click", () => {
    document.getElementById("batch-container").style.display = "block";
    renderBatches(lab.batches);
  });
  labsList.appendChild(row);
});

//Pagination
function renderBatches(batches) {
  currentBatches = batches;
  currentPage = 1;
  updateBatchDisplay();
}

function updateBatchDisplay() {
  const batchList = document.getElementById("batch-list");
  const loadMoreBtn = document.getElementById("load-more");
  const startIndex = (currentPage - 1) * BATCHES_PER_PAGE;
  const endIndex = startIndex + BATCHES_PER_PAGE;
  const batchesToShow = currentBatches.slice(0, endIndex);

  batchList.innerHTML = "";

  batchesToShow.forEach((batch) => {
    const attendancePercentage = (batch.presentTrainees / batch.trainees) * 100;

    const card = document.createElement("div");
    card.className = "batch-card";
    card.innerHTML = `
            <div class="batch-header">${batch.name}</div>
            <div class="batch-detail">
                <span>Time:</span>
                <span>${batch.time}</span>
            </div>
            <div class="batch-detail">
                <span>Course:</span>
                <span>${batch.course}</span>
            </div>
            <div class="batch-detail">
                <span>Trainer:</span>
                <span>${batch.trainer}</span>
            </div>
            <div class="attendance-bar">
                <div class="attendance-progress" style="width: ${attendancePercentage}%"></div>
            </div>
            <div class="batch-detail">
                <span>Attendance:</span>
                <span>${batch.presentTrainees}/${batch.trainees}</span>
            </div>
        `;
    card.addEventListener("click", () => showBatchDetails(batch));
    batchList.appendChild(card);
  });

  loadMoreBtn.style.display =
    currentBatches.length > endIndex ? "block" : "none";
}

// Batch details
function showBatchDetails(batch) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "1000";

  modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 500px;">
            <h3 style="margin-bottom: 1.5rem; color: var(--primary-color);">${batch.name} Details</h3>
            ${Object.entries(batch)
              .map(
                ([key, value]) => `
             <div style="display: flex; justify-content: space-between; width:105%; max-width: 600px; margin: 0.6rem 5; word-break: break-word;">
                <span style="font-weight: 500; white-space: nowrap;">${key
                  .replace(/([A-Z])/g, " $1")
                  .toUpperCase()}:</span>
                <span style="flex: 1; text-align: right;">${value}</span>
             </div>
            `
              )
              .join("")}
            <button onclick="this.parentElement.parentElement.remove()"
                    style="margin-top: 1.5rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">
                Close
            </button>
        </div>
    `;

  document.body.appendChild(modal);
}
document.getElementById("load-more").addEventListener("click", () => {
  currentPage++;
  updateBatchDisplay();
});
