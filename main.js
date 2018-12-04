function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues')) || []
  let issuesList = document.getElementById('issuesList')

  issuesList.innerHTML = ''

  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id
    let description = issues[i].description
    let severity = issues[i].severity
    let assignedTo = issues[i].assignedTo
    let status = issues[i].status

    issuesList.innerHTML += '<div class="well">'+
                            '<h6>Issue ID: ' + id + '</h6>'+
                            '<p><span class="label label-info">' + status + '</span></p>'+
                            '<h3>' + description + '</h3>'+
                            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                            '</div>';
  }
}

function saveIssue(e) {
  e.preventDefault();  
  let issues = JSON.parse(localStorage.getItem('issues')) || []
  let issue = {
    id: chance.guid(),
    description: document.getElementById('descInput').value,
    severity: document.getElementById('severityInput').value,
    assignedTo: document.getElementById('assignedInput').value,
    status: 'Open'
  }

  issues.push(issue)
  localStorage.setItem('issues', JSON.stringify(issues))

  document.getElementById('inputForm').reset()
  fetchIssues()
  e.preventDefault();
}

function setStatusClosed(id) {
  let issues = JSON.parse(localStorage.getItem('issues'))

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = 'Closed'
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues))
  fetchIssues()
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'))

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1)
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues))
  fetchIssues()
}

document.getElementById('inputForm').addEventListener('submit', saveIssue)