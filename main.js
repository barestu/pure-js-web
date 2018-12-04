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
  let issueId = chance.guid()
  let issueDesc = document.getElementById('descInput').value
  let issueSeverity = document.getElementById('severityInput').value
  let issueAssignedTo = document.getElementById('assignedInput').value
  let issueStatus = 'Open'

  let issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('inputForm' === null)) {
    let issues = []
    issues.push(issue)
    localStorage.setItem('issues', JSON.stringify(issues))
  } else {
    let issues = JSON.parse(localStorage.getItem('issues')) || []
    console.log('here', issue);
    issues.push(issue)
    localStorage.setItem('issues', JSON.stringify(issues))
  }

  document.getElementById('inputForm').reset()
  fetchIssues()
  e.preventDefault();
}

document.getElementById('inputForm').addEventListener('submit', saveIssue)