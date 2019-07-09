function addSkill() {
    let div = document.createElement('div');

    div.className = 'row skill';

    div.innerHTML =
        '<div class="column column-80">\
        <input type="text" value="" class="skill-name"/>\
        </div>\
        <div class="column column-20">\
        <input type="button" value="Remove" onclick="removeSkill(this.parentNode)"\>\
        </div>';

    document.querySelector('.skills').appendChild(div);
}

function removeSkill(input) {
    input.parentNode.remove();
}

function getSkills() {

    let rawSkills = document.querySelectorAll('.skill-name');

    // convert NodeList to array for using map function
    let skills = Array.from(rawSkills)
        .map(elem => elem.value)
        .filter(elem => elem != '');

    console.log('Skills: ', skills);

    return skills;
}

function addWork() {
    let div = document.createElement('div');

    div.className = 'row work';

    div.innerHTML =
        `
        <div class="column column-60">
            <input type="text" value="" class="work-name"/>
        </div>
        <div class="column column-10">
            <input type="text" value="" class="work-start"/>
        </div>
        <div class="column column-10">
            <input type="text" value="" class="work-end"/>
        </div>
        <div class="column column-20">
            <input type="button" value="Remove" onclick="removeWork(this.parentNode)">
        </div>
        `

    document.querySelector('.workExp').appendChild(div);
}

function removeWork(input) {
    input.parentNode.remove();
}

function getWorks() {

    let rawExp = document.querySelectorAll('.work');
    expList = []

    rawExp.forEach(elem => {
        company = elem.children[0].children[0].value;
        date_from = elem.children[1].children[0].value;
        date_to = elem.children[2].children[0].value;

        if (company.trim() != '') {
            expObj = { company, date_from, date_to };
            expList.push(expObj);
        }
    });

    console.log('Exp List:', expList);

    return expList;
}

function packData() {
    name = document.querySelector('#nameField').value;
    loc = document.querySelector('#locField').value;
    curr_work = document.querySelector('#workField').value;
    skills = getSkills();
    experiences = getWorks();

    skillsListHtml = `<ul>`;
    skills.forEach(skill => {
        skillsListHtml += `<li>${skill}</li>`;
    });
    skillsListHtml += `</li>`;

    workExpListHtml = `<ul>`;
    experiences.forEach(exp => {
        workExpListHtml += `<li>${exp.company} <b>From:</b> ${exp.date_from} <b>To:</b> ${exp.date_to}</li>`;
    });
    workExpListHtml += `</li>`;

    cv_data = { name, loc, curr_work, skillsListHtml, workExpListHtml };

    return cv_data;
}

function makeCV() {
    // Set CV portion visible
    document.querySelector('.cv-output').style.display = 'flex';
    document.querySelector('.generator-module').style.display = 'none';

    outputData = packData();
    console.log(outputData);

    document.querySelector('#final-name').textContent = outputData.name;
    document.querySelector('#final-location').textContent = outputData.loc;
    document.querySelector('#final-work').textContent = outputData.curr_work;
    document.querySelector('#final-skills').innerHTML = outputData.skillsListHtml;
    document.querySelector('#final-workexp').innerHTML = outputData.workExpListHtml;

    generateQRCode();

    console.log('CV Made!')
}

function resetForm() {
    document.querySelector('.generator-module').style.display = 'block';
    document.querySelector('.cv-output').style.display = 'none';

    form = document.querySelector('#cv-form');
    form.reset();
}

